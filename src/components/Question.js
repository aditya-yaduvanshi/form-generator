import {
  Input,
  Form,
  Row,
  Switch,
  Button,
  Col,
} from "antd";
import {useState} from "react";
import {DeleteOutlined} from "@ant-design/icons";
import {AnswerOptions, AnswerType} from ".";

export function Question({name, onRemove, onSwitch}) {
  const [answerType, setAnswerType] = useState("text");
  function handleSelect(val) {
    setAnswerType(val);
  }
  function handleClick(e) {
    e.preventDefault();
    onRemove(name);
  }
  return (
    <Row className="FormField">
      <Col style={{width: "100%"}}>
        <div
          className="FormFieldHeader"
        >
          <Form.Item
            className="FormItem FormItemTitle"
            name={`${name}_questionlabel`}
            initialValue="Question Title"
          >
            <Input size="large" className="FormInput" />
          </Form.Item>
          <AnswerType onSelect={handleSelect} name={`${name}_answertype`} />
        </div>
        <AnswerOptions type={answerType} name={`${name}_answeroptions`} />
      </Col>
      <Col
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid lightgray",
          paddingTop: "10px",
        }}
      >
        <Form.Item
          className="FormItem FormItemFooter"
          label="Required"
          name={`${name}_required`}
          style={{borderColor: "transparent", marginBottom: "0", width: "50%"}}
        >
          <Switch onChange={(req) => onSwitch({name, req})} />
        </Form.Item>
        <div style={{width: "50%", textAlign: "right"}}>
          {onRemove ? (
            <Button onClick={handleClick} className="FormFieldDelete">
              <DeleteOutlined size="large" />
            </Button>
          ) : null}
        </div>
      </Col>
    </Row>
  );
}
