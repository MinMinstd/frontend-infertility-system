import { Card, Table, Tag, Button, Space } from "antd";
import {
  EditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import type { ColumnsType } from "antd/es/table";

interface TreatmentRoadmapItem {
  Road_ID: string;
  Date: string;
  Stage: string;
  Service_Name: string;
  Description: string;
  Duration_day: number;
  Price: number;
  Status: string;
}

interface TreatmentRoadmapProps {
  treatmentRoadmap: TreatmentRoadmapItem[];
  onUpdateResult: (roadId: string) => void;
}

export function TreatmentRoadmap({
  treatmentRoadmap,
  onUpdateResult,
}: TreatmentRoadmapProps) {
  const columns: ColumnsType<TreatmentRoadmapItem> = [
    {
      title: "Mã bước",
      dataIndex: "Road_ID",
      key: "Road_ID",
      width: 100,
    },
    {
      title: "Ngày",
      dataIndex: "Date",
      key: "Date",
      width: 120,
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Giai đoạn",
      dataIndex: "Stage",
      key: "Stage",
      width: 150,
    },
    {
      title: "Dịch vụ",
      dataIndex: "Service_Name",
      key: "Service_Name",
      width: 200,
    },
    {
      title: "Mô tả",
      dataIndex: "Description",
      key: "Description",
      ellipsis: true,
    },
    {
      title: "Thời gian (ngày)",
      dataIndex: "Duration_day",
      key: "Duration_day",
      width: 120,
      align: "center",
    },
    {
      title: "Chi phí",
      dataIndex: "Price",
      key: "Price",
      width: 120,
      render: (price: number) => `${price.toLocaleString()} VNĐ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      key: "Status",
      width: 150,
      render: (status: string) => {
        let color = "default";
        let icon = <ClockCircleOutlined />;
        if (status === "Đã hoàn thành") {
          color = "success";
          icon = <CheckCircleOutlined />;
        } else if (status === "Đang tiến hành") {
          color = "processing";
          icon = <ExclamationCircleOutlined />;
        }
        return (
          <Tag color={color} icon={icon}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      width: 120,
      render: (_: unknown, record: TreatmentRoadmapItem) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => onUpdateResult(record.Road_ID)}
            style={{
              borderColor: "#ff69b4",
              color: "#ff69b4",
            }}
          >
            Cập nhật
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      style={{
        borderColor: "#ff69b4",
        boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
      }}
    >
      <Table
        columns={columns}
        dataSource={treatmentRoadmap}
        rowKey="Road_ID"
        pagination={false}
        scroll={{ x: 1200 }}
        size="small"
      />
    </Card>
  );
}
