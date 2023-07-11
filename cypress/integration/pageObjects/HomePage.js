class HomePage {
  getHomePageCompanyLogo() {
    return cy.get(".image-35");
  }
  getSpinButton() {
    return cy.get("img.spin-btn");
  }

  getFirstWheelFirstText() {
    return cy.get(
      ":nth-child(1) > .slot-column > :nth-child(1) > :nth-child(2) > .text-span-4"
    );
  }

  getFirstWheelSecondText() {
    return cy.get(
      ":nth-child(1) > .slot-column > :nth-child(1) > .tm-10 > .text-span-8"
    );
  }

  getSecondWheelFirstText() {
    return cy.get(
      ":nth-child(2) > .slot-column > :nth-child(1) > :nth-child(2) > .text-span-4"
    );
  }

  getSecondWheelSecondText() {
    return cy.get(
      ":nth-child(2) > .slot-column > :nth-child(1) > .tm-10 > .text-span-8"
    );
  }

  getThirdWheelFirstText() {
    return cy.get(
      ":nth-child(3) > .slot-column > :nth-child(1) > :nth-child(2) > .text-span-4"
    );
  }

  getThirdWheelSecondText() {
    return cy.get(
      ":nth-child(3) > .slot-column > :nth-child(1) > .tm-10 > .text-span-8"
    );
  }
}

export default HomePage;
