import { Modal, Form, DatePicker, Input, Button, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";
import type { TypeTest } from "../../../../types/medicalRecord.d";

// Interface cho dữ liệu form
interface ConsultationResultFormData {
  date: Dayjs;
  resultValue: string;
  note?: string;
  typeTest: TypeTest[];
}

// Interface cho dữ liệu ban đầu (từ API)
interface InitialConsultationData {
  date: string | Date;
  resultValue: string;
  note?: string;
  typeTest: TypeTest[];
}

interface UpdateConsulationResultModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: ConsultationResultFormData) => void;
  initialValues: InitialConsultationData | null;
  typeTest: TypeTest[];
}

export const UpdateConsulationResultModal = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
}: UpdateConsulationResultModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues && open) {
      const formData: Partial<ConsultationResultFormData> = {
        ...initialValues,
        date: dayjs(initialValues.date),
      };
      form.setFieldsValue(formData);
    } else if (!open) {
      form.resetFields();
    }
  }, [initialValues, open, form]);

  return (
    <Modal
      open={open}
      title="Cập nhật kết quả xét nghiệm"
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item name="date" label="Ngày khám" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="resultValue"
          label="Kết quả"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="note" label="Ghi chú">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Loại xét nghiệm">
          <Form.List name="typeTest">
            {(fields, { add }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      label="Tên xét nghiệm"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên xét nghiệm!",
                        },
                      ]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        placeholder="Nhập tên xét nghiệm"
                        style={{ width: 200 }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "description"]}
                      label="Mô tả"
                      style={{ marginBottom: 0 }}
                    >
                      <Input placeholder="Nhập mô tả" style={{ width: 250 }} />
                    </Form.Item>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add({ name: "", description: "" })}
                    block
                    style={{ marginTop: 8 }}
                  >
                    + Thêm loại xét nghiệm
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
      </Form>
    </Modal>
  );
};
