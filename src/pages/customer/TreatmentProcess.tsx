import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";

// Định nghĩa interface cho loại xét nghiệm
interface TypeTest {
  name: string;
  description: string;
}

// Định nghĩa interface cho bước điều trị
interface Treatment {
  date: string;
  testResult: string;
  note: string;
  typeName: "Consultation" | "Treatment" | "Result";
  status: "Complete" | "In Progress" | "Pending";
  treatmentResultId: number;
  typeTest: TypeTest[];
}

// Dữ liệu ban đầu
const initialTreatments: Treatment[] = [
  {
    date: "2025-06-03",
    testResult: "Bình thường",
    note: "Tư vấn khởi đầu IVF",
    typeName: "Consultation",
    status: "Complete",
    treatmentResultId: 1,
    typeTest: [
      {
        name: "Xét nghiệm máu",
        description: "Kiểm tra nội tiết",
      },
    ],
  },
  {
    date: "2025-06-06",
    testResult: "15 trứng được lấy",
    note: "Không biến chứng",
    typeName: "Treatment",
    status: "Complete",
    treatmentResultId: 2,
    typeTest: [
      {
        name: "Siêu âm",
        description: "Theo dõi nang trứng",
      },
    ],
  },
  {
    date: "2025-06-09",
    testResult: "Tinh trùng đạt chuẩn",
    note: "Sẵn sàng tạo phôi",
    typeName: "Treatment",
    status: "Complete",
    treatmentResultId: 1,
    typeTest: [
      {
        name: "Xét nghiệm máu",
        description: "Kiểm tra nội tiết",
      },
    ],
  },
  {
    date: "2025-06-12",
    testResult: "Tạo 5 phôi tốt",
    note: "Đánh giá phôi ok",
    typeName: "Treatment",
    status: "Complete",
    treatmentResultId: 1,
    typeTest: [
      {
        name: "Xét nghiệm máu",
        description: "Kiểm tra nội tiết",
      },
    ],
  },
  {
    date: "2025-06-15",
    testResult: "Chuyển 2 phôi",
    note: "Tiến hành thành công",
    typeName: "Treatment",
    status: "Complete",
    treatmentResultId: 2,
    typeTest: [
      {
        name: "Siêu âm",
        description: "Theo dõi nang trứng",
      },
    ],
  },
  {
    date: "2025-06-16",
    testResult: "HCG dương tính",
    note: "Thành công",
    typeName: "Result",
    status: "Complete",
    treatmentResultId: 1,
    typeTest: [
      {
        name: "Xét nghiệm máu",
        description: "Kiểm tra nội tiết",
      },
    ],
  },
];

const TreatmentManagement: React.FC = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  // Giả lập tải dữ liệu
  useEffect(() => {
    const timer = setTimeout(() => {
      setTreatments(initialTreatments);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Lọc dữ liệu theo từ khóa tìm kiếm
  const filteredTreatments = treatments.filter(
    (tr) =>
      tr.typeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tr.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tr.testResult.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-gray-200 mb-2">
          Quá trình Điều trị Hiếm muộn
        </h1>
        <p className="text-black dark:text-gray-200">
          Theo dõi các bước điều trị và cập nhật trạng thái điều trị hiếm muộn
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8 justify-between items-center">
        {/* Thống kê */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:w-2/3">
          <div className="bg-pink-50 dark:bg-gray-700 border-l-4 border-pink-500 p-4 rounded-lg flex items-center transition-all duration-300 hover:shadow-lg">
            <div className="rounded-full w-12 h-12 flex items-center justify-center bg-pink-100 dark:bg-pink-900 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-pink-500 dark:text-pink-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm text-black dark:text-gray-200">
                Tổng số bước
              </div>
              <div className="text-2xl font-bold text-pink-500 dark:text-pink-400">
                {treatments.length}
              </div>
            </div>
          </div>

          <div className="bg-pink-50 dark:bg-gray-700 border-l-4 border-pink-500 p-4 rounded-lg flex items-center transition-all duration-300 hover:shadow-lg">
            <div className="rounded-full w-12 h-12 flex items-center justify-center bg-pink-100 dark:bg-pink-900 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-pink-500 dark:text-pink-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm text-black dark:text-gray-200">
                Đã hoàn thành
              </div>
              <div className="text-2xl font-bold text-pink-500 dark:text-pink-400">
                {treatments.filter((t) => t.status === "Complete").length}
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-gray-700 border-l-4 border-yellow-500 p-4 rounded-lg flex items-center transition-all duration-300 hover:shadow-lg">
            <div className="rounded-full w-12 h-12 flex items-center justify-center bg-yellow-100 dark:bg-yellow-900 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500 dark:text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm text-black dark:text-gray-200">
                Đang tiến hành
              </div>
              <div className="text-2xl font-bold text-yellow-500 dark:text-yellow-400">
                {treatments.filter((t) => t.status === "In Progress").length}
              </div>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex flex-col lg:w-1/3 justify-center space-y-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-gray-200 text-black transition-all duration-300 hover:border-pink-400"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Hiển thị dữ liệu */}
      {loading ? (
        <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 dark:border-pink-400 mb-4"></div>
          <p className="text-black dark:text-gray-200">Đang tải dữ liệu...</p>
        </div>
      ) : filteredTreatments.length === 0 ? (
        <div className="bg-white dark:bg-gray-700 p-12 rounded-lg shadow-md text-center transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-300 mb-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-black dark:text-gray-200 text-lg">
            {searchTerm
              ? "Không tìm thấy dữ liệu phù hợp"
              : "Chưa có dữ liệu điều trị"}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-pink-500 dark:text-pink-400 hover:text-pink-600 dark:hover:text-pink-300 transition-colors duration-200"
            >
              Xóa bộ lọc tìm kiếm
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-lg bg-white dark:bg-gray-700 transition-all duration-300">
          <table className="min-w-full">
            <thead>
              <tr className="bg-pink-100 dark:bg-gray-600">
                <th className="px-6 py-4 text-left text-base font-bold text-pink-700 dark:text-pink-300 rounded-tl-2xl">
                  Loại điều trị
                </th>
                <th className="px-6 py-4 text-left text-base font-bold text-pink-700 dark:text-pink-300">
                  Ngày thực hiện
                </th>
                <th className="px-6 py-4 text-left text-base font-bold text-pink-700 dark:text-pink-300">
                  Kết quả
                </th>
                <th className="px-6 py-4 text-left text-base font-bold text-pink-700 dark:text-pink-300">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-base font-bold text-pink-700 dark:text-pink-300 rounded-tr-2xl">
                  Ghi chú
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50 dark:divide-gray-600">
              {filteredTreatments.map((tr, index) => (
                <tr
                  key={index}
                  className="hover:bg-pink-50 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    setSelectedTreatment(tr);
                    setModalVisible(true);
                  }}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                    <div className="flex items-center">
                      <span
                        className={`inline-block w-3 h-3 rounded-full mr-3 ${
                          tr.typeName === "Consultation"
                            ? "bg-blue-500"
                            : tr.typeName === "Treatment"
                            ? "bg-green-500"
                            : "bg-purple-500"
                        }`}
                      ></span>
                      {tr.typeName === "Consultation"
                        ? "Tư vấn"
                        : tr.typeName === "Treatment"
                        ? "Điều trị"
                        : "Kết quả"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {new Date(tr.date).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    <span className="text-green-600 font-medium">
                      {tr.testResult}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300
                      ${
                        tr.status === "Complete"
                          ? "bg-green-500 text-white"
                          : tr.status === "In Progress"
                          ? "bg-yellow-400 text-white"
                          : "bg-gray-300 text-gray-700 dark:bg-gray-500 dark:text-gray-200"
                      }`}
                    >
                      {tr.status === "Complete"
                        ? "Hoàn thành"
                        : tr.status === "In Progress"
                        ? "Đang tiến hành"
                        : "Chờ thực hiện"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {tr.note || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal chi tiết điều trị */}
      <Modal
        title={
          <span className="text-xl font-bold text-pink-600">
            Chi tiết điều trị
          </span>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button
            key="close"
            onClick={() => setModalVisible(false)}
            className="bg-pink-500 text-white hover:bg-pink-600 border-pink-500"
          >
            Đóng
          </Button>,
        ]}
        width={800}
        className="treatment-modal"
      >
        {selectedTreatment && (
          <div className="space-y-6">
            {/* Thông tin cơ bản */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-pink-700 dark:text-pink-300 mb-4">
                Thông tin cơ bản
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Loại điều trị:
                  </span>
                  <div className="flex items-center mt-1">
                    <span
                      className={`inline-block w-3 h-3 rounded-full mr-2 ${
                        selectedTreatment.typeName === "Consultation"
                          ? "bg-blue-500"
                          : selectedTreatment.typeName === "Treatment"
                          ? "bg-green-500"
                          : "bg-purple-500"
                      }`}
                    ></span>
                    <p className="text-gray-900 dark:text-gray-100">
                      {selectedTreatment.typeName === "Consultation"
                        ? "Tư vấn"
                        : selectedTreatment.typeName === "Treatment"
                        ? "Điều trị"
                        : "Kết quả"}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Ngày thực hiện:
                  </span>
                  <p className="text-gray-900 dark:text-gray-100">
                    {new Date(selectedTreatment.date).toLocaleDateString(
                      "vi-VN"
                    )}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Trạng thái:
                  </span>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1
                    ${
                      selectedTreatment.status === "Complete"
                        ? "bg-green-500 text-white"
                        : selectedTreatment.status === "In Progress"
                        ? "bg-yellow-400 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {selectedTreatment.status === "Complete"
                      ? "Hoàn thành"
                      : selectedTreatment.status === "In Progress"
                      ? "Đang tiến hành"
                      : "Chờ thực hiện"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    ID kết quả:
                  </span>
                  <p className="text-gray-900 dark:text-gray-100">
                    {selectedTreatment.treatmentResultId}
                  </p>
                </div>
              </div>
            </div>

            {/* Kết quả xét nghiệm */}
            <div className="bg-green-50 dark:bg-gray-700 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-4">
                Kết quả & Ghi chú
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Kết quả xét nghiệm:
                  </span>
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    {selectedTreatment.testResult}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Ghi chú:
                  </span>
                  <p className="text-gray-900 dark:text-gray-100">
                    {selectedTreatment.note || "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Các loại xét nghiệm */}
            {selectedTreatment.typeTest &&
              selectedTreatment.typeTest.length > 0 && (
                <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-4">
                    Các loại xét nghiệm
                  </h3>
                  <div className="space-y-3">
                    {selectedTreatment.typeTest.map((test, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-blue-400 pl-4"
                      >
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {test.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {test.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TreatmentManagement;
