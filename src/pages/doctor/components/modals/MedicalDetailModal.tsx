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
} from "antd";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;

interface MedicalDetailFormValues {
  date: dayjs.Dayjs; // hoặc `Date` nếu bạn xử lý với JS Date
  road_id: string;
  treatment_result_id: string;
  type: string;
  test_result: string;
  note: string;
}

interface TreatmentRoadmapItem {
  Road_ID: string;
  Service_Name: string;
}

interface TreatmentResult {
  Treatment_result_ID: string;
  Road_ID: string;
}

interface MedicalDetailModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: MedicalDetailFormValues) => void;
  treatmentRoadmap: TreatmentRoadmapItem[];
  treatmentResults: TreatmentResult[];
  form: FormInstance<MedicalDetailFormValues>;
}

export function MedicalDetailModal({
  visible,
  onCancel,
  onSubmit,
  treatmentRoadmap,
  treatmentResults,
  form,
}: MedicalDetailModalProps) {
  return (
    <Modal
      title={<span style={{ color: "#ff69b4" }}>Thêm chi tiết điều trị</span>}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
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
              label={<span style={{ color: "#ff69b4" }}>Bước điều trị</span>}
              name="road_id"
              rules={[{ required: true, message: "Vui lòng chọn bước!" }]}
            >
              <Select placeholder="Chọn bước điều trị">
                {treatmentRoadmap.map((road) => (
                  <Option key={road.Road_ID} value={road.Road_ID}>
                    {road.Road_ID} - {road.Service_Name}
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
                    key={result.Treatment_result_ID}
                    value={result.Treatment_result_ID}
                  >
                    {result.Treatment_result_ID} - {result.Road_ID}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: "#ff69b4" }}>Loại ghi nhận</span>}
              name="type"
              rules={[{ required: true, message: "Vui lòng chọn loại!" }]}
            >
              <Select placeholder="Chọn loại ghi nhận">
                <Option value="Theo dõi">Theo dõi</Option>
                <Option value="Chẩn đoán">Chẩn đoán</Option>
                <Option value="Đánh giá lâm sàng">Đánh giá lâm sàng</Option>
                <Option value="Xét nghiệm">Xét nghiệm</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Kết quả xét nghiệm</span>}
          name="test_result"
          rules={[{ required: true, message: "Vui lòng nhập kết quả!" }]}
        >
          <TextArea rows={2} placeholder="Nhập kết quả xét nghiệm chi tiết" />
        </Form.Item>
        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Ghi chú</span>}
          name="note"
          rules={[{ required: true, message: "Vui lòng nhập ghi chú!" }]}
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
