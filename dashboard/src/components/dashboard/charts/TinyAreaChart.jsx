
import PropTypes from 'prop-types';
import { ResponsiveContainer, AreaChart, Area, Tooltip, YAxis } from 'recharts';
import Time from 'react-time-format'

const TinyAreaChart = ({ unit, data, fill, stroke, strokeWidth, domain }) => {
    return (<ResponsiveContainer width="100%" height="100%" >
        <AreaChart data={data}>
            <Area unit={unit} type='monotone' dataKey='value' stroke={stroke} strokeWidth={strokeWidth} fillOpacity={.2} fill={fill} />
            <Tooltip content={({ active, payload, label }) => active ? !payload || payload.length <= 0 ? null : (
                <div>
                    <p> {`时间 : `} <Time value={new Date(payload[0].payload.name * 1000)} format="MM/DD HH:mm" /> </p>
                    <p>{`使用 : ${payload[0].payload.value} ${payload[0].unit}`}</p>
                </div>
            ) : null} />
            <YAxis hide domain={domain} />
        </AreaChart>
    </ResponsiveContainer>);
};

TinyAreaChart.defaultProps = {
    data: [],
    fill: '#fcf2ce',
    stroke: '#F2C306',
    strokeWidth: 2,
    domain: [0, 'auto'],
}

TinyAreaChart.propTypes = {
    data: PropTypes.array,
    fill: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number,
    domain: PropTypes.array,
}

export default TinyAreaChart; 