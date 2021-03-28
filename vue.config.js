const path = require("path");
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  outputDir: path.resolve(__dirname, '../backend/public'),
  devServer: { 
    proxy: { // proxyTable 설정
     '/api': {
        target: 'http://localhost:8080/api', 
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      } 
    } 
  }
}
