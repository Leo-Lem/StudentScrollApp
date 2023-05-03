import React, { StrictMode } from "react"
import ReactDOM from "react-dom/client"

import App from "./app"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)

import mock from "./api/lib/mirage" // eslint-disable-line
mock()
