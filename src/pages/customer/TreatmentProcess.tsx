import React, { useState, useEffect } from 'react';

// Định nghĩa interface cho bước điều trị
interface Treatment {
  id: number;
  stepName: string;
  date: string;
  status: 'Đã hoàn thành' | 'Đang tiến hành' | 'Chưa thực hiện';
  note: string;
}

// Dữ liệu ban đầu
const initialTreatments: Treatment[] = [
  { id: 1, stepName: 'Kiểm tra sức khỏe', date: '2023-10-01', status: 'Đã hoàn thành', note: 'Xét nghiệm máu, siêu âm' },
  { id: 2, stepName: 'Kích thích buồng trứng', date: '2023-10-10', status: 'Đang tiến hành', note: 'Dùng thuốc kích thích' },
  { id: 3, stepName: 'Chọc hút trứng', date: '2023-10-20', status: 'Chưa thực hiện', note: 'Lịch hẹn ngày 20/10' },
];

const TreatmentManagement: React.FC = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newTreatment, setNewTreatment] = useState<Treatment>({
    id: 0,
    stepName: '',
    date: '',
    status: 'Chưa thực hiện',
    note: '',
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Giả lập tải dữ liệu
  useEffect(() => {
    const timer = setTimeout(() => {
      setTreatments(initialTreatments);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTreatment((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setNewTreatment({
      id: 0,
      stepName: '',
      date: '',
      status: 'Chưa thực hiện',
      note: '',
    });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTreatment.stepName || !newTreatment.date) {
      alert('Vui lòng nhập tên bước điều trị và ngày thực hiện.');
      return;
    }

    if (editingId) {
      setTreatments(treatments.map((tr) =>
        tr.id === editingId ? { ...newTreatment, id: editingId } : tr
      ));
    } else {
      setTreatments([...treatments, { ...newTreatment, id: Date.now() }]);
    }

    resetForm();
    setShowForm(false);
  };

  const handleEdit = (treatment: Treatment) => {
    setNewTreatment(treatment);
    setEditingId(treatment.id);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  const toggleStatus = (id: number) => {
    setTreatments((prev) =>
      prev.map((tr) => {
        if (tr.id === id) {
          if (tr.status === 'Đã hoàn thành') return { ...tr, status: 'Đang tiến hành' };
          if (tr.status === 'Đang tiến hành') return { ...tr, status: 'Chưa thực hiện' };
          return { ...tr, status: 'Đã hoàn thành' };
        }
        return tr;
      })
    );
  };

  const removeTreatment = (id: number) => {
    if (window.confirm('Bạn có chắc muốn xóa bước điều trị này không?')) {
      setTreatments((prev) => prev.filter((tr) => tr.id !== id));
    }
  };

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

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Thống kê */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:w-2/3">
          <div className="bg-pink-50 dark:bg-gray-700 border-l-4 border-pink-500 p-4 rounded-lg flex items-center transition-all duration-300">
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

          <div className="bg-pink-50 dark:bg-gray-700 border-l-4 border-pink-500 p-4 rounded-lg flex items-center transition-all duration-300">
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

          <div className="bg-yellow-50 dark:bg-gray-700 border-l-4 border-yellow-500 p-4 rounded-lg flex items-center transition-all duration-300">
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

        {/* Các nút action */}
        <div className="flex flex-col lg:w-1/3 justify-center space-y-3">
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="bg-pink-500 dark:bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-600 dark:hover:bg-pink-500 transition-colors flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            {editingId ? 'Thêm bước mới' : showForm ? 'Ẩn biểu mẫu' : 'Thêm bước mới'}
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 text-black"
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

      {/* Form nhập liệu */}
      <div
        className={`bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-8 transition-all duration-300 ${
          showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 h-0 overflow-hidden'
        }`}
      >
        <h2 className="text-xl font-bold text-black dark:text-gray-200 mb-4">
          {editingId ? 'Cập nhật bước điều trị' : 'Thêm bước điều trị mới'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="stepName" className="block text-sm font-medium text-black dark:text-gray-200 mb-1">
                Bước điều trị <span className="text-red-500">*</span>
              </label>
              <input
                id="stepName"
                type="text"
                name="stepName"
                placeholder="Nhập tên bước điều trị"
                value={newTreatment.stepName}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-gray-200 text-black"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-black dark:text-gray-200 mb-1">
                Ngày thực hiện <span className="text-red-500">*</span>
              </label>
              <input
                id="date"
                type="date"
                name="date"
                value={newTreatment.date}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-gray-200 text-black"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-black dark:text-gray-200 mb-1">
                Trạng thái
              </label>
              <select
                id="status"
                name="status"
                value={newTreatment.status}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-gray-200 text-black"
              >
                <option value="Chưa thực hiện">Chưa thực hiện</option>
                <option value="Đang tiến hành">Đang tiến hành</option>
                <option value="Đã hoàn thành">Đã hoàn thành</option>
              </select>
            </div>

            <div>
              <label htmlFor="note" className="block text-sm font-medium text-black dark:text-gray-200 mb-1">
                Ghi chú
              </label>
              <input
                id="note"
                type="text"
                name="note"
                placeholder="Thêm ghi chú (nếu có)"
                value={newTreatment.note}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-gray-200 text-black"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-white dark:bg-gray-600 dark:text-gray-200 text-black border border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-pink-500 dark:bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-600 dark:hover:bg-pink-500 transition-colors"
            >
              {editingId ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
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
        <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
          <table className="min-w-full">
            <thead>
              <tr className="bg-pink-100">
                <th className="px-6 py-4 text-left text-base font-bold text-pink-700 rounded-tl-2xl">Bước điều trị</th>
                <th className="px-6 py-4 text-left text-base font-bold text-pink-700">Ngày thực hiện</th>
                <th className="px-6 py-4 text-left text-base font-bold text-pink-700">Trạng thái</th>
                <th className="px-6 py-4 text-left text-base font-bold text-pink-700">Ghi chú</th>
                <th className="px-6 py-4 text-right text-base font-bold text-pink-700 rounded-tr-2xl">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50">
              {filteredTreatments.map((tr) => (
                <tr key={tr.id} className="hover:bg-pink-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{tr.stepName}</td>
                  <td className="px-6 py-4 text-gray-700">{new Date(tr.date).toLocaleDateString('vi-VN')}</td>
                  <td className="px-6 py-4">
                    <span className={
                      `inline-block px-3 py-1 rounded-full text-xs font-semibold
                      ${tr.status === 'Đã hoàn thành' ? 'bg-pink-500 text-white' :
                        tr.status === 'Đang tiến hành' ? 'bg-yellow-400 text-white' :
                        'bg-gray-300 text-gray-700'}`
                    }>
                      {tr.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{tr.note || '—'}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(tr)}
                      className="inline-flex items-center px-3 py-1 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition"
                      title="Chỉnh sửa"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M15.232 5.232l3.536 3.536M9 11l6 6M3 21h18" />
                      </svg>
                      Sửa
                    </button>
                    <button
                      onClick={() => removeTreatment(tr.id)}
                      className="inline-flex items-center px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                      title="Xóa"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TreatmentManagement;