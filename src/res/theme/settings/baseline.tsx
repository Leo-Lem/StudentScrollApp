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
          msOverflowStyle: "none",
          scrollbarWidth: "none"
        }
      }
    }
  }
}

export default baselineSettings
