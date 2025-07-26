import { Modal, Form, Input, DatePicker, Select, message } from "antd";
import type { FormInstance } from "antd/es/form";
import dayjs from "dayjs";

// Define UpdateMedicalRecordDetail interface
interface UpdateMedicalRecordDetail {
  date: string;
  testResult?: string;
  note?: string;
  status: string;
}

const { TextArea } = Input;
const { Option } = Select;

interface UpdateMedicalDetailModalProps {
  /** Controls the visibility of the modal */
  open: boolean;
  /** Callback function when modal is cancelled */
  onCancel: () => void;
  /** Callback function when form is submitted */
  onSubmit: (values: UpdateMedicalRecordDetail) => void;
  /** Form instance for controlling the form */
  form: FormInstance;
  /** Loading state of the submit button */
  loading?: boolean;
}

const statusOptions = ["Đang điều trị", "Hoàn thành", "Tạm dừng", "Hủy bỏ"];

export function UpdateMedicalDetailModal({
  open,
  onCancel,
  onSubmit,
  form,
  loading = false,
}: UpdateMedicalDetailModalProps) {
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // Kiểm tra và format date
      if (!values.date) {
        message.error("Vui lòng chọn ngày thực hiện!");
        return;
      }

      const formattedDate = dayjs(values.date).isValid() 
        ? dayjs(values.date).format("YYYY-MM-DD")
        : null;

      if (!formattedDate) {
        message.error("Ngày không hợp lệ!");
        return;
      }

      const formattedValues: UpdateMedicalRecordDetail = {
        date: formattedDate,
        testResult: values.testResult?.trim() || undefined,
        note: values.note?.trim() || undefined,
        status: values.status,
      };

      onSubmit(formattedValues);
      console.log("UPDATE VALUES", formattedValues);
      console.log("Date sent to backend:", formattedValues.date);
      console.log("Type of date:", typeof formattedValues.date);
    } catch (error) {
      console.log("Lỗi khi submit form:", error);
      message.error("Xảy ra lỗi khi xác thực form");
    }
  };

  return (
    <Modal
      title={<span style={{ color: "#ff69b4" }}>Cập nhật chi tiết điều trị</span>}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Ngày thực hiện</span>}
          name="date"
          rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
        >
          <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Kết quả xét nghiệm</span>}
          name="testResult"
        >
          <TextArea
            rows={3}
            placeholder="Nhập kết quả xét nghiệm (tùy chọn)"
            maxLength={500}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Ghi chú</span>}
          name="note"
        >
          <TextArea
            rows={3}
            placeholder="Nhập ghi chú (tùy chọn)"
            maxLength={500}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: "#ff69b4" }}>Trạng thái</span>}
          name="status"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
        >
          <Select placeholder="Chọn trạng thái">
            {statusOptions.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item className="mb-0">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:opacity-50"
            >
              {loading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}