import { Component } from 'react';
import { WebSocketTerm } from '_global';

class Log extends Component {
    constructor(props) {
        super(props);
        this.url = `ws://${window.location.host !== 'localhost:8080' && window.location.host !== '127.0.0.1:8080' ? window.location.host : '192.168.34.182:30000'}/service/installnode/api/logs/ws`;
    }

    render() {
        const { location: { query } } = this.props
        return (
            <WebSocketTerm url={this.url} request={JSON.stringify(query)} />
        )
    }
}

export default Log;