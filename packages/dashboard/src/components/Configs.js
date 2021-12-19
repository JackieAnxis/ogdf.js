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
  updateLayoutParameters,
  fatherParam,//新增，存储的有两类：①该项父module的构造函数new出来的对象；②null
) => {
  if (params.type === "BOOL") {
    return (
      <div key={key}>
        <ConfigContainer key={key} childLevel={childLevel} fatherParam={fatherParam} >
          <span>{key}: </span>
          <Switch
            defaultChecked={
              layoutParameters[key] !== undefined
                ? layoutParameters[key]
                : params.default
            }
            size="small"
            onChange={(value) => {
              if (fatherParam != null) {
                fatherParam[key] = value;
              }
              else
                onChangeLayoutParams({ [key]: value });
            }
            }
          >
            {" "}
          </Switch>
        </ConfigContainer>
      </div>
    );
  } else if (params.type === "DOUBLE") {
    return (
      <ConfigContainer key={key} childLevel={childLevel} fatherParam={fatherParam} >
        <span>{key}: </span>
        <InputSlider
          step={0.0001}
          //step={1}
          size="small"
          defaultValue={params.default}
          min={params.range[0] == "-Infinity" ? (params.default==0?-100:(-1)*Math.abs(params.default) * 5) : params.range[0]}
          max={params.range[1] == "Infinity" ? (params.default==0?100:Math.abs(params.default) * 5): params.range[1]}
          // min={0}
          // max={100}
          onChange={(value) => {
            if (fatherParam != null) {
              fatherParam[key] = value;
            }
            else
              onChangeLayoutParams({ [key]: value });
          }}
        />
      </ConfigContainer>
    );
  } else if (params.type === "INT") {
    return (
      <ConfigContainer key={key} childLevel={childLevel} fatherParam={fatherParam} >
        <span>{key}: </span>
        <InputSlider
          step={1}
          size="small"
          defaultValue={params.default}
          min={params.range[0] == "-Infinity" ? (params.default==0?-100:(-1)*Math.abs(params.default) * 5) : params.range[0]}
          max={params.range[1] == "Infinity" ? (params.default==0?100:Math.abs(params.default) * 5): params.range[1]}
          // min={0}
          // max={100}
          onChange={(value) => {
            if (fatherParam != null) {
              fatherParam[key] = value;
              console.log(fatherParam);
            }
            else
              onChangeLayoutParams({ [key]: value });
          }}
        />
      </ConfigContainer>
    );
  } else if (params.type === "CATEGORICAL") {
    return (
      <ConfigContainer key={key} childLevel={childLevel} fatherParam={fatherParam} >
        <span>{key}: </span>
        <Select
          size={"small"}
          defaultValue={params.default}
          onChange={(value) => {
            if (fatherParam != null) {
              fatherParam[key] = value;
            }
            else
              onChangeLayoutParams({ [key]: value });
          }}
        >
          {params.range.map((option) => {
            return (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            );
          })}
        </Select>
      </ConfigContainer>
    );
  } else if (params.type === "MODULE") {
    return (
      <div key={key}>
        <ConfigContainer key={key} childLevel={childLevel} fatherParam={fatherParam} >
          <span>{key}: </span>
          {layoutParameters[key + "Module"] == true ?
            <Select
              size={"small"}
              defaultValue={() => {
                return params.default.name;
              }}
              onChange={(value) => {
                if (fatherParam != null) {
                  fatherParam[key] = new params.range[value].constructor();
                  onChangeLayoutParams({});
                  console.log(fatherParam[key].configs().value);
                }
                else {
                  console.log(params.range[value]);
                  onChangeLayoutParams({ [key]: new params.range[value].constructor() });
                }
              }}
            >
              {params.range.map((option, index) => {
                return (
                  <Select.Option key={option.name} value={index}>
                    {option.name}
                  </Select.Option>
                );
              })}
            </Select>
            : <Switch
              defaultChecked={false}
              size="small"
              onChange={(value) => {
                if (fatherParam != null) {
                  fatherParam[key] = new params.default.constructor();
                  onChangeLayoutParams({ [key + "Module"]: value });
                }
                else {
                  onChangeLayoutParams({ [key + "Module"]: value, [key]: new params.default.constructor() });
                }
              }
              }
            >
              {""};
            </Switch>
          }

        </ConfigContainer>
        {fatherParam == null && layoutParameters[key] !== undefined && layoutParameters[key + "Module"] == true
          ? Object.entries(layoutParameters[key].configs().value.parameters).map(([child_key, child_value]) => {
            return parameterFormItem(
              child_key,
              child_value,
              childLevel + 1,
              layoutParameters,
              onChangeLayoutParams,
              updateLayoutParameters,
              fatherParam == null ? layoutParameters[key] : fatherParam[key]
            );
          })
          : null
        }
        {fatherParam != null && layoutParameters[key + "Module"] == true
          ? Object.entries(fatherParam[key].configs().value.parameters).map(([child_key, child_value]) => {
            return parameterFormItem(
              child_key,
              child_value,
              childLevel + 1,
              layoutParameters,
              onChangeLayoutParams,
              updateLayoutParameters,
              fatherParam[key]
            );
          })
          : null
        }
      </div>
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
    console.log(layoutParameters);
  };

  return (
    <div
      style={{
        width: 450,//350
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
            style={{width:"250px"}}
            size={"small"}
            onChange={(val) => {
              updateLayout(val);
              updateLayoutParameters({});
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
            updateLayoutParameters,
            null,
          );
        }
      )}
    </div>
  );
}

export { Configs };
