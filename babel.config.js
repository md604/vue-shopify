module.exports = function (api) {
    api.cache(true);

    const presets = [
        [
            "@babel/preset-env",
            {
                "targets": "last 2 versions, IE 11",
                "useBuiltIns": "usage",
                "corejs": { 
                    "version": 3.2,
                    "proposals": false 
                },
                "ignoreBrowserslistConfig": true
            }
        ]
    ];

    const plugins = [
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
    ];

    return {
      presets,
      plugins
    };
}