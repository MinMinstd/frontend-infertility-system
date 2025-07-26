// File: src/pages/payments/PaymentHistoryPage.tsx

import {
  Table,
  Typography,
  Button,
  Modal,
  Descriptions,
  Tag,
  Card,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { EyeOutlined, CalendarOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import UserApi from "../../servers/user.api";

const { Title, Text } = Typography;

interface PaymentSummary {
  paymentId: number;
  customerName: string;
  serviceName: string;
  date: string;
  priceByTreatement: number;
  method: string;
  status: string;
}

interface PaymentDetail extends PaymentSummary {
  treatmentRoadmapId: number;
  stage: string;
  price: number;
}

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<PaymentSummary[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<PaymentDetail | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const getColorByStatus = (status: string) => {
    if (status === "Đã thanh toán") return "green";
    if (status === "Chờ thanh toán" || status === "Chờ xử lý") return "orange";
    return "red";
  };

  // const getColorByMethod = (method: string) => {
  //   if (!method) return "default";

  //   switch (method.toLowerCase()) {
  //     case "tiền mặt":
  //       return "blue";
  //     case "chuyển khoản":
  //       return "purple";
  //     case "momo":
  //       return "magenta";
  //     case "vnpay":
  //       return "orange";
  //     case "card":
  //       return "green";
  //     default:
  //       return "default";
  //   }
  // };

  const fetchPayments = async () => {
    try {
      const res = await UserApi.GetHistoryPayment();
      console.log("Danh sách lịch sử thanh toán: ", res.data);
      setPayments(res.data);
    } catch (error) {
      console.log("Lỗi không thể load được dữ liệu", error);
      message.error("Không thể tải dữ liệu thanh toán.");
    }
  };

  const openDetailModal = async (paymentId: number) => {
    try {
      setLoading(true);
      const res = await UserApi.GetPaymentHistoryDetail(paymentId);
      setSelectedDetail(res.data);
      setModalOpen(true);
    } catch (error) {
      console.log("Lỗi không thể load được dữ liệu", error);
      message.error("Không thể tải chi tiết thanh toán.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const columns: ColumnsType<PaymentSummary> = [
    {
      title: "Mã thanh toán",
      dataIndex: "paymentId",
      render: (id) => (
        <Text className="font-semibold text-gray-700">HD{id}</Text>
      ),
    },
    {
      title: "Bệnh nhân",
      dataIndex: "customerName",
      render: (text) => <Text className="font-medium">{text}</Text>,
    },
    {
      title: "Dịch vụ",
      dataIndex: "serviceName",
      render: (text) => (
        <Tag color="cyan" className="font-medium">
          {text}
        </Tag>
      ),
    },
    {
      title: "Ngày",
      dataIndex: "date",
      render: (date) => (
        <div className="flex items-center gap-1">
          <CalendarOutlined className="text-pink-400" />
          <Text>{dayjs(date).format("DD/MM/YYYY")}</Text>
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "priceByTreatement",
      render: (v) => (
        <Text className="font-bold text-green-600">
          {v.toLocaleString("vi-VN")} đ
        </Text>
      ),
    },
    // {
    //   title: "Phương thức",
    //   dataIndex: "method",
    //   render: (method) => (
    //     <Tag color={getColorByMethod(method)} className="font-medium">
    //       {method}
    //     </Tag>
    //   ),
    // },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <Tag color={getColorByStatus(status)} className="font-medium">
          {status}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => openDetailModal(record.paymentId)}
          className="text-pink-500 border-pink-300 hover:text-pink-600 hover:border-pink-400 font-medium"
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto bg-white shadow-sm rounded-lg">
        <div className="p-6">
          <Title level={2} className="text-pink-500 text-lg sm:text-2xl mb-2">
            Lịch sử thanh toán
          </Title>
          <Text className="text-gray-600">
            Danh sách giao dịch theo từng bệnh nhân
          </Text>
        </div>

        <div className="overflow-x-auto">
          <Table
            dataSource={payments}
            columns={columns}
            rowKey="paymentId"
            scroll={{ x: "max-content" }}
            pagination={{ pageSize: 10 }}
            bordered={false}
            loading={loading}
            className="[&_.ant-table-thead>tr>th]:bg-pink-50"
          />
        </div>

        <Modal
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
          title={
            <div className="flex items-center gap-2">
              <EyeOutlined className="text-pink-500" />
              <span className="text-pink-500 font-semibold">
                Chi tiết thanh toán
              </span>
            </div>
          }
          width={700}
          className="[&_.ant-modal-header]:border-b-pink-200"
        >
          {selectedDetail && (
            <Card className="bg-pink-25 border-pink-100">
              <Descriptions
                bordered
                size="middle"
                column={1}
                className="[&_.ant-descriptions-item-label]:bg-pink-50"
              >
                <Descriptions.Item label="Mã thanh toán">
                  HD{selectedDetail.paymentId}
                </Descriptions.Item>
                <Descriptions.Item label="Tên bệnh nhân">
                  {selectedDetail.customerName}
                </Descriptions.Item>
                <Descriptions.Item label="Dịch vụ">
                  {selectedDetail.serviceName}
                </Descriptions.Item>
                <Descriptions.Item label="Giai đoạn điều trị">
                  {selectedDetail.stage}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày thanh toán">
                  {dayjs(selectedDetail.date).format("DD/MM/YYYY")}
                </Descriptions.Item>
                <Descriptions.Item label="Phương thức thanh toán">
                  {selectedDetail.method}
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  {selectedDetail.status}
                </Descriptions.Item>
                <Descriptions.Item label="Giá điều trị">
                  {selectedDetail.price.toLocaleString("vi-VN")} đ
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}
        </Modal>
      </div>
    </div>
  );
}
