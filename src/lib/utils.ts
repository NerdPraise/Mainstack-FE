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
  startDate?: string,
  endDate?: string
) => {
  if (!transactions || transactions.length === 0) {
    return []
  }

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  let filteredTransactions = sortedTransactions

  if (startDate && endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)
    end.setHours(23, 59, 59, 999)

    filteredTransactions = sortedTransactions.filter((tx) => {
      const txDate = new Date(tx.date)
      return txDate >= start && txDate <= end
    })
  }
  return filteredTransactions
}

export const prepareChartData = (transactions: ITransaction[]) => {
  // Group  the filtered transactions by date
  const groupedByDate = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date)
    const dateKey = formatDate(date.toISOString())

    acc.push({
      name: formatDate(transaction.date),
      uv: dateKey,
      pv: transaction.amount,
      amt: 0,
    })

    return acc
  }, [] as IChartData[])
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
