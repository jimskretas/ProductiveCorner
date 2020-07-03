import url from "../settings";

describe("Testing CardLists's card count limits", () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
    cy.visit(url);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it("Should not be able to exceed the card limit", () => {
    // alias so i can use the cardCount later
    cy.get(".cardContainer").its("length").as("cardCount");

    // for (let i = 0; i < 3; i++) {
    cy.get("[data-cy=doing]").within(() => {
      cy.get('button[title="Add a pomodoro card"]').click();
      cy.get('button[title="Add a text card"]').click();
      cy.get('button[title="Add a pomodoro card"]').click();
    });
    // }

    cy.get("@cardCount").then((cardCount) => {
      // only 2 cards should be created, doing list has a limit of 2 cards
      cy.get(".cardContainer").should("have.length", cardCount + 2);
      cy.get("[data-cy=doing]").contains("Doing(2/2)");
    });

    //delete the cards that just created
    cy.get("[data-cy=doing]").within(() => {
      // need to use force because button is not visible
      cy.get('button[aria-label="delete-card"]').last().click({ force: true });
      cy.get('button[aria-label="delete-card"]').last().click({ force: true });
    });

    cy.get("@cardCount").then((cardCount) => {
      cy.get(".cardContainer").should("have.length", cardCount);
    });
  });
});
