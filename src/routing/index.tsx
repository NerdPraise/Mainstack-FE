import { createBrowserRouter } from 'react-router'

import App from '@/App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
])

export default router
