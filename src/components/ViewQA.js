import { Typography, Col, Slider, Radio, Select, Image, Checkbox, Form } from "antd";

export function ViewQA({que, ans}) {

  function switchOptions () {
    switch (que.answerType) {
      case "radio":
        return (
          <Radio.Group value={ans} disabled>
            {que.options?.map(q => (
              <Radio value={q} key={q}>{q}</Radio>
            ))}
          </Radio.Group>
        )
      case "checkbox":
        return (
          <Checkbox.Group value={ans} disabled>
            {que.options?.map(q => (
              <Checkbox value={q} key={q}>{q}</Checkbox>
            ))}
          </Checkbox.Group>
        )
      case "dropdown": 
        return (
          <Select value={ans} disabled>
            {que.options?.map(q => (
              <Select.Option value={q} key={q}>{q}</Select.Option>
            ))}
          </Select>
        )
      case "image":
        return (
          <Image src={`http://localhost:5000/${ans}`} height={100} />
        )
      case "file":
        return (
          <a href={`http://localhost:5000/${ans}`}>View File</a>
        )
      case "range":
        return (
          <Slider defaultValue={ans} min={1} max={100} disabled/>
        )
      case "textarea":
        return (
          <Typography.Paragraph>{ans}</Typography.Paragraph>
        )
      case "date":
      case "time":
        return (
          <Typography.Text>{ans.split("T")[1].split(".")[0]}</Typography.Text>
        )
      case "text":
      case "number":
      case "email":
      default: 
        return (
          <Typography.Text>{ans}</Typography.Text>
        )
    }
  }

  return (
    <Col className="FormField">
      <Typography.Title level={4}>{que.title}</Typography.Title>
      <Form.Item className={
        ["radio", "checkbox", "dropdown"].includes(que.answerType) ? "" : "FormItem"
      }>
        {switchOptions()}
      </Form.Item>
    </Col>
  )
}
