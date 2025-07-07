"use client";

import {
  Card,
  Table,
  Tag,
  Typography,
  Button,
  Modal,
  Descriptions,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  EyeOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Title, Text } = Typography;

interface PaymentHistoryRecord {
  paymentId: string;
  patientName: string;
  treatmentType: string;
  paymentDate: string;
  paymentTime: string;
  totalAmount: number;
  method: "Cash" | "Card" | "BankTransfer" | "Momo" | "VNPay";
  status: "Paid" | "Pending" | "Refunded";
  note?: string;
  services: {
    serviceCode: string;
    serviceName: string;
    unitPrice: number;
    quantity: number;
    total: number;
  }[];
}

export default function PaymentHistoryPage() {
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<PaymentHistoryRecord | null>(null);

  const data: PaymentHistoryRecord[] = [
    {
      paymentId: "HD001",
      patientName: "Nguyen Thi A",
      treatmentType: "IVF",
      paymentDate: "2025-07-07",
      paymentTime: "14:30:25",
      totalAmount: 12000000,
      method: "Card",
      status: "Paid",
      services: [
        {
          serviceCode: "IVF001",
          serviceName: "Chọc hút trứng",
          unitPrice: 5000000,
          quantity: 1,
          total: 5000000,
        },
        {
          serviceCode: "IVF002",
          serviceName: "Chuyển phôi",
          unitPrice: 7000000,
          quantity: 1,
          total: 7000000,
        },
      ],
    },
    {
      paymentId: "HD002",
      patientName: "Tran Thi B",
      treatmentType: "IUI",
      paymentDate: "2025-07-06",
      paymentTime: "09:15:42",
      totalAmount: 8500000,
      method: "VNPay",
      status: "Paid",
      services: [
        {
          serviceCode: "IUI001",
          serviceName: "Thụ tinh nhân tạo",
          unitPrice: 8500000,
          quantity: 1,
          total: 8500000,
        },
      ],
    },
    {
      paymentId: "HD003",
      patientName: "Le Thi C",
      treatmentType: "IVF",
      paymentDate: "2025-07-05",
      paymentTime: "16:45:18",
      totalAmount: 15000000,
      method: "BankTransfer",
      status: "Pending",
      note: "Chờ xác nhận chuyển khoản",
      services: [
        {
          serviceCode: "IVF003",
          serviceName: "Gói điều trị IVF hoàn chỉnh",
          unitPrice: 15000000,
          quantity: 1,
          total: 15000000,
        },
      ],
    },
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case "Cash":
        return "blue";
      case "Card":
        return "green";
      case "BankTransfer":
        return "purple";
      case "Momo":
        return "magenta";
      case "VNPay":
        return "orange";
      default:
        return "default";
    }
  };

  const columns: ColumnsType<PaymentHistoryRecord> = [
    {
      title: "Mã thanh toán",
      dataIndex: "paymentId",
      render: (text: string) => (
        <Text className="font-semibold text-gray-700">{text}</Text>
      ),
    },
    {
      title: "Bệnh nhân",
      dataIndex: "patientName",
      render: (text: string) => (
        <Text className="font-medium text-gray-800">{text}</Text>
      ),
    },
    {
      title: "Loại điều trị",
      dataIndex: "treatmentType",
      render: (text: string) => (
        <Tag color="cyan" className="font-medium">
          {text}
        </Tag>
      ),
    },
    {
      title: "Thời gian thanh toán",
      key: "datetime",
      render: (_, record) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-gray-700">
            <CalendarOutlined className="text-pink-400" />
            <Text className="text-sm font-medium">{record.paymentDate}</Text>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <ClockCircleOutlined className="text-pink-400" />
            <Text className="text-sm">{record.paymentTime}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      render: (value: number) => (
        <Text className="font-bold text-green-600">
          {value.toLocaleString("vi-VN")} đ
        </Text>
      ),
    },
    {
      title: "Phương thức",
      dataIndex: "method",
      render: (method: string) => (
        <Tag color={getMethodColor(method)} className="font-medium">
          {method}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) => {
        const color =
          status === "Paid" ? "green" : status === "Pending" ? "orange" : "red";
        return (
          <Tag color={color} className="font-medium">
            {status === "Paid"
              ? "Đã thanh toán"
              : status === "Pending"
              ? "Chờ xử lý"
              : "Hoàn trả"}
          </Tag>
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedRecord(record);
            setVisibleDetail(true);
          }}
          className="text-pink-500 border-pink-300 hover:text-pink-600 hover:border-pink-400 font-medium"
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="m-6 p-6 border border-pink-300 rounded-lg bg-white shadow-sm">
        <div className="mb-6">
          <Title
            level={2}
            style={{ color: "#FF69B4" }}
            className="text-pink-400 mb-2"
          >
            Lịch sử thanh toán
          </Title>
          <Text className="text-gray-600">
            Quản lý và theo dõi lịch sử các giao dịch thanh toán
          </Text>
        </div>

        <Card className="border-pink-300 shadow-sm">
          <Table
            columns={columns}
            dataSource={data}
            rowKey="paymentId"
            bordered
            className="[&_.ant-table-thead>tr>th]:bg-pink-50 [&_.ant-table-thead>tr>th]:text-gray-700 [&_.ant-table-thead>tr>th]:font-semibold [&_.ant-table-tbody>tr:hover>td]:bg-pink-25"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} của ${total} bản ghi`,
            }}
          />
        </Card>

        <Modal
          open={visibleDetail}
          onCancel={() => setVisibleDetail(false)}
          footer={null}
          title={
            <div className="flex items-center gap-2">
              <EyeOutlined className="text-pink-500" />
              <span className="text-pink-500 font-semibold">
                Chi tiết thanh toán
              </span>
            </div>
          }
          width={800}
          className="[&_.ant-modal-header]:border-b-pink-200"
        >
          {selectedRecord && (
            <div className="space-y-6 mt-4">
              <Card className="border-pink-200 bg-pink-25">
                <Descriptions
                  bordered
                  column={2}
                  size="middle"
                  className="[&_.ant-descriptions-item-label]:bg-pink-50 [&_.ant-descriptions-item-label]:text-gray-700 [&_.ant-descriptions-item-label]:font-medium"
                >
                  <Descriptions.Item label="Mã thanh toán" span={2}>
                    <Text className="font-bold text-pink-600">
                      {selectedRecord.paymentId}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Bệnh nhân">
                    <Text className="font-semibold">
                      {selectedRecord.patientName}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Loại điều trị">
                    <Tag color="cyan" className="font-medium">
                      {selectedRecord.treatmentType}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày thanh toán">
                    <div className="flex items-center gap-1">
                      <CalendarOutlined className="text-pink-400" />
                      <Text className="font-medium">
                        {selectedRecord.paymentDate}
                      </Text>
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label="Thời gian thanh toán">
                    <div className="flex items-center gap-1">
                      <ClockCircleOutlined className="text-pink-400" />
                      <Text className="font-medium">
                        {selectedRecord.paymentTime}
                      </Text>
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label="Phương thức thanh toán">
                    <Tag
                      color={getMethodColor(selectedRecord.method)}
                      className="font-medium"
                    >
                      {selectedRecord.method}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Trạng thái">
                    <Tag
                      color={
                        selectedRecord.status === "Paid"
                          ? "green"
                          : selectedRecord.status === "Pending"
                          ? "orange"
                          : "red"
                      }
                      className="font-medium"
                    >
                      {selectedRecord.status === "Paid"
                        ? "Đã thanh toán"
                        : selectedRecord.status === "Pending"
                        ? "Chờ xử lý"
                        : "Hoàn trả"}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Tổng tiền" span={2}>
                    <Text className="text-xl font-bold text-green-600">
                      {selectedRecord.totalAmount.toLocaleString("vi-VN")} đ
                    </Text>
                  </Descriptions.Item>
                  {selectedRecord.note && (
                    <Descriptions.Item label="Ghi chú" span={2}>
                      <Text className="text-gray-600 italic">
                        {selectedRecord.note}
                      </Text>
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Card>

              <Card
                size="small"
                title={
                  <span className="text-pink-500 font-semibold">
                    Danh sách dịch vụ đã thanh toán
                  </span>
                }
                className="border-pink-300"
              >
                <Table
                  dataSource={selectedRecord.services}
                  rowKey="serviceCode"
                  pagination={false}
                  columns={[
                    {
                      title: "Mã dịch vụ",
                      dataIndex: "serviceCode",
                      render: (text: string) => (
                        <Text className="font-medium text-gray-700">
                          {text}
                        </Text>
                      ),
                    },
                    {
                      title: "Tên dịch vụ",
                      dataIndex: "serviceName",
                      render: (text: string) => (
                        <Text className="font-medium">{text}</Text>
                      ),
                    },
                    {
                      title: "Đơn giá",
                      dataIndex: "unitPrice",
                      render: (v: number) => (
                        <Text className="font-medium text-blue-600">
                          {v.toLocaleString("vi-VN")} đ
                        </Text>
                      ),
                    },
                    {
                      title: "Số lượng",
                      dataIndex: "quantity",
                      render: (text: number) => (
                        <Text className="font-medium text-center">{text}</Text>
                      ),
                    },
                    {
                      title: "Thành tiền",
                      dataIndex: "total",
                      render: (v: number) => (
                        <Text className="font-bold text-green-600">
                          {v.toLocaleString("vi-VN")} đ
                        </Text>
                      ),
                    },
                  ]}
                  size="small"
                  className="[&_.ant-table-thead>tr>th]:bg-pink-50 [&_.ant-table-thead>tr>th]:text-gray-700 [&_.ant-table-thead>tr>th]:font-medium"
                />
                <div className="flex justify-end mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Text className="text-lg font-bold text-green-700">
                    Tổng cộng:{" "}
                    {selectedRecord.totalAmount.toLocaleString("vi-VN")} đ
                  </Text>
                </div>
              </Card>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
