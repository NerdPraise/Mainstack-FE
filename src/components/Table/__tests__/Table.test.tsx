import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react/pure'
import Table from '../index'

const mockData = [
  {
    amount: 100,
    metadata: {
      name: 'John Doe',
      type: 'coffee' as const,
      email: 'john@example.com',
      quantity: 1,
      country: 'USA',
      product_name: 'Coffee',
    },
    status: 'successful' as const,
    type: 'deposit' as const,
    date: '2024-04-06T12:00:00Z',
  },
  {
    amount: 200,
    status: 'pending' as const,
    type: 'withdrawal' as const,
    date: '2024-04-07T13:00:00Z',
  },
]

describe('Table', () => {
  it('renders table with data', () => {
    render(<Table data={mockData} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('USD 100')).toBeInTheDocument()
    expect(screen.getByText('USD 200')).toBeInTheDocument()
    expect(screen.debug).toMatchSnapshot()
  })

  it('renders deposit row with metadata', () => {
    render(<Table data={[mockData[0]]} />)

    const icon = screen.getByTestId('deposit-icon')
    expect(icon).toBeInTheDocument()

    expect(screen.getByText('Buy me a coffee')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders withdrawal row', () => {
    render(<Table data={[mockData[1]]} />)

    const icon = screen.getByTestId('withdrawal-icon')
    expect(icon).toBeInTheDocument()
    expect(screen.getByText('Cash withdrawal')).toBeInTheDocument()
    expect(screen.getByText('pending')).toBeInTheDocument()
  })

  it('formats date correctly', () => {
    render(<Table data={mockData} />)
    expect(screen.getByText('Apr 06, 2024')).toBeInTheDocument()
  })

  it('handles empty data array', () => {
    render(<Table data={[]} />)
    expect(screen.queryByRole('row')).not.toBeInTheDocument()
  })

  it('renders correct status colors', () => {
    const dataWithDifferentStatuses = [
      {
        ...mockData[1],
        status: 'successful' as const,
      },
      {
        ...mockData[1],
        status: 'failed' as const,
      },
    ]

    render(<Table data={dataWithDifferentStatuses} />)

    const successfulStatus = screen.getByText('successful')
    const failedStatus = screen.getByText('failed')

    expect(successfulStatus).toHaveStyle({ color: '#1B6F3D' })
    expect(failedStatus).toHaveStyle({ color: '#A77A07' })
  })

  it('renders deposit with webinar type', () => {
    const webinarData = [
      {
        ...mockData[0],
        metadata: {
          ...mockData[0].metadata!,
          type: 'webinar' as const,
          product_name: 'Webinar Title',
          quantity: 1 as const,
        },
      },
    ]

    render(<Table data={webinarData} />)
    expect(screen.getByText('Webinar Title')).toBeInTheDocument()
  })
})
