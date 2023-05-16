const noScrollbarsSettings = {
  overrides: {
    MuiCssBaseline: {
      "@global": {
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

export default noScrollbarsSettings
