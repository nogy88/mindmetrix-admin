import moment from "moment";
import { Input, Button, Space, Select, DatePicker, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const { Option } = Select;
const { RangePicker } = DatePicker;

const getColumnSearchProps = ({ type = "input", dtSrc = [] }) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <div style={{ padding: 8 }}>
      {type === "input" ? (
        <Input
          placeholder={`Хайх ...`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
      ) : type === "select" ? (
        <Select
          placeholder="Сонгоно уу"
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys([e]);
          }}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        >
          {dtSrc.map((data) => (
            <Option key={data.val} value={data.val}>{`${data.txt}`}</Option>
          ))}
        </Select>
      ) : type === "date" ? (
        <DatePicker
          placeholder="Огноо сонгоно уу"
          style={{ width: "100%", marginBottom: 8, display: "block" }}
          onChange={(dates) => setSelectedKeys(dates)}
          onPressEnter={() => confirm()}
        />
      ) : type === "rngdate" ? (
        <RangePicker
          style={{ width: 250, marginBottom: 8, display: "flex" }}
          ranges={{
            Өнөөдөр: [moment(), moment()],
            "Энэ сар": [moment().startOf("month"), moment().endOf("month")],
          }}
          onChange={(_, dates) => setSelectedKeys(dates)}
          onPressEnter={() => confirm()}
        />
      ) : null}

      <Space>
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Хайх
        </Button>
        <Button
          onClick={() => clearFilters()}
          size="small"
          style={{ width: 90 }}
        >
          Арилгах
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  ),
  onFilter: () => true,
});

export default getColumnSearchProps;
