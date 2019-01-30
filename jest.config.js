module.exports = {
    collectCoverage: false,
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/index.{js,tsx}',
        '!src/redux/store.ts',
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
}
