import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import App from "./app"

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

import mockAPI from "./api/mockAPI" // eslint-disable-line
if (process.env.NODE_ENV === "development") mockAPI()
