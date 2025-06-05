// Trang hồ sơ bệnh án của khách hàng
import React from "react";
import { Card, Typography, Button, Descriptions, Timeline, Tag, Space } from "antd";
import { Link } from "react-router-dom";
const { Title, Text } = Typography;

const customerInfo = {
  name: "Nguyễn Văn A",
  gender: "Nam",
  dob: "1990-05-20",
  phone: "0912345678",
  address: "123 Đường ABC, Quận 1, TP.HCM",
  email: "nguyenvana@gmail.com",
  id: "CUST001",
  bloodType: "A+",
  height: "165cm",
  weight: "55kg",
  emergencyContact: "Nguyễn Thị B (Vợ) - 0987654321"
};

const currentServices = [
  {
    id: "SVC001",
    name: "Thụ tinh nhân tạo IUI",
    startDate: "2024-03-01",
    status: "Đang thực hiện",
    doctor: "BS. Trần Văn C",
    nextAppointment: "2024-03-15"
  }
];

const treatmentHistory = [
  {
    date: "2024-02-15",
    type: "Khám sức khỏe tổng quát",
    doctor: "BS. Trần Văn C",
    notes: "Sức khỏe tốt, đủ điều kiện để thực hiện IUI"
  },
  {
    date: "2024-02-20",
    type: "Xét nghiệm máu",
    doctor: "BS. Lê Thị D",
    notes: "Kết quả xét nghiệm bình thường"
  }
];

const treatmentProcess = [
  { id: 1, stepName: 'Kiểm tra sức khỏe', date: '2023-10-01', status: 'Đã hoàn thành', note: 'Xét nghiệm máu, siêu âm' },
  { id: 2, stepName: 'Kích thích buồng trứng', date: '2023-10-10', status: 'Đang tiến hành', note: 'Dùng thuốc kích thích' },
  { id: 3, stepName: 'Chọc hút trứng', date: '2023-10-20', status: 'Chưa thực hiện', note: 'Lịch hẹn ngày 20/10' },
];

const MedicalRecord: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Thông tin cá nhân */}
      <Card className="rounded-xl shadow-lg">
        <Title level={3} className="text-pink-600 font-bold mb-4 text-center">Thông tin cá nhân</Title>
        <Descriptions
          column={2}
          bordered
          labelStyle={{ fontWeight: 600, color: '#d81b60', width: 180 }}
          contentStyle={{ fontWeight: 500 }}
        >
          <Descriptions.Item label="Mã khách hàng">{customerInfo.id}</Descriptions.Item>
          <Descriptions.Item label="Họ và tên">{customerInfo.name}</Descriptions.Item>
          <Descriptions.Item label="Giới tính">{customerInfo.gender}</Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">{new Date(customerInfo.dob).toLocaleDateString('vi-VN')}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{customerInfo.phone}</Descriptions.Item>
          <Descriptions.Item label="Email">{customerInfo.email}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{customerInfo.address}</Descriptions.Item>
          <Descriptions.Item label="Nhóm máu">{customerInfo.bloodType}</Descriptions.Item>
          <Descriptions.Item label="Chiều cao">{customerInfo.height}</Descriptions.Item>
          <Descriptions.Item label="Cân nặng">{customerInfo.weight}</Descriptions.Item>
          <Descriptions.Item label="Liên hệ khẩn cấp">{customerInfo.emergencyContact}</Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Dịch vụ đang sử dụng */}
      <Card className="rounded-xl shadow-lg">
        <Title level={3} className="text-pink-600 font-bold mb-4 text-center">Dịch vụ đang sử dụng</Title>
        {currentServices.map((service) => (
          <div key={service.id} className="p-4 border rounded-lg mb-4">
            <Space direction="vertical" size="small" className="w-full">
              <div className="flex justify-between items-center">
                <Text strong className="text-lg">{service.name}</Text>
                <Tag color="processing">{service.status}</Tag>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Text type="secondary">Bác sĩ phụ trách:</Text>
                  <Text strong> {service.doctor}</Text>
                </div>
                <div>
                  <Text type="secondary">Ngày bắt đầu:</Text>
                  <Text strong> {new Date(service.startDate).toLocaleDateString('vi-VN')}</Text>
                </div>
                <div>
                  <Text type="secondary">Lịch hẹn tiếp theo:</Text>
                  <Text strong> {new Date(service.nextAppointment).toLocaleDateString('vi-VN')}</Text>
                </div>
              </div>
            </Space>
          </div>
        ))}
      </Card>

      {/* Lịch sử điều trị */}
      <Card className="rounded-xl shadow-lg">
        <Title level={3} className="text-pink-600 font-bold mb-4 text-center">Lịch sử điều trị</Title>
        <Timeline
          items={treatmentHistory.map((item) => ({
            color: 'pink',
            children: (
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <Text strong>{item.type}</Text>
                  <Text type="secondary">{new Date(item.date).toLocaleDateString('vi-VN')}</Text>
                </div>
                <div>
                  <Text type="secondary">Bác sĩ: </Text>
                  <Text strong>{item.doctor}</Text>
                </div>
                <div>
                  <Text type="secondary">Ghi chú: </Text>
                  <Text>{item.notes}</Text>
                </div>
              </div>
            ),
          }))}
        />
      </Card>

      {/* Quá trình điều trị */}
      <Card className="rounded-xl shadow-lg" 
        title={
          <div className="flex justify-between items-center">
            <span className="text-pink-600 font-bold text-lg">Quá trình điều trị</span>
            <Link to="/user/treatment_management">
              <Button type="primary" className="bg-pink-500 hover:bg-pink-600 border-none rounded-lg text-white px-4 py-1 text-base font-semibold">
                Xem chi tiết
              </Button>
            </Link>
          </div>
        }
      >
        
          <div className="cursor-pointer hover:bg-gray-50 transition-colors duration-200">
            <Timeline
              items={treatmentProcess.map((step, idx) => ({
                color:
                  step.status === 'Đã hoàn thành'
                    ? 'green'
                    : step.status === 'Đang tiến hành'
                    ? 'pink'
                    : 'gray',
                children: (
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <Text strong>{`Bước ${idx + 1}: ${step.stepName}`}</Text>
                      <Tag color={
                        step.status === 'Đã hoàn thành'
                          ? 'success'
                          : step.status === 'Đang tiến hành'
                          ? 'processing'
                          : 'default'
                      }>
                        {step.status}
                      </Tag>
                    </div>
                    <Text type="secondary">Ngày: {new Date(step.date).toLocaleDateString('vi-VN')}</Text>
                    <div><Text type="secondary">Ghi chú: </Text>{step.note}</div>
                  </div>
                ),
              }))}
            />
          </div>
       
      </Card>
     
    </div>
  );
};

export default MedicalRecord; 