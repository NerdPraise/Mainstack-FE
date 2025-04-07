import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router'

import Revenue from '@/modules/Revenue'
import { StoreProvider } from '@/StoreProvider'
import { mockTransactions, mockWallet } from './constants'

vi.mock('@/assets/chevro-down.svg?react', () => ({
  default: () => <div data-testid="chevro-down-icon">ChevroDownIcon</div>,
}))

vi.mock('@/assets/export.svg?react', () => ({
  default: () => <div data-testid="export-icon">ExportIcon</div>,
}))

vi.mock('@/assets/info.svg?react', () => ({
  default: () => <div data-testid="info-icon">InfoIcon</div>,
}))

vi.mock('@/components/LineChart', () => ({
  default: () => <div data-testid="line-chart">LineChart</div>,
}))

vi.mock('@/components/Table', () => ({
  default: () => <div data-testid="transactions-table">Table</div>,
}))

vi.mock('@/layout/SidebarLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

vi.mock('@/lib/utils', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/lib/utils')>()
  return {
    ...original,
    getObject: vi.fn((key, setter) => {
      if (key === 'wallet') {
        setter(mockWallet)
      } else if (key === 'transactions') {
        setter(mockTransactions)
      }
    }),
  }
})

const renderRevenue = () => {
  return render(
    <BrowserRouter>
      <StoreProvider>
        <Revenue />
      </StoreProvider>
    </BrowserRouter>
  )
}

describe('Revenue Module', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders available balance section', async () => {
    renderRevenue()
    expect(screen.getByText('Available Balance')).toBeInTheDocument()
    expect(screen.getByText('Withdraw')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('USD 1000.00')).toBeInTheDocument()
    })
  })

  it('renders line chart', () => {
    renderRevenue()
    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
  })

  it('renders ledger details', () => {
    renderRevenue()
    expect(screen.getByText('Ledger Balance')).toBeInTheDocument()
    expect(screen.getByText('Total Payout')).toBeInTheDocument()
    expect(screen.getByText('Total Revenue')).toBeInTheDocument()
    expect(screen.getByText('Pending Payout')).toBeInTheDocument()
  })

  it('renders transactions section', () => {
    renderRevenue()
    expect(
      screen.getByText(`${mockTransactions.length} Transactions`)
    ).toBeInTheDocument()
    expect(
      screen.getByText('Your transactions for the last 7 days')
    ).toBeInTheDocument()
  })

  it('renders filter and export buttons', () => {
    renderRevenue()
    expect(screen.getByTestId('filter')).toBeInTheDocument()
    expect(screen.getByText('Export list')).toBeInTheDocument()
  })

  it('renders transactions table', () => {
    renderRevenue()
    expect(screen.getByTestId('transactions-table')).toBeInTheDocument()
  })

  it('opens filter modal when filter button is clicked', () => {
    renderRevenue()
    const filterButton = screen.getByTestId('filter')
    fireEvent.click(filterButton)
    expect(screen.getByText('Transaction Type')).toBeInTheDocument()
  })
})
