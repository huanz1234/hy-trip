// vue cli/vite
export default {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
      selectorBlackList: ["favor"]
    }
  }
};
