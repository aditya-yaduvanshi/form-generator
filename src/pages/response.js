import {useEffect, useCallback, useState} from "react";
import {getResponse, getForm} from "../services";
import {useParams} from "react-router-dom";
import {Typography, Row, Col, Form} from "antd";
import {FormFillHeader, ViewQA} from "../components";

export function Response() {
  const params = useParams();
  const [response, setResponse] = useState();
  const [form, setForm] = useState();
  const [err, setErr] = useState(null);

  const fetchResponse = useCallback(
    async () => await getResponse(params.id),
    [params.id]
  );
  const fetchForm = useCallback(async (formId) => await getForm(formId), []);

  useEffect(() => {
    fetchResponse()
      .then((res) => {
        setResponse(res);
        fetchForm(res.form)
          .then((res) => setForm(res))
          .catch((err) => setErr(err));
      })
      .catch((err) => setErr(err));

    return;
  }, [fetchResponse, fetchForm]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
          height: "100%",
        }}
      >
        {form && response ? (
          <Form
            autoComplete="off"
            style={{width: "100%", maxWidth: "720px"}}
            name="ViewResponse"
          >
            <FormFillHeader title={form.title} description={form.description} />
            <Row className="FormSection" style={{marginBottom: "20px"}}>
              <Col className="FormWrap" style={{width: "100%"}}>
                {form.questions?.map((q, i) => (
                  <ViewQA
                    que={q}
                    ans={
                      response.answers?.find((a) => a.question === q.title)
                        ?.answer
                    }
                    key={`${q.title}_${i}`}
                  />
                ))}
              </Col>
            </Row>
          </Form>
        ) : null}
        {err ? (
          <Typography.Title>{err.message.toUpperCase()}</Typography.Title>
        ) : null}
      </div>
    </>
  );
}
