import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ResponsiveContainer, RadialBarChart, RadialBar, Cell, Sector, } from 'recharts';

const renderActiveShape = ({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, value }) => {
    return (
        <g key="value">
            <text x={cx} y={cy} dy={6} textAnchor="middle" fill={fill}>{`${value === -1 ? 'N/A' : `${value}%`}`}</text>
            <Sector
                cx={cx}
                cy={cy}
                cornerRadius='100%'
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={startAngle - (startAngle - endAngle) * value / 100}
                fill={fill}
            />
        </g>
    )
}

const CircleProgress = ({ value, background, fill }) => {
    return <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            data={[{ value }]}
            startAngle={90}
            endAngle={-270}
            innerRadius="80%"
            outerRadius="100%"
            fill={background}>
            <RadialBar
                ref={ref => !!ref && (ReactDOM.findDOMNode(ref).getElementsByClassName('recharts-radial-bar-background-sector')[0].style.fill = background)}
                activeIndex={0}
                activeShape={renderActiveShape}
                dataKey="value"
                nameKey="name"
                background>
                <Cell key={1} fill={fill} />
            </RadialBar>
        </RadialBarChart>
    </ResponsiveContainer >
}

CircleProgress.defaultProps = {
    value: 100,
    background: '#f0f2f5',
    fill: '#0088FE',
}

CircleProgress.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    background: PropTypes.string,
    fill: PropTypes.string,
}

export default CircleProgress; 
