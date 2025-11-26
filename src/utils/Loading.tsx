import { useEffect } from "react";

export default function Loading() {
  useEffect(() => {
    const disableContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', disableContextMenu);
    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
    };
  }, []);

  return (
    <>
      <div className="google-loader">
        <div className="google-loader-bar"></div>
      </div>

      <style>{`
        .google-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background-color: transparent;
          overflow: hidden;
          z-index: 9999;
        }

        .google-loader-bar {
          height: 100%;
          width: 100%;
          background: linear-gradient(
            90deg,
            #4285F4 0%,
            #DB4437 25%,
            #F4B400 50%,
            #0F9D58 75%,
            #4285F4 100%
          );
          background-size: 200% auto;
          animation: slide 1.2s linear infinite;
        }

        @keyframes slide {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 100% 0;
          }
        }
      `}</style>
    </>
  );
};