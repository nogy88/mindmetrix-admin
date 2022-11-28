import * as antdIcons from "@ant-design/icons";

const AntdIcon = (type, myColor) => {
  const AntdIcon = antdIcons[type];
  return <AntdIcon style={{ color: myColor }} />;
};

export default AntdIcon;
