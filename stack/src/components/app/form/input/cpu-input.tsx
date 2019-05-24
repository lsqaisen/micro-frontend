import { PureComponent } from 'react';
import { Slider } from 'antd';
import { SliderProps } from 'antd/lib/slider';

export interface CpuInputProps extends SliderProps {
	dataSource?: number[];
}

class CpuInput extends PureComponent<CpuInputProps, any> {
	static readonly defaultProps: CpuInputProps = {
		dataSource: [500, 1000, 2000, 4000, 8000, 16000, 32000, 64000],
	}
	render() {
		const { value, dataSource, onChange } = this.props;
		const max = dataSource!.length - 1;
		return (
			<Slider
				min={0}
				max={max}
				defaultValue={0}
				value={dataSource!.indexOf(value as any)}
				marks={(() => {
					let marks: any = {};
					dataSource!.forEach((v, i) => {
						marks[i] = `${v / 1000.000}核`;
					})
					return marks;
				})()}
				tipFormatter={(v) => `${dataSource![v] / 1000}核`}
				step={null}
				onChange={(v) => onChange!(dataSource![v as any])}
			/>
		)
	}
}

export default CpuInput;