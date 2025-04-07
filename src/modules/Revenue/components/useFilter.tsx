import { useState, useCallback, useMemo } from 'react'

interface FilterState {
  transactionTypes: string[]
  transactionStatus: string[]
  startDate: string
  endDate: string
  selectedFilter: string | null
}

export const useFilter = (handleClose: () => void) => {
  const [filters, setFilters] = useState<FilterState>({
    transactionTypes: [],
    transactionStatus: [],
    startDate: '',
    endDate: '',
    selectedFilter: null,
  })

  const handleTransactionTypeChange = useCallback((selectedItems: string[]) => {
    setFilters((prev) => ({
      ...prev,
      transactionTypes: selectedItems,
    }))
  }, [])

  const handleTransactionStatusChange = useCallback(
    (selectedItems: string[]) => {
      setFilters((prev) => ({
        ...prev,
        transactionStatus: selectedItems,
      }))
    },
    []
  )

  const handleStartDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({
        ...prev,
        startDate: e.target.value,
      }))
    },
    []
  )

  const handleEndDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({
        ...prev,
        endDate: e.target.value,
      }))
    },
    []
  )

  const handleFilterClick = useCallback(
    (filterValue: string) => {
      const newFilter =
        filters.selectedFilter === filterValue ? null : filterValue

      if (newFilter) {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        const formattedEndDate = today.toISOString().split('T')[0]

        let startDateValue = ''

        switch (newFilter) {
          case 'today':
            startDateValue = formattedEndDate
            break
          case 'seven': {
            const sevenDaysAgo = new Date(today)
            sevenDaysAgo.setDate(today.getDate() - 7)
            startDateValue = sevenDaysAgo.toISOString().split('T')[0]
            break
          }
          case 'month': {
            const firstDayOfMonth = new Date(
              today.getFullYear(),
              today.getMonth(),
              1
            )
            startDateValue = firstDayOfMonth.toISOString().split('T')[0]
            break
          }
          case 'last 3 months': {
            const threeMonthsAgo = new Date(today)
            threeMonthsAgo.setMonth(today.getMonth() - 3)
            startDateValue = threeMonthsAgo.toISOString().split('T')[0]
            break
          }
        }

        setFilters((prev) => ({
          ...prev,
          selectedFilter: newFilter,
          startDate: startDateValue,
          endDate: formattedEndDate,
        }))
      } else {
        setFilters((prev) => ({
          ...prev,
          selectedFilter: null,
          startDate: '',
          endDate: '',
        }))
      }
    },
    [filters.selectedFilter]
  )

  const handleClearFilters = useCallback(() => {
    setFilters({
      transactionTypes: [],
      transactionStatus: [],
      startDate: '',
      endDate: '',
      selectedFilter: null,
    })
  }, [])

  const handleApplyFilters = useCallback(() => {
    handleClose()
  }, [handleClose])

  const activeFiltersCount = useMemo(() => {
    let count = 0

    if (filters.transactionTypes.length > 0) {
      count += 1
    }
    if (filters.transactionStatus.length > 0) {
      count += 1
    }
    if (filters.startDate && filters.endDate) {
      count += 1
    }
    if (filters.selectedFilter) {
      count += 1
    }

    return count
  }, [filters])

  const isApplyButtonEnabled = !!(
    filters.transactionTypes.length > 0 ||
    filters.transactionStatus.length > 0 ||
    (filters.startDate && filters.endDate) ||
    filters.selectedFilter !== null
  )

  return {
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
  }
}
