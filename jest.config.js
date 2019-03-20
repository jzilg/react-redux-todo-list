module.exports = {
    collectCoverage: false,
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/index.{js,ts,tsx}',
        '!src/redux/store.ts',
        '!src/redux/redux-devtools-extension.ts',
    ],
    moduleNameMapper: {
        '\\.(scss)$': '<rootDir>/node_modules/jest-css-modules',
        '\\.(svg)$': '<rootDir>/test/empty-module.js',
    },
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node',
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest',
    },
    setupFiles: [
        '<rootDir>/test/jest-fetch-mock.js',
        '<rootDir>/test//enzyme.config.js',
    ],
}
