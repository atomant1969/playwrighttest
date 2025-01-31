/**
 * @file testSuiteConfig.ts
 * @date 2025-01-20
 * @purpose To define and organize different test suites for targeted execution.
 */

export const testSuites = {
    regression: [
        './testcases/TC001.spec.ts',
        './testcases/TC002.spec.ts',
        // Add all regression test cases
    ],
    login: [
        './testcases/TC003.spec.ts',
        './testcases/TC004.spec.ts',
        // Add all login test cases
    ],
    registration: [
        './testcases/TC005.spec.ts',
        './testcases/TC006.spec.ts',
        // Add all registration test cases
    ],
    deficit: [
        './testcases/TC007.spec.ts',
        './testcases/TC008.spec.ts',
        // Add all deficit test cases
    ],
    // Add more suites as needed
};
