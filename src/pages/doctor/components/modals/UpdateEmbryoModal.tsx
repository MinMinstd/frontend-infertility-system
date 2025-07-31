// File: src/pages/doctor/components/modals/UpdateEmbryoModal.tsx

import {
  Modal,
  Form,
  DatePicker,
  Input,
  Select,
  message,
  type FormInstance,
} from "antd";
import dayjs from "dayjs";
import type { UpdateEmbryo, Embryo } from "../../../../types/medicalRecord.d";
import { useEffect } from "react";

interface UpdateEmbryoModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: UpdateEmbryo) => void;
  form: FormInstance;
  embryo: Embryo | null;
}

const { TextArea } = Input;

export function UpdateEmbryoModal({
  open,
  onCancel,
  onSubmit,
  form,
  embryo,
}: UpdateEmbryoModalProps) {
  useEffect(() => {
    if (open && embryo) {
      form.setFieldsValue({
        transferredAt: embryo.transferredAt
          ? dayjs(embryo.transferredAt)
          : undefined,
        type: embryo.type,
        status: embryo.status,
        note: embryo.note,
      });
    }
  }, [open, embryo, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload: UpdateEmbryo = {
        ...values,
        transferredAt: values.transferredAt.format("YYYY-MM-DD"),
      };
      onSubmit(payload);
    } catch {
      message.error("Vui lòng điền đầy đủ thông tin trước khi lưu");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      title="Cập nhật thông tin phôi"
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Ngày chuyển phôi"
          name="transferredAt"
          rules={[
            { required: true, message: "Vui lòng chọn ngày chuyển phôi" },
          ]}
        >
          <DatePicker className="w-full" format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          label="Loại phôi"
          name="type"
          rules={[{ required: true, message: "Vui lòng chọn loại phôi" }]}
        >
          <Select
            placeholder="Chọn loại phôi"
            options={[
              { label: "AA", value: "AA" },
              { label: "BB", value: "BB" },
              { label: "2BB", value: "2BB" },
              { label: "2AC", value: "2AC" },
              { label: "3CA", value: "3CA" },
            ]}
          />

        </Form.Item>

        <Form.Item
          label="Tình trạng"
          name="status"
          rules={[{ required: true, message: "Vui lòng chọn tình trạng" }]}
        >
          <Select
            placeholder="Chọn tình trạng"
            options={[
              { label: "Đạt chuẩn", value: "Đạt chuẩn" },
              { label: "Không đạt chuẩn", value: "Không đạt chuẩn" },
              { label: "Đã tạo phôi", value: "Đã tạo phôi" },
              { label: "Tạo phôi thất bại", value: "Tạo phôi thất bại" },
              { label: "Chuyển phôi thất bại", value: "Chuyển phôi thất bại" },
              { label: "Đã chuyển phôi", value: "Đã chuyển phôi" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Ghi chú" name="note">
          <TextArea rows={3} placeholder="Ghi chú thêm về phôi (nếu có)" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
