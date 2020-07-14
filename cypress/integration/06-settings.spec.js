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

  it("Modal should open and close with cancel", () => {
    cy.get('button[name="settings"]').click();
    cy.get('button[name="cancel"]').click();
    cy.get('button[name="cancel"]').should("not.exist");
  });

  it("User can change list limit from settings", () => {
    cy.get("[data-cy=doing]").within(() => {
      cy.get('button[title="Add a pomodoro card"]').click();
      cy.get('button[title="Add a text card"]').click();
    });

    cy.get('button[name="settings"]').click();
    // doing has already 2 cards, so user can't put less than that
    cy.get("input[name='doing']").type("{selectall}").type(1);
    cy.get("input[name='doing']").should("have.value", "2");

    cy.get("input[name='doing']").type("{selectall}").type(3);
    cy.get("input[name='doing']").should("have.value", "3");

    cy.get('button[name="save"]').click();
    cy.get("[data-cy=doing]").contains("Doing(2/3)");
  });

  it("User can change session length from settings", () => {
    cy.get('button[name="settings"]').click();

    cy.get("input[name='work']").type("{selectall}").type(26);
    cy.get("input[name='work']").should("have.value", "26");

    cy.get('button[name="save"]').click();
    cy.get("[data-cy=doing]").within(() => {
      cy.get('button[title="Add a pomodoro card"]').click();
      cy.get("input").last().should("have.value", "26");
    });
  });

  it("User can restore default settings", () => {
    cy.get('button[name="settings"]').click();
    cy.get('button[name="restoreDefaults"]').click();

    cy.get('button[name="settings"]').click();
    cy.get("input[name='backlog']").should("have.value", "10");
    cy.get("input[name='todo']").should("have.value", "5");
    cy.get("input[name='doing']").should("have.value", "2");
    cy.get("input[name='done']").should("have.value", "10");
    cy.get("input[name='work']").should("have.value", "25");
    cy.get("input[name='break']").should("have.value", "5");

    cy.get('button[name="cancel"]').click();

    cy.get("[data-cy=doing]").within(() => {
      cy.get('button[data-cy="delete-all-cards"]').click();
    });
    cy.get('button[data-cy="delete-all-cards-confirm"]').click();
  });
});
