import { useContext, useEffect, useMemo, useState } from 'react'

import Button from '@/components/Button'
import ReceiptIcon from '@/assets/receipt.svg?react'
import LineChart from '@/components/LineChart'
import Table from '@/components/Table'
import { StoreContext } from '@/StoreProvider'
import {
  getObject,
  prepareChartData,
  prepareFilterTransactions,
} from '@/lib/utils'
import DashboardLayout from '@/layout/SidebarLayout'
import FilterModal from './components/FilterModal'
import { IWallet, ITransaction, IChartData } from '@/types'

import ChevroDownIcon from '@/assets/chevro-down.svg?react'
import ExportIcon from '@/assets/export.svg?react'
import InfoIcon from '@/assets/info.svg?react'
import { useFilter } from './components/useFilter'

const Revenue = () => {
  const {
    wallet,
    transactions,
    actions: { setWallet, setTransactions },
  } = useContext(StoreContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    getObject('wallet', (data) => setWallet(data as IWallet))
    getObject('transactions', (data) => setTransactions(data as ITransaction[]))
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  const {
    isApplyButtonEnabled,
    handleApplyFilters,
    handleClearFilters,
    handleFilterClick,
    handleTransactionTypeChange,
    handleTransactionStatusChange,
    handleStartDateChange,
    handleEndDateChange,
    filters,
    activeFiltersCount,
  } = useFilter(handleClose)

  const filteredTransaction = useMemo(
    () =>
      prepareFilterTransactions(
        transactions,
        filters.startDate,
        filters.endDate
      ),
    [transactions, filters]
  )

  const chartData = useMemo(() => {
    return prepareChartData(filteredTransaction) as IChartData[]
  }, [filteredTransaction])

  const ledgerDetails = useMemo(
    () => [
      { title: 'Ledger Balance', amount: wallet?.ledger_balance, info: '' },
      { title: 'Total Payout', amount: wallet?.total_payout, info: '' },
      { title: 'Total Revenue', amount: wallet?.total_revenue, info: '' },
      { title: 'Pending Payout', amount: wallet?.pending_payout, info: '' },
    ],
    [wallet]
  )
  return (
    <DashboardLayout>
      <div className="mt-[140px] w-[80%] mx-auto relative">
        <section className="account flex w-full items-center gap-x-4 justify-between">
          <div className="available w-full">
            <div className="flex w-full max-w-md justify-between items-center mb-[32px]">
              <div>
                <p className="text-[#56616B]">Available Balance</p>
                <p className="font-bold text-[36px]">
                  USD {wallet?.balance?.toFixed(2)}
                </p>
              </div>
              <Button
                variant="dark"
                styles="py-4 rounded-full h-[52px] w-[168px]"
              >
                Withdraw
              </Button>
            </div>
            <div className="w-full">
              <LineChart width="95%" height={400} data={chartData} />
            </div>
          </div>
          <div className="detail basis-[36%]">
            {ledgerDetails.map((item) => {
              return (
                <div
                  key={`${item.title}${item.info}`}
                  className="w-full mb-[32px]"
                >
                  <div className="mb-4 flex justify-between items-center">
                    <p className="text-[#56616B] font-normal text-[14px]">
                      {item.title}
                    </p>
                    <span className="cursor-pointer">
                      <InfoIcon />
                    </span>
                  </div>
                  <div className="font-bold text-[28px]">
                    USD {item.amount?.toFixed(2)}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
        <section className="transactions w-full my-[42px]">
          <div className="header pb-[25px] border-[#EFF1F6] border-b-[1px] flex justify-between items-center w-full">
            <div>
              <h4 className="font-bold text-[24px] text-black">
                {filteredTransaction?.length} Transactions
              </h4>
              <p className="font-normal text-[14px] text-[#56616B]">
                Your transactions for the last 7 days
              </p>
            </div>
            <div className="table--btns flex gap-x-3">
              <Button
                variant="light"
                styles="font-semibold w-[107px]"
                onClick={() => setIsOpen(true)}
              >
                <span data-testid="filter">Filter</span>
                {activeFiltersCount > 0 && (
                  <span className="ml-1 bg-[#131316] text-white text-[12px] rounded-full w-4 h-4 flex items-center justify-center font-light">
                    {activeFiltersCount}
                  </span>
                )}
                <ChevroDownIcon className="inline ml-2" fill={'#131316'} />
              </Button>
              <Button variant="light" styles="font-semibold w-[130px]">
                <span>Export list</span>
                <ExportIcon className="inline ml-2" />
              </Button>
            </div>
          </div>
          {!!filteredTransaction.length && (
            <Table
              data-testid="transactions-table"
              data={filteredTransaction}
            />
          )}
          {!filteredTransaction.length && (
            <div className="flex justify-center mt-14">
              <div className="max-w-md w-full">
                <div className="icon bg-linear-[130deg] from-[#DBDEE6] from-[ 1.89%%] to-[#F6F7F9] to-[98.77%] rounded-xl h-[48px] w-[48px] bg-green-100 flex items-center justify-center mb-[31px]">
                  <ReceiptIcon />
                </div>
                <h4 className="font-bold text-[24px] text-black mb-3">
                  No matching transaction found for the selected filter
                </h4>
                <p className="font-normal text-[14px] text-[#56616B] mb-5">
                  Change your filters to see more results, or add a new product.
                </p>
                <Button variant="light" onClick={handleClearFilters}>
                  Clear Filter
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
      {/* Modal */}
      <FilterModal
        isOpen={isOpen}
        handleClose={handleClose}
        isApplyButtonEnabled={isApplyButtonEnabled}
        handleApplyFilters={handleApplyFilters}
        handleClearFilters={handleClearFilters}
        handleFilterClick={handleFilterClick}
        handleTransactionTypeChange={handleTransactionTypeChange}
        handleTransactionStatusChange={handleTransactionStatusChange}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        filterState={filters}
      />
    </DashboardLayout>
  )
}
export default Revenue
