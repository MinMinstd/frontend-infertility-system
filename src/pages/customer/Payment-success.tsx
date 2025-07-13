// File: src/pages/PaymentSuccess.tsx

import { useSearchParams } from "react-router-dom";
import { Result, Button } from "antd";

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const isSuccess = status === "success";

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Result
        status={isSuccess ? "success" : "error"}
        title={isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại"}
        subTitle={
          isSuccess
            ? "Cảm ơn bạn đã hoàn tất thanh toán qua VNPay."
            : "Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại."
        }
        extra={
          <Button type="primary" href="/user/history_payment">
            Quay về trang bệnh nhân
          </Button>
        }
      />
    </div>
  );
}
