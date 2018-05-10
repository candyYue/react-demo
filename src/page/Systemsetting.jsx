import React from 'react';
import {
    Form, Select, Input,Radio,
    Button, message
  } from 'antd';
  const FormItem = Form.Item;
  const Option = Select.Option;
  const RadioGroup = Radio.Group;
  
  message.config({
    top: 300,
  });

  class setting extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          message.success('保存成功！！');
        }
      });
    }
    // normFile = (e) => {
    //   console.log('Upload event:', e);
    //   if (Array.isArray(e)) {
    //     return e;
    //   }
    //   return e && e.fileList;
    // }
    componentDidMount(){
      this.props.form.setFieldsValue({
          username1:"质检目录",
          username2:"结果目录",
          username3:"xml目录",
          username4:"回调地址",
          username5:"服务器域名"
      })
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="系统名称"
          >
            <span className="ant-form-text">China</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="质检目录"
            hasFeedback
          >
            {getFieldDecorator('select', {
              rules: [
                { required: true, message: 'Please select your directory!' },
              ],
            })(
              <Select placeholder="Please select a directory">
                <Option value="china">China</Option>
                <Option value="use">U.S.A</Option>
              </Select>
            )}
          </FormItem>
  
          <FormItem
            {...formItemLayout}
            label="质检目录"
          >
            {getFieldDecorator('username1', {  rules: [{
                required: true,
                message: '质检目录',
                }],
            })(
                <Input placeholder="质检目录" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="结果目录"
          >
            {getFieldDecorator('username2', {  rules: [{
                required: true,
                message: '结果目录',
                }],
            })(
                <Input placeholder="结果目录" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="xml目录"
          >
            {getFieldDecorator('username3', {  rules: [{
                required: true,
                message: 'xml目录',
                }],
            })(
                <Input placeholder="xml目录" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="回调地址"
          >
            {getFieldDecorator('username4', {  rules: [{
                required: true,
                message: '回调地址',
                }],
            })(
                <Input placeholder="回调地址" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="服务器域名"
          >
            {getFieldDecorator('username5', {  rules: [{
                required: true,
                message: '服务器域名',
                }],
            })(
                <Input placeholder="服务器域名" />
            )}
          </FormItem>
          {/* <FormItem
            {...formItemLayout}
            label="Switch"
          >
            {getFieldDecorator('switch', { valuePropName: 'checked' })(
              <Switch />
            )}
          </FormItem> */}
  
          <FormItem
            {...formItemLayout}
            label="服务器类型"
          >
            {getFieldDecorator('radio-group',{initialValue:1})(
              <RadioGroup>
                <Radio value={1}>item A</Radio>
                <Radio value={2}>item B</Radio>
                <Radio value={3}>item C</Radio>
              </RadioGroup>
            )}
          </FormItem>
  
          {/* <FormItem
            {...formItemLayout}
            label="上传文件"
          >
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                  <Icon type="upload" /> 上传文件
                </Button>
              </Upload>
            )}
          </FormItem> */}
  
          <FormItem
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">保存</Button>
          </FormItem>
        </Form>
      );
    }
  }
  
  const Systemsetting = Form.create()(setting);

export default Systemsetting;