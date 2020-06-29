describe("Testing text cards", () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
    cy.visit("https://productive-corner.netlify.app");
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it("Create new pomodoro card", () => {
    // alias so i can use the cardCount later
    cy.get(".cardContainer").its("length").as("cardCount");

    cy.get("[data-cy=backlog]").within(() => {
      cy.get('button[title="Add a pomodoro card"]').click();
    });

    cy.get("@cardCount").then((cardCount) => {
      cy.get(".cardContainer").should("have.length", cardCount + 1);
    });
  });

  // Start the countdown
  // check if going more than 60 => 60
  // check if going less than 1 => 1
  // check if input is not a number
  // test the stop button
  it("Start the countdown", () => {
    cy.get("[data-cy=backlog]").within(() => {
      //using blur because only then it send a call to the API with new content
      cy.get("input").last().type("Hello, World").focus().blur();
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
