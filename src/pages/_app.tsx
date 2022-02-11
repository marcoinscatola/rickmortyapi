import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { useMemo } from "react";
import { createStore, RootState } from "@/store";
import { Provider } from "react-redux";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialState: RootState }>) {
  const store = useMemo(
    () => createStore(pageProps.initialState),
    [pageProps.initialState]
  );
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
