// .env-cmdrc.js
// https://github.com/toddbluhm/env-cmd

module.exports = {
    development: {
        PORT: 3000,
        NODE_ENV: 'development',
    },
    production: {
        NODE_ENV: 'production',
    },
    test: {},
    uat: {},
};
