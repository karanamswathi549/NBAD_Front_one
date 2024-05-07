import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import LoginPage from './LoginPage';

// Mock the useAuth hook
jest.mock('../contexts/authContext', () => ({
  useAuth: () => ({
    login: jest.fn().mockResolvedValueOnce(),
  }),
}));

test('renders the Login form', () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  // Check if form components are rendered
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByText(/Don't have an account/i)).toBeInTheDocument();
});

test('handles user input and login function', async () => {
  const loginMock = jest.fn().mockResolvedValue();
  jest.mock('../contexts/authContext', () => ({
    useAuth: () => ({
      login: loginMock,
    }),
  }));

  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  // Simulate user input for email and password
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

  // Click the login button
  fireEvent.click(screen.getByText(/Login/i));

  // Verify that the login function was called with the right data
  expect(loginMock).toHaveBeenCalledWith({
    email: 'karanamswathi37@gmail.com',
    password: '123',
  });
});

test('handles login failure gracefully', async () => {
  const loginMock = jest.fn().mockRejectedValue(new Error('Login failed'));
  jest.mock('../contexts/authContext', () => ({
    useAuth: () => ({
      login: loginMock,
    }),
  }));

  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'wrong@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpassword' } });

  fireEvent.click(screen.getByText(/Login/i));

  // Expect error handling to be called in case of a login failure
  expect(loginMock).toHaveBeenCalledWith({
    email: 'wrong@example.com',
    password: 'wrongpassword',
  });
  // No direct verification of error handling here due to console output
});
