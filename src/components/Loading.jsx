import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

class Loading extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="loading">
                <Spin spinning={this.props.loading}/>
            </div>
            
        );
    }
}
export default Loading;