import url from "../settings";

describe("Testing text cards", () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
    cy.visit(url);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it("Create new text card", () => {
    // alias so i can use the cardCount later
    cy.get(".cardContainer").its("length").as("cardCount");

    cy.get("[data-cy=backlog]").within(() => {
      cy.get('button[title="Add a text card"]').click();
    });

    cy.get("@cardCount").then((cardCount) => {
      cy.get(".cardContainer").should("have.length", cardCount + 1);
    });
  });

  it("Write text to a card", () => {
    cy.get("[data-cy=backlog]").within(() => {
      //using blur because only then it send a call to the API with new content
      cy.get("input").last().type("Hello, World").focus().blur();
    });
  });

  it("Delete text card", () => {
    cy.get(".cardContainer").its("length").as("cardCount");

    cy.get("[data-cy=backlog]").within(() => {
      // need to use force because button is not visible
      cy.get('button[aria-label="delete-card"]').last().click({ force: true });
    });

    cy.get("@cardCount").then((cardCount) => {
      cy.get(".cardContainer").should("have.length", cardCount - 1);
    });
  });
});
