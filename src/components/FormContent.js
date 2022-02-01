import {Row, Button, Col} from "antd";
import {Question} from ".";
import {useState} from "react";
import {PlusCircleOutlined} from "@ant-design/icons";

export function FormContent({onChange}) {
  const [questions, setQuestions] = useState([
    {
      name: "question_1",
      required: false,
    },
  ]);
  function addQuestion(e) {
    e.preventDefault();
    setQuestions((prev) => [
      ...prev,
      {
        name: `question_${prev.length + 1}`,
        required: false,
      },
    ]);
    onChange(questions);
  }
  function toggleRequired(que) {
    setQuestions((prev) => {
      prev.forEach((q) =>
        q.name === que.name ? (q.required = que.req) : null
      );
      return prev;
    });
    onChange(questions);
  }
  function removeQuestion(name) {
    setQuestions((prev) => prev.filter((q) => q.name !== name));
  }
  return (
    <Row className="FormSection" style={{marginBottom: "20px"}}>
      <Col className="FormWrap" style={{width: "100%"}}>
        {questions.map((q) => (
          <Question
            name={q.name}
            key={q.name}
            onRemove={removeQuestion}
            onSwitch={toggleRequired}
          />
        ))}
      </Col>
      <Col className="FormWrap" style={{width: "100%"}}>
        <Button onClick={addQuestion}>
          <PlusCircleOutlined size="large" />
          Add Question
        </Button>
      </Col>
    </Row>
  );
}

