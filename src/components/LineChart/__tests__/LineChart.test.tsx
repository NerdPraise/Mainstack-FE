import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render } from '@testing-library/react'
import LineChart from '../index'

const { ResizeObserver } = window

const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page A', uv: 500, pv: 2400, amt: 2400 },
  { name: 'Page A', uv: 100, pv: 2400, amt: 2400 },
  { name: 'Page A', uv: 800, pv: 2400, amt: 2400 },
]

beforeEach(() => {
  delete (window as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver
  window.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
})

afterEach(() => {
  window.ResizeObserver = ResizeObserver
  vi.restoreAllMocks()
})

describe('LineChart', () => {
  it('renders with default props', () => {
    const { container } = render(
      <LineChart width={500} height={300} data={data} />
    )
    expect(container).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('renders with percentage dimensions', () => {
    const { container } = render(
      <LineChart width="100%" height="100%" data={data} />
    )
    expect(container).toBeInTheDocument()
  })

  it('renders with numeric dimensions', () => {
    const { container } = render(
      <LineChart width={1000} height={600} data={data} />
    )
    expect(container).toBeInTheDocument()
  })

  it('renders ResponsiveContainer with correct props', () => {
    const { container } = render(
      <LineChart width={500} height={300} data={data} />
    )
    const responsiveContainer = container.querySelector(
      '.recharts-responsive-container'
    )
    expect(responsiveContainer).toBeInTheDocument()
  })

  it('renders LineChart with correct data', () => {
    const { container } = render(
      <LineChart width={500} height={300} data={data} />
    )
    const lineChart = container.querySelector('.recharts-line')
    expect(lineChart).toBeInTheDocument()
  })

  it('renders XAxis with correct props', () => {
    const { container } = render(
      <LineChart width={500} height={300} data={data} />
    )
    const xAxis = container.querySelector('.recharts-xAxis')
    expect(xAxis).toBeInTheDocument()
  })
})
