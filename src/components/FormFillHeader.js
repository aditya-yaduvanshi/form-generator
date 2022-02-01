import {Row, Col, Typography} from "antd";

export function FormFillHeader({title, description}) {
  return (
    <Row className="FormSection">
      <Col className="FormField" style={{width: "100%"}}>
        <Typography.Title>{title}</Typography.Title>
        <Typography.Paragraph>{description}</Typography.Paragraph>
      </Col>
    </Row>
  );
}