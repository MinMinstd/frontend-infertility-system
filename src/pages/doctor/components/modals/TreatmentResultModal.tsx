import { Modal, Form, Input, DatePicker, Button, Select, Space } from "antd";
import type { FormInstance } from "antd";
import dayjs from "dayjs";
import type {
  TreatmentResult_typeTest,
  treatmentRoadmap,
  UpdateTreatmentResultFormValues,
} from "../../../../types/medicalRecord.d";

const { TextArea } = Input;
const { Option } = Select;

interface TreatmentResultModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: UpdateTreatmentResultFormValues) => void;
  form: FormInstance<UpdateTreatmentResultFormValues>;
  treatmentRoadmap: treatmentRoadmap[];
  treatmentResult: TreatmentResult_typeTest | null;
}

export function TreatmentResultModal({
  visible,
  onCancel,
  onSubmit,
  form,
  treatmentRoadmap,
  treatmentResult,
}: TreatmentResultModalProps) {
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      title="Cập nhật kết quả điều trị"
      okText="Lưu"
      cancelText="Hủy"
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          dateTreatmentResult: treatmentResult
            ? dayjs(treatmentResult.date)
            : undefined,
          description: treatmentResult?.description || "",
          result: treatmentResult?.result || "",
          typeTest: treatmentResult?.typeTest || [],
          treatmentRoadmapId: treatmentResult?.treatmentRoadmapId,
        }}
      >
        <Form.Item
          label="Ngày kết quả điều trị"
          name="dateTreatmentResult"
          rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
        >
          <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          label="Mô tả kết quả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <TextArea rows={3} placeholder="Mô tả chi tiết..." />
        </Form.Item>

        <Form.Item
          label="Kết luận kết quả"
          name="result"
          rules={[{ required: true, message: "Vui lòng nhập kết luận" }]}
        >
          <Input placeholder="Ví dụ: Đạt, Cần theo dõi thêm,..." />
        </Form.Item>

        <Form.Item label="Bước điều trị tương ứng" name="treatmentRoadmapId">
          <Select placeholder="Chọn bước điều trị">
            {treatmentRoadmap.map((item) => (
              <Option
                key={item.treatmentRoadmapId}
                value={item.treatmentRoadmapId}
              >
                Bước {item.stepNumber} - {item.stage}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.List name="typeTest">
          {(fields, { add, remove }) => (
            <>
              <label style={{ fontWeight: 600 }}>Danh sách xét nghiệm</label>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    rules={[{ required: true, message: "Tên xét nghiệm?" }]}
                  >
                    <Input placeholder="Tên xét nghiệm" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "description"]}
                    rules={[{ required: true, message: "Mô tả?" }]}
                  >
                    <Input placeholder="Mô tả" />
                  </Form.Item>
                  <Button danger type="text" onClick={() => remove(name)}>
                    Xóa
                  </Button>
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  + Thêm xét nghiệm
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
}
