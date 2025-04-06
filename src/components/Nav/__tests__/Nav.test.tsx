import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import Nav from '../index'

vi.mock('@/assets/mainstack-logo.svg?react', () => ({
  default: () => <div data-testid="logo">Logo</div>,
}))

vi.mock('@/assets/notifications.svg?react', () => ({
  default: () => <div data-testid="notification-icon">NotificationIcon</div>,
}))

vi.mock('@/assets/chat.svg?react', () => ({
  default: () => <div data-testid="chat-icon">ChatIcon</div>,
}))

const mockUser = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@example.com',
}

const renderNav = () => {
  return render(
    <BrowserRouter>
      <Nav user={mockUser} />
    </BrowserRouter>
  )
}

describe('Nav', () => {
  it('renders logo', () => {
    renderNav()
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })

  it('renders user initials', () => {
    renderNav()
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    renderNav()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('CRM')).toBeInTheDocument()
    expect(screen.getByText('Apps')).toBeInTheDocument()
  })

  it('renders notification and chat icons', () => {
    renderNav()
    expect(screen.getByTestId('notification-icon')).toBeInTheDocument()
    expect(screen.getByTestId('chat-icon')).toBeInTheDocument()
  })

  it('toggles menu when clicking user avatar', () => {
    renderNav()
    const userAvatar = screen.getByText('JD').closest('div')
    expect(userAvatar).toBeInTheDocument()

    expect(screen.queryByText('Settings')).not.toBeInTheDocument()

    fireEvent.click(userAvatar!)
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Purchase History')).toBeInTheDocument()
    expect(screen.getByText('Refer and Earn')).toBeInTheDocument()
    expect(screen.getByText('Integrations')).toBeInTheDocument()
    expect(screen.getByText('Report Bug')).toBeInTheDocument()
    expect(screen.getByText('Switch Account')).toBeInTheDocument()
    expect(screen.getByText('Sign Out')).toBeInTheDocument()

    // Click again to close menu
    fireEvent.click(userAvatar!)
    expect(screen.queryByText('Settings')).not.toBeInTheDocument()
  })

  it('displays user information in menu', () => {
    renderNav()
    const userAvatar = screen.getByText('JD').closest('div')
    fireEvent.click(userAvatar!)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
  })
})
