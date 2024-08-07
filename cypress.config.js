const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity: false,
    baseUrl: "http://localhost:3002/",
    env: {
      USERNAME: "user1",
      PASSWORD: "Password1*",
    },
  },
});
