import type { AppProps } from "next/app";
import { useMemo } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { createStore, RootState } from "@/store";
import { theme } from "@/theme";
import { GlobalStyle } from "@/theme/GlobalStyles";
import { Header } from "@/components";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialState: RootState }>) {
  const store = useMemo(
    () => createStore(pageProps.initialState),
    [pageProps.initialState]
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Provider store={store}>
        <Header title="Rick &amp; Morty Characters" />
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
