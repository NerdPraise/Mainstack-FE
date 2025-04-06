import { useMemo } from 'react'

import WithdrawalIcon from '@/assets/withdrawal.svg?react'
import DepositIcon from '@/assets/deposit.svg?react'
import { cn, formatDate } from '@/lib/utils'

type rowData = {
  amount: number
  metadata?: {
    name: string
    type: 'webinar' | 'coffee'
    email: string
    quantity: number
    country: string
    product_name: string
  }
  payment_reference?: string
  status: 'successful' | 'pending' | 'failed'
  type: 'deposit' | 'withdrawal'
  date: string
}

interface TableProps {
  data: rowData[]
}

interface TableRowProps {
  rowData: rowData
}

const TableRow = ({ rowData }: TableRowProps) => {
  const { metadata, type, amount, date, status } = rowData

  const getIcon = (type: rowData['type']) => {
    const iconDetail = {
      deposit: {
        Icon: <DepositIcon data-testid="deposit-icon" />,
        style: 'bg-[#E3FCF2]',
      },
      withdrawal: {
        Icon: <WithdrawalIcon data-testid="withdrawal-icon" />,
        style: 'bg-[#F9E3E0]',
      },
    }[type]

    return (
      <div
        className={cn(
          'transaction--icon rounded-full flex items-center justify-center h-[48px] w-[48px] bg-green-100',
          iconDetail.style
        )}
      >
        {iconDetail.Icon}
      </div>
    )
  }

  const rowDetail = useMemo(() => {
    if (type === 'withdrawal') {
      const color = status === 'successful' ? '#1B6F3D' : '#A77A07'
      return {
        name: <span style={{ color }}>{status}</span>,
        title: 'Cash withdrawal',
      }
    }

    if (type === 'deposit') {
      if (metadata) {
        return {
          name: metadata.name,
          title:
            metadata.type === 'coffee'
              ? 'Buy me a coffee'
              : metadata.product_name,
        }
      }
    }
    return {
      name: '',
      title: '',
    }
  }, [type, metadata, status])

  return (
    <div className="row flex justify-between items-center w-full mt-[32px]">
      <div className="details justify-between flex gap-x-3">
        {getIcon(type)}
        <div>
          <p className="font-normal text-base text-[#131316] mb-[9px] capitalize">
            {rowDetail['title']}
          </p>
          <p className="font-normal text-[14px] text-[#56616B] capitalize">
            {rowDetail['name']}
          </p>
        </div>
      </div>
      <div className="numbers items-end flex flex-col">
        <p className="font-bold text-base text-[#131316] mb-[9px]">
          USD {amount}
        </p>
        <p className="font-normal text-[14px] text-[#56616B] ">
          {formatDate(date)}
        </p>
      </div>
    </div>
  )
}

const Table = ({ data }: TableProps) => {
  return (
    <div>
      {data.map((item, index) => (
        <TableRow key={index} rowData={item} />
      ))}
    </div>
  )
}
export default Table
