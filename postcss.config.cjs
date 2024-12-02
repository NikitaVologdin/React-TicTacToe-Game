module.exports = {
  plugins: [
    require("postcss-mixins"),
    require("autoprefixer"),
    require("postcss-nested"),
    require("postcss-pxtorem")({ rootValue: 16, propList: ["*"] }),
  ],
};
