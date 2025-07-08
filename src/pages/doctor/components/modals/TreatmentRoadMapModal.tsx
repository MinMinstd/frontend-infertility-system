import {
  Modal,
  Form,
  Select,
  DatePicker,
  Input,
  Button,
  Space,
  type FormInstance,
} from "antd";

const { TextArea } = Input;
const { Option } = Select;

interface TreatmentRoadmapUpdateFormValues {
  date: string;
  description: string;
  durationDay: number;
  status: string;
}

interface TreatmentRoadmapItem {
  treatmentRoadmapId: number;
  stage: string;
}

interface TreatmentResultModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: TreatmentRoadmapUpdateFormValues) => void;
  treatmentRoadmap: TreatmentRoadmapItem[];
  form: FormInstance<TreatmentRoadmapUpdateFormValues>;
}

export function TreatmentRoadMapModal({
  visible,
  onCancel,
  onSubmit,
  form,
}: TreatmentResultModalProps) {
  return (
    <Modal
      title={
        <span style={{ color: "#ff69b4" }}>Cập nhật kết quả điều trị</span>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Ngày cập nhật</span>}
          name="date"
          rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
        >
          <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Mô tả điều trị</span>}
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <TextArea rows={3} placeholder="Nhập mô tả chi tiết điều trị" />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Thời gian (ngày)</span>}
          name="durationDay"
          rules={[{ required: true, message: "Vui lòng nhập thời gian!" }]}
        >
          <Input type="number" min={1} placeholder="Số ngày điều trị" />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Trạng thái</span>}
          name="status"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
        >
          <Select placeholder="Chọn trạng thái">
            <Option value="Đã hoàn thành">Đã hoàn thành</Option>
            <Option value="Đang tiến hành">Đang tiến hành</Option>
            <Option value="Chưa bắt đầu">Chưa bắt đầu</Option>
          </Select>
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
              Cập nhật
            </Button>
            <Button onClick={onCancel}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
