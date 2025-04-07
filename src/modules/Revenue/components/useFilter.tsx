import { useState, useCallback } from 'react'

export const useFilter = (
  handleClose: () => void,
  onFilterChange?: (filter: string | null) => void
) => {
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<
    string[]
  >([])
  const [selectedTransactionStatus, setSelectedTransactionStatus] = useState<
    string[]
  >([])
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

  const handleTransactionTypeChange = useCallback((selectedItems: string[]) => {
    setSelectedTransactionTypes(selectedItems)
  }, [])

  const handleTransactionStatusChange = useCallback(
    (selectedItems: string[]) => {
      setSelectedTransactionStatus(selectedItems)
    },
    []
  )

  const handleStartDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setStartDate(e.target.value)
    },
    []
  )

  const handleEndDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEndDate(e.target.value)
    },
    []
  )

  const handleFilterClick = useCallback(
    (filterValue: string) => {
      const newFilter = selectedFilter === filterValue ? null : filterValue
      setSelectedFilter(newFilter)
    },
    [selectedFilter]
  )

  const handleClearFilters = useCallback(() => {
    setSelectedTransactionTypes([])
    setSelectedTransactionStatus([])
    setStartDate('')
    setEndDate('')
    setSelectedFilter(null)
    onFilterChange?.(null)
  }, [onFilterChange])

  const handleApplyFilters = useCallback(() => {
    onFilterChange?.(selectedFilter)
    handleClose()
  }, [selectedFilter, handleClose, onFilterChange])

  // Determine if the Apply button should be enabled
  const isApplyButtonEnabled = !!(
    selectedTransactionTypes.length > 0 ||
    selectedTransactionStatus.length > 0 ||
    (startDate && endDate) ||
    selectedFilter !== null
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
    endDate,
    startDate,
    selectedFilter,
  }
}
