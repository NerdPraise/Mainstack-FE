export const mockWallet = {
  balance: 1000.0,
  ledger_balance: 2000.0,
  total_payout: 3000.0,
  total_revenue: 4000.0,
  pending_payout: 500.0,
}

export const mockTransactions = [
  {
    amount: 100,
    metadata: {
      name: 'John Doe',
      type: 'coffee',
      email: 'john@example.com',
      quantity: 1,
      country: 'USA',
      product_name: 'Coffee',
    },
    status: 'successful',
    type: 'deposit',
    date: '2024-04-06T12:00:00Z',
  },
  {
    amount: 200,
    status: 'pending',
    type: 'withdrawal',
    date: '2024-04-06T13:00:00Z',
  },
]
