import {
  Select,
  Form,
} from "antd";
import {
  ClockCircleOutlined,
  AlignLeftOutlined,
  LineOutlined,
  FileOutlined,
  FileImageOutlined,
  CheckSquareOutlined,
  CaretDownOutlined,
  CheckCircleOutlined,
  MailOutlined,
  NumberOutlined,
  ScheduleOutlined,
  SlidersOutlined,
} from "@ant-design/icons";

export function AnswerType({name, onSelect}) {
  return (
    <Form.Item
      name={name}
      initialValue="text"
      className="FormItem FormItemSelect"
    >
      <Select onSelect={onSelect} size="large">
        <Select.Option value="text">
          <LineOutlined size="large" />
          <span className="FormSelectOptionSpan">Short Text</span>
        </Select.Option>
        <Select.Option value="textarea">
          <AlignLeftOutlined size="large" />
          <span className="FormSelectOptionSpan">Paragraph</span>
        </Select.Option>
        <Select.Option value="checkbox">
          <CheckSquareOutlined size="large" />
          <span className="FormSelectOptionSpan">Checkboxes</span>
        </Select.Option>
        <Select.Option value="radio">
          <CheckCircleOutlined size="large" />
          <span className="FormSelectOptionSpan">Multiple Choice</span>
        </Select.Option>
        <Select.Option value="dropdown">
          <CaretDownOutlined size="large" />
          <span className="FormSelectOptionSpan">Dropdown</span>
        </Select.Option>
        <Select.Option value="email">
          <MailOutlined size="large" />
          <span className="FormSelectOptionSpan">Email</span>
        </Select.Option>
        <Select.Option value="number">
          <NumberOutlined size="large" />
          <span className="FormSelectOptionSpan">Number</span>
        </Select.Option>
        <Select.Option value="date">
          <ScheduleOutlined size="large" />
          <span className="FormSelectOptionSpan">Date</span>
        </Select.Option>
        <Select.Option value="time">
          <ClockCircleOutlined size="large" />
          <span className="FormSelectOptionSpan">Time</span>
        </Select.Option>
        <Select.Option value="image">
          <FileImageOutlined size="large" />
          <span className="FormSelectOptionSpan">Image Upload</span>
        </Select.Option>
        <Select.Option value="file">
          <FileOutlined size="large" />
          <span className="FormSelectOptionSpan">File Upload</span>
        </Select.Option>
        <Select.Option value="range">
          <SlidersOutlined size="large" />
          <span className="FormSelectOptionSpan">Number Range</span>
        </Select.Option>
      </Select>
    </Form.Item>
  );
}