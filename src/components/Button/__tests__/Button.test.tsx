import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../index'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button variant="dark">Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
    expect(button).toHaveClass('bg-black')
    expect(button).toHaveClass('text-white')
    expect(screen.debug).toMatchSnapshot()
  })

  it('renders with light variant', () => {
    render(<Button variant="light">Light Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-[#EFF1F6]')
    expect(button).toHaveClass('text-black')
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(
      <Button variant="dark" onClick={handleClick}>
        Click me
      </Button>
    )
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom styles', () => {
    render(
      <Button variant="dark" styles="custom-class">
        Styled Button
      </Button>
    )
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('handles disabled state', () => {
    render(
      <Button variant="dark" disabled>
        Disabled Button
      </Button>
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('bg-[#DBDEE5]')
    expect(button).toHaveClass('cursor-not-allowed')
  })

  it('maintains base styles when disabled', () => {
    render(
      <Button variant="dark" disabled>
        Disabled Button
      </Button>
    )
    const button = screen.getByRole('button')
    expect(button).toHaveClass('rounded-full')
    expect(button).toHaveClass('h-[52px]')
    expect(button).toHaveClass('w-[168px]')
  })

  it('renders children correctly', () => {
    render(
      <Button variant="dark">
        <span>Complex</span> <strong>Content</strong>
      </Button>
    )
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Complex Content')
  })
})
