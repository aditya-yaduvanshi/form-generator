import {Row, Form, Input, Col} from "antd";

export function FormHeader() {
  return (
    <Row className="FormSection">
      <Col className="FormField" style={{width: "100%"}}>
        <Form.Item
          name="form_title"
          style={{width: "100%", marginBottom: "10px"}}
          className="FormItem"
          initialValue="Form Title"
          key="form_title"
        >
          <Input
            type="text"
            className="FormInput"
            size="large"
            placeholder="Form Title"
          />
        </Form.Item>
        <Form.Item
          name="form_description"
          style={{width: "100%", margin: "0"}}
          className="FormItem"
          initialValue="Form Description"
          key="form_description"
        >
          <Input.TextArea
            rows={1}
            className="FormInput"
            size="large"
            placeholder="Form Description"
          />
        </Form.Item>
      </Col>
    </Row>
  );
}


