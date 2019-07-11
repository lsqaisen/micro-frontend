
import PropTypes from 'prop-types';
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line } from 'recharts';

const SimpleAreaChart = ({ data, tickFormatter, tooltipContent, lineOption = {} }) => {
    return <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#f0f0f0" vertical={false} />
            <XAxis
                dataKey="name"
                axisLine={{ stroke: '#E1E1E1' }}
                tickLine={false}
                tickFormatter={(v) => {
                    let time = new Date(v * 1000);
                    return `${(Array(2).join(0) + Number(time.getHours())).slice(-2)}:${(Array(2).join(0) + Number(time.getMinutes())).slice(-2)}`
                }}
            />
            <YAxis mirror
                domain={['dataMin', 'auto']}
                minTickGap={1}
                axisLine={false}
                tickLine={false}
                tickFormatter={tickFormatter}
            />
            <Tooltip content={tooltipContent} />
            {Object.keys(data[0] || {}).map((key) => key !== 'name' ? (
                <Line key={key} dot={false} type="monotone" dataKey={key} {...(lineOption[key] || {})} />
            ) : null)}
        </LineChart>
    </ResponsiveContainer >
}

SimpleAreaChart.defaultProps = {
    data: [],
    unit: '',
    dataMax: 'dataMax',
    lineOption: {},
    tickFormatter: (v) => v,
    tooltipContent: () => null,
}

SimpleAreaChart.propTypes = {
    data: PropTypes.array,
    unit: PropTypes.string,
    dataMax: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]),
    lineOption: PropTypes.object,
    tickFormatter: PropTypes.func,
    tooltipContent: PropTypes.func,
}

export default SimpleAreaChart; 