Cypress.Commands.add("visitLandingPage", () => {
  cy.visit("/");
  cy.get("h1").contains("Welcome to One Day One Plant!");
});

Cypress.Commands.add("login", (username, password) => {
  cy.visitLandingPage();

  cy.get("p").contains("Log In").click();

  cy.get('[data-testid="emailOrUsername"]').type(
    username || Cypress.env("USERNAME"),
  );
  cy.get('[data-testid="password"]').type(password || Cypress.env("PASSWORD"));

  cy.get("input").contains("Log In").click();

  cy.get("h1").contains("Welcome Back!");
});

Cypress.Commands.add("goToDropdownMenuPage", (label) => {
  cy.get('[data-testid="dropdown-button"]').click();
  cy.get("button").contains(label).click();
});
