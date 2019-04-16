import { PureComponent, Component } from 'react';
import { Select, Spin } from 'antd';
import { SelectProps } from 'antd/lib/select';
import _ from 'lodash'
const Option = Select.Option;
const OptGroup = Select.OptGroup;


interface optionType {
	key: string;
	label: string;
	disabled?: boolean;
	children?: optionType[]
}

export interface SearchSelectProps extends SelectProps {
	data?: optionType[],
	asyncSearch?: (param: any) => void
}

interface SearchSelectState {
	error?: string,
	loading: boolean,
	end: boolean,
	data: optionType[],
	nextParams?: any,
}

class SearchSelect extends (PureComponent || Component)<SearchSelectProps, SearchSelectState> {
	static readonly defaultProps = {
		data: []
	}

	state: SearchSelectState = {
		error: '',
		loading: false,
		end: false,
		data: [],
	}

	constructor(props: SearchSelectProps) {
		super(props);
		this.state.data = (props.data || []) as optionType[];
	}

	getOptions = (options: optionType[]) => {
		if (Array.isArray(options)) {
			return options.map(option => {
				if (Array.isArray(option.children)) {
					return (
						<OptGroup key={option.key} label={option.label}>
							{this.getOptions(option.children)}
						</OptGroup>
					)
				} else {
					return (
						<Option disabled={option.disabled} key={option.key} value={option.key}>{option.label}</Option>
					)
				}
			});
		}
		return null;
	}

	load = async (e:any) => {
		console.log(e)
		const { onSearch } = this.props;
		const { data: _data, nextParams } = this.state;
		this.setState({ loading: true })
		try {
			let { data, params } = await onSearch!(nextParams);
			console.log(data, 1111)
			this.setState({
				loading: false,
				nextParams: params,
				data: _data.concat(data || []),
				end: !params
			});
		} catch (error) {
			console.log(error, 1111)
			this.setState({ error, loading: false })
		}
	}

	UNSAFE_componentWillReceiveProps({ data }: SearchSelectProps) {
		const { data: _data } = this.props;
		if (data!.length !== _data!.length || data!.some(v => _data!.every(_v => v.key !== _v.key))) {
			this.setState({ data: data! })
		}
	}

	render() {
		const { onSearch, ...props } = this.props;
		const { error, loading, end, data } = this.state;
		return (
			<Select
				{...props}
				onFocus={_.debounce(this.load, 100)}
				notFoundContent={error ? <p>
					<span style={{ color: 'red' }}>{error}</span><br />
					<a onClick={this.load}>重新加载</a>
				</p> :
					'暂无数据'}
			>
				{this.getOptions(data)}
				{!loading && !end ? <Option disabled key="$nextsearch">
					<a onClick={this.load}>更多...</a>
				</Option> : []}
				{loading ? <Option disabled key="$loading"><Spin size="small" /></Option> : []}
			</Select>
		)
	}
}

export default SearchSelect;