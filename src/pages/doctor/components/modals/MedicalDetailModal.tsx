import {
  Modal,
  Form,
  Row,
  Col,
  DatePicker,
  Select,
  Input,
  Button,
  Space,
  type FormInstance,
  message,
} from "antd";
import dayjs from "dayjs";
import type {
  CreateMedicalRecordDetail,
  TreatmentResult_typeTest,
  treatmentRoadmap,
} from "../../../../types/medicalRecord.d";

type FormValues = CreateMedicalRecordDetail & {
  date: dayjs.Dayjs;
};

const { TextArea } = Input;
const { Option } = Select;

/**
 * Props for the MedicalDetailModal component
 */
interface MedicalDetailModalProps {
  /** Controls the visibility of the modal */
  open: boolean;
  /** Callback function when modal is cancelled */
  onCancel: () => void;
  /** Callback function when form is submitted */
  onSubmit: (values: CreateMedicalRecordDetail) => void;
  /** Array of treatment roadmap steps */
  treatmentRoadmap: treatmentRoadmap[];
  /** Array of treatment result options */
  treatmentResults: TreatmentResult_typeTest[];
  /** Form instance for controlling the form */
  form: FormInstance<FormValues>;
  /** Loading state of the submit button */
  loading?: boolean;

  isEditing?: boolean;
}

export function MedicalDetailModal({
  open,
  onCancel,
  onSubmit,
  treatmentRoadmap,
  treatmentResults,

  form,
  loading = false,
}: MedicalDetailModalProps) {
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit({
        ...values,
        date: values.date,
      });
    } catch (error) {
      console.log("Lỗi khi submit form:", error);
      message.error("Xảy ra lỗi khi xác thực form");
    }
  };

  return (
    <Modal
      title={<span style={{ color: "#ff69b4" }}>Thêm chi tiết điều trị</span>}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: "#ff69b4" }}>Ngày thực hiện</span>}
              name="date"
              rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
            >
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={
                <span style={{ color: "#ff69b4" }}>Giai đoạn điều trị</span>
              }
              name="road_id"
              rules={[{ required: true, message: "Vui lòng chọn bước!" }]}
            >
              <Select placeholder="Chọn bước điều trị">
                {treatmentRoadmap.map((road) => (
                  <Option
                    key={road.treatmentRoadmapId}
                    value={road.treatmentRoadmapId}
                  >
                    {`Bước ${road.treatmentRoadmapId} - ${road.stage}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: "#ff69b4" }}>Kết quả điều trị</span>}
              name="treatment_result_id"
              rules={[{ required: true, message: "Vui lòng chọn kết quả!" }]}
            >
              <Select placeholder="Chọn kết quả điều trị">
                {treatmentResults.map((result) => (
                  <Option
                    key={result.treatmentResultId}
                    value={result.treatmentResultId}
                  >
                    {`#${result.treatmentResultId} - ${result.description}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: "#ff69b4" }}>Loại ghi nhận</span>}
              name="typeName"
              rules={[{ required: true, message: "Vui lòng chọn loại!" }]}
            >
              <Select placeholder="Chọn loại ghi nhận">
                <Option value="Consultation">Tư vấn</Option>
                <Option value="Treatment">Điều trị</Option>
                <Option value="Result">Kết quả</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Kết quả xét nghiệm</span>}
          name="testResult"
        >
          <TextArea rows={2} placeholder="Nhập kết quả xét nghiệm chi tiết" />
        </Form.Item>
        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Ghi chú</span>}
          name="note"
        >
          <TextArea rows={3} placeholder="Nhập ghi chú bổ sung" />
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
              loading={loading}
            >
              Lưu chi tiết
            </Button>
            <Button onClick={onCancel}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
