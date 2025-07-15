import { Modal, Form, Input, DatePicker, Select } from "antd";
import type { MedicalRecord } from "../../../../types/medicalRecord.d";
import dayjs from "dayjs";

interface Props {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: {
    endDate: string;
    stage: string;
    diagnosis: string;
    status: string;
    attempt: number;
  }) => void;
  record: MedicalRecord | null;
}

const statusOptions = ["Đang điều trị", "Thành công", "Thất bại"];

export function UpdateMedicalRecordStatusModal({
  open,
  onCancel,
  onSubmit,
  record,
}: Props) {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="Cập nhật hồ sơ điều trị"
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Cập nhật"
      cancelText="Hủy"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          endDate: record ? dayjs(record.endDate) : undefined,
          stage: record?.stage,
          diagnosis: record?.diagnosis,
          status: record?.status,
          attempt: record?.attempt,
        }}
        onFinish={(values) =>
          onSubmit({
            ...values,
            endDate: values.endDate.format("YYYY-MM-DD"),
            attempt: Number(values.attempt),
          })
        }
      >
        <Form.Item
          label="Giai đoạn"
          name="stage"
          rules={[{ required: true, message: "Vui lòng nhập giai đoạn" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Chẩn đoán"
          name="diagnosis"
          rules={[{ required: true, message: "Vui lòng nhập chẩn đoán" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          <Select
            options={statusOptions.map((s) => ({ label: s, value: s }))}
          />
        </Form.Item>

        <Form.Item
          label="Số lần điều trị"
          name="attempt"
          rules={[{ required: true, message: "Vui lòng nhập số lần" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Ngày kết thúc"
          name="endDate"
          rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc" }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
