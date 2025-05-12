import { useEffect, useState } from "react";

export default function Pagination(props: paginationProps) {
  const [linkModels, setLinkModels] = useState<linkModel[]>([]);

  function selectPage(link: linkModel) {
    if (!link.enabled || link.page === props.currentPage) return;
    props.onChange(link.page);
  }

  function getclass(link: linkModel) {
    if (!link.enabled) return "disabled";
    if (link.active) return "active pointer";
    return "pointer";
  }

  useEffect(() => {
    const links: linkModel[] = [];

    // Previous
    const previousPage = props.currentPage - 1;
    links.push({
      text: "Previous",
      enabled: previousPage >= 1,
      page: previousPage,
      active: false,
    });

    // Current, Previous, Next numbers (only x-1, x, x+1)
    for (let i = props.currentPage - 1; i <= props.currentPage + 1; i++) {
      if (i >= 1 && i <= props.totalAmountOfPage) {
        links.push({
          text: i.toString(),
          enabled: i !== props.currentPage,
          page: i,
          active: i === props.currentPage,
        });
      }
    }

    // Next
    const nextPage = props.currentPage + 1;
    links.push({
      text: "Next",
      enabled: nextPage <= props.totalAmountOfPage,
      page: nextPage,
      active: false,
    });

    setLinkModels(links);
  }, [props.currentPage, props.totalAmountOfPage]);

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {linkModels.map((link, index) => (
          <li
            key={index}
            onClick={() => selectPage(link)}
            className={`page-item cursor ${getclass(link)}`}
          >
            <span className="page-link">{link.text}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface paginationProps {
  currentPage: number;
  totalAmountOfPage: number;
  onChange(page: number): void;
}

interface linkModel {
  page: number;
  enabled: boolean;
  text: string;
  active: boolean;
}
