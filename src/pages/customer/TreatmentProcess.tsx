import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';

// Định nghĩa interface cho bước điều trị
interface Treatment {
  id: number;
  stepName: string;
  date: string;
  status: 'Đã hoàn thành' | 'Đang tiến hành' | 'Chưa thực hiện';
  note: string;
  doctor: string;
  location: string;
  result?: string;
  caution?: string;
  failReason?: string;
  retryDate?: string;
  description?: string;
  partnerUnit?: string;
  grades?: string;
  nextActions?: { name: string; desc: string; done: boolean }[];
}

// Dữ liệu ban đầu
const initialTreatments: Treatment[] = [
  {
    id: 1,
    stepName: 'Khám sức khỏe tổng quát',
    date: '2023-09-01',
    status: 'Đã hoàn thành',
    note: 'Khám tổng quát trước khi bắt đầu quy trình',
    doctor: 'BS. Nguyễn Văn A',
    location: 'Phòng 101, Trung tâm Hỗ trợ Sinh sản',
    result: 'Đủ điều kiện tham gia điều trị',
    caution: 'Nên nhịn ăn sáng trước khi khám',
    description: 'Khám sức khỏe tổng quát, siêu âm, đo huyết áp, kiểm tra thể trạng.',
    partnerUnit: 'Trung tâm Xét nghiệm',
    grades: '',
    nextActions: [
      { name: 'Lấy mẫu máu', desc: 'Chuẩn bị cho xét nghiệm nội tiết', done: true },
      { name: 'Tư vấn phác đồ', desc: 'Bác sĩ tư vấn phác đồ điều trị', done: true }
    ]
  },
  {
    id: 2,
    stepName: 'Xét nghiệm nội tiết',
    date: '2023-09-03',
    status: 'Đã hoàn thành',
    note: 'Lấy mẫu máu xét nghiệm các chỉ số nội tiết',
    doctor: 'BS. Trần Thị B',
    location: 'Phòng Xét nghiệm, Trung tâm Hỗ trợ Sinh sản',
    result: 'Chỉ số nội tiết bình thường',
    caution: '',
    description: 'Xét nghiệm các chỉ số nội tiết tố nữ (FSH, LH, E2, AMH...)',
    partnerUnit: 'Trung tâm Xét nghiệm',
    grades: '',
    nextActions: [
      { name: 'Hẹn lịch kích thích buồng trứng', desc: 'Chuẩn bị thuốc và lịch tiêm', done: true }
    ]
  },
  {
    id: 3,
    stepName: 'Kích thích buồng trứng',
    date: '2023-09-07',
    status: 'Đang tiến hành',
    note: 'Bắt đầu tiêm thuốc kích thích buồng trứng',
    doctor: 'BS. Lê Văn C',
    location: 'Phòng 202, Trung tâm Hỗ trợ Sinh sản',
    result: '',
    caution: 'Theo dõi sát đáp ứng thuốc, tái khám đúng hẹn',
    description: 'Tiêm thuốc kích thích buồng trứng trong 8-12 ngày, theo dõi bằng siêu âm.',
    partnerUnit: '',
    grades: '',
    nextActions: [
      { name: 'Siêu âm kiểm tra nang noãn', desc: 'Đánh giá đáp ứng thuốc', done: false },
      { name: 'Điều chỉnh liều thuốc', desc: 'Tùy đáp ứng', done: false }
    ]
  },
  {
    id: 4,
    stepName: 'Chọc hút trứng',
    date: '2023-09-18',
    status: 'Chưa thực hiện',
    note: 'Dự kiến chọc hút trứng ngày 18/09',
    doctor: 'BS. Nguyễn Văn D',
    location: 'Phòng thủ thuật, Trung tâm Hỗ trợ Sinh sản',
    result: '',
    caution: 'Nhịn ăn sáng, có người thân đi cùng',
    description: 'Chọc hút trứng dưới hướng dẫn siêu âm, gây mê nhẹ.',
    partnerUnit: '',
    grades: '',
    nextActions: [
      { name: 'Chuẩn bị phòng thủ thuật', desc: 'Đảm bảo vô khuẩn', done: false }
    ]
  },
  {
    id: 5,
    stepName: 'Thụ tinh và nuôi cấy phôi',
    date: '2023-09-18',
    status: 'Chưa thực hiện',
    note: 'Thực hiện ngay sau khi chọc hút trứng',
    doctor: 'BS. Trần Thị E',
    location: 'Phòng Labo, Trung tâm Hỗ trợ Sinh sản',
    result: '',
    caution: '',
    description: 'Kết hợp trứng và tinh trùng, nuôi cấy phôi từ 3-5 ngày.',
    partnerUnit: '',
    grades: '',
    nextActions: [
      { name: 'Theo dõi sự phát triển của phôi', desc: 'Kiểm tra chất lượng phôi', done: false }
    ]
  },
  {
    id: 6,
    stepName: 'Chuyển phôi',
    date: '2023-09-23',
    status: 'Chưa thực hiện',
    note: 'Chuyển phôi vào buồng tử cung',
    doctor: 'BS. Nguyễn Văn F',
    location: 'Phòng chuyển phôi, Trung tâm Hỗ trợ Sinh sản',
    result: '',
    caution: 'Nghỉ ngơi sau chuyển phôi',
    description: 'Chuyển 1-2 phôi chất lượng tốt vào buồng tử cung.',
    partnerUnit: '',
    grades: '',
    nextActions: [
      { name: 'Theo dõi sau chuyển phôi', desc: 'Hẹn lịch thử thai', done: false }
    ]
  },
  {
    id: 7,
    stepName: 'Theo dõi kết quả',
    date: '2023-10-07',
    status: 'Chưa thực hiện',
    note: 'Thử thai sau chuyển phôi 14 ngày',
    doctor: 'BS. Trần Thị G',
    location: 'Phòng khám, Trung tâm Hỗ trợ Sinh sản',
    result: '',
    caution: '',
    description: 'Xét nghiệm beta-hCG, siêu âm kiểm tra thai.',
    partnerUnit: '',
    grades: '',
    nextActions: [
      { name: 'Tư vấn kết quả', desc: 'Hẹn lịch tái khám hoặc tư vấn tiếp theo', done: false }
    ]
  }
];

const TreatmentManagement: React.FC = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
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
      tr.stepName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tr.note.toLowerCase().includes(searchTerm.toLowerCase())
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
              <div className="text-sm text-black dark:text-gray-200">Tổng số bước</div>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-black dark:text-gray-200">Đã hoàn thành</div>
              <div className="text-2xl font-bold text-pink-500 dark:text-pink-400">
                {treatments.filter((t) => t.status === 'Đã hoàn thành').length}
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
              <div className="text-sm text-black dark:text-gray-200">Đang tiến hành</div>
              <div className="text-2xl font-bold text-yellow-500 dark:text-yellow-400">
                {treatments.filter((t) => t.status === 'Đang tiến hành').length}
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
            {searchTerm ? 'Không tìm thấy dữ liệu phù hợp' : 'Chưa có dữ liệu điều trị'}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
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
                <th className="px-6 py-4 text-left text-base font-bold text-pink-700 dark:text-pink-300 rounded-tl-2xl">Bước điều trị</th>
                <th className="px-6 py-4 text-left text-base font-bold text-pink-700 dark:text-pink-300">Ngày thực hiện</th>
                <th className="px-6 py-4 text-left text-base font-bold text-pink-700 dark:text-pink-300">Trạng thái</th>
                <th className="px-6 py-4 text-left text-base font-bold text-pink-700 dark:text-pink-300 rounded-tr-2xl">Ghi chú</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50 dark:divide-gray-600">
              {filteredTreatments.map((tr) => (
                <tr 
                  key={tr.id} 
                  className="hover:bg-pink-50 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer" 
                  onClick={() => { setSelectedTreatment(tr); setModalVisible(true); }}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">{tr.stepName}</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{new Date(tr.date).toLocaleDateString('vi-VN')}</td>
                  <td className="px-6 py-4">
                    <span className={
                      `inline-block px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300
                      ${tr.status === 'Đã hoàn thành' ? 'bg-pink-500 text-white' :
                        tr.status === 'Đang tiến hành' ? 'bg-yellow-400 text-white' :
                        'bg-gray-300 text-gray-700 dark:bg-gray-500 dark:text-gray-200'}`
                    }>
                      {tr.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{tr.note || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal chi tiết bước điều trị */}
      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        title={null}
        footer={null}
        width={900}
        bodyStyle={{ padding: 0 }}
        className="treatment-modal"
      >
        {selectedTreatment && (
          <div className="bg-white dark:bg-gray-700 rounded-lg p-8">
            <div className="flex flex-col md:flex-row md:space-x-8">
              {/* Cột trái: mô tả & thông tin chi tiết */}
              <div className="flex-1 mb-8 md:mb-0">
                <div className="flex items-center mb-2">
                  <span className="text-xl font-bold mr-4 text-gray-900 dark:text-gray-200">{selectedTreatment.stepName}</span>
                  {selectedTreatment.status === 'Đã hoàn thành' && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm ml-2">Đã hoàn thành</span>
                  )}
                  {selectedTreatment.status === 'Đang tiến hành' && (
                    <span className="bg-yellow-400 text-white px-3 py-1 rounded-full text-sm ml-2">Đang tiến hành</span>
                  )}
                  {selectedTreatment.status === 'Chưa thực hiện' && (
                    <span className="bg-gray-400 text-white px-3 py-1 rounded-full text-sm ml-2">Chưa thực hiện</span>
                  )}
                </div>
                <div className="text-gray-500 dark:text-gray-400 mb-2">
                  {new Date(selectedTreatment.date).toLocaleDateString('vi-VN')}
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-600 dark:text-gray-300">Địa điểm: </span>
                  <span className="text-gray-700 dark:text-gray-200">{selectedTreatment.location}</span>
                </div>
                {selectedTreatment.grades && (
                  <div className="mb-2">
                    <span className="font-medium text-gray-600 dark:text-gray-300">Đánh giá: </span>
                    <span className="text-gray-700 dark:text-gray-200">{selectedTreatment.grades}</span>
                  </div>
                )}
                {selectedTreatment.partnerUnit && (
                  <div className="mb-2">
                    <span className="font-medium text-gray-600 dark:text-gray-300">Đơn vị phối hợp: </span>
                    <span className="text-gray-700 dark:text-gray-200">{selectedTreatment.partnerUnit}</span>
                  </div>
                )}
                <div className="mb-4">
                  <span className="font-medium text-gray-600 dark:text-gray-300">Mô tả: </span>
                  <span className="text-gray-700 dark:text-gray-200">{selectedTreatment.description}</span>
                </div>
                <div className="mb-4">
                  <span className="font-medium text-gray-600 dark:text-gray-300">Người phụ trách: </span>
                  <span className="text-gray-700 dark:text-gray-200">{selectedTreatment.doctor}</span>
                </div>
                <div className="mb-4">
                  <span className="font-medium text-gray-600 dark:text-gray-300">Kết quả: </span>
                  <span className="text-gray-700 dark:text-gray-200">{selectedTreatment.result || 'Chưa có'}</span>
                </div>
                {selectedTreatment.caution && (
                  <div className="mb-4">
                    <span className="font-medium text-gray-600 dark:text-gray-300">Lưu ý: </span>
                    <span className="text-gray-700 dark:text-gray-200">{selectedTreatment.caution}</span>
                  </div>
                )}
                {selectedTreatment.failReason && (
                  <div className="mb-4">
                    <span className="font-medium text-gray-600 dark:text-gray-300">Lý do không thành công: </span>
                    <span className="text-gray-700 dark:text-gray-200">{selectedTreatment.failReason}</span>
                    <br />
                    <span className="font-medium text-gray-600 dark:text-gray-300">Thời gian hẹn lại: </span>
                    <span className="text-gray-700 dark:text-gray-200">{selectedTreatment.retryDate}</span>
                  </div>
                )}
              </div>
              {/* Cột phải: hoạt động tiếp theo */}
              <div className="flex-1 border-l border-gray-200 dark:border-gray-600 pl-8">
                <div className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Hoạt động kế tiếp</div>
                <ul className="space-y-4">
                  {selectedTreatment.nextActions && selectedTreatment.nextActions.length > 0 ? (
                    selectedTreatment.nextActions.map((action, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className={`w-3 h-3 mt-1 rounded-full mr-3 ${action.done ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-500'}`}></span>
                        <div>
                          <div className={`font-semibold ${action.done ? 'text-green-700 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>{action.name}</div>
                          <div className="text-gray-500 dark:text-gray-400 text-sm">{action.desc}</div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 dark:text-gray-500">Không có hoạt động kế tiếp</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <Button 
                onClick={() => setModalVisible(false)} 
                className="border rounded-lg px-6 py-2 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-500 transition-all duration-300"
              >
                Đóng
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TreatmentManagement;