import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./App"
import { Provider } from "react-redux"
import { store } from "./redux"

if (process.env.NODE_ENV === "development")
  import("./mocks").then(({ createMockedAPI }) => createMockedAPI())

createRoot(document.getElementById("root") as HTMLElement).render(

  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
)