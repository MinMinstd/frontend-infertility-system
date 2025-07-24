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
      const vnpResponseCode = searchParams.get("vnp_ResponseCode");
      const vnpTransactionStatus = searchParams.get("vnp_TransactionStatus");

      // Xác định trạng thái thanh toán
      let isSuccess = false;
      let paymentStatus = "error"; // error, success, cancel, incomplete

      // Kiểm tra trường hợp đặc biệt: transactionId = "0" hoặc "" nghĩa là chưa xử lý
      const isIncompleteTransaction = transactionId === "0" || transactionId === "" || orderDescription.includes("Chưa Xử lý");

      // Backend chỉ trả về success, orderId, transactionId, message
       // Không có vnp_ResponseCode hay status từ VNPay
       
       // Kiểm tra trường hợp cancel dựa trên message
       const isCancelTransaction = orderDescription.includes("hủy") || orderDescription.includes("cancel") || orderDescription.includes("Hủy");
       
       if (isIncompleteTransaction) {
         // Trường hợp người dùng nhấn "Quay lại" mà chưa hoàn tất thanh toán
         console.log("Phát hiện giao dịch chưa hoàn tất (transactionId=0 hoặc chứa 'Chưa Xử lý')");
         isSuccess = false;
         paymentStatus = "incomplete";
       } else if (isCancelTransaction) {
         // Trường hợp người dùng hủy thanh toán
         console.log("Phát hiện giao dịch bị hủy (message chứa từ khóa hủy)");
         isSuccess = false;
         paymentStatus = "cancel";
       } else if (vnpaySuccess && orderId && transactionId && transactionId !== "0") {
         // Trường hợp thanh toán thành công: có success=true, orderId, và transactionId hợp lệ
         console.log("Thanh toán thành công từ backend");
         isSuccess = true;
         paymentStatus = "success";
       } else if (!vnpaySuccess) {
         // Trường hợp thanh toán thất bại: success=false
         console.log("Thanh toán thất bại từ backend");
         isSuccess = false;
         paymentStatus = "error";
       } else {
         // Fallback cho các trường hợp khác
         console.log("Trường hợp không xác định, coi như thất bại");
         isSuccess = false;
         paymentStatus = "error";
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
        vnpResponseCode,
        vnpTransactionStatus,
        paymentStatus,
        isSuccess,
        orderId,
        transactionId,
        allParams: Object.fromEntries(searchParams.entries())
      });

      if (isSuccess) {
        try {
          // Kiểm tra thêm lần nữa trước khi cập nhật
          // Chỉ cập nhật khi có success=true và transactionId hợp lệ (không phải "0")
          const shouldUpdate = vnpaySuccess && orderId && transactionId && transactionId !== "0";

          if (shouldUpdate) {
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
          } else {
            console.log("Không cập nhật do thông tin không hợp lệ:", {
              vnpaySuccess,
              orderId,
              transactionId,
              isIncompleteTransaction
            });
          }
        } catch (error) {
          console.error("Lỗi khi cập nhật trạng thái thanh toán:", error);
        }

        message.success(
          `Thanh toán thành công! Mã giao dịch: ${transactionId}`
        );
        // setTimeout(
        //   () => navigate("/user/history_payment", { replace: true }),
        //   200000
        // );
      } else {
        if (paymentStatus === "cancel") {
          message.warning("Bạn đã hủy thanh toán.");
        } else if (paymentStatus === "incomplete" || isIncompleteTransaction) {
          message.info("Bạn đã quay lại từ trang thanh toán mà chưa hoàn tất giao dịch. Vui lòng thử lại để hoàn tất thanh toán.");
        } else if (!vnpaySuccess) {
          message.error("Thanh toán thất bại. Vui lòng kiểm tra lại thông tin và thử lại.");
        } else {
          message.warning("Có lỗi xảy ra trong quá trình xử lý thanh toán. Vui lòng thử lại.");
        }
        // setTimeout(() => navigate("/user/payment", { replace: true }), 30000);
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
      title: (() => {
        const orderDescription = searchParams.get("message") || "";
        const isCancelTransaction = orderDescription.includes("hủy") || orderDescription.includes("cancel") || orderDescription.includes("Hủy");
        const isIncompleteTransaction = searchParams.get("transactionId") === "0" || orderDescription.includes("Chưa Xử lý");
        
        if (isCancelTransaction) return "Đã hủy thanh toán";
        if (isIncompleteTransaction) return "Giao dịch chưa hoàn tất";
        return "Thanh toán thất bại";
      })(),
      subTitle: (
        <div className="space-y-2">
          <p>
            {(() => {
              const orderDescription = searchParams.get("message") || "";
              const isCancelTransaction = orderDescription.includes("hủy") || orderDescription.includes("cancel") || orderDescription.includes("Hủy");
              const isIncompleteTransaction = searchParams.get("transactionId") === "0" || orderDescription.includes("Chưa Xử lý");
              
              if (isCancelTransaction) {
                return "Bạn đã hủy giao dịch thanh toán. Bạn có thể thử lại bất cứ lúc nào.";
              }
              if (isIncompleteTransaction) {
                return "Bạn đã quay lại từ trang thanh toán mà chưa hoàn tất giao dịch. Vui lòng thử lại để hoàn tất thanh toán.";
              }
              return "Có lỗi xảy ra trong quá trình thanh toán. Vui lòng kiểm tra lại thông tin thẻ, số dư tài khoản hoặc kết nối mạng và thử lại.";
            })()
            }
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
