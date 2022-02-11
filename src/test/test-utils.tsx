import React, { FC } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, RootState } from "@/store";
import nodeFetch from "node-fetch";
import fetchMock from "fetch-mock";

// Patch the render method to include useful wrappers (redux, styled-components, etc);
function render(
  ui: React.ReactElement,
  {
    preloadedState,
    ...renderOptions
  }: RenderOptions & { preloadedState?: RootState } = {}
) {
  const Wrapper: FC = ({ children }) => {
    const store = createStore(preloadedState);
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// expose `node-fetch` which is actually a mocked version provided by `fetch-mock`,
// See `jest.setup.ts`.
const fetch = nodeFetch as unknown as ReturnType<typeof fetchMock.sandbox>;

export { render, fetch };
