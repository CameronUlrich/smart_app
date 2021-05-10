import { render, screen } from '@testing-library/react';
import App from './App';

test('check for login button', () => {

  render(<App />);
  const linkElement = screen.getByText(/Login/);
  expect(linkElement).toBeInTheDocument();
});

test('check for sign up button', () => {

  render(<App />);
  const linkElement = screen.getByText(/Sign Up/i);
  expect(linkElement).toBeInTheDocument();
});


