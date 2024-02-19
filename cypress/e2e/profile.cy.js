describe("Profile Features", () => {
  beforeEach(() => {
    cy.visitLandingPage();
  });

  it("should display the profile page", () => {
    cy.login();

    cy.goToDropdownMenuPage("Profile");
    cy.get("h2").contains("Collection");
  });

  it("should change profile picture", () => {
    cy.login();

    cy.goToDropdownMenuPage("Profile");
    cy.get('[data-testid="profile-picture"]').trigger("mouseover");
    cy.get('[data-testid="edit-profile-picture-button"]').click();

    cy.get('[data-testid="profile-picture-selection-2"]').click();
  });
});
