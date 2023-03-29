import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from '../components/Message'

// a passing test (create these)
test('renders placeholder', () => {
  const message = 'Welcome!'

  render(<App message={message} />)

  const element = screen.getByText(message)

  expect(element).toBeInTheDocument()
})

// a failing test (not these)
// test('renders placeholder (not)', () => {
//   const message = 'Welcome!'

//   render(<App message={message} />)

//   const element = screen.getByText('Goodbye!')

//   expect(element).toBeInTheDocument()
// })
