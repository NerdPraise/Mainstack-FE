import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FilterModal from '@/modules/Revenue/components/FilterModal'

vi.mock('@/components/MultiSelect', () => ({
  default: ({ placeholder }: { placeholder: string }) => (
    <div data-testid="multi-select">{placeholder}</div>
  ),
}))

describe('FilterModal', () => {
  let mockHandleClose: VoidFunction

  beforeEach(() => {
    mockHandleClose = vi.fn()
  })

  it('renders when isOpen is true', () => {
    render(<FilterModal isOpen={true} handleClose={mockHandleClose} />)
    expect(screen.getByText('Filter')).toBeInTheDocument()
  })

  it('is not visible when isOpen is false', () => {
    render(<FilterModal isOpen={false} handleClose={mockHandleClose} />)
    expect(
      screen
        .queryByTestId('filter-modal')
        ?.classList.contains('translate-x-full')
    ).toBe(true)
  })

  // it('renders date range inputs', () => {
  //   render(<FilterModal isOpen={true} handleClose={mockHandleClose} />)
  //   const dateInputs = screen.getAllByRole('textbox')
  //   expect(dateInputs).toHaveLength(2)
  // })

  it('renders transaction type filter', () => {
    render(<FilterModal isOpen={true} handleClose={mockHandleClose} />)
    expect(screen.getByText('Transaction Type')).toBeInTheDocument()
    expect(screen.getAllByTestId('multi-select')[0]).toHaveTextContent(
      'Filter by types'
    )
  })

  it('renders transaction status filter', () => {
    render(<FilterModal isOpen={true} handleClose={mockHandleClose} />)
    expect(screen.getByText('Transaction Status')).toBeInTheDocument()
    expect(screen.getAllByTestId('multi-select')[1]).toHaveTextContent(
      'Filter by status'
    )
  })

  it('renders filter period options', () => {
    render(<FilterModal isOpen={true} handleClose={mockHandleClose} />)
    expect(screen.getByText('Today')).toBeInTheDocument()
    expect(screen.getByText('Last 7 days')).toBeInTheDocument()
    expect(screen.getByText('This Month')).toBeInTheDocument()
    expect(screen.getByText('Last 3 months')).toBeInTheDocument()
  })

  it('renders clear and apply buttons', () => {
    render(<FilterModal isOpen={true} handleClose={mockHandleClose} />)
    expect(screen.getByText('Clear')).toBeInTheDocument()
    expect(screen.getByText('Apply')).toBeInTheDocument()
  })

  it('calls handleClose when clicking the close button', () => {
    render(<FilterModal isOpen={true} handleClose={mockHandleClose} />)
    const closeButton = screen.getByTestId('close-btn')
    fireEvent.click(closeButton)
    expect(mockHandleClose).toHaveBeenCalledTimes(1)
  })

  it('calls handleClose when clicking the backdrop', () => {
    render(<FilterModal isOpen={true} handleClose={mockHandleClose} />)
    const backdrop = screen.getByTestId('backdrop')
    fireEvent.click(backdrop)
    expect(mockHandleClose).toHaveBeenCalledTimes(1)
  })

  // it('applies button is disabled by default', () => {
  //   render(<FilterModal isOpen={true} handleClose={mockHandleClose} />)
  //   const applyButton = screen.getByText('Apply')
  //   expect(applyButton).toBeDisabled()
  // })
})
