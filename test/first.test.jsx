import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
// import HomePage from '../components/HomePage'
import { Hero } from '../components/Hero';

describe('Dashboard', () => {
    it('renders a text', () => {
        render(<Hero />)

        const heading = screen.getAllByText('assecories', { level: 1 })
        expect(heading).toBeInTheDocument()
    })
})