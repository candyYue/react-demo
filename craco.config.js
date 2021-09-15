const CracoLessPlugin = require('craco-less');
const path = require("path")
const addPath = dir => path.join(__dirname,dir);

module.exports = {
  webpack:{
    alias:{
        "@":addPath("src")
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {  //修改antd默认配置
                // '@primary-color': '#d6e4ff',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};