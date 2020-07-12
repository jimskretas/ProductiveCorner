import url from "../settings";

describe("Testing LogIn-LogOut", () => {
  it("Redirecting non logged in user to login page", () => {
    cy.visit(url);
    cy.url().should("include", "/login");
  });

  it("Filling user login credentials, submit & redirecting to main app", () => {
    cy.get("form").within(() => {
      cy.get('input[name="username"]').type("testuser");
      cy.get('input[name="password"]').type("123456");
      cy.get('button[type="submit"]').click();
    });

    cy.url().should("eq", url);
  });

  it("Logging out", () => {
    cy.get('a[name="logout"]').click();
    cy.url().should("include", "/login");
  });
});
