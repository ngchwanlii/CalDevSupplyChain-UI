import {Col, Form, Input, InputNumber, Modal, Row} from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

export const ItemForm = Form.create()(props => {
  const { visible, onCancel, onCreate, form } = props;
  const { getFieldDecorator } = form;

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10, offset: 1 },
  };

  return (
    <Modal
      visible={visible}
      title="Create a new item"
      okText="Create"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout="vertical">
        <FormItem label="Color">
          {getFieldDecorator('color', {
            rules: [
              {
                required: true,
                message: 'Please enter the color choice!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Fabric">
          {getFieldDecorator('fabric', {
            rules: [
              {
                required: true,
                message: 'Please enter the fabric type!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Description">
          {getFieldDecorator('description')(
            <TextArea
              style={{ minHeight: 32 }}
              placeholder="(Optional) Please enter any item notes that want us to take care of."
              rows={4}
            />,
          )}
        </FormItem>
        <Row>
          {['XS', 'S', 'M', 'L'].map((size, i) => {
            return (
              <Col key={size+i} xs={24} md={6}>
                <FormItem {...formItemLayout} key={size} label={`${size}:`}>
                  {getFieldDecorator(size, { initialValue: 0 })(
                    <InputNumber size="small" min={0}/>,
                  )}
                </FormItem>
              </Col>
            );
          })}
        </Row>
      </Form>
    </Modal>
  );
});
