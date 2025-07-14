// File: src/pages/doctor/components/EmbryoStorage.tsx

import { Table, Card, Tag, Typography, Space, Badge, Tooltip } from "antd";
import {
  CalendarOutlined,
  ExperimentOutlined,
  HeartOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import dayjs from "dayjs";
import type { Embryo } from "../../../types/medicalRecord.d";

const { Title, Text } = Typography;

interface EmbryoStorageProps {
  embryos: Embryo[];
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
    case "stored":
    case "đã lưu trữ":
      return { color: "#52c41a", text: "Đã lưu trữ" };
    case "used":
    case "đã sử dụng":
      return { color: "#1890ff", text: "Đã sử dụng" };
    case "discarded":
    case "đã loại bỏ":
      return { color: "#ff4d4f", text: "Đã loại bỏ" };
    case "transferred":
    case "đã chuyển":
      return { color: "#722ed1", text: "Đã chuyển" };
    default:
      return { color: "#d9d9d9", text: status };
  }
};

export function EmbryoStorage({ embryos }: EmbryoStorageProps) {
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
          <Text type="secondary" className="text-xs">
            {dayjs(date).format("HH:mm")}
          </Text>
        </div>
      ),
    },
    {
      title: (
        <Space>
          <HeartOutlined className="text-red-500" />
          <span className="font-semibold">Chất lượng</span>
        </Space>
      ),
      dataIndex: "quality",
      key: "quality",
      width: 120,
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
          <span className="font-semibold">Loại</span>
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
  ];

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl">
      <div className="mb-6">
        <Title level={4} className="mb-2 text-gray-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
            <ExperimentOutlined className="text-white text-sm" />
          </div>
          Kho lưu trữ phôi thai
        </Title>
        <Text type="secondary" className="text-sm">
          Quản lý và theo dõi tình trạng các phôi thai được lưu trữ
        </Text>
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
