const baselineSettings = {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 10
        },
        "*::-webkit-scrollbar": {
          display: "none"
        },
        "*": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none"
        }
      }
    }
  }
}

export default baselineSettings
