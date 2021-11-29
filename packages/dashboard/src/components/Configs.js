import React, { useState } from "react";
import { Upload, Button, Select, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { DecimalStep, InputSlider } from "./InputSlider";
import { LAYOUT_CONFIG } from "../layoutConfigs";
import { DATASET } from "../datasets";

const parameterFormItem = (
  key,
  params,
  childLevel,
  layoutParameters,
  onChangeLayoutParams,
  updateLayoutParameters
) => {
  if (params.type === "switch") {
    //console.log('key:', key, 'layoutParameters:', layoutParameters)
    return (
      <div key={key}>
        <ConfigContainer key={key} childLevel={childLevel}>
          <span>{key}: </span>
          <Switch
            defaultChecked={
              layoutParameters[key] !== undefined
                ? layoutParameters[key]
                : params.default
            }
            size="small"
            onChange={(value) => {
              onChangeLayoutParams({ [key]: value });
              console.log(layoutParameters[key]);
            }}
          >
            {" "}
          </Switch>
        </ConfigContainer>
        {params.children && layoutParameters[key] === true
          ? Object.entries(params.children).map(([child_key, child_value]) => {
            return parameterFormItem(
              child_key,
              child_value,
              childLevel + 1,
              layoutParameters,
              onChangeLayoutParams,
              updateLayoutParameters
            );
          })
          : null}
      </div>
    );
  } else if (params.type === "float" || params.type === "integer") {
    return (
      <ConfigContainer key={key} childLevel={childLevel}>
        <span>{key}: </span>
        <InputSlider
          step={1}
          size="small"
          defaultValue={params.default}
          min={params.min}
          max={params.max}
          onChange={(value) => {
            onChangeLayoutParams({ [key]: value });
          }}
        />
      </ConfigContainer>
    );
  } else if (params.type === "select") {
    return (
      <ConfigContainer key={key} childLevel={childLevel}>
        <span>{key}: </span>
        <Select
          size={"small"}
          defaultValue={params.default}
          onChange={(value) => {
            onChangeLayoutParams({ [key]: value });
          }}
        >
          {params.options.map((option) => {
            return (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            );
          })}
        </Select>
      </ConfigContainer>
    );
  }
};

function ConfigContainer({
  children,
  childLevel = 1,
  topBorder = true,
  ...rest
}) {
  return (
    <div
      {...rest}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5,
        marginLeft: childLevel * 5,
        padding: 3,
        // borderWidth: topBorder ? "2px 0 0 0" : 0,
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: "white",
        borderStyle: "solid",
        borderColor: "white",
      }}
    >
      {children}
    </div>
  );
}

function Configs({
  layoutType,
  updateLayout,
  graphData,
  setGraphData,
  layoutParameters,
  updateLayoutParameters,
  changeFlag,//用于判断是否需要重新渲染
  updateChangeFlag
}) {
  const onChangeLayoutParams = (newParam) => {
    updateLayoutParameters({ ...layoutParameters, ...newParam });
  };

  return (
    <div
      style={{
        width: 350,
        backgroundColor: "#f8f8f8",
        padding: "10px 5px 10px 5px",
        borderRadius: 5,
      }}
    >
      <div>
        <ConfigContainer topBorder={false}>
          <span>Layout: </span>
          <Select
            defaultValue={LAYOUT_CONFIG.layout.default}
            value={layoutType}
            size={"small"}
            onChange={(val) => {
              updateLayout(val);
            }}
          >
            {LAYOUT_CONFIG.layout.options.map((option) => {
              return (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              );
            })}
          </Select>
        </ConfigContainer>
        <ConfigContainer topBorder={false}>
          <span>Dataset: </span>
          <Select
            defaultValue={graphData.name}
            value={graphData.name}
            size={"small"}
            onChange={(val) => {
              setGraphData({
                name: val,
                data: DATASET[val],
              });
            }}
          >
            {Object.keys(DATASET).map((name) => {
              return (
                <Select.Option key={name} value={name}>
                  {name}
                </Select.Option>
              );
            })}
          </Select>
        </ConfigContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "5px 10px 5px 10px",
          }}
        >
          <Upload
            {...{
              name: "file",
              showUploadList: false,
              headers: {
                authorization: "authorization-text",
              },
              beforeUpload: (file, fileList) => {
                // use FileReader to read data
                const reader = new FileReader();

                reader.onload = function (ev) {
                  const data = JSON.parse(reader.result);
                  setGraphData({
                    name: file.name,
                    data,
                  });
                };

                reader.readAsText(file);

                return false;
              },
            }}
          >
            <Button size={"small"} icon={<UploadOutlined />}>
              Click to Upload
            </Button>
          </Upload>
          <Button size={"small"} type={"primary"} onClick={() => {
            console.log(layoutParameters);
            updateChangeFlag(changeFlag + 1);
            //console.log(changeFlag);
          }
          }>
            Refresh
          </Button>
        </div>
      </div>
      <div style={{ margin: 5, fontWeight: "bold" }}>Layout parameters</div>
      {Object.entries(LAYOUT_CONFIG.parameters[layoutType]).map(
        ([key, value]) => {
          //console.log(key,value);
          return parameterFormItem(
            key,
            value,
            1,
            layoutParameters,
            onChangeLayoutParams,
            updateLayoutParameters
          );
        }
      )}
    </div>
  );
}

export { Configs };
