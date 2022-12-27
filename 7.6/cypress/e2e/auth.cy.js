it.skip("Should successfully login", () => {
  cy.visit("/");
  cy.login("test@test.com", "test");
  cy.contains("Добро пожаловать test@test.com").should("be.visible");
});

it.skip("Should not login with empty login", () => {
  cy.visit("/");
  cy.contains("Log in").click();
  cy.get("#mail").type(" ");
  cy.get("#pass").type("test");
  cy.contains("Submit").click();
  cy.get("#mail")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
});

it.skip("Should not login with empty password", () => {
  cy.visit("/");
  cy.contains("Log in").click();
  cy.get("#mail").type("test@test.com");
  cy.contains("Submit").click();
  cy.get("#pass")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
});

beforeEach(() => {
  cy.visit("http://localhost:3000/");
  cy.login("test@test.com", "test");
  cy.contains("Добро пожаловать").should("be.visible");
});
describe("When user add the books", () => {
  it("Should add a book", () => {
    cy.get(".p-0 > .btn").click();
    cy.get("#title").type("Портрет Дориана Грея");
    cy.get("#description").type("Детектив");
    cy.get("#authors").type("Оскар Уайлд");
    cy.contains("Submit").click();
    cy.contains("Портрет Дориана Грея").should("be.visible");
  });
  it("Should add a book to favorites", () => {
    cy.contains("Портрет Дориана Грея").contains("Add to favorite").click();
    cy.contains("Favorites").click();
    cy.contains("Портрет Дориана Грея").should("be.visible");
  });

  it("Should delete a book from favorites", () => {
    cy.contains("Books list").click();
    cy.contains("Favorites").click();
    cy.contains("Портрет Дориана Грея").contains("Delete from favorite").click();
    cy.contains("Портрет Дориана Грея").should("not.exist");
  });
});
