import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FilterModal from '@/modules/Revenue/components/FilterModal'

vi.mock('@/components/MultiSelect', () => ({
  default: ({ placeholder }: { placeholder: string }) => (
    <div data-testid="multi-select">{placeholder}</div>
  ),
}))

interface FilterModalProps {
  isOpen: boolean
  handleClose: () => void
  isApplyButtonEnabled: boolean
  handleApplyFilters: () => void
  handleClearFilters: () => void
  handleFilterClick: (filter: string) => void
  handleTransactionTypeChange: (e: string[]) => void
  handleTransactionStatusChange: (e: string[]) => void
  handleStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  filterState: {
    transactionTypes: string[]
    transactionStatus: string[]
    startDate: string
    endDate: string
    selectedFilter: string | null
  }
}

describe('FilterModal', () => {
  let mockHandleClose: VoidFunction
  let mockHandleApplyFilters: VoidFunction
  let mockHandleClearFilters: VoidFunction
  let mockHandleFilterClick: (filter: string) => void
  let mockHandleTransactionTypeChange: (e: string[]) => void
  let mockHandleTransactionStatusChange: (e: string[]) => void
  let mockHandleStartDateChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
  let mockHandleEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  let defaultProps: FilterModalProps

  beforeEach(() => {
    mockHandleClose = vi.fn()
    mockHandleApplyFilters = vi.fn()
    mockHandleClearFilters = vi.fn()
    mockHandleFilterClick = vi.fn()
    mockHandleTransactionTypeChange = vi.fn()
    mockHandleTransactionStatusChange = vi.fn()
    mockHandleStartDateChange = vi.fn()
    mockHandleEndDateChange = vi.fn()

    defaultProps = {
      isOpen: true,
      handleClose: mockHandleClose,
      isApplyButtonEnabled: true,
      handleApplyFilters: mockHandleApplyFilters,
      handleClearFilters: mockHandleClearFilters,
      handleFilterClick: mockHandleFilterClick,
      handleTransactionTypeChange: mockHandleTransactionTypeChange,
      handleTransactionStatusChange: mockHandleTransactionStatusChange,
      handleStartDateChange: mockHandleStartDateChange,
      handleEndDateChange: mockHandleEndDateChange,
      filterState: {
        transactionTypes: [],
        transactionStatus: [],
        startDate: '',
        endDate: '',
        selectedFilter: null,
      },
    }
  })

  it('renders when isOpen is true', () => {
    render(<FilterModal {...defaultProps} />)
    expect(screen.getByText('Filter')).toBeInTheDocument()
  })

  it('is not visible when isOpen is false', () => {
    render(<FilterModal {...defaultProps} isOpen={false} />)
    expect(
      screen
        .queryByTestId('filter-modal')
        ?.classList.contains('translate-x-full')
    ).toBe(true)
  })

  it('renders transaction type filter', () => {
    render(<FilterModal {...defaultProps} />)
    expect(screen.getByText('Transaction Type')).toBeInTheDocument()
    expect(screen.getAllByTestId('multi-select')[0]).toHaveTextContent(
      'Filter by types'
    )
  })

  it('renders transaction status filter', () => {
    render(<FilterModal {...defaultProps} />)
    expect(screen.getByText('Transaction Status')).toBeInTheDocument()
    expect(screen.getAllByTestId('multi-select')[1]).toHaveTextContent(
      'Filter by status'
    )
  })

  it('renders filter period options', () => {
    render(<FilterModal {...defaultProps} />)
    expect(screen.getByText('Today')).toBeInTheDocument()
    expect(screen.getByText('Last 7 days')).toBeInTheDocument()
    expect(screen.getByText('This Month')).toBeInTheDocument()
    expect(screen.getByText('Last 3 months')).toBeInTheDocument()
  })

  it('renders clear and apply buttons', () => {
    render(<FilterModal {...defaultProps} />)
    expect(screen.getByText('Clear')).toBeInTheDocument()
    expect(screen.getByText('Apply')).toBeInTheDocument()
  })

  it('calls handleClose when clicking the close button', () => {
    render(<FilterModal {...defaultProps} />)
    const closeButton = screen.getByTestId('close-btn')
    fireEvent.click(closeButton)
    expect(mockHandleClose).toHaveBeenCalledTimes(1)
  })

  it('calls handleClose when clicking the backdrop', () => {
    render(<FilterModal {...defaultProps} />)
    const backdrop = screen.getByTestId('backdrop')
    fireEvent.click(backdrop)
    expect(mockHandleClose).toHaveBeenCalledTimes(1)
  })

  it('applies button is disabled by default', () => {
    render(<FilterModal {...defaultProps} isApplyButtonEnabled={false} />)
    const applyButton = screen.getByText('Apply')
    expect(applyButton).toBeDisabled()
  })
})
