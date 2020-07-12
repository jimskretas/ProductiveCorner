import url from "../settings";

describe("Testing CardLists's delete all cards button", () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
    cy.visit(url);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it("Should not delete all cards", () => {
    cy.get("[data-cy=backlog]").within(($list) => {
      cy.get('button[data-cy="add-text-card"]').click();

      // alias so i can use the cardCount later
      cy.get(".cardContainer").its("length").as("cardCount");

      cy.get('button[data-cy="add-text-card"]').click();

      cy.get("@cardCount").then((cardCount) => {
        cy.get(".cardContainer").should("have.length", cardCount + 1);
      });

      cy.get('button[data-cy="delete-all-cards"]').click();
    });

    cy.get('button[data-cy="delete-all-cards-cancel"]').click();

    cy.get("[data-cy=backlog]").within(() => {
      cy.get("@cardCount").then((cardCount) => {
        cy.get(".cardContainer").should("have.length", cardCount + 1);
      });
    });
  });

  it("Should delete all cards", () => {
    cy.get("[data-cy=backlog]").within(() => {
      cy.get('button[data-cy="delete-all-cards"]').click();
    });

    cy.get('button[data-cy="delete-all-cards-confirm"]').click();

    cy.get("[data-cy=backlog]").within(() => {
      cy.get(".cardContainer").should("not.exist");
    });
  });
});
