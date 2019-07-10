import { PureComponent } from 'react';
import { Select, Spin } from 'antd';
import { SelectProps } from 'antd/lib/select';
import InfiniteScroll from '../infinite-scroller/';
import styles from './style/index.less'

const Option = Select.Option;
const OptGroup = Select.OptGroup;

export type OptionType = {
	key: string;
	value?: any;
	label: any;
	disabled?: boolean;
	children?: OptionType[]
}

export interface SearchSelectProps extends SelectProps {
	pageStart?: number;
	initialLoad?: boolean;
	threshold?: number;
	height?: number;
	asyncSearch: (page: number, callback: (res: { results: OptionType[], total: number }) => void) => any;
}

class SearchSelect extends PureComponent<SearchSelectProps, any> {
	static readonly defaultProps = {
		pageStart: 0,
		initialLoad: false,
		threshold: 200,
		height: 250,
	}

	state = {
		total: Infinity,
		data: [] as OptionType[],
		loading: false,
		hasMore: true,
	}

	getOptions = (options: OptionType[]) => {
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
						<Option disabled={option.disabled} key={option.key} value={option.value || option.key}>{option.label}</Option>
					)
				}
			});
		}
		return null;
	}

	handleInfiniteOnLoad = (page: number) => {
		let { total, data } = this.state;
		const { asyncSearch } = this.props;
		this.setState({
			loading: true,
		});
		if (data.length >= total!) {
			this.setState({
				hasMore: false,
				loading: false,
			});
			return;
		}
		asyncSearch!(page, res => {
			data = data.concat(res.results);
			this.setState({
				data,
				total: res.total,
				loading: false,
			});
		})
	};

	componentDidMount() {
		this.handleInfiniteOnLoad(0)
	}

	render() {
		const { height, pageStart, initialLoad, threshold, className, ...props } = this.props;
		const { loading, hasMore, data } = this.state;
		return (
			<Select
				{...props}
				className={`${styles[`search-select`]} ${className}`}
				notFoundContent={loading ? (
					<div className={styles[`infinite-loading`]}>
						<Spin size="small" />
					</div>
				) : '暂无数据'}
				dropdownRender={(menuNode, props) => {
					return (
						<div className={styles[`infinite-container`]} style={{ maxHeight: height }}>
							<InfiniteScroll
								initialLoad={initialLoad}
								threshold={threshold}
								pageStart={pageStart}
								loadMore={this.handleInfiniteOnLoad}
								hasMore={!loading && hasMore}
								useWindow={false}
							>
								{menuNode}
								{loading && data.length > 0 && <div key="infinite-loading" className={styles[`infinite-loading`]}>
									<Spin size="small" />
								</div>}
							</InfiniteScroll>
						</div >
					)
				}}
			>
				{this.getOptions(data)}
			</Select>
		)
	}
}

export default SearchSelect;