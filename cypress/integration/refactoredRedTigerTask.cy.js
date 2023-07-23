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
      //Wait until the 3 wheels stop
      cy.wait(data.waitingTimeForWheelsToStop);
      // Array to store the hrefs
      let hrefs = [];

      //This command go into every class"slot-column", takes the text of href into the first "a" (anchor) and put it into array
      cy.get(".slot-column")
        .each(($el) => {
          cy.wrap($el)
            .find("a")
            .first()
            .then(($anchor) => {
              const href = $anchor.prop("href");
              hrefs.push(href);
            });
        })
        .then(() => {
          // When all the texts are stored, compare them
          const href1 = hrefs[0];
          const href2 = hrefs[1];
          const href3 = hrefs[2];
          if (href1 !== href2 || href2 !== href3) {
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
