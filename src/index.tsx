import React, { StrictMode } from "react"
import ReactDOM from "react-dom/client"

import App from "./app1"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)

import { mock } from "./api/mirage" // eslint-disable-line
if (process.env.NODE_ENV === "development")
  mock()
