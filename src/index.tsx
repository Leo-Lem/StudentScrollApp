import React, { StrictMode } from "react"
import ReactDOM from "react-dom/client"

import App from "./App"
import mockAPI from "./api/mockAPI"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)

if (process.env.NODE_ENV === "development") mockAPI()
