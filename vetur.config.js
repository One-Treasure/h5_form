// vetur.config.js
module.exports = {
    // vetur配置，会覆盖vscode中的设置。  default: `{}`
    settings: {
        "vetur.useWorkspaceDependencies": true,
        "vetur.experimental.templateInterpolationService": true,
        "vetur.ignoreProjectWarning": true,
        "vetur.format.options.tabSize": 4,
        "vetur.format.options.useTabs": true,
        "vetur.format.defaultFormatterOptions": {
            "prettier": {
                "semi": false,    //不加分号
                "singleQuote": true  //用单引号
            }
        }
    },
    // 普通项目采用默认配置 default: `[{ root: './' }]`
}