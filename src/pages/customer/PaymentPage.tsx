import {
  Card,
  Table,
  Typography,
  Descriptions,
  Tag,
  Button,
  message,
} from "antd";
import { PrinterOutlined, CreditCardOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import UserApi from "../../servers/user.api";
import type { PatientInfor, PaymentInfo } from "../../types/user.d";
import dayjs from "dayjs";
const { Title, Text } = Typography;

export default function PaymentPage() {
  const [patientInfor, setPatientInfo] = useState<PatientInfor>();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>();

  //Thông tin khách hàng
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await UserApi.GetInfoCustomerPay();
        console.log("Thông tin payment khách hàng nè : ", res.data);
        setPatientInfo(res.data);
      } catch (error) {
        console.log("Lỗi Load thông tin khách hàng payment :", error);
      }
    };
    fetchData();
  }, []);

  //Thông tin thực hiện thanh toán đối với dịch nào
  useEffect(() => {
    const fetchData = async () => {

      if (!patientInfor?.orderId) return;
      try {
        const res = await UserApi.GetPaymentByOrderId(
          patientInfor?.orderId || 0
        );
        console.log("Thông tin payment nè : ", res.data);
        setPaymentInfo(res.data);
      } catch (error) {
        console.log("Lỗi Load thông tin payment :", error);
      }
    };
    fetchData();
  }, [patientInfor?.orderId]);

  const columns: ColumnsType<PaymentInfo> = [
    {
      title: "Giai đoạn thực hiện thành toán",
      dataIndex: "stage",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      render: (value: number) => value.toLocaleString("vi-VN") + " đ",
    },

    {
      title: "Thành tiền",
      dataIndex: "price",
      render: (value: number) => value.toLocaleString("vi-VN") + " đ",
    },
  ];

  const handlePrint = () => message.success("In hoá đơn thành công!");

  // const handleUpdateStatusPayment = async () => {
  //   try {
  //     if (!paymentInfo?.paymentId) {
  //       message.error("Không tìm thấy thông tin thanh toán!");
  //       return;
  //     }

  //     await UserApi.UpdateSatatusPayment(paymentInfo.paymentId);
  //     message.success("Cập nhật trạng thái thanh toán thành công!");

  //     // Cập nhật lại thông tin thanh toán sau khi đã cập nhật trạng thái
  //     const res = await UserApi.GetPaymentByOrderId(patientInfor?.orderId || 0);
  //     setPaymentInfo(res.data);
  //   } catch (error) {
  //     console.log("Lỗi cập nhật trạng thái thanh toán: ", error);
  //     message.error("Không thể cập nhật trạng thái thanh toán.");
  //   }
  // };

  // const handlePayment = async () => {
  //   //cần di chuyển
  //   // try {
  //   //   await handleUpdateStatusPayment();
  //   //   message.success("Thanh toán thành công!");
  //   // } catch (error) {
  //   //   console.log("Lỗi không thể cập nhập được trạng thái của status: ", error);
  //   //   message.error("Thanh toán không thành công!");
  //   // }

  //   try {
  //     if (!paymentInfo || !patientInfor) {
  //       message.error("Thiếu thông tin thanh toán hoặc bệnh nhân.");
  //       return;
  //     }

  //     const payload = {
  //       orderId: patientInfor.orderId,
  //       amount: paymentInfo.price,
  //       orderInfo: `Thanh toán cho giai đoạn: ${paymentInfo.stage}`,
  //       returnUrl: window.location.origin + "/payment-success",
  //     };

  //     console.log("Thuộc tính được đẩy xuống backend: ", payload);

  //     const res = await UserApi.CreateVnPayPayment(payload);
  //     const paymentUrl = res.data;

  //     if (paymentUrl) {
  //       window.location.href = paymentUrl;
  //     } else {
  //       message.error("Không thể tạo thanh toán VNPay.");
  //     }
  //   } catch (error) {
  //     console.error("Lỗi tạo thanh toán VNPay:", error);
  //     message.error("Thanh toán thất bại.");
  //   }
  // };

  const handlePayment = async () => {
    try {
      if (!paymentInfo || !patientInfor) {
        message.error("Thiếu thông tin thanh toán hoặc bệnh nhân.");
        return;
      }

      const payload = {
        orderType: "Thanh toán điều trị",
        amount: paymentInfo.price,
        orderDescription: `Thanh toán cho giai đoạn: ${paymentInfo.stage}`,
        name: patientInfor.wife,

        //Thêm các url xử lý khác nhau
        returnUrl: "http://localhost:5173/payment-result?status=return",
        cancelUrl: "http://localhost:5173/payment-result?status=cancel",
      };

      console.log("Payload gửi xuống backend:", payload);

      // Lưu thông tin thanh toán vào localStorage để sử dụng sau khi thanh toán
      const pendingPayment = {
        paymentId: paymentInfo.paymentId,
        orderId: patientInfor.orderId,
        amount: paymentInfo.price,
        stage: paymentInfo.stage,
        timestamp: Date.now(),
      };
      localStorage.setItem("pendingPayment", JSON.stringify(pendingPayment));

      const res = await UserApi.CreateVnPayPayment(payload);
      console.log(
        "Với Thông tin thanh toán với localStorage để sử dụng sau khi thanh toán: "
      );
      const paymentUrl = res.data;

      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        message.error("Không thể tạo thanh toán VNPay.");
      }
    } catch (error) {
      console.error("Lỗi tạo thanh toán VNPay:", error);
      message.error("Thanh toán thất bại.");
    }
  };

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="m-6 p-6 border border-pink-300 rounded-lg bg-white">
        <div className="mb-6">
          <Title
            level={2}
            style={{ color: "#FF69B4" }}
            className=" font-bold mb-0"
          >
            Thanh toán khoản phí
          </Title>
        </div>

        <div className="mb-6">
          <Card className="border-pink-300 shadow-sm">
            <Descriptions
              title={
                <span className="text-pink-500 font-semibold">
                  Thông tin bệnh nhân
                </span>
              }
              bordered
              column={2}
              size="middle"
              className="[&_.ant-descriptions-item-label]:bg-pink-50 [&_.ant-descriptions-item-label]:text-gray-700"
            >
              <Descriptions.Item label="Họ tên (vợ)">
                <span className="font-medium">{patientInfor?.wife}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Họ tên (chồng)">
                <span className="font-medium">{patientInfor?.husband}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Ngày sinh">
                {patientInfor?.birthday
                  ? dayjs(patientInfor.birthday).format("DD/MM/YYYY")
                  : ""}
              </Descriptions.Item>
              <Descriptions.Item label="Tuổi">
                {patientInfor?.age}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {patientInfor?.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {patientInfor?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ" span={2}>
                {patientInfor?.address}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>

        <div className="mb-6">
          <Card className="border-pink-300 shadow-sm">
            <Descriptions
              title={
                <span className="text-pink-500 font-semibold">
                  Thông tin điều trị
                </span>
              }
              bordered
              column={2}
              size="middle"
              className="[&_.ant-descriptions-item-label]:bg-pink-50 [&_.ant-descriptions-item-label]:text-gray-700"
            >
              <Descriptions.Item label="Loại điều trị">
                <span className="font-medium">{patientInfor?.serviceName}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Giai đoạn hiện tại">
                <span className="font-medium">{paymentInfo?.stage}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color="processing" className="font-medium">
                  {paymentInfo?.status}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>

        <div className="mb-6">
          <Card className="border-pink-300 shadow-sm">
            <div className="mb-4">
              <h3 className="text-pink-500 font-semibold text-lg mb-4">
                Chi tiết dịch vụ
              </h3>
            </div>

            <Table
              columns={columns}
              dataSource={paymentInfo ? [paymentInfo] : []}
              pagination={false}
              bordered
              className="[&_.ant-table-thead>tr>th]:bg-pink-50 [&_.ant-table-thead>tr>th]:text-gray-700 [&_.ant-table-thead>tr>th]:font-semibold"
            />
            <div className="flex justify-end mt-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
              <Text className="text-xl font-bold text-pink-600">
                Tổng cộng: {paymentInfo?.price.toLocaleString("vi-VN")} đ
              </Text>
            </div>
          </Card>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button
            icon={<PrinterOutlined />}
            onClick={handlePrint}
            className="border-pink-400 text-pink-500 hover:border-pink-500 hover:text-pink-600 font-medium px-6 py-2 h-auto"
            size="large"
          >
            In hoá đơn
          </Button>

          <Button
            icon={<CreditCardOutlined />}
            type="primary"
            onClick={handlePayment}
            className="bg-pink-400 border-pink-400 hover:bg-pink-500 hover:border-pink-500 font-medium px-8 py-2 h-auto shadow-lg"
            size="large"
          >
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
}
