import {Row, Col} from "antd";
import {FillQuestion} from ".";


export function FormFillContent ({questions, onSaveFile, answers}) {
  return (
    <Row className="FormSection" style={{marginBottom: "20px"}}>
      <Col className="FormWrap" style={{width: "100%"}}>
        {questions?.map((q, i) => (
          <FillQuestion
            ques={q}
            ans={answers?.find(a => a?.question === q.title)?.answer}
            key={`${q.title}_${i}`}
            onSaveFile={onSaveFile}
          />
        ))}
      </Col>
    </Row>
  )
}