export {}

declare global {
  interface IUser {
    first_name: string
    last_name: string
    email: string
  }
  interface IWallet {
    balance: number
    total_payout: number
    total_revenue: number
    pending_payout: number
    ledger_balance: number
  }
  interface ITransaction {
    amount: number
    metadata?: {
      name: string
      type: 'webinar' | 'coffee'
      email: string
      quantity: 1
      country: string
      product_name: string
    }
    payment_reference?: string
    status: 'successful' | 'pending' | 'failed'
    type: 'deposit' | 'withdrawal'
    date: string
  }
}
