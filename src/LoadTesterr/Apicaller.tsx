import React, { useState, useRef } from "react";
import styles from "./Apicaller.module.css";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
type AuthType = "none" | "bearer" | "basic" | "apikey";
type BodyType = "json" | "text" | "formdata";

interface HeaderRow {
  id: string;
  enabled: boolean;
  key: string;
  value: string;
}

interface ApiResult {
  status: number | "ERR";
  statusText: string;
  timeMs: number;
  request: {
    method: HttpMethod;
    url: string;
    headers: Record<string, string>;
    body?: any;
  };
  responseBody: any;
  responseHeaders: Record<string, string>;
}

export default function Apicaller(): JSX.Element {
  // Request UI state
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState("");
  const [authType, setAuthType] = useState<AuthType>("none");

  // auth states
  const [bearerToken, setBearerToken] = useState("");
  const [basicUser, setBasicUser] = useState("");
  const [basicPass, setBasicPass] = useState("");
  const [apiKeyName, setApiKeyName] = useState("");
  const [apiKeyValue, setApiKeyValue] = useState("");

  // headers rows
  const uid = useRef(1);
  const [headerRows, setHeaderRows] = useState<HeaderRow[]>([
    { id: "h0", enabled: true, key: "Accept", value: "application/json" },
  ]);

  // body
  const [bodyType, setBodyType] = useState<BodyType>("json");
  const [jsonBody, setJsonBody] = useState<string>('{"key":"value"}');
  const [textBody, setTextBody] = useState<string>("");

  // load testing
  const [callCount, setCallCount] = useState<number>(1);
  const [concurrency, setConcurrency] = useState<number>(5); // optional
  const [loading, setLoading] = useState(false);

  // results grouped by status
  const [results, setResults] = useState<Record<string, ApiResult[]>>({});

  // history (flat)
  const [history, setHistory] = useState<ApiResult[]>([]);

  // UI helpers
  const resetAll = () => {
    setMethod("GET");
    setUrl("");
    setAuthType("none");
    setBearerToken("");
    setBasicUser("");
    setBasicPass("");
    setApiKeyName("");
    setApiKeyValue("");
    setHeaderRows([{ id: "h0", enabled: true, key: "Accept", value: "application/json" }]);
    setBodyType("json");
    setJsonBody('{"key":"value"}');
    setTextBody("");
    setCallCount(1);
    setResults({});
    setHistory([]);
  };

  // header helpers
  const addHeaderRow = () =>
    setHeaderRows((s) => [...s, { id: `h${uid.current++}`, enabled: true, key: "", value: "" }]);
  const removeHeaderRow = (id: string) => setHeaderRows((s) => s.filter((r) => r.id !== id));
  const updateHeaderRow = (id: string, patch: Partial<HeaderRow>) =>
    setHeaderRows((s) => s.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  // build headers object (do NOT set Content-Type if formdata used)
  const buildHeaders = (): Record<string, string> => {
    const out: Record<string, string> = {};
    headerRows.forEach((r) => {
      if (r.enabled && r.key.trim()) out[r.key.trim()] = r.value;
    });

    // Auth handling
    if (authType === "bearer" && bearerToken.trim()) {
      out["Authorization"] = `Bearer ${bearerToken.trim()}`;
    } else if (authType === "basic" && basicUser) {
      out["Authorization"] = `Basic ${btoa(`${basicUser}:${basicPass}`)}`;
    } else if (authType === "apikey" && apiKeyName.trim()) {
      out[apiKeyName.trim()] = apiKeyValue;
    }
    return out;
  };

  // perform single fetch and return ApiResult
  const performFetch = async (singleOptions: {
    method: HttpMethod;
    url: string;
    headers: Record<string, string>;
    body?: any;
  }): Promise<ApiResult> => {
    const { method: m, url: u, headers: hdrs, body } = singleOptions;
    const start = performance.now();
    try {
      const fetchHeaders = new Headers();
      Object.keys(hdrs).forEach((k) => fetchHeaders.append(k, hdrs[k]));

      const options: RequestInit = {
        method: m,
        headers: fetchHeaders,
      };

      if (body !== undefined) {
        if (body instanceof FormData) {
          // don't set content-type; browser will add boundary
          options.body = body;
        } else {
          // if JSON string, ensure content-type if not provided
          if (!fetchHeaders.has("Content-Type")) fetchHeaders.set("Content-Type", "application/json");
          options.body = body;
        }
      }

      const res = await fetch(u, options);
      const timeMs = Math.round(performance.now() - start);
      const status = res.status;
      const statusText = res.statusText;

      // read response text, then try JSON parse
      const raw = await res.text();
      let parsed: any = raw;
      try {
        parsed = raw ? JSON.parse(raw) : raw;
      } catch {
        parsed = raw;
      }

      const resHdrs: Record<string, string> = {};
      res.headers.forEach((val, key) => (resHdrs[key] = val));

      return {
        status,
        statusText,
        timeMs,
        request: { method: m, url: u, headers: hdrs, body },
        responseBody: parsed,
        responseHeaders: resHdrs,
      };
    } catch (err: any) {
      const timeMs = Math.round(performance.now() - start);
      return {
        status: "ERR",
        statusText: err?.message ?? "Network Error",
        timeMs,
        request: { method: m, url: u, headers: hdrs, body },
        responseBody: err?.message ?? "Network Error",
        responseHeaders: {},
      };
    }
  };

  // main send handler (parallel load testing)
  const handleSend = async () => {
    if (!url.trim()) {
      alert("URL zaroori hai (Enter a URL).");
      return;
    }

    setLoading(true);
    setResults({});
    setHistory([]);

    // prepare body based on bodyType
    let preparedBody: any;
    if (["POST", "PUT", "PATCH"].includes(method)) {
      if (bodyType === "json") {
        try {
          preparedBody = jsonBody && jsonBody.trim() ? JSON.stringify(JSON.parse(jsonBody)) : undefined;
        } catch (e) {
          alert("Invalid JSON body. Check syntax.");
          setLoading(false);
          return;
        }
      } else if (bodyType === "text") {
        preparedBody = textBody;
      } else if (bodyType === "formdata") {
        const fd = new FormData();
        // collect rows from headers area where key/value intended as form-data? (we'll use separate simple inputs)
        // For simplicity create form-data from textBody lines key=value if present
        const lines = textBody.split("\n").map((l) => l.trim()).filter(Boolean);
        lines.forEach((ln) => {
          const [k, ...rest] = ln.split("=");
          if (k) fd.append(k.trim(), rest.join("=").trim());
        });
        preparedBody = fd;
      }
    }

    const baseHeaders = buildHeaders();

    // Create N parallel promises (but avoid creating too huge concurrency)
    const tasks: Promise<ApiResult>[] = [];
    for (let i = 0; i < callCount; i++) {
      tasks.push(performFetch({ method, url, headers: { ...baseHeaders }, body: preparedBody }));
    }

    try {
      const all = await Promise.all(tasks); // parallel execution
      // group by status
      const grouped: Record<string, ApiResult[]> = {};
      all.forEach((r) => {
        const key = String(r.status);
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(r);
      });
      setResults(grouped);
      setHistory(all.concat([])); // newest first
    } finally {
      setLoading(false);
    }
  };

  // helpers for colors
  const statusColor = (s: number | "ERR") => {
    if (s === "ERR") return "#b00020";
    if (typeof s !== "number") return "#666";
    if (s >= 200 && s < 300) return "#2e7d32"; // green
    if (s >= 300 && s < 400) return "#0277bd"; // blue
    if (s >= 400 && s < 500) return "#d84315"; // orange/red
    return "#4a148c"; // purple for 500+
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Postman — Mini Clone</h1>
        <div className={styles.headerRight}>
          <button className={styles.resetBtn} onClick={resetAll}>
            Reset
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.left}>
          {/* Request row */}
          <div className={styles.requestRow}>
            <select value={method} onChange={(e) => setMethod(e.target.value as HttpMethod)} className={styles.method}>
              {["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <input
              className={styles.urlInput}
              placeholder="https://api.example.com/resource"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button className={styles.sendBtn} onClick={handleSend} disabled={loading}>
              {loading ? <span className={styles.spinner} /> : "Send"}
            </button>
          </div>

          {/* Authentication */}
          <div className={styles.panel}>
            <div className={styles.panelTitle}>Authentication</div>
            <div className={styles.row}>
              <select
                value={authType}
                onChange={(e) => {
                  const v = e.target.value as AuthType;
                  setAuthType(v);
                  // clear auth values when set to none
                  if (v === "none") {
                    setBearerToken("");
                    setBasicUser("");
                    setBasicPass("");
                    setApiKeyName("");
                    setApiKeyValue("");
                  }
                }}
              >
                <option value="none">None</option>
                <option value="bearer">Bearer Token</option>
                <option value="basic">Basic Auth</option>
                <option value="apikey">API Key</option>
              </select>
            </div>

            {authType === "bearer" && (
              <div className={styles.row}>
                <input placeholder="Bearer token" value={bearerToken} onChange={(e) => setBearerToken(e.target.value)} />
              </div>
            )}

            {authType === "basic" && (
              <div className={styles.row}>
                <input placeholder="Username" value={basicUser} onChange={(e) => setBasicUser(e.target.value)} />
                <input placeholder="Password" type="password" value={basicPass} onChange={(e) => setBasicPass(e.target.value)} />
              </div>
            )}

            {authType === "apikey" && (
              <div className={styles.row}>
                <input placeholder="Header name (e.g. x-api-key)" value={apiKeyName} onChange={(e) => setApiKeyName(e.target.value)} />
                <input placeholder="API Key value" value={apiKeyValue} onChange={(e) => setApiKeyValue(e.target.value)} />
              </div>
            )}
          </div>

          {/* Headers */}
          <div className={styles.panel}>
            <div className={styles.panelTitle}>Headers</div>
            {headerRows.map((r) => (
              <div className={styles.headerRow} key={r.id}>
                <input type="checkbox" checked={r.enabled} onChange={(e) => updateHeaderRow(r.id, { enabled: e.target.checked })} />
                <input placeholder="Key" value={r.key} onChange={(e) => updateHeaderRow(r.id, { key: e.target.value })} />
                <input placeholder="Value" value={r.value} onChange={(e) => updateHeaderRow(r.id, { value: e.target.value })} />
                <button className={styles.smallBtn} onClick={() => removeHeaderRow(r.id)} aria-label="remove header">
                  −
                </button>
              </div>
            ))}

            <div className={styles.row}>
              <button className={styles.addBtn} onClick={addHeaderRow}>
                + Add Header
              </button>
            </div>
          </div>

          {/* Body (only for relevant methods) */}
          {["POST", "PUT", "PATCH"].includes(method) && (
            <div className={styles.panel}>
              <div className={styles.panelTitle}>Body</div>
              <div className={styles.tabRow}>
                <button className={bodyType === "json" ? styles.activeTab : styles.tab} onClick={() => setBodyType("json")}>
                  JSON
                </button>
                <button className={bodyType === "text" ? styles.activeTab : styles.tab} onClick={() => setBodyType("text")}>
                  Text
                </button>
                <button className={bodyType === "formdata" ? styles.activeTab : styles.tab} onClick={() => setBodyType("formdata")}>
                  Form-Data
                </button>
              </div>

              {bodyType === "json" && (
                <textarea className={styles.textarea} value={jsonBody} onChange={(e) => setJsonBody(e.target.value)} />
              )}
              {bodyType === "text" && <textarea className={styles.textarea} value={textBody} onChange={(e) => setTextBody(e.target.value)} />}
              {bodyType === "formdata" && (
                <textarea
                  className={styles.textarea}
                  value={textBody}
                  onChange={(e) => setTextBody(e.target.value)}
                  placeholder={"Enter key=value lines, one per line"}
                />
              )}
            </div>
          )}

          {/* Load testing */}
          <div className={styles.panel}>
            <div className={styles.panelTitle}>Load Testing / Options</div>
            <div className={styles.row}>
              <label className={styles.smallLabel}>Calls (parallel):</label>
              <input type="number" min={1} value={callCount} onChange={(e) => setCallCount(Math.max(1, Number(e.target.value || 1)))} />
            </div>
            <div className={styles.row}>
              <label className={styles.smallLabel}>Concurrency (optional):</label>
              <input
                type="number"
                min={1}
                value={concurrency}
                onChange={(e) => setConcurrency(Math.max(1, Number(e.target.value || 1)))}
                disabled
              />
              {/* concurrency currently unused; kept for future */}
            </div>
          </div>
        </section>

        <section className={styles.right}>
          <div className={styles.resultsHeader}>
            <h3>Responses</h3>
            <div className={styles.resultsMeta}>
              <span>{Object.keys(results).length} groups</span>
              <span>History: {history.length}</span>
            </div>
          </div>

          <div className={styles.cards}>
            {Object.keys(results).length === 0 && <div className={styles.placeholder}>No results yet — send a request.</div>}

            {Object.entries(results).map(([statusKey, arr]) => {
              const sNum = statusKey === "ERR" ? "ERR" : Number(statusKey);
              return (
                <div key={statusKey} className={styles.cardWrapper}>
                  <div className={styles.cardSummary} style={{ borderLeftColor: statusColor(sNum as any) }}>
                    <div className={styles.cardTitle}>
                      <div className={styles.statusBadge} style={{ backgroundColor: statusColor(sNum as any) }}>
                        {statusKey}
                      </div>
                      <div>
                        <div className={styles.cardCount}>{arr.length} call(s)</div>
                        <div className={styles.cardAvg}>Avg: {Math.round(arr.reduce((a, b) => a + b.timeMs, 0) / arr.length)} ms</div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.cardList}>
                    {arr.map((r, i) => (
                      <details key={i} className={styles.detailCard}>
                        <summary className={styles.detailSummary}>
                          <span className={styles.methodBadge}>{r.request.method}</span>
                          <span className={styles.reqUrl}>{r.request.url}</span>
                          <span className={styles.time}>{r.timeMs} ms</span>
                        </summary>

                        <div className={styles.detailBody}>
                          <div className={styles.detailSection}>
                            <strong>Request</strong>
                            <pre>{JSON.stringify(r.request, null, 2)}</pre>
                          </div>

                          <div className={styles.detailSection}>
                            <strong>Response (status {r.status})</strong>
                            <pre>{typeof r.responseBody === "object" ? JSON.stringify(r.responseBody, null, 2) : String(r.responseBody)}</pre>
                          </div>

                          <div className={styles.detailSection}>
                            <strong>Response Headers</strong>
                            <pre>{JSON.stringify(r.responseHeaders, null, 2)}</pre>
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* full history panel */}
          <div className={styles.historyPanel}>
            <h4>Latest Responses</h4>
            {history.length === 0 && <div className={styles.placeholder}>No history</div>}
            {history.map((h, idx) => (
              <div key={idx} className={styles.historyRow}>
                <div style={{ color: statusColor(h.status) }}>{String(h.status)}</div>
                <div className={styles.historyUrl}>{h.request.method} {h.request.url}</div>
                <div className={styles.historyTime}>{h.timeMs} ms</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>  
  );
}
