import { Component } from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce'

class EqualRatioBox extends Component {
    constructor(props) {
        super(props);
        [`setSize`]
            .forEach(m => this[m] = this[m].bind(this));
        this.setSize = debounce(this.setSize, 10);
    }

    setSize() {
        const { type = 'width', ratio = 1, ratioWidth = 0 } = this.props;
        let box = ReactDOM.findDOMNode(this.refs.box);
        if (!!box && type === 'width') {
            box.style.height = `${Math.round(((box.clientWidth - ratioWidth) * ratio) / 10) * 10}px`;
        } else {
            if (!box || !box.clientHeight || box.clientHeight <= 0) {
                this.setSize();
                return;
            }
            box.style.width = `${Math.round(((box.clientHeight - ratioWidth) * ratio) / 10) * 10}px`;
        }
    }

    resize() {
        window.addEventListener('resize', this.setSize);
    }

    componentDidMount() {
        this.setSize();
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setSize);
    }

    render() {
        const { className, children } = this.props;
        return (
            <div className={className} style={{ width: '100%', height: '100%' }} ref="box">
                {children}
            </div>
        )
    }
}

export default EqualRatioBox; 