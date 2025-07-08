"use client";

import {
  Card,
  Table,
  Typography,
  Descriptions,
  Tag,
  Button,
  message,
} from "antd";
import {
  DownloadOutlined,
  PrinterOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

const { Title, Text } = Typography;

interface PatientInfo {
  name: string;
  partner: string;
  birthday: string;
  age: number;
  phone: string;
  email: string;
  address: string;
}

interface TreatmentInfo {
  treatment: string;
  stage: string;
  status: string;
}

interface ServiceItem {
  key: string;
  serviceCode: string;
  serviceName: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export default function PaymentPage() {
  const patientInfo: PatientInfo = {
    name: "Nguyen Thi A",
    partner: "Tran Van B",
    birthday: "1992-05-10",
    age: 33,
    phone: "0909123456",
    email: "a.nguyen@example.com",
    address: "123 Đường Hoa Hồng, Quận 1, TP.HCM",
  };

  const treatmentInfo: TreatmentInfo = {
    treatment: "IVF",
    stage: "Chuyển phôi",
    status: "Đang điều trị",
  };

  const [services] = useState<ServiceItem[]>([
    {
      key: "1",
      serviceCode: "IVF001",
      serviceName: "Chọc hút trứng",
      unitPrice: 5000000,
      quantity: 1,
      total: 5000000,
    },
    {
      key: "2",
      serviceCode: "IVF002",
      serviceName: "Chuyển phôi",
      unitPrice: 7000000,
      quantity: 1,
      total: 7000000,
    },
  ]);

  const totalAmount = services.reduce((sum, s) => sum + s.total, 0);

  const columns: ColumnsType<ServiceItem> = [
    {
      title: "Mã dịch vụ",
      dataIndex: "serviceCode",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
    },
    {
      title: "Đơn giá",
      dataIndex: "unitPrice",
      render: (value: number) => value.toLocaleString("vi-VN") + " đ",
    },

    {
      title: "Thành tiền",
      dataIndex: "total",
      render: (value: number) => value.toLocaleString("vi-VN") + " đ",
    },
  ];

  const handlePrint = () => message.success("In hoá đơn thành công!");
  const handleDownload = () => message.success("Tải PDF thành công!");
  const handlePayment = () => message.success("Thanh toán thành công!");

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="m-6 p-6 border border-pink-300 rounded-lg bg-white">
        <div className="mb-6">
          <Title
            level={2}
            style={{ color: "#FF69B4" }}
            className=" font-bold mb-0"
          >
            Thanh toán khoản phí
          </Title>
        </div>

        <div className="mb-6">
          <Card className="border-pink-300 shadow-sm">
            <Descriptions
              title={
                <span className="text-pink-500 font-semibold">
                  Thông tin bệnh nhân
                </span>
              }
              bordered
              column={2}
              size="middle"
              className="[&_.ant-descriptions-item-label]:bg-pink-50 [&_.ant-descriptions-item-label]:text-gray-700"
            >
              <Descriptions.Item label="Họ tên (vợ)">
                <span className="font-medium">{patientInfo.name}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Họ tên (chồng)">
                <span className="font-medium">{patientInfo.partner}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Ngày sinh">
                {patientInfo.birthday}
              </Descriptions.Item>
              <Descriptions.Item label="Tuổi">
                {patientInfo.age}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {patientInfo.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {patientInfo.email}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ" span={2}>
                {patientInfo.address}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>

        <div className="mb-6">
          <Card className="border-pink-300 shadow-sm">
            <Descriptions
              title={
                <span className="text-pink-500 font-semibold">
                  Thông tin điều trị
                </span>
              }
              bordered
              column={2}
              size="middle"
              className="[&_.ant-descriptions-item-label]:bg-pink-50 [&_.ant-descriptions-item-label]:text-gray-700"
            >
              <Descriptions.Item label="Loại điều trị">
                <span className="font-medium">{treatmentInfo.treatment}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Giai đoạn hiện tại">
                <span className="font-medium">{treatmentInfo.stage}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color="processing" className="font-medium">
                  {treatmentInfo.status}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>

        <div className="mb-6">
          <Card className="border-pink-300 shadow-sm">
            <div className="mb-4">
              <h3 className="text-pink-500 font-semibold text-lg mb-4">
                Chi tiết dịch vụ
              </h3>
            </div>
            <Table
              columns={columns}
              dataSource={services}
              pagination={false}
              bordered
              className="[&_.ant-table-thead>tr>th]:bg-pink-50 [&_.ant-table-thead>tr>th]:text-gray-700 [&_.ant-table-thead>tr>th]:font-semibold"
            />
            <div className="flex justify-end mt-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
              <Text className="text-xl font-bold text-pink-600">
                Tổng cộng: {totalAmount.toLocaleString("vi-VN")} đ
              </Text>
            </div>
          </Card>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button
            icon={<PrinterOutlined />}
            onClick={handlePrint}
            className="border-pink-400 text-pink-500 hover:border-pink-500 hover:text-pink-600 font-medium px-6 py-2 h-auto"
            size="large"
          >
            In hoá đơn
          </Button>
          <Button
            icon={<DownloadOutlined />}
            onClick={handleDownload}
            className="border-pink-400 text-pink-500 hover:border-pink-500 hover:text-pink-600 font-medium px-6 py-2 h-auto"
            size="large"
          >
            Tải PDF
          </Button>
          <Button
            icon={<CreditCardOutlined />}
            type="primary"
            onClick={handlePayment}
            className="bg-pink-400 border-pink-400 hover:bg-pink-500 hover:border-pink-500 font-medium px-8 py-2 h-auto shadow-lg"
            size="large"
          >
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
}
