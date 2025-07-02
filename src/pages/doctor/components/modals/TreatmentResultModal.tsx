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

interface TreatmentResultFormValues {
  treatmentRoadmapId: number;
  date: string;
  stage: string;
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
  onSubmit: (values: TreatmentResultFormValues) => void;
  treatmentRoadmap: TreatmentRoadmapItem[];
  form: FormInstance<TreatmentResultFormValues>;
}

export function TreatmentResultModal({
  visible,
  onCancel,
  onSubmit,
  treatmentRoadmap,
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
          label={<span style={{ color: "#ff69b4" }}>Bước điều trị</span>}
          name="road_id"
          rules={[{ required: true, message: "Vui lòng chọn bước điều trị!" }]}
        >
          <Select placeholder="Chọn bước điều trị">
            {treatmentRoadmap.map((road) => (
              <Option
                key={road.treatmentRoadmapId}
                value={`R${road.treatmentRoadmapId}`}
              >
                R{road.treatmentRoadmapId} - {road.stage}
              </Option>
            ))}
          </Select>
        </Form.Item>
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
          label={<span style={{ color: "#ff69b4" }}>Kết quả</span>}
          name="result"
          rules={[{ required: true, message: "Vui lòng chọn kết quả!" }]}
        >
          <Select placeholder="Chọn kết quả">
            <Option value="Hoàn thành">Hoàn Thành</Option>
            <Option value="Đang xử lý">Đang Xử Lý</Option>
            <Option value="Thất bại">Thất Bại</Option>
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
              Lưu kết quả
            </Button>
            <Button onClick={onCancel}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
