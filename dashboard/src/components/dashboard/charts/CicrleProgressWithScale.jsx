import PropTypes from 'prop-types';
import { ResponsiveContainer, RadialBarChart, RadialBar, Cell, Sector, } from 'recharts';

const renderActiveShape = ({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload }, background) => {
    let end = startAngle - (startAngle - endAngle) * payload.value / (payload.total || 100);
    return (
        <g key="value">
            {payload.total ? <text x={cx} y={cy} dy={6} textAnchor="middle" fill={background}>
                <tspan fill={fill}>{payload.value}</tspan>/<tspan fill={background}>{payload.total}</tspan>
            </text> : <text x={cx} y={cy} dy={6} textAnchor="middle" fill="#999">--</text>}
            {Array.from(Array(30), (_, k) => k).map((v, i) => (
                <Sector
                    key={i}
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle - i * 8.3333}
                    endAngle={startAngle - (i + 1) * 8.3333 + 2}
                    fill={payload.total ? end > (startAngle - (i + 1) * 8.3333) ? background : fill : '#eee'}
                />
            ))}
        </g>
    )
}

const CicrleProgressWithScale = ({ total, value, background, fill }) => {
    return <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            data={[{ total, value }]}
            startAngle={215}
            endAngle={-35}
            innerRadius="70%"
            outerRadius="100%"
            fill={background}>
            <RadialBar
                activeIndex={0}
                activeShape={(props) => renderActiveShape(props, background)}
                dataKey="value"
                nameKey="name">
                <Cell key={1} fill={fill} />
            </RadialBar>
        </RadialBarChart>
    </ResponsiveContainer >
}

CicrleProgressWithScale.defaultProps = {
    total: 100,
    value: 100,
    background: '#f0f2f5',
    fill: '#0088FE',
}

CicrleProgressWithScale.propTypes = {
    total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    background: PropTypes.string,
    fill: PropTypes.string,
}

export default CicrleProgressWithScale; 
