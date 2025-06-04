module.exports = function (api) {
    api.cache(true);
    return {
        plugins: [
            "nativewind/babel",
            "@babel/plugin-proposal-export-namespace-from",
            ["react-native-reanimated/plugin", {
                "relativeSourceLocation": true,
            }],
        ],
        presets: ["babel-preset-expo"],
    };
};