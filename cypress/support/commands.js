import "cypress-localstorage-commands";

Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "https://productive-corner.herokuapp.com/api/user/login",
    body: {
      username: "testuser",
      password: "123456",
    },
  })
    .its("body")
    .then((body) => {
      console.log(body);
      cy.setLocalStorage("jwtToken", body);
    });
});
