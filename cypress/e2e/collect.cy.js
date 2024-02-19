describe("Collect Features", () => {
  beforeEach(() => {
    cy.visitLandingPage();
  });

  it("should display the collect page", () => {
    cy.login();

    cy.goToDropdownMenuPage("Collect");
    cy.get("h1").contains("Collect your daily plant");
  });

  it("should collect plant", async function () {
    cy.login();

    cy.goToDropdownMenuPage("Collect");
    cy.get("button").contains("Collect").click();
    cy.get('[data-testid="plant-link"]')
      .invoke("text")
      .then((txt) => {
        cy.get("a").contains("Learn more on").click();
      });
  });
});
