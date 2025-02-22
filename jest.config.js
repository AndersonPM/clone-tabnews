const nextJest = require("next/jest");

const createJestConfig = nextJest();
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/.env.jest"],
  testTimeout: 60000,
});

module.exports = jestConfig;
