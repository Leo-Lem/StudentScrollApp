import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement) // this places your react components in the html root element
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) // this renders your react components
