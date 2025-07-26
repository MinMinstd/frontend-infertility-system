import { Card, Table, Button, Space } from "antd";
import {
  EditOutlined,
  // CheckCircleOutlined,
  // ClockCircleOutlined,
  // ExclamationCircleOutlined,
} from "@ant-design/icons";
// import dayjs from "dayjs";
import type { ColumnsType } from "antd/es/table";
import type { treatmentRoadmap } from "../../../types/medicalRecord.d";

interface TreatmentRoadmapProps {
  treatmentRoadmap: treatmentRoadmap[];
  onUpdateRoadmap: (roadmap: treatmentRoadmap) => void;
}

export function TreatmentRoadmap({
  treatmentRoadmap,
  onUpdateRoadmap,
}: TreatmentRoadmapProps) {
  const columns: ColumnsType<treatmentRoadmap> = [
    {
      title: "Mã bước",
      dataIndex: "treatmentRoadmapId",
      key: "index",
      render: (_: unknown, __: treatmentRoadmap, index: number) => index + 1,
      width: 100,
    },
    // {
    //   title: "Ngày",
    //   dataIndex: "date",
    //   key: "date",
    //   width: 120,
    //   render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    // },
    {
      title: "Giai đoạn",
      dataIndex: "stage",
      key: "stage",
      width: 150,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Thời gian (ngày)",
      dataIndex: "durationDay",
      key: "durationDay",
      width: 120,
      align: "center",
    },
    // {
    //   title: "Trạng thái",
    //   dataIndex: "status",
    //   key: "status",
    //   width: 150,
    //   render: (status: string) => {
    //     let color = "default";
    //     let icon = <ClockCircleOutlined />;
    //     if (status === "Đã hoàn thành") {
    //       color = "success";
    //       icon = <CheckCircleOutlined />;
    //     } else if (status === "Đang tiến hành") {
    //       color = "processing";
    //       icon = <ExclamationCircleOutlined />;
    //     }
    //     return (
    //       <Tag color={color} icon={icon}>
    //         {status}
    //       </Tag>
    //     );
    //   },
    // },
    {
      title: "Thao tác",
      key: "action",
      width: 120,
      render: (_: unknown, record: treatmentRoadmap) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => onUpdateRoadmap(record)}
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
        rowKey="treatmentRoadmapId"
        pagination={false}
        scroll={{ x: 1200 }}
        size="small"
      />
    </Card>
  );
}
