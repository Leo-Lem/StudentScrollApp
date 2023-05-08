import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import App from "./app"

createRoot(document.getElementById("root") as HTMLElement)
  .render(
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </StrictMode>
  )

import mockAPI from "./api/mockAPI" // eslint-disable-line
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import store from "./redux/store"
if (process.env.NODE_ENV === "development") mockAPI()
