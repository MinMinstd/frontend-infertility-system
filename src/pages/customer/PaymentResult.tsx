import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Result, Button, Spin, message } from "antd";
import UserApi from "../../servers/user.api";

interface VNPayTransactionInfo {
  orderDescription: string;
  transactionId: string;
  orderId: string;
  success: boolean;
}

export default function PaymentResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<"success" | "error">("error");
  const [transactionInfo, setTransactionInfo] =
    useState<VNPayTransactionInfo | null>(null);

  useEffect(() => {
    const handlePaymentResult = async () => {
      const success = searchParams.get("success") === "true";
      const orderId = searchParams.get("orderId") || "";
      const transactionId = searchParams.get("transactionId") || "";
      const orderDescription = searchParams.get("message") || "";

      setTransactionInfo({
        orderDescription,
        transactionId,
        orderId,
        success,
      });

      setResult(success ? "success" : "error");

      if (success) {
        try {
          // Lấy paymentId từ localStorage
          const pendingPayment = localStorage.getItem("pendingPayment");
          if (pendingPayment) {
            const paymentData = JSON.parse(pendingPayment);
            const paymentId = paymentData.paymentId;

            if (paymentId) {
              // Cập nhật trạng thái thanh toán
              await UserApi.UpdateSatatusPayment(paymentId);
              console.log("Đã cập nhật trạng thái thanh toán thành công");
            }
          }
        } catch (error) {
          console.error("Lỗi khi cập nhật trạng thái thanh toán:", error);
        }

        message.success(
          `Thanh toán thành công! Mã giao dịch: ${transactionId}`
        );
        setTimeout(
          () => navigate("/user/history_payment", { replace: true }),
          2000
        );
      } else {
        message.error("Thanh toán thất bại.");
        setTimeout(() => navigate("/user/payment", { replace: true }), 3000);
      }

      setLoading(false);
      localStorage.removeItem("pendingPayment");
    };

    handlePaymentResult();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-gray-600">Đang xử lý kết quả thanh toán...</p>
        </div>
      </div>
    );
  }

  const resultConfig = {
    success: {
      status: "success" as const,
      title: "Thanh toán thành công!",
      subTitle: (
        <div className="space-y-2">
          <p>Cảm ơn bạn đã hoàn tất thanh toán qua VNPay.</p>
          {transactionInfo && (
            <div className="text-sm text-gray-600 mt-4">
              <p>Mã giao dịch: {transactionInfo.transactionId}</p>
              <p>Mã đơn hàng: {transactionInfo.orderId}</p>
              <p>Nội dung: {transactionInfo.orderDescription}</p>
            </div>
          )}
        </div>
      ),
      extra: [
        <Button
          key="treatment"
          type="primary"
          onClick={() => navigate("/user/treatment-process")}
        >
          Xem tiến trình điều trị
        </Button>,
        <Button key="payment" onClick={() => navigate("/user/payment")}>
          Quay lại trang thanh toán
        </Button>,
        <Button key="history" onClick={() => navigate("/user/history_payment")}>
          Lịch sử thanh toán
        </Button>,
      ],
    },
    error: {
      status: "error" as const,
      title: "Thanh toán thất bại",
      subTitle: (
        <div className="space-y-2">
          <p>Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.</p>
          {transactionInfo && (
            <div className="text-sm text-gray-600 mt-4">
              <p>Mã giao dịch: {transactionInfo.transactionId}</p>
              <p>Mã đơn hàng: {transactionInfo.orderId}</p>
              <p>Mô tả: {transactionInfo.orderDescription}</p>
            </div>
          )}
        </div>
      ),
      extra: [
        <Button
          key="retry"
          type="primary"
          onClick={() => navigate("/user/payment")}
        >
          Thử lại thanh toán
        </Button>,
        <Button key="support" onClick={() => navigate("/user/support")}>
          Liên hệ hỗ trợ
        </Button>,
        <Button key="dashboard" onClick={() => navigate("/user/dashboard")}>
          Về trang chủ
        </Button>,
      ],
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl w-full mx-4">
        <Result {...resultConfig[result]} />
      </div>
    </div>
  );
}
