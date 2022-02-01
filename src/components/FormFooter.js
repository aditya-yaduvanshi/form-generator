import {Row, Button, Col} from "antd";
import {SendOutlined, ClearOutlined} from "@ant-design/icons";

export function FormFooter() {
  return (
    <Row className="FormSection">
      <Col span={12}>
        <Button htmlType="reset" size="large">
          <ClearOutlined size="large" /> Reset All
        </Button>
      </Col>
      <Col span={12} style={{textAlign: "right"}}>
        <Button type="primary" htmlType="submit" size="large">
          Submit Now <SendOutlined size="large" />
        </Button>
      </Col>
    </Row>
  );
}
