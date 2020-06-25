before(() => {
  cy.login();
  cy.saveLocalStorage();
});

beforeEach(() => {
  cy.restoreLocalStorage();
});

describe("Testing basic board features", () => {
  it("Create new card", () => {
    cy.visit("https://productive-corner.netlify.app");
    cy.get("[data-cy=Backlog]");
  });

  //   it("Filling user login credentials, submit & redirecting to main app", () => {
  //     cy.visit("https://productive-corner.netlify.app");

  //     cy.get("form").within(() => {
  //       cy.get('input[name="username"]').type("testuser");
  //       cy.get('input[name="password"]').type("123456");
  //       cy.get('button[type="submit"]').click();
  //     });

  //     cy.url().should("eq", "https://productive-corner.netlify.app/");
  //   });
});
