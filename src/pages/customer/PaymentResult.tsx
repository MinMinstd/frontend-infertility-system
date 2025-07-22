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
      const status = searchParams.get("status");
      const vnpaySuccess = searchParams.get("success") === "true";
      const orderId = searchParams.get("orderId") || "";
      const transactionId = searchParams.get("transactionId") || "";
      const orderDescription = searchParams.get("message") || "";

      // Xác định trạng thái thanh toán
      let isSuccess = false;
      let paymentStatus = "error"; // error, success, cancel
      
      if (status === "return") {
        // Trường hợp quay về từ VNPay (có thể thành công hoặc thất bại)
        isSuccess = vnpaySuccess;
        paymentStatus = vnpaySuccess ? "success" : "error";
      } else if (status === "cancel") {
        // Trường hợp người dùng hủy thanh toán
        isSuccess = false;
        paymentStatus = "cancel";
      } else {
        // Fallback cho các trường hợp khác
        isSuccess = vnpaySuccess;
        paymentStatus = vnpaySuccess ? "success" : "error";
      }

      setTransactionInfo({
        orderDescription,
        transactionId,
        orderId,
        success: isSuccess,
      });

      setResult(isSuccess ? "success" : "error");
      
      // Log thông tin để debug
      console.log("Payment Result Debug:", {
        status,
        vnpaySuccess,
        paymentStatus,
        isSuccess,
        orderId,
        transactionId
      });

      if (isSuccess) {
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
          if (paymentStatus === "cancel") {
            message.warning("Bạn đã hủy thanh toán.");
          } else {
            message.error("Thanh toán thất bại. Vui lòng kiểm tra lại thông tin và thử lại.");
          }
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
      title: result === "error" && searchParams.get("status") === "cancel" ? "Đã hủy thanh toán" : "Thanh toán thất bại",
      subTitle: (
        <div className="space-y-2">
          <p>
            {result === "error" && searchParams.get("status") === "cancel"
              ? "Bạn đã hủy giao dịch thanh toán. Bạn có thể thử lại bất cứ lúc nào." 
              : "Có lỗi xảy ra trong quá trình thanh toán. Vui lòng kiểm tra lại thông tin thẻ, số dư tài khoản hoặc kết nối mạng và thử lại."}
          </p>
          {transactionInfo && transactionInfo.transactionId && (
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
