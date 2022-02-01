import {Form, Typography} from "antd";
import {FormFooter, FormFillContent, FormFillHeader} from "../components";
import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {getForm, createResponse} from "../services";


export function FillForm() {
  const params = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState();
  const [err, setErr] = useState(null);
  const [files, setFiles] = useState([]);

  const fetchForm = useCallback(async () => {
    return await getForm(params.id);
  }, [params.id]);

  useEffect(() => {
    fetchForm()
      .then((res) => setForm(res))
      .catch((err) => setErr(err));
    return;
  }, [fetchForm]);

  function saveFile (e, title) {
    setFiles(state => {
      let i = state.findIndex(q => q.title === title);
      if(i >= 0){
        state[i].files = e.target.files;
      } else {
        state.push({title, files: e.target.files});
      }
      return state;
    });
  }

  function submitForm(data) {
    let response = {
      form: params.id,
      answers: [...Object.entries(data).map(q => ({question: q[0], answer: q[1]}))],
    };

    createResponse(response, files)
      .then(res => {
        sessionStorage.clear();
        navigate(`/response/${res.id}`, {state: {form: params.id}});
      })
      .catch(err => setErr(err));
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
          height: "100%"
        }}
      >
        {form ? (
          <Form
            autoComplete="off"
            onFinish={submitForm}
            style={{width: "100%", maxWidth: "720px"}}
            name="FillForm"
          >
            <FormFillHeader
              title={form.title}
              description={form.description}
            />
            <FormFillContent questions={form.questions} onSaveFile={saveFile} />
            <FormFooter />
          </Form>
        ) : null}
        {err ? (
          <Typography.Title>{err.message.toUpperCase()}</Typography.Title>
        ) : null}
      </div>
    </>
  );
}
