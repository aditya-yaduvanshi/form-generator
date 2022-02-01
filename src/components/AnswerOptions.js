import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Slider,
} from "antd";
import {
  AlignLeftOutlined,
  LineOutlined,
  FileOutlined,
  FileImageOutlined,
  CheckSquareOutlined,
  CaretDownOutlined,
  CheckCircleOutlined,
  PlusCircleOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {Option} from ".";

export function AnswerOptions({type, name}) {
  const [options, setOptions] = useState([
    {
      name: `${name}_option_1`,
    },
  ]);
  function addOption() {
    setOptions((prev) => [
      ...prev,
      {
        name: `${name}_option_${Number(prev.at(-1).name.at(-1)) + 1}`,
      },
    ]);
  }
  function removeOption(key) {
    setOptions((prev) => prev.filter((opt) => opt.name !== key));
  }
  function switchOptions() {
    switch (type) {
      case "radio":
        return (
          <>
            {options.map((opt) => (
              <Option
                IconComponent={CheckCircleOutlined}
                value={`Option ${opt.name.at(-1)}`}
                name={opt.name}
                onRemove={options.length <= 1 ? null : removeOption}
                key={opt.name}
              />
            ))}
            <Option
              IconComponent={PlusCircleOutlined}
              value="Add Option"
              name={`${name}_addoption`}
              onAdd={addOption}
            />
          </>
        );
      case "checkbox":
        return (
          <>
            {options.map((opt) => (
              <Option
                IconComponent={CheckSquareOutlined}
                value={`Option ${opt.name.at(-1)}`}
                name={opt.name}
                onRemove={options.length <= 1 ? null : removeOption}
                key={opt.name}
              />
            ))}
            <Option
              IconComponent={PlusSquareOutlined}
              value="Add Option"
              name={`${name}_addoption`}
              onAdd={addOption}
            />
          </>
        );
      case "dropdown":
        return (
          <>
            {options.map((opt) => (
              <Option
                IconComponent={CaretDownOutlined}
                value={`Option ${opt.name.at(-1)}`}
                name={opt.name}
                onRemove={options.length <= 1 ? null : removeOption}
                key={opt.name}
              />
            ))}
            <Option
              IconComponent={PlusCircleOutlined}
              value="New Option"
              name={`${name}_newoption`}
              onAdd={addOption}
            />
          </>
        );
      case "textarea":
        return (
          <Option
            IconComponent={AlignLeftOutlined}
            type="textarea"
            rows="1"
            disabled
            value="Paragraph"
          />
        );
      case "image":
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "5px",
            }}
          >
            <div style={{width: "5%", height: "40px"}} className="IconWrapper">
              <FileImageOutlined size="large" />
            </div>
            <Input type="file" disabled style={{width: "85%"}} />
          </div>
        );
      case "file":
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "5px",
            }}
          >
            <div style={{width: "5%", height: "40px"}} className="IconWrapper">
              <FileOutlined size="large" />
            </div>
            <Input type="file" disabled style={{width: "85%"}} />
          </div>
        );
      case "date":
        return <DatePicker disabled={true} />;
      case "time":
        return <TimePicker disabled={true} />;
      case "range":
        return <Slider defaultValue="100" min={1} max={100} disabled={true} />;
      default:
        return <Option IconComponent={LineOutlined} value="Short Text" disabled />;
    }
  }

  useEffect(() => {
    let answerOptions = JSON.parse(sessionStorage.getItem("AnswerOptions"));
    if (answerOptions?.length > 0) {
      answerOptions = answerOptions.filter((opts) => opts.name !== name);
      answerOptions.push({name, type, options});
    } else {
      answerOptions = [{name, type, options}];
    }
    sessionStorage.setItem("AnswerOptions", JSON.stringify(answerOptions));
  }, [options, name, type]);

  return (
    <Form.Item
      name={name}
      className={
        ["radio", "checkbox", "dropdown"].includes(type) ? "" : "FormItem"
      }
    >
      {switchOptions()}
    </Form.Item>
  );
}
