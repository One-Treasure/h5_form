// vue.config.js
module.exports = {
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false,
    devServer: {
        proxy: {
            '/': {
                target: "http://192.168.0.107:8081/api",
                changeOrgin: true,
                pathRewrite: {
                    '^/': ''
                }
            }
        },
    }
}