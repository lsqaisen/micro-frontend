import { ResponsiveContainer, BarChart, Bar, ReferenceLine, XAxis, YAxis, Tooltip } from 'recharts';

function simplify(number) {
    if (number / 1000 / 1000 / 1000 >= 1) {
        return {
            value: number / 1000 / 1000 / 1000,
            unit: 'G',
        }
    } else if (number / 1000 / 1000 >= 1) {
        return {
            value: number / 1000 / 1000,
            unit: 'M',
        }
    } else if (number / 1000 >= 1) {
        return {
            value: number / 1000,
            unit: 'K',
        }
    } else if (number / 1000 < 1) {
        return {
            value: number,
            unit: '',
        }
    }
}

const PositiveAndNegativeBarChart = ({ top, bottom, data, fills = ['#FACC14', '#13C2C2'] }) => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div style={{ width: '100%', height: 'calc(50% - 20px)' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart syncId="anyId" barCategoryGap="30%" data={data} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                        <XAxis dataKey="name" hide />
                        <YAxis axisLine={false} tickLine={false} tickFormatter={v => {
                            let data = simplify(v);
                            return `${data.value}${data.unit}`
                        }} />
                        <ReferenceLine y={0} />
                        <Tooltip content={() => null} />
                        <Bar dataKey={top} fill={fills[0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div style={{ width: '100%', height: 'calc(50% + 20px)' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart syncId="anyId" barCategoryGap="30%" data={data} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tickFormatter={v => v.length > 4 ? `${v.slice(0, 3)}...` : v} />
                        <YAxis reversed axisLine={false} tickLine={false} tickFormatter={v => {
                            let data = simplify(v);
                            return `${data.value}${data.unit}`
                        }} />
                        <ReferenceLine y={0} />
                        <Tooltip
                            content={({ payload, ...props }) => {
                                if (payload.length <= 0) return null;
                                let topData = simplify(payload[0].payload[top]),
                                    bottomData = simplify(payload[0].payload[bottom]);
                                return (
                                    <div style={{ marginTop: '-45px', position: 'relative', backgroundColor: '#fff', padding: '8px', border: '1px solid #ccc', zIndex: '9999999' }}>
                                        <h3>{payload[0].payload.name}</h3>
                                        <p style={{ color: fills[0] }}>
                                            {top}：{`${topData.value.toFixed(4)}${top === 'cpu' ? '(核)' : `(${topData.unit})`}`}
                                        </p>
                                        <p style={{ color: fills[1] }}>
                                            {bottom}：{`${bottomData.value.toFixed(4)}${bottom === 'cpu' ? '(核)' : `(${bottomData.unit})`}`}
                                        </p>
                                    </div>
                                )
                            }} />
                        <Bar dataKey={bottom} fill={fills[1]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default PositiveAndNegativeBarChart;