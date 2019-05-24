import { PureComponent } from 'react';
import { Radio } from 'antd';
import { SliderProps } from 'antd/lib/slider';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export interface MemInputProps extends SliderProps {
	dataSource?: number[];
}

class MemInput extends PureComponent<MemInputProps, any> {
	static readonly defaultProps: MemInputProps = {
		dataSource: [64, 128, 256, 512],
	}

	render() {
		const { value, dataSource, onChange, ...props } = this.props;
		return (
			<RadioGroup
				{...props}
				value={value}
				onChange={(v) => {
					onChange!(v.target.value)
				}} >
				{dataSource!.map(v => (<RadioButton key={v} value={v} > {v < 1000 ? `${v}M` : `${v / 1000}G`} </RadioButton>))}
			</RadioGroup>
		)
	}
}

export default MemInput;