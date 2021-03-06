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

  it("Create new pomodoro card", () => {
    // alias so i can use the cardCount later
    cy.get(".cardContainer").its("length").as("cardCount");

    cy.get("[data-cy=backlog]").within(() => {
      cy.get('button[data-cy="add-pomodoro-card"]').click();
    });

    cy.get("@cardCount").then((cardCount) => {
      cy.get(".cardContainer").should("have.length", cardCount + 1);
    });
  });

  it("New pomodoro cards should have value 25", () => {
    cy.get("[data-cy=backlog]").within(() => {
      cy.get("input").last().should("have.value", "25");
    });
  });

  it("Pomodoro cards should allow values between 1-60", () => {
    cy.get("[data-cy=backlog]").within(() => {
      cy.get("input").last().type("{selectall}").type(1);
      cy.get("input").last().should("have.value", "1");
      cy.get("input").last().type("{selectall}").type(-1);
      cy.get("input").last().should("have.value", "1");
      cy.get("input").last().type("{selectall}").type(25);
      cy.get("input").last().should("have.value", "25");
    });
  });

  it("Testing start/stop button", () => {
    cy.get("[data-cy=backlog]").within(() => {
      cy.get("button[aria-label='start-stop']").last().click();
      cy.get(".cardContainer")
        .last()
        .within(() => {
          cy.get("input").should("not.exist");
        });

      cy.get("button[aria-label='start-stop']").last().click();
      cy.get(".cardContainer")
        .last()
        .within(() => {
          cy.get("input").should("exist");
        });
    });
  });

  it("Delete pomodoro card", () => {
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
