import {
  Input,
  Form,
  Row,
  Col,
  Radio,
  Space,
  Checkbox,
  Select,
  DatePicker,
  TimePicker,
  Typography,
  Slider,
} from "antd";

export function FillQuestion({ques, onSaveFile, ans}) {

  function saveFile(e){
    onSaveFile(e, ques.title);
  }

  function switchOptions() {
    switch (ques.answerType) {
      case "radio":
        return (
          <Radio.Group onChange={null} value={null} size="large" disabled={ans ? true : false} defaultValue={ans ?? ""}>
            <Space direction="vertical">
              {ques.options?.map((opt) => (
                <Radio value={opt} key={opt} checked={ans === opt}>
                  {opt}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        );
      case "checkbox":
        return (
          <Checkbox.Group onChange={null} value={null} size="large" disabled={ans ? true : false} defaultValue={ans ?? ""}>
            <Space direction="vertical">
              {ques.options?.map((opt) => (
                <Checkbox value={opt} key={opt} checked={ans?.includes(opt)}>
                  {opt}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        );
      case "dropdown":
        return (
          <Select size="large" disabled={ans ? true : false} defaultValue={ans ?? ""} value={ans ?? null}>
            {ques.options.map((opt) => (
              <Select.Option key={opt} value={opt}>
                {opt}
              </Select.Option>
            ))}
          </Select>
        );
      case "textarea":
        return <Input.TextArea rows={3} size="large" disabled={ans ? true : false} defaultValue={ans ?? ""} value={ans ?? ""} />;
      case "image":
        return <Input type="file" accept="image/jpg, image/jpeg, image/png" onChange={ans ? null : saveFile} defaultValue={ans ?? ""} value={ans ?? null} />;
      case "file":
        return (
          <Input type="file" accept=".doc, .docx, .pdf, .txt, .csv, .xsl" onChange={ans ? null : saveFile} defaultValue={ans ?? ""} />
        );
      case "date":
        return <DatePicker size="large" value={ans ?? null} defaultValue={ans ?? ""} disabled={ans ? true : false} />;
      case "time":
        return <TimePicker size="large" value={ans ?? null} defaultValue={ans ?? ""} disabled={ans ? true : false} />;
      case "range":
        return <Slider min={1} max={100} defaultValue={ans ?? 10} size="large" disabled={ans ? true : false} value={ans ?? 10} />;
      default:
        return (
          <Input type={ques.answerType} defaultValue={ans ?? ""} size="large" disabled={ans ? true : false} value={ans ?? null} />
        );
    }
  }

  return (
    <Row className="FormField">
      <Col style={{width: "100%"}}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography.Title level={4} style={{width: "100%"}}>
            {ques.title}
          </Typography.Title>
          <Form.Item
            className={["email", "number", "textarea", "text"].includes(ques.answerType) ? "FormItem" : ""}
            name={ques.title}
            required={ques.required}
            initialValue={ans ?? ""}
            style={{width: "100%", marginBottom: "0"}}
          >
            {switchOptions()}
          </Form.Item>
        </div>
      </Col>
    </Row>
  );
}
