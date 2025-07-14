import {
  Modal,
  Form,
  DatePicker,
  Input,
  Select,
  message,
  type FormInstance,
} from "antd";
import { useEffect } from "react";
import type { PropsWithChildren } from "react";

import type { CreateEmbryo } from "../../../../types/medicalRecord.d";

interface CreateEmbryoModalProps extends PropsWithChildren {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: CreateEmbryo) => void;
  form: FormInstance;
}

const { TextArea } = Input;

export function CreateEmbryoModal({
  open,
  onCancel,
  onSubmit,
  form,
}: CreateEmbryoModalProps) {
  useEffect(() => {
    if (open) form.resetFields();
  }, [open, form]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onSubmit({
              ...values,
              createAt: values.createAt.format("YYYY-MM-DD"),
            });
          })
          .catch(() => message.error("Vui lòng điền đầy đủ thông tin"));
      }}
      title="Tạo mới phôi"
      okText="Tạo"
      cancelText="Hủy"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Ngày tạo"
          name="createAt"
          rules={[{ required: true, message: "Chọn ngày tạo phôi" }]}
        >
          <DatePicker className="w-full" placeholder="Chọn ngày tạo phôi" />
        </Form.Item>

        <Form.Item
          label="Chất lượng"
          name="quality"
          rules={[{ required: true, message: "Chọn chất lượng phôi" }]}
        >
          <Select
            placeholder="Chọn chất lượng phôi"
            options={[
              { label: "Tốt", value: "Tốt" },
              { label: "Trung bình", value: "Trung bình" },
              { label: "Kém", value: "Kém" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Tình trạng"
          name="status"
          rules={[{ required: true, message: "Chọn tình trạng phôi" }]}
        >
          <Select
            placeholder="Chọn tình trạng phôi"
            options={[
              { label: "Đạt chuẩn", value: "Đạt chuẩn" },
              { label: "Không đạt chuẩn", value: "Không đạt chuẩn" },
              { label: "Đã tạo phôi", value: "Đã tạo phôi" },
              { label: "Chuyển phôi thất bại", value: "Chuyển phôi thất bại" },
              { label: "Đã chuyển phôi", value: "Đã chuyển phôi" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Ghi chú" name="note">
          <TextArea
            rows={3}
            placeholder="Thông tin bổ sung về phôi (tùy chọn)"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
