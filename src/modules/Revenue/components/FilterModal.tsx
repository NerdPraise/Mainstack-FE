import Button from '@/components/Button'
import MultiSelect from '@/components/MultiSelect'
import { cn } from '@/lib/utils'

interface FilterModalProps {
  isOpen: boolean
  handleClose: () => void
  onFilterChange?: (filter: string | null) => void
  isApplyButtonEnabled: boolean
  handleApplyFilters: () => void
  handleClearFilters: () => void
  handleFilterClick: (filter: string) => void
  handleTransactionTypeChange: (e: string[]) => void
  handleTransactionStatusChange: (e: string[]) => void
  handleStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  startDate: string
  endDate: string
  selectedFilter: string | null
}

const filters = [
  { name: 'Today', value: 'today' },
  { name: 'Last 7 days', value: 'seven' },
  { name: 'This Month', value: 'month' },
  { name: 'Last 3 months', value: 'last 3 months' },
]

const transactionTypes = [
  {
    label: 'Store transactions',
    value: 'store',
  },
  {
    label: 'Get tipped',
    value: 'tips',
  },
  {
    label: 'Withdrawals',
    value: 'Withdrawals',
  },
  {
    label: 'Chargebacks',
    value: 'Chargebacks',
  },
  {
    label: 'Cashbacks',
    value: 'Cashbacks',
  },
  {
    label: 'Refer & Earn',
    value: 'Refer',
  },
]

const transactionStatus = [
  {
    label: 'Successful',
    value: 'success',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Failed',
    value: 'failed',
  },
]

const FilterModal = ({
  isOpen,
  handleClose,
  isApplyButtonEnabled,
  handleApplyFilters,
  handleClearFilters,
  handleFilterClick,
  handleTransactionTypeChange,
  handleTransactionStatusChange,
  handleStartDateChange,
  handleEndDateChange,
  startDate,
  endDate,
  selectedFilter,
}: FilterModalProps) => {
  return (
    <>
      <div
        data-testid="backdrop"
        className={cn(
          'backdrop fixed top-0 bg-[#EFF1F6] opacity-50 duration-300 h-screen w-screen z-[90]',
          isOpen ? 'block' : 'hidden'
        )}
        onClick={handleClose}
      ></div>
      <div
        data-testid="filter-modal"
        className={cn(
          'children fixed h-full duration-700 z-[99] p-5 ml-auto top-0 right-0',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="content bg-white w-[470px] flex flex-col shadow-lg h-full p-5 rounded-2xl">
          <div className="title flex justify-between items-center mb-5">
            <h4 className="font-bold text-[24px]">Filter</h4>
            <span
              className="ml-auto cursor-pointer"
              onClick={handleClose}
              data-testid="close-btn"
            >
              X
            </span>
          </div>

          <div className="flex gap-x-3 mb-5">
            {filters.map((item) => (
              <div
                key={item.name}
                className={cn(
                  'text-[14px] duration-300 font-semibold hover:bg-[#EFF1F6] flex items-center justify-center px-4 py-1 border border-[#EFF1F6] cursor-pointer rounded-full',
                  selectedFilter === item.value && 'bg-[#EFF1F6]'
                )}
                onClick={() => handleFilterClick(item.value)}
              >
                {item.name}
              </div>
            ))}
          </div>

          <div className="mb-6">
            <div className="font-semibold">Date Range</div>
            <div className="flex gap-x-3 mt-2">
              <input
                type="date"
                className="border border-[#EFF1F6] rounded-full px-4 py-2 w-full"
                value={startDate}
                onChange={handleStartDateChange}
              />
              <input
                type="date"
                className="border border-[#EFF1F6] rounded-full px-4 py-2 w-full"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="font-semibold">Transaction Type</div>
            <div className="flex gap-x-3 mt-2">
              <MultiSelect
                placeholder="Filter by types"
                values={transactionTypes}
                onChange={handleTransactionTypeChange}
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="font-semibold">Transaction Status</div>
            <div className="flex gap-x-3 mt-2">
              <MultiSelect
                placeholder="Filter by status"
                values={transactionStatus}
                onChange={handleTransactionStatusChange}
              />
            </div>
          </div>

          <div className="mt-auto py-3 bottom- flex justify-between gap-x-3 justify-end">
            <Button
              variant="light"
              styles="w-full"
              onClick={handleClearFilters}
            >
              Clear
            </Button>
            <Button
              variant="dark"
              disabled={!isApplyButtonEnabled}
              styles="w-full"
              onClick={handleApplyFilters}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterModal
