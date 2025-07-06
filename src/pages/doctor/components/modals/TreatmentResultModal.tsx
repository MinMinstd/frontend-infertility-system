import { Modal, Form, Input, DatePicker, Button, Select, Space } from "antd";
import type { FormInstance } from "antd";
import dayjs from "dayjs";
import type {
  TreatmentResult_typeTest,
  treatmentRoadmap,
  UpdateTreatmentResultFormValues,
  CreateTreatmentResultWithTypeTest,
} from "../../../../types/medicalRecord.d";

const { TextArea } = Input;
const { Option } = Select;

type CommonProps = {
  open: boolean;
  onCancel: () => void;
  form: FormInstance<
    UpdateTreatmentResultFormValues | CreateTreatmentResultWithTypeTest
  >;
  treatmentRoadmap: treatmentRoadmap[];
};

type UpdateProps = {
  isEditing: true;
  treatmentResult: TreatmentResult_typeTest;
  onSubmit: (values: UpdateTreatmentResultFormValues) => void;
};

type CreateProps = {
  isEditing: false;
  treatmentResult: null;
  onSubmit: (values: CreateTreatmentResultWithTypeTest) => void;
};

export type TreatmentResultModalProps = CommonProps &
  (UpdateProps | CreateProps);

export function TreatmentResultModal(props: TreatmentResultModalProps) {
  const {
    open,
    onCancel,
    form,
    treatmentRoadmap,
    isEditing,
    treatmentResult,
    onSubmit,
  } = props;

  const title = isEditing
    ? "Cập nhật kết quả điều trị"
    : "Thêm kết quả điều trị mới";
  const okText = isEditing ? "Lưu" : "Tạo mới";

  const initialValues = isEditing
    ? {
        dateTreatmentResult: dayjs(treatmentResult.dateTreatmentResult),
        description: treatmentResult.description,
        result: treatmentResult.result,
        typeTest: treatmentResult.typeTest ?? [],
        treatmentRoadmapId: treatmentResult.treatmentRoadmapId,
      }
    : {
        typeTest: [],
      };

  // Tạo hàm xử lý submit an toàn với TypeScript
  const handleFormSubmit = (
    values: UpdateTreatmentResultFormValues | CreateTreatmentResultWithTypeTest
  ) => {
    if (isEditing) {
      (onSubmit as (values: UpdateTreatmentResultFormValues) => void)(
        values as UpdateTreatmentResultFormValues
      );
    } else {
      (onSubmit as (values: CreateTreatmentResultWithTypeTest) => void)(
        values as CreateTreatmentResultWithTypeTest
      );
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      title={title}
      okText={okText}
      cancelText="Hủy"
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          label="Ngày kết quả điều trị"
          name="dateTreatmentResult"
          rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
        >
          <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
        </Form.Item>

        {!isEditing && (
          <>
            <Form.Item
              label="Giai đoạn điều trị"
              name="stage"
              rules={[{ required: true, message: "Vui lòng nhập giai đoạn" }]}
            >
              <Input placeholder="Ví dụ: Giai đoạn 1" />
            </Form.Item>

            <Form.Item
              label="Thời gian (số ngày)"
              name="durationDay"
              rules={[{ required: true, message: "Vui lòng nhập số ngày" }]}
            >
              <Input type="number" placeholder="VD: 10" />
            </Form.Item>
          </>
        )}

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

        <Form.Item
          label="Bước điều trị tương ứng"
          name="treatmentRoadmapId"
          rules={[{ required: true, message: "Vui lòng chọn bước điều trị" }]}
        >
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

        {isEditing ? (
          // Nếu đang cập nhật: danh sách nhiều xét nghiệm
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
        ) : (
          // Nếu tạo mới: chỉ 1 xét nghiệm duy nhất
          <>
            <Form.Item
              label="Tên xét nghiệm"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên xét nghiệm" },
              ]}
            >
              <Input placeholder="Ví dụ: Beta hCG" />
            </Form.Item>

            <Form.Item
              label="Mô tả xét nghiệm"
              name="descriptionTypeTest"
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <TextArea rows={2} placeholder="Mô tả chi tiết xét nghiệm..." />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
}
