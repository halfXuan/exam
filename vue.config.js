module.exports = {
    publicPath: './',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://localhost:3030/api/', //对应自己的接口
                target: 'http://www.heyidangao.com:8092/api/', //对应自己的接口

                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}