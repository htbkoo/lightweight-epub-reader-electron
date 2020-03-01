// jest-unit.config.js
module.exports = {
    ...require("./jest.config"),
    testPathIgnorePatterns: ["/node_modules/", "e2e"]
};