module.exports = {
    collectCoverage: false,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/**/index.{js,jsx}',
        '!src/history.js',
    ],
    globals: {
        BACKEND_URL: 'http://example.com',
    },
    moduleNameMapper: {
        '\\.(scss)$': '<rootDir>/node_modules/jest-css-modules',
        '\\.(svg)$': '<rootDir>/test/empty-module.js',
    },
}
