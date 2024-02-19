/// <reference types="Cypress" />

describe("App Features", () => {
  beforeEach(() => {
    cy.visitLandingPage();
  });

  it("should display the landing page", () => {});

  it("should login", () => {
    cy.login();
  });

  it("should login with google", () => {
    // TODO
  });

  it("should logout", () => {
    cy.login();

    cy.goToDropdownMenuPage("Log out");
    cy.get("h1").contains("Welcome to One Day One Plant!");
  });
});
