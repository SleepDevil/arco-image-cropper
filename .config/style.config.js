const fs = require('fs');
const path = require('path');
const { getGitRootPath } = require('arco-cli-dev-utils');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer')

/**
 * @param config {import('arco-scripts').StyleConfig}
 */
module.exports = (config) => {
    const rootConfigPath = path.resolve(getGitRootPath(), 'arco.scripts.config.js');
    if (fs.existsSync(rootConfigPath)) {
        const { style } = require(rootConfigPath);
        config = style(config) || config;
    }

    const postcssPlugins = [
        autoprefixer({ browsers: ['last 1 version'] }),
        tailwindcss,
    ];

    config.hook.beforeCompile = postcss.bind(null, postcssPlugins);

    const { umd } = require(path.resolve('package.json'));
    if (umd && umd.style) {
        const dirName = path.dirname(umd.style);
        const fileName = path.basename(umd.style);
        Object.assign(config.css.output.dist, {
            path: dirName,
            cssFileName: fileName,
            rawFileName: fileName.replace(/\.css$/, '.less'),
        });
    }
};