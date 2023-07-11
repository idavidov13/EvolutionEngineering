class AgeVerificationPage {
  visitHomeUrl() {
    return cy.visit("https://www.redtiger.com");
  }
  getAgeVerifiengMessage() {
    return cy.get("h4.heading-16.pop-up-text");
  }
  getDateField() {
    return cy.get("#day-3");
  }

  getMonthField() {
    return cy.get("#month-3");
  }

  getYearField() {
    return cy.get("#year-3");
  }

  getEnterButton() {
    return cy.contains("a", "enter");
  }
}

export default AgeVerificationPage;
