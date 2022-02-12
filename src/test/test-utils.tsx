import React, { FC } from "react";
import {
  render as rtlRender,
  RenderOptions,
  screen,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, RootState } from "@/store";
import nodeFetch from "node-fetch";
import fetchMock from "fetch-mock";
import { ThemeProvider } from "styled-components";
import { theme } from "@/theme";

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
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// expose `node-fetch` which is actually a mocked version provided by `fetch-mock`,
// See `jest.setup.ts`.
const fetch = nodeFetch as unknown as ReturnType<typeof fetchMock.sandbox>;

const expectVisible = (el: ReturnType<typeof screen.queryByText>) =>
  expect(el).toBeVisible();

export { render, fetch, expectVisible };
