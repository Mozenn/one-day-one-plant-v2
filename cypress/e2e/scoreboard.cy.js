describe("Scoreboard Features", () => {
  beforeEach(() => {
    cy.visitLandingPage();
  });

  it("should display the scoreboard page", () => {
    cy.login();

    cy.goToDropdownMenuPage("Scoreboard");
    cy.get("h1").contains("Scoreboard");
  });

  it("should hide user when filtering", () => {
    cy.login();

    cy.goToDropdownMenuPage("Scoreboard");
    cy.get("td").contains("user1").should("exist");
    cy.get('[data-testid="filter-button"]').click();
    cy.get('[data-testid="username-filter"]').type("?");
    cy.get("td").should("not.exist");
  });
});
