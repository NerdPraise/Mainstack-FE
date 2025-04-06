import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { IUser, ITransaction, IWallet, IChartData } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }
  return date.toLocaleDateString('en-US', options)
}

const url = 'https://fe-task-api.mainstack.io/'

export const getObject = async (
  objectUrl: string,
  settor: (e: IUser | ITransaction[] | IWallet) => void
) => {
  const response = await fetch(`${url}${objectUrl}`, { method: 'GET' })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  settor(data)
}

export const prepareFilterTransactions = (
  transactions: ITransaction[],
  filter?: string | null
) => {
  if (!transactions || transactions.length === 0) {
    return []
  }

  let filteredTransactions = transactions
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  if (filter) {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    switch (filter) {
      case 'today': {
        filteredTransactions = sortedTransactions.filter(
          (tx) => new Date(tx.date) >= today
        )
        break
      }
      case 'seven': {
        const sevenDaysAgo = new Date(today)
        sevenDaysAgo.setDate(today.getDate() - 7)
        filteredTransactions = sortedTransactions.filter(
          (tx) => new Date(tx.date) >= sevenDaysAgo
        )
        break
      }
      case 'month': {
        const firstDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        )
        filteredTransactions = sortedTransactions.filter(
          (tx) => new Date(tx.date) >= firstDayOfMonth
        )
        break
      }
      case 'last 3 months': {
        const threeMonthsAgo = new Date(today)
        threeMonthsAgo.setMonth(today.getMonth() - 3)
        filteredTransactions = sortedTransactions.filter(
          (tx) => new Date(tx.date) >= threeMonthsAgo
        )
        break
      }
    }
  }
  return filteredTransactions
}

export const prepareChartData = (transactions: ITransaction[]) => {
  // Group  the filtered transactions by date
  const groupedByDate = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date)
    const dateKey = formatDate(date.toISOString())

    if (!acc[dateKey]) {
      acc[dateKey] = {
        name: formatDate(transaction.date),
        uv: dateKey,
        pv: 0,
        amt: 0,
      }
    }

    acc[dateKey].pv += transaction.amount

    return acc
  }, {} as Record<string, IChartData>)
  if (!Object.values(groupedByDate).length) {
    // Demo data for flatlining if data doesn't exist
    return [
      { name: 'Feb 20, 2022', uv: 'Feb 20, 2022', pv: 5, amt: 0 },
      { name: 'Feb 28, 2022', uv: 'Feb 28, 2022', pv: 5, amt: 0 },
      { name: 'Mar 01, 2022', uv: 'Mar 01, 2022', pv: 5, amt: 0 },
    ]
  }
  return Object.values(groupedByDate)
}
