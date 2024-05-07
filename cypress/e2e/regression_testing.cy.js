// LoginPage.cy.js
describe('Login Page Visual Testing', () => {
    beforeEach(() => {
      cy.visit('https://nbad-front-one.vercel.app/login'); // Update this path as per your application's URL routing
      cy.eyesOpen({
        appName: 'YourAppName',
        testName: 'Login Page Visual Test',
      });
    });
  
    afterEach(() => {
      cy.eyesClose();
    });
  
    it('checks login page visuals', () => {
      // Take a snapshot for visual regression testing
      cy.eyesCheckWindow('Login Page');
  
      // You can also add more actions and then take snapshots at different stages
      cy.get('input#email').type('test@example.com');
      cy.get('input#password').type('password123');
      cy.eyesCheckWindow('Login Page with Filled Form');
    });
  });
  