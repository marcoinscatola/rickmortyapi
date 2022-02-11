import "@testing-library/jest-dom";
import "@testing-library/react";
import nodeFetch from "node-fetch";
jest.mock("node-fetch", () => require("fetch-mock").sandbox());

globalThis.fetch = nodeFetch as unknown as typeof fetch;
