import { render, screen } from '@testing-library/react';
import Header from "./header";

test('should', () => {
    render(<Header></Header>);
    const linkElement = screen.getByText(/learn react/i);

  expect(linkElement).toBeInTheDocument();
})