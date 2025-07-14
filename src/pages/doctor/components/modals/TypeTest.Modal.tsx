import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Space,
  type FormInstance,
} from "antd";
import type { ConsulationResult_typeTest } from "../../../../types/medicalRecord.d";

const { Option } = Select;

export interface CreateTypeTestFormValues {
  name: string;
  description: string;
  consulationResultId: number;
}

interface CreateTypeTestModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: CreateTypeTestFormValues) => void;
  consulationResults: ConsulationResult_typeTest[];
  form?: FormInstance<CreateTypeTestFormValues>;
}

export function CreateTypeTestModal({
  visible,
  onCancel,
  onSubmit,
  consulationResults,
  form,
}: CreateTypeTestModalProps) {
  const [internalForm] = Form.useForm<CreateTypeTestFormValues>();
  const currentForm = form || internalForm;

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      title={<span style={{ color: "#ff69b4" }}>Thêm loại xét nghiệm</span>}
      destroyOnClose
    >
      <Form
        form={currentForm}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{}}
      >
        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Kết quả xét nghiệm</span>}
          name="consulationResultId"
          rules={[{ required: true, message: "Vui lòng chọn kết quả!" }]}
        >
          <Select placeholder="Chọn kết quả xét nghiệm">
            {consulationResults.map((item) => (
              <Option
                key={item.consulationResultId}
                value={item.consulationResultId}
              >
                {item.resultValue}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Tên loại test</span>}
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên loại test!" }]}
        >
          <Input placeholder="VD: Beta HCG, FSH, ..." />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Mô tả</span>}
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <Input.TextArea rows={3} placeholder="Nhập mô tả chi tiết..." />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#ff69b4",
                borderColor: "#ff69b4",
              }}
            >
              Lưu loại test
            </Button>
            <Button onClick={onCancel}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
