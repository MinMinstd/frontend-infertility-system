import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Space,
  type FormInstance,
} from "antd";

const { TextArea } = Input;
const { Option } = Select;

interface TestResultFormValues {
  name: string;
  description: string;
  treatment_result_id: string;
  result_id: string;
  note: string;
}

interface TreatmentResult {
  Treatment_result_ID: string;
  Road_ID: string;
}

interface MedicalRecordDetail {
  Detail_ID: string;
  Date: string;
}

interface TestResultModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: TestResultFormValues) => void;
  treatmentResults: TreatmentResult[];
  medicalRecordDetails: MedicalRecordDetail[];
  form: FormInstance<TestResultFormValues>;
}

export function TestResultModal({
  visible,
  onCancel,
  onSubmit,
  treatmentResults,
  medicalRecordDetails,
  form,
}: TestResultModalProps) {
  return (
    <Modal
      title={<span style={{ color: "#ff69b4" }}>Thêm kết quả xét nghiệm</span>}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Tên xét nghiệm</span>}
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên xét nghiệm!" }]}
        >
          <Input placeholder="Ví dụ: Xét nghiệm máu, MRI, ..." />
        </Form.Item>
        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Mô tả chi tiết</span>}
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <TextArea rows={2} placeholder="Mô tả chi tiết xét nghiệm" />
        </Form.Item>
        <Form.Item
          label={
            <span style={{ color: "#ff69b4" }}>Kết quả điều trị liên quan</span>
          }
          name="treatment_result_id"
          rules={[{ required: true, message: "Vui lòng chọn kết quả!" }]}
        >
          <Select placeholder="Chọn kết quả điều trị">
            {treatmentResults.map((result) => (
              <Option
                key={result.Treatment_result_ID}
                value={result.Treatment_result_ID}
              >
                {result.Treatment_result_ID} - {result.Road_ID}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Chi tiết liên kết</span>}
          name="result_id"
          rules={[{ required: true, message: "Vui lòng chọn chi tiết!" }]}
        >
          <Select placeholder="Chọn chi tiết ghi chú">
            {medicalRecordDetails.map((detail) => (
              <Option key={detail.Detail_ID} value={detail.Detail_ID}>
                {detail.Detail_ID} - {detail.Date}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Đánh giá chuyên môn</span>}
          name="note"
          rules={[{ required: true, message: "Vui lòng nhập đánh giá!" }]}
        >
          <TextArea
            rows={3}
            placeholder="Đánh giá chuyên môn về kết quả xét nghiệm"
          />
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
              Lưu xét nghiệm
            </Button>
            <Button onClick={onCancel}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
