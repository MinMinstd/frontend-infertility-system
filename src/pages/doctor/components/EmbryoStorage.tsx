import {
  Table,
  Card,
  Tag,
  Typography,
  Space,
  Badge,
  Tooltip,
  Button,
} from "antd";
import {
  CalendarOutlined,
  ExperimentOutlined,
  HeartOutlined,
  FileTextOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import dayjs from "dayjs";
import type { Embryo } from "../../../types/medicalRecord.d";

const { Title, Text } = Typography;

interface EmbryoStorageProps {
  embryos: Embryo[];
  onCreateEmbryo?: () => void;
  onUpdateEmbryo?: (embryo: Embryo) => void;
}

const getQualityColor = (quality: string) => {
  switch (quality?.toLowerCase()) {
    case "excellent":
    case "xuất sắc":
      return "#52c41a";
    case "good":
    case "tốt":
      return "#1890ff";
    case "fair":
    case "trung bình":
      return "#faad14";
    case "poor":
    case "kém":
      return "#ff4d4f";
    default:
      return "#d9d9d9";
  }
};

const getStatusConfig = (status: string) => {
  switch (status?.toLowerCase()) {
    case "đạt chuẩn":
      return { color: "#52c41a", text: "Đạt chuẩn" };
    case "không đạt chuẩn":
      return { color: "#ff4d4f", text: "Không đạt chuẩn" };
    case "đã tạo phôi":
      return { color: "#1890ff", text: "Đã tạo phôi" };
    case "chuyển phôi thất bại":
      return { color: "#ff7875", text: "Chuyển phôi thất bại" };
    case "đã chuyển phôi":
      return { color: "#722ed1", text: "Đã chuyển phôi" };
    default:
      return { color: "#d9d9d9", text: status };
  }
};

export function EmbryoStorage({
  embryos,
  onCreateEmbryo,
  onUpdateEmbryo,
}: EmbryoStorageProps) {
  const columns: ColumnsType<Embryo> = [
    {
      title: (
        <Space>
          <CalendarOutlined className="text-pink-500" />
          <span className="font-semibold">Ngày tạo</span>
        </Space>
      ),
      dataIndex: "createAt",
      key: "createAt",
      width: 120,
      render: (date) => (
        <div className="flex flex-col">
          <Text strong className="text-gray-800">
            {dayjs(date).format("DD/MM/YYYY")}
          </Text>
        </div>
      ),
    },
    {
      title: (
        <Space>
          <CalendarOutlined className="text-purple-500" />
          <span className="font-semibold">Ngày chuyển</span>
        </Space>
      ),
      dataIndex: "transferredAt",
      key: "transferredAt",
      width: 150,
      render: (date) => (
        <div className="flex flex-col">
          {date ? (
            <>
              <Text strong className="text-gray-800">
                {dayjs(date).format("DD/MM/YYYY")}
              </Text>
            </>
          ) : (
            <Text type="secondary" italic>
              Chưa chuyển
            </Text>
          )}
        </div>
      ),
    },
    {
      title: (
        <Space>
          <HeartOutlined className="text-red-500" />
          <span className="font-semibold">Chất lượng Trứng</span>
        </Space>
      ),
      dataIndex: "quality",
      key: "quality",
      width: 150,
      render: (quality) => (
        <Badge
          color={getQualityColor(quality)}
          text={
            <Text strong style={{ color: getQualityColor(quality) }}>
              {quality}
            </Text>
          }
        />
      ),
    },
    {
      title: (
        <Space>
          <ExperimentOutlined className="text-blue-500" />
          <span className="font-semibold">Loại Phôi</span>
        </Space>
      ),
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type) => (
        <Tag color="blue" className="rounded-full px-3 py-1 font-medium">
          {type}
        </Tag>
      ),
    },
    {
      title: (
        <Space>
          <Badge status="processing" />
          <span className="font-semibold">Tình trạng</span>
        </Space>
      ),
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status) => {
        const config = getStatusConfig(status);
        return (
          <Tag
            color={config.color}
            className="rounded-full px-3 py-1 font-medium border-0"
            style={{
              background: `${config.color}15`,
              color: config.color,
              border: `1px solid ${config.color}30`,
            }}
          >
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: (
        <Space>
          <FileTextOutlined className="text-green-500" />
          <span className="font-semibold">Ghi chú</span>
        </Space>
      ),
      dataIndex: "note",
      key: "note",
      ellipsis: {
        showTitle: false,
      },
      render: (note) => (
        <Tooltip placement="topLeft" title={note}>
          <Text className="text-gray-600">
            {note || (
              <Text type="secondary" italic>
                Không có ghi chú
              </Text>
            )}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: (
        <Space>
          <EditOutlined className="text-orange-500" />
          <span className="font-semibold">Thao tác</span>
        </Space>
      ),
      key: "actions",
      width: 100,
      fixed: "right",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<EditOutlined />}
          onClick={() => onUpdateEmbryo?.(record)}
          className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
        >
          Sửa
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Title
              level={4}
              className="mb-2 text-gray-800 flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                <ExperimentOutlined className="text-white text-sm" />
              </div>
              Kho lưu trữ phôi thai
            </Title>
            <Text type="secondary" className="text-sm">
              Quản lý và theo dõi tình trạng các phôi thai được lưu trữ
            </Text>
          </div>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={onCreateEmbryo}
              className="bg-pink-500 hover:bg-pink-600 border-pink-500 hover:border-pink-600 shadow-lg"
              size="middle"
            >
              Tạo mới phôi
            </Button>
          </Space>
        </div>
      </div>

      <Card
        className="shadow-lg border-0 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
          borderRadius: "16px",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Table
          dataSource={embryos}
          columns={columns}
          rowKey="embryoId"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} phôi thai`,
            className: "px-6 py-4",
          }}
          size="middle"
          scroll={{ x: "max-content" }}
          className="custom-table"
          rowClassName={(_, index) =>
            index % 2 === 0 ? "bg-gray-50/50" : "bg-white"
          }
          locale={{
            emptyText: (
              <div className="py-8 text-center">
                <ExperimentOutlined className="text-4xl text-gray-300 mb-2" />
                <Text type="secondary">Chưa có dữ liệu phôi thai</Text>
              </div>
            ),
          }}
        />
      </Card>

      <style>{`
        .custom-table .ant-table-thead > tr > th {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 2px solid #e2e8f0;
          font-weight: 600;
          color: #374151;
        }
        
        .custom-table .ant-table-tbody > tr:hover > td {
          background: linear-gradient(135deg, #fdf2f8 0%, #faf5ff 100%) !important;
        }
        
        .custom-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f1f5f9;
          padding: 16px 12px;
        }
      `}</style>
    </div>
  );
}
