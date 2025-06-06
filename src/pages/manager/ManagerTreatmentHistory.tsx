import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Space, message, DatePicker } from "antd";
import { Edit, Delete, Plus } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

interface TreatmentHistory {
  key: string;
  id: string;
  patientName: string;
  doctorName: string;
  treatmentType: string;
  startDate: string;
  endDate: string;
  status: "ongoing" | "completed" | "cancelled";
  notes: string;
}

interface TreatmentFormValues {
  id: string;
  patientName: string;
  doctorName: string;
  treatmentType: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  status: "ongoing" | "completed" | "cancelled";
  notes: string;
}

const ManagerTreatmentHistory: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentHistory | null>(null);
  const [form] = Form.useForm();

  // Mock data - replace with actual API call
  const treatments: TreatmentHistory[] = [
    {
      key: "1",
      id: "TRT001",
      patientName: "Nguyễn Thị A",
      doctorName: "BS. Trần Văn B",
      treatmentType: "Thụ tinh trong ống nghiệm",
      startDate: "2024-03-01",
      endDate: "2024-03-15",
      status: "completed",
      notes: "Điều trị thành công",
    },
    {
      key: "2",
      id: "TRT002",
      patientName: "Lê Văn C",
      doctorName: "BS. Nguyễn Thị D",
      treatmentType: "Kích thích buồng trứng",
      startDate: "2024-03-10",
      endDate: "2024-03-25",
      status: "ongoing",
      notes: "Đang trong quá trình điều trị",
    },
    {
      key: "3",
      id: "TRT003",
      patientName: "Phạm Thị E",
      doctorName: "BS. Hoàng Văn F",
      treatmentType: "Thụ tinh nhân tạo",
      startDate: "2024-03-05",
      endDate: "2024-03-20",
      status: "cancelled",
      notes: "Bệnh nhân hủy điều trị",
    },
  ];

  const columns: ColumnsType<TreatmentHistory> = [
    {
      title: "Mã điều trị",
      dataIndex: "id",
      key: "id",
      width: 120,
    },
    {
      title: "Tên bệnh nhân",
      dataIndex: "patientName",
      key: "patientName",
      width: 150,
    },
    {
      title: "Bác sĩ điều trị",
      dataIndex: "doctorName",
      key: "doctorName",
      width: 150,
    },
    {
      title: "Loại điều trị",
      dataIndex: "treatmentType",
      key: "treatmentType",
      width: 200,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      width: 120,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      width: 120,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string) => {
        const statusConfig = {
          ongoing: { color: "blue", text: "Đang điều trị" },
          completed: { color: "green", text: "Hoàn thành" },
          cancelled: { color: "red", text: "Đã hủy" },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm bg-${config.color}-100 text-${config.color}-800`}
          >
            {config.text}
          </span>
        );
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "notes",
      key: "notes",
      width: 200,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<Edit className="w-4 h-4" />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button
            danger
            icon={<Delete className="w-4 h-4" />}
            onClick={() => handleDelete()}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (treatment: TreatmentHistory) => {
    setSelectedTreatment(treatment);
    form.setFieldsValue({
      ...treatment,
      startDate: dayjs(treatment.startDate),
      endDate: dayjs(treatment.endDate),
    });
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa lịch sử điều trị này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        // Handle delete logic here
        message.success("Đã xóa lịch sử điều trị thành công");
      },
    });
  };

  const handleSubmit = (values: TreatmentFormValues) => {
    const formattedValues = {
      ...values,
      startDate: values.startDate.format("YYYY-MM-DD"),
      endDate: values.endDate.format("YYYY-MM-DD"),
    };

    if (selectedTreatment) {
      // Update existing treatment with formattedValues
      console.log("Updating treatment:", formattedValues);
      message.success("Cập nhật lịch sử điều trị thành công");
    } else {
      // Add new treatment with formattedValues
      console.log("Adding new treatment:", formattedValues);
      message.success("Thêm lịch sử điều trị mới thành công");
    }
    setIsModalVisible(false);
    form.resetFields();
    setSelectedTreatment(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý lịch sử điều trị</h1>
            <Button
              type="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => {
                setSelectedTreatment(null);
                form.resetFields();
                setIsModalVisible(true);
              }}
            >
              Thêm lịch sử điều trị mới
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={treatments}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>

      <Modal
        title={selectedTreatment ? "Sửa lịch sử điều trị" : "Thêm lịch sử điều trị mới"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setSelectedTreatment(null);
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
        >
          <Form.Item
            name="id"
            label="Mã điều trị"
            rules={[{ required: true, message: "Vui lòng nhập mã điều trị" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="patientName"
            label="Tên bệnh nhân"
            rules={[{ required: true, message: "Vui lòng nhập tên bệnh nhân" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="doctorName"
            label="Bác sĩ điều trị"
            rules={[{ required: true, message: "Vui lòng nhập tên bác sĩ" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="treatmentType"
            label="Loại điều trị"
            rules={[{ required: true, message: "Vui lòng chọn loại điều trị" }]}
          >
            <Select>
              <Select.Option value="Thụ tinh trong ống nghiệm">
                Thụ tinh trong ống nghiệm
              </Select.Option>
              <Select.Option value="Kích thích buồng trứng">
                Kích thích buồng trứng
              </Select.Option>
              <Select.Option value="Thụ tinh nhân tạo">
                Thụ tinh nhân tạo
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="startDate"
            label="Ngày bắt đầu"
            rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="Ngày kết thúc"
            rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select>
              <Select.Option value="ongoing">Đang điều trị</Select.Option>
              <Select.Option value="completed">Hoàn thành</Select.Option>
              <Select.Option value="cancelled">Đã hủy</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="notes"
            label="Ghi chú"
            rules={[{ required: true, message: "Vui lòng nhập ghi chú" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Space>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  form.resetFields();
                  setSelectedTreatment(null);
                }}
              >
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                {selectedTreatment ? "Cập nhật" : "Thêm mới"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerTreatmentHistory; 