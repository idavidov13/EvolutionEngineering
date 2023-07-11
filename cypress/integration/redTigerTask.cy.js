//Testing is performed on Google Chrome browser, Version 114.0.5735.199 (Official Build) (64-bit)

/// <reference types="Cypress" />

import AgeVerificationPage from "./pageObjects/AgeVerificationPage";
import HomePage from "./pageObjects/homePage";

describe("Automation task for technical interview for Evolution Engineering ", function () {
  let ageVerificationPage;
  let homePage;
  before(function () {
    //runs once before all tests in the block
    //set the data to Cypress.env

    cy.fixture("example").then(function (data) {
      Cypress.env("data", data);

      //Creating objects from AgeVerificationPage object file and HomePage object file
      ageVerificationPage = new AgeVerificationPage();
      homePage = new HomePage();

      //open the app URL
      ageVerificationPage.visitHomeUrl();
    });
  });

  it("Successful Age Verification and spin the wheels, until 3 equal elements are shown", function () {
    // Get the data from Cypress.env
    const data = Cypress.env("data");

    //Assert if we are on the right page
    ageVerificationPage
      .getAgeVerifiengMessage()
      .should("contain", "Before you enter, please verify your age.");

    //Enter valid data from  data file (it is stored into fixtures/example.json)
    ageVerificationPage.getDateField().type(data.validDate);
    ageVerificationPage.getMonthField().type(data.validMonth);
    ageVerificationPage.getYearField().type(data.validYear);
    ageVerificationPage.getEnterButton().click();

    //Verify that the age verification successfully passed
    homePage.getHomePageCompanyLogo().should("be.visible");

    //Creating a function that will perform spinning the wheels and checking if there is a match between the three wheels
    function spinUntilWin() {
      //Spin Button is covered by another element, se we can use click({force: true}) command
      homePage.getSpinButton().click({ force: true });

      //Creating 6 variables, that will store the texts from the three different wheels
      let firstWheelFirstText = "";
      let firstWheelSecondText = "";
      let secondWheelFirstText = "";
      let secondWheelSecondText = "";
      let thirdWheelFirstText = "";
      let thirdWheelSecondText = "";

      //Wait until the 3 wheels stop
      cy.wait(data.waitingTimeForWheelsToStop);

      //Take the two lines with text from every wheel and store them into previously defined variables
      homePage.getFirstWheelFirstText().then(($element) => {
        firstWheelFirstText = $element.text();
      });

      homePage.getFirstWheelSecondText().then(($element) => {
        firstWheelSecondText = $element.text();
      });

      homePage.getSecondWheelFirstText().then(($element) => {
        secondWheelFirstText = $element.text();
      });

      homePage.getSecondWheelSecondText().then(($element) => {
        secondWheelSecondText = $element.text();
      });

      homePage.getThirdWheelFirstText().then(($element) => {
        thirdWheelFirstText = $element.text();
      });

      homePage.getThirdWheelSecondText().then(($element) => {
        thirdWheelSecondText = $element.text();
      });

      //Due to asynchronous architecture of Cypress, I use a very short wait in order to Cypress complete the .then() promise whit the actual values
      cy.wait(data.shortWaitngTime).then(() => {
        //First check is with the top row. If there is any difference, the function is run again
        if (
          firstWheelFirstText !== secondWheelFirstText ||
          secondWheelFirstText !== thirdWheelFirstText
        ) {
          // If we didn't win, call the function again recursively.
          spinUntilWin();
        }
        //If First check find all three first rows to be the same, there is a second check.The Second check is with the bottom row. If there is any difference, the function is run again
        else if (
          firstWheelSecondText !== secondWheelSecondText ||
          secondWheelSecondText !== thirdWheelSecondText
        ) {
          spinUntilWin();
        }
      });
    }

    //Here, we call the function
    spinUntilWin();

    //Assertion we have three matching wheels
    //Top row
    homePage
      .getFirstWheelFirstText()
      .invoke("text")
      .then((text1) => {
        homePage
          .getSecondWheelFirstText()
          .invoke("text")
          .then((text2) => {
            homePage
              .getThirdWheelFirstText()
              .invoke("text")
              .then((text3) => {
                expect(text1).to.eq(text2);
                expect(text2).to.eq(text3);
              });
          });
      });

    //Bottom row
    homePage
      .getFirstWheelSecondText()
      .invoke("text")
      .then((text1) => {
        homePage
          .getSecondWheelSecondText()
          .invoke("text")
          .then((text2) => {
            homePage
              .getThirdWheelSecondText()
              .invoke("text")
              .then((text3) => {
                expect(text1).to.eq(text2);
                expect(text2).to.eq(text3);
              });
          });
      });
  });
});
