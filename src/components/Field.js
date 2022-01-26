import {Input, Select, Form, Divider} from "antd";
//import TextArea from "antd/lib/input/TextArea";
import {useEffect, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";

export function Field ({options, name, label, placeholder, onChange}) {
  const [field, setField] = useState({name: "", value: ""});
  const [newOpt, setNewOpt] = useState("");
  const [newOptions, setNewOptions] = useState(options);

  function handleSelect (val) {
    setField(prev => ({...prev, name: val}));
  }

  function handleChange (e) {
    setField(prev => ({...prev, value: e.target.value.trim().toUpperCase()}));
  }

  function newOptChange (e) {
    setNewOpt(e.target.value.toUpperCase());
  }

  function handleBlur (_e){
    if(field.name)
      onChange(field)
  }

  function handleClick (e) {
    e.preventDefault();
    setNewOptions(prev => {
      let val = newOpt
      val.trim();
      if(!prev.find(opt => opt === val && val)){
        return [...prev, val];
      }
      return prev;
    })
    setNewOpt("");
  }

  return (
    <div onBlur={handleBlur}>
      <Form.Item name={name} noStyle>
        <Input.Group compact>
          <Form.Item name={newOptions?.map(opt => `${name}_${opt}`)} style={{width: "50%"}}>
            <Select 
              placeholder={label} 
              onSelect={handleSelect} 
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <Divider style={{margin: "4px 0"}} />
                  <div
                    style={{display: "flex", flexWrap: "nowrap", padding: 8}}
                  >
                    <Input
                      style={{flex: "auto"}}
                      value={newOpt}
                      onChange={newOptChange}
                      placeholder="Add new option"
                      autoComplete="off"
                    />
                    <a
                      style={{
                        flex: "none",
                        padding: "8px",
                        display: "block",
                        cursor: "pointer",
                      }}
                      onClick={handleClick}
                    >
                      <PlusOutlined /> Add New
                    </a>
                  </div>
                </div>
              )}
            >
              {newOptions?.map((opt) => (
                <Select.Option
                  value={opt}
                  key={opt}
                >
                  {opt}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={[name, "input"]} style={{width: "50%"}} required>
            <Input placeholder={placeholder} onChange={handleChange} autoComplete="off"/>
          </Form.Item>
        </Input.Group>
      </Form.Item>
    </div>
  );
}
