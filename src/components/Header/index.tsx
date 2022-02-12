import type { FC } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { spacing } from "@/theme";

interface HeaderProps {
  title: string;
}

export const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <div
        css={`
          display: flex;
          align-items: stretch;
          padding: ${spacing(3)};
        `}
      >
        <h1>
          <Link href="/" passHref>
            <a>{title}</a>
          </Link>
        </h1>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
