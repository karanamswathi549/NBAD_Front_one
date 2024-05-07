// LoginPage.cy.js
describe('Login Page E2E Testing', () => {
    beforeEach(() => {
      cy.visit('https://nbad-front-one.vercel.app/login'); // Update this path as per your application's URL routing
    });
  
    it('renders the login page', () => {
      cy.get('h2').contains('Login').should('be.visible');
      cy.get('label[for="email"]').should('contain.text', 'Email');
      cy.get('label[for="password"]').should('contain.text', 'Password');
      cy.get('button').contains('Login').should('be.visible');
      cy.get('a').contains('Sign Up').should('be.visible');
    });
  
    it('logs in with valid credentials', () => {
      // Mock the API call or set up your test backend accordingly
      const validEmail = 'karanamswathi37@gmail.com';
      const validPassword = '123';
  
      cy.get('input#email').type(validEmail);
      cy.get('input#password').type(validPassword);
  
      // Click the login button
      cy.get('button').contains('Login').click();
  
      // Add assertions to verify successful login
      // This can vary depending on your application's behavior after login
      // For instance, asserting the redirect to a dashboard page:
      cy.url().should('include', '/dashboard'); // Adjust the expected URL path after login
    });
  
    it('shows error message with invalid credentials', () => {
      const invalidEmail = 'invalid@example.com';
      const invalidPassword = 'wrongpassword';
  
      cy.get('input#email').type(invalidEmail);
      cy.get('input#password').type(invalidPassword);
  
      // Click the login button
      cy.get('button').contains('Login').click();
  
      // Verify the error message or any changes after login failure
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Login failed');
      });
    });
  });
  