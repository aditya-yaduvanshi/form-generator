import {
  Form,
  Input,
  Button,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";

export function Option({
  IconComponent,
  value = "Text",
  name,
  onAdd,
  onRemove,
  ...rest
}) {
  function clickButton(e) {
    e.preventDefault();
    onRemove(name);
  }
  function addInput(e) {
    e.preventDefault();
    onAdd();
  }
  return (
    <Input.Group
      style={{
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: "5px",
      }}
    >
      {onAdd ? (
        <Button onClick={addInput} style={{margin: "auto auto auto 4%"}}>
          <IconComponent size="large" /> Add Option
        </Button>
      ) : (
        <>
          <div style={{width: "5%", height: "40px"}} className="IconWrapper">
            <IconComponent size="large" />
          </div>
          <Form.Item
            name={name}
            initialValue={value}
            className="FormItem"
            style={{minWidth: "85%", marginBottom: "0"}}
          >
            <Input
              placeholder={value}
              size="large"
              className="FormInput"
              {...rest}
            />
          </Form.Item>
        </>
      )}
      <div
        style={{
          width: "10%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {onRemove ? (
          <Button
            onClick={clickButton}
            className="FormItemRemoveButton"
            size="large"
            style={{
              borderRadius: "50px",
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CloseOutlined size="large" />
          </Button>
        ) : null}
      </div>
    </Input.Group>
  );
}