// File: src/pages/PatientDetail/components/modals/MedicalRecordModal.tsx

import { Modal, Form, Input, DatePicker, Select, InputNumber } from "antd";
import { useEffect } from "react";
// import type { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface MedicalRecordModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: {
    startDate: string;
    endDate: string;
    stage: string;
    diagnosis: string;
    status: string;
    attempt: number;
  }) => void;
}

export function MedicalRecordModal({
  open,
  onCancel,
  onSubmit,
}: MedicalRecordModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) form.resetFields();
  }, [open, form]);

  const handleFinish = (values: {
    dates: [string, string];
    stage: string;
    diagnosis: string;
    status: string;
    attempt: number;
  }) => {
    const [startDate, endDate] = values.dates;
    onSubmit({
      startDate: startDate,
      endDate: endDate,
      stage: values.stage,
      diagnosis: values.diagnosis,
      status: values.status,
      attempt: values.attempt,
    });
  };

  return (
    <Modal
      open={open}
      title="Tạo mới hồ sơ điều trị"
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Tạo"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="dates"
          label="Thời gian điều trị"
          rules={[{ required: true }]}
        >
          <RangePicker format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item name="stage" label="Giai đoạn" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="diagnosis"
          label="Chẩn đoán"
          rules={[{ required: true }]}
        >
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="Pending">Đang chờ</Select.Option>
            <Select.Option value="In Progress">Đang điều trị</Select.Option>
            <Select.Option value="Complete">Hoàn tất</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="attempt"
          label="Lần điều trị"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
