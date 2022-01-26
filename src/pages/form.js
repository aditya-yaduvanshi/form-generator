import {Col, Row, Form, Table} from "antd";

import {useState} from "react";
import {Field} from "../components/Field";

export function MyForm() {
  const columns = [
    {
      key: "field",
      dataIndex: "field",
      title: "FIELD",
    },
    {
      key: "input",
      dataIndex: "input",
      title: "INPUT",
    },
  ];
  const rows = [
    {
      key: "PROJECT NAME",
      field: "PROJECT NAME",
    },
    {
      key: "CLIENT NAME",
      field: "CLIENT NAME",
    },
    {
      key: "PANEL NAME",
      field: "PANEL NAME",
    },
    {
      key: "PAGE NAME",
      field: "PAGE NAME",
    },
    {
      key: "SECTION NAME",
      field: "SECTION NAME",
    },
    {
      key: "EVENT NAME",
      field: "EVENT NAME",
    },
  ];
  const [table, setTable] = useState(rows);

  function handleChange(field) {
    setTable((prev) => {
      let rowIndex = prev.findIndex((row) => row.field === field.name);
      if (rowIndex !== -1) {
        prev[rowIndex].input = field.value;
        return prev;
      }
      return [
        ...prev,
        {
          key: field.name,
          field: field.name,
          input: field.value,
        },
      ];
    });
  }

  return (
    <>
      <Row
        gutter={{xs: 8, sm: 16, md: 24, lg: 32}}
        style={{
          paddingRight: "20px",
          paddingLeft: "20px",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Col
          span={12}
          style={{
            outline: "2px solid black",
            paddingRight: "20px",
            paddingLeft: "20px",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <Form autoComplete="off">
            <input autoComplete="off" type="hidden"/>
            {table.map((row, ind) => (
              <Field
                name={row.field}
                key={row.key}
                options={[...table.map((tr) => tr.field)]}
                label={`Select Field ${ind + 1}`}
                placeholder={`Input Field Value ${ind + 1}`}
                onChange={handleChange}
              />
            ))}
          </Form>
        </Col>
        <Col
          span={12}
          style={{
            outline: "2px solid black",
            paddingRight: "20px",
            paddingLeft: "20px",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <Table columns={columns} dataSource={table}></Table>
        </Col>
      </Row>
    </>
  );
}
