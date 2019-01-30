module.exports = {
    collectCoverage: false,
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/index.{js,jsx,ts,tsx}',
        '!src/redux/store.ts',
    ],
    moduleNameMapper: {
        '\\.(scss)$': '<rootDir>/node_modules/jest-css-modules',
        '\\.(svg)$': '<rootDir>/test/empty-module.js',
    },
}
