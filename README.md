### Rick & Morty character wiki

This is a simple application that displays the profile of the characters using the [Rick & Morty API](https://rickandmortyapi.com).

[**Demo**](http://209.97.131.160:56000)

## Getting started

Clone the repository then run
`npm run build && npm start` for production mode
or
`npm run dev` for development mode.  
In both scenarios, you'll be able to access the application at `http://localhost:3000`

## Tech stack

### Language: **Typescript**

Typescript was chosen over javascript for type safety and improved code autocomplete.

### Framework: **Next.js**

This app leverages Next.js for server-side rendering, static generation, dynamic routing, image optimization. The output is a hybrid app with pages statically generated at build time for a fast loading time. After the user lands on the page, client-side navigation takes over for a better user experience.

### State management: **redux via @reduxjs/toolkit**

### Side effects / async effects management: **redux-thunk via @reduxjs/toolkit**

@reduxjs/toolkit offers a set of tools that drastically cut down on the boilerplate code required to use redux in a react application.  
This application uses `createSlice`, `createEntityAdapter` and `createAsyncThunk` to quickly create the state shape, a set of async actions that manage the data fetching flow, and the reducers to handle the results.
A series of optimizations allow for keeping track of the state of the entities (loading, loaded, error) and makes it possible to check which individual resources were already requested and stored in the state to avoid querying the API for data that is already available.

### Styling: **styled-components**

styled-components makes it easy to style reusable components and to access values from a shared theme. A series of simple helpers were implemented to make it easier to access values from the theme. i.e.

```js
  <div css={`background-color: ${color('primary')};`}>
```

### Testing: **jest and testing-library**

Jest is used as the test runner and specific packages from the testing-library project are used to render React components and check specific assertions.
The approach here is to fully render the components instead of doing a shallow rendering. The tests are written to check the components with the user's perspective in mind. In the case of simple, presentational components they act as unit tests, while for complex, connected components they serve as integration tests.

## Next steps

- handle UI texts with an i18n library, for example react-intl
- implement e2e tests with cypress
- SSL certificates for the demo website
- consider creating a factory for the state slices/actions since they are quite similar in structure and functionality
- allow the user to browse episodes and locations as well, and make the references link to one another
