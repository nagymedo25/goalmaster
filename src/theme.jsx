export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "dark"
      ? {
          // palette values for light mode
        }
      : {
          // palette values for dark mode
        }),
  },
});
