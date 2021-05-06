// vue.config.js
module.exports = {
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
                target: 'http://blog.csdn.net/',
                // 允许跨域
                changeOrigin: true,
                ws: true, // 是否代理 websockets
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    }
}