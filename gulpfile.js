const { watch, parallel } = require('gulp');
const themeKit = require('@shopify/themekit');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

function uploadFilesToShopify(fileNames) {
    return themeKit.command('deploy', {
                files: fileNames,
                env: 'prod'
            }).catch((err) => {
                console.log('Oops. Something is wrong =>', err);
            });
}

function compileScripts(cb) {
    webpack(webpackConfig, async (err, stats) => {
        if (err) {
            cb(err);
        }
        if (stats.hasErrors()) {
            cb(new Error(stats.compilation.errors.join('\n')));
        }
        const compiledFiles = Object.keys(stats.compilation.assets).map(file => `assets/${file}`);
        await uploadFilesToShopify(compiledFiles);
        cb();
    });
}

async function sendToServer(path, stats) {
    let destination = path.slice(4); // remove 'src/' from the path as it does not exist on the server side
    await uploadFilesToShopify(new Array(destination));
}

function watchNonScriptFiles() {
    // js|scss|sass|map|css - files created by webpack in the asset folder.
    watch(['src/**/*', '!src/**/*.+(js|vue|scss|sass|map|css)']).on('change', sendToServer);
}

function watchScriptFiles() {
    return watch(['src/assets/*.+(js|vue|scss|sass)', '!src/assets/theme.js'], compileScripts);
}

function uploadFilesToProdTheme() {
    return themeKit.command('deploy', {
        env: 'prod'
    });
}

function help(cb) {
    console.log('\x1b[32m%s\x1b[0m','The list of available commands:');
    console.log('deploy - uploads all theme files to the server');
    console.log('watch - watches for changes, compiles files and uploads them to the server');
    cb();
}
  
exports.default = help;
exports.help = help;
exports.deploy = uploadFilesToProdTheme;
exports.watch = parallel(watchNonScriptFiles,watchScriptFiles);