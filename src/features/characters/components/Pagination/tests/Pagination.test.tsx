import { Pagination } from "..";
import { render } from "@/test/test-utils";

describe("Pagination", () => {
  it("renders the current page and links to other pages", () => {
    const { queryByText } = render(
      <Pagination currentPage={1} totalPages={10} />
    );
    expect(queryByText(1)).toBeVisible();
  });

  it("renders a number of page links dependent on the `trailing` prop", () => {
    const { queryAllByText, rerender } = render(
      <Pagination currentPage={5} totalPages={10} trailing={3} />
    );

    // 3 trailing behind + 1 current page + 3 trailing ahead
    expect(queryAllByText(/\d+/)).toHaveLength(7);

    rerender(<Pagination currentPage={1} totalPages={10} trailing={3} />);
    // 0 trailing behind + 1 current page + 3 trailing ahead
    expect(queryAllByText(/\d+/)).toHaveLength(4);

    rerender(<Pagination currentPage={2} totalPages={10} trailing={3} />);
    // 1 trailing behind + 1 current page + 3 trailing ahead
    expect(queryAllByText(/\d+/)).toHaveLength(5);

    rerender(<Pagination currentPage={8} totalPages={10} trailing={3} />);
    // 3 trailing behind + 1 current page + 2 trailing ahead
    expect(queryAllByText(/\d+/)).toHaveLength(6);

    rerender(<Pagination currentPage={10} totalPages={10} trailing={3} />);
    // 3 trailing behind + 1 current page + 0 trailing ahead
    expect(queryAllByText(/\d+/)).toHaveLength(4);
  });

  it("renders a 'first page' link if the current page is > 1", () => {
    const { queryByTitle, rerender } = render(
      <Pagination currentPage={5} totalPages={10} trailing={3} />
    );

    expect(queryByTitle("First Page")).toBeVisible();

    rerender(<Pagination currentPage={1} totalPages={10} trailing={3} />);

    expect(queryByTitle("First Page")).not.toBeInTheDocument();
  });

  it("renders a 'last page' link if the current page is < total pages", () => {
    const { queryByTitle, rerender } = render(
      <Pagination currentPage={5} totalPages={10} trailing={3} />
    );

    expect(queryByTitle("Last Page")).toBeVisible();

    rerender(<Pagination currentPage={10} totalPages={10} trailing={3} />);

    expect(queryByTitle("Last Page")).not.toBeInTheDocument();
  });

  it("renders the current page as normal text", () => {
    const { queryByText } = render(
      <Pagination currentPage={5} totalPages={10} trailing={3} />
    );

    expect(queryByText("5")).not.toHaveAttribute("href");
  });
});
