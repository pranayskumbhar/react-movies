import { link } from "fs";
import { useEffect, useState } from "react";

export default function Pagination(props: paginationProps) {
  const [linkModels, setLinkModels] = useState<linkModel[]>([]);

  function selectPage(link: linkModel) {
    if (link.page === props.currentPage) {
      return;
    }

    if (link.enabled) {
      return;
    }
    props.onChange(link.page);
  }

  function getclass(link: linkModel) {
    if (link.active) {
      return "active pointer";
    }
    if (!link.enabled) {
      return "disabled";
    }

    return "pointer";
  }

  useEffect(
    function () {
      const previousPageEnabled = props.currentPage !== 1;
      const previousPage = props.currentPage - 1;
      const links: linkModel[] = [];

      links.push({
        text: "Previous",
        enabled: previousPageEnabled,
        page: previousPage,
        active: false,
      });

      for (let i = 0; i <= props.totalAmountOfPage; i++) {
        if (
          i >= props.currentPage - props.radio &&
          i <= props.currentPage + props.radio
        ) {
          links.push({
            text: `${i}`,
            enabled: props.currentPage === i,
            page: i,
            active: true,
          });
        }
      }

      const nextPageEnabled =
        props.currentPage !== props.totalAmountOfPage &&
        props.totalAmountOfPage > 0;
      const nextPage = props.currentPage + 1;
      links.push({
        text: "Next",
        page: nextPage,
        enabled: nextPageEnabled,
        active: false,
      });
      setLinkModels(links);
    },
    [props.currentPage, props.radio, props.totalAmountOfPage]
  );

  return (
    <>
      <nav>
        <ul className="pagination justify-content-center">
          {linkModels.map((link, index) => (
            <li
              key={index}
              onClick={() => {
                selectPage(link);
              }}
              className={`page-item cursor ${getclass(link)}`}
            >
              <span className="page-link">{link.text}</span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

interface paginationProps {
  currentPage: number;
  totalAmountOfPage: number;
  radio: number;
  onChange(page: number): void;
}

interface linkModel {
  page: number;
  enabled: boolean;
  text: string;
  active: boolean;
}

Pagination.defaultProps = {
    radio : 3
};
