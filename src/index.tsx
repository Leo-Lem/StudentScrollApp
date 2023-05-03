import React, { StrictMode } from "react"
import ReactDOM from "react-dom/client"

import App from "./app"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)

import mockAPI from "./api/mockAPI" // eslint-disable-line
if (process.env.NODE_ENV === "development") mockAPI()
