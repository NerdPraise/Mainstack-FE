import { LineChart as RLC, Line, XAxis, ResponsiveContainer } from 'recharts'

const LineChart = ({
  data,
  width,
  height,
}: {
  data: { name: string; uv: number | string; pv: number; amt: number }[]
  width: number | string
  height: number | string
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <RLC data={data}>
        <Line type="monotone" dataKey="pv" stroke="#FF5403" dot={false} />
        <XAxis
          dataKey="uv"
          interval={0}
          axisLine={{ stroke: '#DBDEE5' }}
          tickLine={false}
          tick={(props) => (
            <CustomLineTick {...props} dataLength={data.length} />
          )}
        />
      </RLC>
    </ResponsiveContainer>
  )
}
export default LineChart

const CustomLineTick = ({
  payload,
  index,
  dataLength,
  ...props
}: {
  x: number
  y: number
  payload: { value: string }
  index: number
  dataLength: number
}) => {
  const isFirst = index === 0
  const isLast = index === dataLength - 1

  if (!isFirst && !isLast) return null

  return (
    <text
      {...props}
      y={props.y + 12}
      fill="#5E6C84"
      fontSize={14}
      textAnchor={isFirst ? 'start' : isLast ? 'end' : 'middle'}
    >
      {payload.value}
    </text>
  )
}
