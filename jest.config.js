
module.exports = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    globals: {
        'ts-jest': {
            isolatedModules: false,
        },
    },
    preset: 'ts-jest',
    roots: ['./src/tests'],
    testEnvironment: 'node',
    testMatch: [
        "**/?(*.)+(spec|test).[t]s?(x)"
    ]
};
