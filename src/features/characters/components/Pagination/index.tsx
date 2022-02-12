import { FC, useMemo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import range from "lodash/range";
import Link from "next/link";
import { color, spacing } from "@/theme";

const PageNumber = styled.span`
  background-color: ${color("highlight")};
  display: inline-block;
  height: ${spacing(7)};
  width: ${spacing(7)};
  line-height: ${spacing(7)};
  text-align: center;
  border-radius: 50%;
`;

interface PageLinkProps {
  page: number;
  baseUrl: string;
  shallow: boolean;
  title?: string;
}

const PageLink: FC<PageLinkProps> = ({
  page,
  baseUrl,
  shallow,
  children,
  title,
}) => (
  <Link href={`${baseUrl}/${page}`} shallow={shallow} passHref>
    <PageNumber as="a" title={title ?? `Page ${page}`}>
      {children}
    </PageNumber>
  </Link>
);

const CurrentPage = styled(PageNumber)`
  background-color: ${color("primary")};
`;

interface PaginationProps {
  currentPage: number;
  totalPages?: number;
  trailing?: number;
  baseUrl?: string;
  shallow?: boolean;
}
export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  trailing = 3,
  baseUrl = "",
  shallow = false,
}) => {
  const pageRange = useMemo(() => {
    const start = Math.max(1, currentPage - trailing);
    const end = Math.min(totalPages || 1, currentPage + trailing) + 1;
    return range(start, end);
  }, [currentPage, totalPages, trailing]);

  return (
    <div
      css={`
        display: flex;
        justify-content: center;
        & > ${PageNumber} {
          margin: 0 ${spacing(2)} ${spacing(3)};
        }
      `}
    >
      {currentPage > 1 && (
        <PageLink
          baseUrl={baseUrl}
          shallow={shallow}
          page={1}
          title="First Page"
        >
          &laquo;
        </PageLink>
      )}
      {pageRange.map((page) =>
        page === currentPage ? (
          <CurrentPage key={page}>{page}</CurrentPage>
        ) : (
          <PageLink key={page} page={page} baseUrl={baseUrl} shallow={shallow}>
            {page}
          </PageLink>
        )
      )}
      {totalPages && currentPage < totalPages && (
        <PageLink
          baseUrl={baseUrl}
          shallow={shallow}
          page={totalPages}
          title="Last Page"
        >
          &raquo;
        </PageLink>
      )}
    </div>
  );
};
