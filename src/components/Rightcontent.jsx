import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

class Rightcontent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h3>企业配置</h3>
                <p>EP_ID：{this.props.ep_id}</p>
                <p>KS3访问秘钥：<span>{this.props.storage_ks3_access_key}</span></p>
                <p>KS3存储空间：<span>{this.props.storage_ks3_bucket}</span></p>
                <p>KS3区域域名：<span>{this.props.storage_ks3_endpoint}</span></p>
                <p>KS3私钥：<span>{this.props.storage_ks3_secret_key}</span></p>
            </div>
            
        );
    }
}
Rightcontent.defaultProps = {
    storage_ks3_access_key : "",
    storage_ks3_bucket : "",
    storage_ks3_endpoint : "",
    storage_ks3_secret_key : "",
};

Rightcontent.propTypes = {
    storage_ks3_access_key: PropTypes.string.isRequired,
    storage_ks3_bucket: PropTypes.string.isRequired,
    storage_ks3_endpoint: PropTypes.string.isRequired,
    storage_ks3_secret_key: PropTypes.string.isRequired,
}
export default Rightcontent;