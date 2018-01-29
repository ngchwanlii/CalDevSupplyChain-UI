import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { ItemForm } from './ItemForm';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Icon,
  Input,
  Row,
  Select,
  Table,
} from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

// const columns = [
//   {
//     title: 'Color',
//     dataIndex: 'color',
//   },
//   {
//     title: 'Description',
//     dataIndex: 'description',
//   },
//   {
//     title: 'Fabric',
//     dataIndex: 'fabric',
//   },
//   {
//     title: 'XS',
//     dataIndex: 'xs',
//   },
//   {
//     title: 'S',
//     dataIndex: 's',
//   },
//   {
//     title: 'M',
//     dataIndex: 'm',
//   },
//   {
//     title: 'L',
//     dataIndex: 'l',
//   },
//   {
//     title: 'Action',
//     dataIndex: 'action',
//     render: (text, record) => {
//       return this.state.dataSource.length > 1 ? (
//         <Popconfirm
//           title="Sure to delete?"
//           onConfirm={() => this.onDelete(record.key)}
//         >
//           <a href="#">Delete</a>
//         </Popconfirm>
//       ) : null;
//     },
//   },
// ];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const ItemHeader = props => {
  const { items } = props;
  const length = items.length;
  return length > 0 ? (
    <div>
      <Divider />
      {`Items (${length})`}
      <Divider />
    </div>
  ) : null;
};

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable ? (
      <Input
        style={{ margin: '-5px 0' }}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    ) : (
      value
    )}
  </div>
);

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '25%',
        render: (text, record) => this.renderColumns(text, record, 'name'),
      },
      {
        title: 'age',
        dataIndex: 'age',
        width: '15%',
        render: (text, record) => this.renderColumns(text, record, 'age'),
      },
      {
        title: 'address',
        dataIndex: 'address',
        width: '40%',
        render: (text, record) => this.renderColumns(text, record, 'address'),
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editable } = record;
          return (
            <div className="editable-row-operations">
              {editable ? (
                <span>
                  <a onClick={() => this.save(record.key)}>Save</a>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.edit(record.key)}>Edit</a>
              )}
            </div>
          );
        },
      },
    ];
    this.state = { data };
    this.cacheData = data.map(item => ({ ...item }));
  }

  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }

  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }

  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }

  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }

  render() {
    return (
      <div>
        <h1>
          Item Table Title: Added item put into table below: (need to continue
          here){' '}
        </h1>
        <Table bordered dataSource={this.state.data} columns={this.columns} />
      </div>
    );
  }
}

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class OrderForms extends PureComponent {
  state = {
    visible: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        // this.props.dispatch({
        //   type: 'form/submitRegularForm',
        //   payload: values,
        // });
      }
    });
  };

  handleRemoveItem = targetField => {
    const { form } = this.props;
    const items = form.getFieldValue('items');
    if (items.length === 1) {
      return;
    }
    // can use data-binding to set
    form.setFieldsValue({
      items: items.filter(item => item !== targetField),
    });
  };

  handleAddItem = item => {
    const { form } = this.props;

    const items = form.getFieldValue('items');
    const nextItems = items.concat(item);
    form.setFieldsValue({
      items: nextItems,
    });
  };

  handleOpenItemModal = () => {
    this.setState({ visible: true });
  };

  handleCancelItemModal = () => {
    this.setState({ visible: false });
  };

  handleCreateItem = () => {
    const form = this.form;

    form.validateFieldsAndScroll((err, itemValues) => {
      if (err) {
        return;
      }

      const quantity = {};
      console.log('BEFORE Received item values from Item Modal: ', itemValues);
      ['XS', 'S', 'M', 'L'].map(key => {
        console.log('check key', key);
        quantity[key] = itemValues[key];
        console.log('check inner quantity[key]: ', quantity);
        delete itemValues[key];
      });

      console.log('check inner quantity: ', quantity);
      const newItemValues = {
        ...itemValues,
        quantity: { ...quantity },
      };

      console.log('AFTER Received item values from Item Modal: ', itemValues);
      console.log('AFTER Received newItemValues: ', newItemValues);
      // on create order page
      this.handleAddItem(newItemValues);

      form.resetFields();

      this.setState({ visible: false });
    });
  };

  saveItemFormRef = form => (this.form = form);

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 2 },
        sm: { span: 2 },
        md: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 22 },
        sm: { span: 22 },
        md: { span: 22 },
      },
    };

    const addItemButtonLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 2, offset: 10 },
      },
    };

    /** Items array part **/
    getFieldDecorator('items', { initialValue: [] });
    const items = getFieldValue('items');

    const orderItems = items.map((item, i) => {
      return (
        <div key={i}>
          <h1>{`Item ${i}`}</h1>
          {items.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={items.length === 1}
              onClick={() => this.handleRemoveItem(item)}
            />
          ) : null}
        </div>
      );
    });

    return (
      <PageHeaderLayout title="Create New Order" content="">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            // style={{ marginTop: 50, backgroundColor: 'red' }}
            style={{ marginTop: 50 }}
          >
            <FormItem {...formItemLayout} label="Order SKU" hasFeedback>
              {getFieldDecorator('sku', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter order SKU',
                  },
                ],
              })(<Input placeholder="Enter order SKU" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Order Notes">
              {getFieldDecorator('orderNote', {
                rules: [
                  {
                    required: false,
                    message: 'Please enter order notes',
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="(Optional) Please enter any order notes that want us to take care of."
                  rows={4}
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Currency" hasFeedback>
              {getFieldDecorator('currency', {
                rules: [
                  { required: true, message: 'Please select your currency!' },
                ],
              })(
                <Select placeholder="Please select a currency">
                  <Option value="USD">USD</Option>
                  <Option value="GBP">GBP</Option>
                </Select>,
              )}
            </FormItem>
            <ItemHeader items={items} />
            <EditableTable />
            {orderItems}
            <FormItem {...addItemButtonLayout}>
              <Button
                type="dashed"
                onClick={this.handleOpenItemModal}
                style={{ width: '100%' }}
              >
                <Icon type="plus" /> Add Item
              </Button>
              <ItemForm
                ref={this.saveItemFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancelItemModal}
                onCreate={this.handleCreateItem}
              />
            </FormItem>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              style={{ width: '100%' }}
            >
              Submit
            </Button>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
