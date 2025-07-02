import React, { useState, useEffect, useMemo } from "react";
import { Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import type { Treatment } from "../../types/medicalRecord.d";
import UserApi from "../../servers/user.api";

const TreatmentProcess: React.FC = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  //Lấy medical record detail theo id theo medical record đã bao gồm treatment result và result test
  useEffect(() => {
    const fetchTreatmentProcess = async () => {
      try {
        const res = await UserApi.GetMedicalRecordDetail(id!);
        console.log("Quá trình điều trị:", res.data);
        setTreatments(res.data);
      } catch (error) {
        console.error("Lỗi tải dữ liệu quá trình điều trị:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTreatmentProcess();
  }, [id]);

  const filteredTreatments = useMemo(() => {
    return treatments.filter(
      (tr) =>
        tr.typeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tr.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tr.testResult.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, treatments]);

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <Button onClick={() => navigate(-1)} className="bg-pink-500 text-white">
        ← Quay lại
      </Button>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-pink-600">
          Chi tiết Quá Trình Điều Trị
        </h1>
        <p className="text-gray-500">Mã hồ sơ: {id}</p>
      </div>

      {loading && (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      )}

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded-md border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        placeholder="Tìm kiếm theo loại điều trị, kết quả, hoặc ghi chú..."
      />

      <div className="space-y-6">
        {filteredTreatments.map((treatment, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-pink-600 mb-2">
                {treatment.stage} -{" "}
                {treatment.typeName === "Consultation"
                  ? "Tư vấn"
                  : treatment.typeName === "Treatment"
                  ? "Điều trị"
                  : "Kết quả"}
              </h2>
              <p className="text-gray-500">
                Ngày: {new Date(treatment.date).toLocaleDateString("vi-VN")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700">
                  Thông tin điều trị
                </h4>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Ghi chú: {treatment.note}</li>
                  <li>Mô tả: {treatment.description}</li>
                  <li>Số ngày thực hiện: {treatment.durationDay}</li>
                  <li>Trạng thái: {treatment.status}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700">
                  Kết quả điều trị
                </h4>
                <p className="text-green-600 font-medium">
                  {treatment.testResult}
                </p>
              </div>
            </div>

            {treatment.typeTest && treatment.typeTest.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-blue-700 mb-2">
                  Các xét nghiệm
                </h4>
                <ul className="list-disc list-inside text-gray-600">
                  {treatment.typeTest.map((test, i) => (
                    <li key={i}>
                      <strong>{test.name}</strong>: {test.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreatmentProcess;
