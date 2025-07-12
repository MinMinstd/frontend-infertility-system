//Consulation result

import {
  Modal,
  Form,
  Input,
  // Select,
  Button,
  Space,
  type FormInstance,
} from "antd";
import type {
  MedicalRecordDetail,
  TypeTest,
} from "../../../../types/medicalRecord.d";

const { TextArea } = Input;
// const { Option } = Select;

interface TestResultFormValues {
  name: string;
  descriptionTypeTest: string;
  date: string;
  resultValue: string;
  // treatment_result_id: string;
  // result_id: string;
  note: string;
}

interface TreatmentResult {
  Treatment_result_ID: string;
  Road_ID: string;
}

interface TestResultModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreateConsulation: (values: TestResultFormValues) => void;
  treatmentResults: TreatmentResult[];
  medicalRecordDetails: MedicalRecordDetail[];
  form: FormInstance<TestResultFormValues>;
  testResults?: TypeTest[];
  setTestResults?: (testResults: TypeTest[]) => void;
}

export function TestResultModal({
  visible,
  onCancel,
  onCreateConsulation,
  // treatmentResults,
  // medicalRecordDetails,
  form,
}: // testResults,
// setTestResults,
TestResultModalProps) {
  return (
    <Modal
      title={<span style={{ color: "#ff69b4" }}>Thêm kết quả xét nghiệm</span>}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={onCreateConsulation}>
        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Tên xét nghiệm</span>}
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên xét nghiệm!" }]}
        >
          <Input placeholder="Ví dụ: Xét nghiệm máu, MRI, ..." />
        </Form.Item>
        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Mô tả chi tiết</span>}
          name="descriptionTypeTest"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <TextArea rows={2} placeholder="Mô tả chi tiết xét nghiệm" />
        </Form.Item>
        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Ngày</span>}
          name="date"
          rules={[{ required: true, message: "Vui lòng nhập ngày!" }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Giá trị kết quả</span>}
          name="resultValue"
          rules={[
            { required: true, message: "Vui lòng nhập giá trị kết quả!" },
          ]}
        >
          <Input placeholder="Ví dụ: Dương tính, Âm tính, ..." />
        </Form.Item>
        {/* <Form.Item
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
        </Form.Item> */}
        {/* <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Chi tiết liên kết</span>}
          name="result_id"
          rules={[{ required: true, message: "Vui lòng chọn chi tiết!" }]}
        >
          <Select placeholder="Chọn chi tiết ghi chú">
            {medicalRecordDetails.map((detail) => (
              <Option
                key={detail.medicalRecordDetailId}
                value={detail.medicalRecordDetailId}
              >
                {detail.medicalRecordDetailId} - {detail.date}
              </Option>
            ))}
          </Select>
        </Form.Item> */}
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
