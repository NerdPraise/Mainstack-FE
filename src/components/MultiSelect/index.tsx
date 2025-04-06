import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import ChevroDownIcon from '@/assets/chevro-down.svg?react'

interface ISelectProps {
  values: {
    label: string
    value: string
  }[]
  placeholder?: string
  onChange?: (selectedItems: string[]) => void
}
const MultiSelect = ({ values, placeholder, onChange }: ISelectProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const handleSelectChange = (value: string) => {
    let newSelectedItems: string[]
    if (!selectedItems.includes(value)) {
      newSelectedItems = [...selectedItems, value]
    } else {
      const referencedArray = [...selectedItems]
      const indexOfItemToBeRemoved = referencedArray.indexOf(value)
      referencedArray.splice(indexOfItemToBeRemoved, 1)
      newSelectedItems = referencedArray
    }
    setSelectedItems(newSelectedItems)
    onChange?.(newSelectedItems)
  }

  const isOptionSelected = (value: string): boolean => {
    return selectedItems.includes(value) ? true : false
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-full px-4 py-3 justify-between items-center cursor-pointer rounded-xl h-[48px] flex gap-2 font-bold bg-[#EFF1F6] border border-[#EFF1F6] font-medium text-[14px] text-left">
            <span className="max-w-sm truncate">
              {selectedItems.length
                ? selectedItems.join(', ')
                : placeholder || 'Select Values'}
            </span>
            <span>
              <ChevroDownIcon />
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="shadow-lg bg-white w-[314px] border-none z-[100] px-4 py-4"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {values.map((value: ISelectProps['values'][0], index: number) => {
            return (
              <DropdownMenuCheckboxItem
                onSelect={(e) => e.preventDefault()}
                key={index}
                checked={isOptionSelected(value.label)}
                onCheckedChange={() => handleSelectChange(value.label)}
                className="font-semibold text-base cursor-pointer text-[#131316] hover:bg-[#EFF1F6] rounded-xl  items-center justify-between px-4 py-3"
              >
                {value.label}
              </DropdownMenuCheckboxItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default MultiSelect
