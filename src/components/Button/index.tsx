import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  variant: 'dark' | 'light'
  onClick?: VoidFunction
  styles?: string
  disabled?: boolean
}

const variantClass = {
  dark: 'bg-black text-white hover:bg-[#373737]',
  light: 'bg-[#EFF1F6] text-black',
}

const Button = ({
  children,
  variant,
  disabled,
  onClick,
  styles,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'bg-black cursor-pointer duration-700 text-white py-4 rounded-full h-[52px] w-[168px]',
        variantClass[variant],
        styles,
        disabled &&
          'bg-[#DBDEE5] hover:bg-inherit cursor-not-allowed text-white'
      )}
    >
      {children}
    </button>
  )
}
export default Button
