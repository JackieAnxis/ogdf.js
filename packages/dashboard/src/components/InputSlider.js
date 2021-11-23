import React, { useCallback, useState } from "react";
import { Row, Col, Slider, InputNumber } from "antd";
import * as _ from "lodash";

export function InputSlider({
  defaultValue = 1,
  min = 0,
  max = 10,
  step = 1,
  size = "middle",
  onChange: onValChange,
}) {
  const [value, setValue] = useState(defaultValue);

  const onValChangeDebounce = useCallback(_.debounce((value) => {
    onValChange(value);
  }, 500), [onValChange])

  const onChange = (value) => {
    setValue(value);
    onValChangeDebounce(value);
    // onValChange(value);
  };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <Slider
        style={{
          minWidth: 80,
          flex: 1,
        }}
        min={min}
        max={max}
        onChange={onChange}
        value={value}
        step={step}
        size={size}
      />
      <InputNumber
        min={min}
        max={max}
        step={step}
        value={value}
        size={size}
        onChange={onChange}
      />
    </div>
  );
}

export class DecimalStep extends React.Component {
  state = {
    inputValue: 0,
  };

  onChange = (value) => {
    if (isNaN(value)) {
      return;
    }
    this.setState({
      inputValue: value,
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <Row>
        <Col span={12}>
          <Slider
            min={0}
            max={1}
            onChange={this.onChange}
            value={typeof inputValue === "number" ? inputValue : 0}
            step={0.01}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={1}
            style={{ margin: "0 16px" }}
            step={0.01}
            value={inputValue}
            onChange={this.onChange}
          />
        </Col>
      </Row>
    );
  }
}
