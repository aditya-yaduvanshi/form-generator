import {Form, Modal, Typography, message} from "antd";
import {FormFooter, FormHeader, FormContent} from "../components";
import {useState} from "react";
import { Link } from "react-router-dom";
import {createForm} from "../services";

export function CreateForm() {
  const [state, setState] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    url: "",
    title: "",
    link: "",
  });

  const [formObj] = Form.useForm();

  function submitForm(data) {
    let options = JSON.parse(sessionStorage.getItem("AnswerOptions"));
    let ques = state.map((q) => {
      let opts = [];
      options
        .find((opt) => opt.name === `${q.name}_answeroptions`)
        .options.forEach((o) => {
          opts.push(data[o.name]);
        });

      return {
        title: data[`${q.name}_questionlabel`],
        answerType: data[`${q.name}_answertype`],
        required: q.required,
        options: opts,
      };
    });
    let form = {
      title: data.form_title,
      description: data.form_description,
      questions: ques,
    };
    createForm(form)
      .then((res) => {
        sessionStorage.clear();
        formObj.resetFields();
        let base;
        if (typeof window !== undefined) {
          base = window.location.origin;
        }
        setModal({
          open: true,
          url: `${base}/form/${res.id}`,
          title: "Share Link To Receive Responses",
          link: `/form/${res.id}`,
        });
        setState([]);
      })
      .catch((err) => err);
  }
  function saveForm(e) {
    setState(e);
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px 5%",
          height: "100%",
        }}
      >
        <Form
          autoComplete="off"
          onFinish={submitForm}
          style={{width: "100%", maxWidth: "720px"}}
          name="CreateForm"
        >
          <FormHeader />
          <FormContent onChange={saveForm} />
          <FormFooter />
        </Form>
        <Modal
          title={modal.title}
          centered
          visible={modal.open}
          onOk={() => {
            navigator.clipboard.writeText(modal.url);
            message.success("URL Copied.", 1);
          }}
          okText="Copy URL"
          onCancel={() => setModal((prev) => ({...prev, open: false}))}
        >
          <Typography.Link
            style={{
              padding: "5px 10px",
              width: "100%",
              display: "block",
              outline: "1px solid lightgray",
            }}
          >
            <Link to={modal.link}>
              {modal.url}
            </Link>
          </Typography.Link>
        </Modal>
      </div>
    </>
  );
}
