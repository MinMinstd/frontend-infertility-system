// File: src/pages/TreatmentProcess.tsx

import { useState, useEffect, useMemo } from "react";
import {
  Button,
  Typography,
  Input,
  Spin,
  Empty,
  Tag,
  Space,
  Collapse,
} from "antd";
import {
  ArrowLeftOutlined,
  SearchOutlined,
  CalendarOutlined,
  FileTextOutlined,
  ExperimentOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import type { Treatment } from "../../types/medicalRecord.d";
import UserApi from "../../servers/user.api";
import type { Embryo } from "../../types/user.d";

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

export default function TreatmentProcess() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [embryos, setEmbryos] = useState<Embryo[] | null>([]);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  //Gọi Phôi
  useEffect(() => {
    const fetchEmbryos = async () => {
      try {
        const res = await UserApi.GetListEmbroys(); // hoặc truyền customerId
        setEmbryos(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phôi:", error);
      }
    };
    fetchEmbryos();
  }, [id]);

  useEffect(() => {
    const fetchTreatmentProcess = async () => {
      try {
        const res = await UserApi.GetMedicalRecordDetail(id!);
        console.log("Danh sách quá trình điều trị detail:", res.data);
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

  const getTypeNameDisplay = (typeName: string) => {
    switch (typeName) {
      case "Consultation":
        return { text: "Tư vấn", color: "blue" };
      case "Treatment":
        return { text: "Điều trị", color: "green" };
      default:
        return { text: "Kết quả", color: "purple" };
    }
  };

  const getStatusColor = (status?: string) => {
    if (!status) return "default";
    switch (status.toLowerCase()) {
      case "hoàn thành":
        return "success";
      case "đang thực hiện":
        return "processing";
      case "chờ xử lý":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto max-w-6xl">
        <div className="p-6">
          <div className="mb-2 bg-pink rounded-2xl shadow-lg p-3">
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
              className="mb-6 bg-pink-500 text-white hover:bg-pink-600 shadow-md"
              size="large"
            >
              Quay lại
            </Button>

            <div className="text-center">
              <Title
                level={2}
                style={{ color: "#FF69B4" }}
                className="text-pink-600 mb-3"
              >
                Quá Trình Điều Trị & Kết Quả{treatments.length > 0 ? `: ${treatments[0].stage}` : ""}
              </Title>
              <div className="bg-pink-100 rounded-lg p-3 inline-block">
                <Text className="text-gray-700 text-lg">
                  Mã hồ sơ:{" "}
                  <Text className="font-bold text-pink-700">{id}</Text>
                </Text>
              </div>

              <Collapse
                accordion
                expandIconPosition="end"
                className="mb-6"
                items={[
                  {
                    key: "1",
                    label: (
                      <span className="text-pink-600 font-semibold text-lg">
                        🧫 Danh sách phôi được lưu trữ ({embryos?.length || 0})
                      </span>
                    ),
                    children: (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        {embryos?.map((embryo) => (
                          <div
                            key={embryo.embryoId}
                            className="bg-pink-50 border border-pink-200 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <Text className="text-sm text-gray-600">
                                Ngày tạo:{" "}
                                <strong>
                                  {new Date(embryo.createAt).toLocaleDateString(
                                    "vi-VN"
                                  )}
                                </strong>
                              </Text>
                              <Tag
                                color={
                                  embryo.quality.toLowerCase() === "tốt"
                                    ? "green"
                                    : embryo.quality.toLowerCase() ===
                                      "trung bình"
                                      ? "orange"
                                      : "red"
                                }
                              >
                                {embryo.quality}
                              </Tag>
                            </div>
                            <Text className="block text-sm text-gray-700 mb-1">
                              Tình trạng:{" "}
                              <strong className="text-gray-800">
                                {embryo.status}
                              </strong>
                            </Text>
                            <Text className="block text-sm text-gray-700">
                              Ghi chú: {embryo.note}
                            </Text>
                          </div>
                        ))}
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-md p-4">
              <Search
                placeholder="Tìm kiếm theo loại điều trị, kết quả, hoặc ghi chú..."
                allowClear
                size="large"
                prefix={<SearchOutlined className="text-pink-400" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="[&_.ant-input]:bg-gray-50 [&_.ant-input:focus]:bg-white [&_.ant-input:hover]:bg-white"
              />
            </div>
          </div>

          {loading && (
            <div className="bg-white rounded-xl shadow-md p-12">
              <div className="flex justify-center items-center">
                <Spin size="large" />
                <Text className="ml-4 text-gray-600 text-lg">
                  Đang tải dữ liệu...
                </Text>
              </div>
            </div>
          )}

          {!loading && filteredTreatments.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-12">
              <Empty
                description={
                  <Text className="text-gray-500 text-lg">
                    {searchTerm
                      ? "Không tìm thấy kết quả phù hợp"
                      : "Chưa có dữ liệu quá trình điều trị"}
                  </Text>
                }
              />
            </div>
          )}

          {!loading && filteredTreatments.length > 0 && (
            <div className="space-y-8">
              {filteredTreatments.map((treatment, idx) => {
                const typeDisplay = getTypeNameDisplay(treatment.typeName);

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-2xl p-6">
                      <div className="flex items-center justify-between text-white">
                        <Space size="large">
                          <FileTextOutlined className="text-2xl" />
                          <Text className="text-2xl font-bold text-white">
                            {treatment.stageName}
                          </Text>
                          <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                            <Text className="text-white font-medium">
                              {typeDisplay.text}
                            </Text>
                          </div>
                        </Space>
                        <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-4 py-2">
                          <CalendarOutlined />
                          <Text className="font-medium text-white">
                            {new Date(treatment.date).toLocaleDateString(
                              "vi-VN"
                            )}
                          </Text>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-gray-50 rounded-xl p-5">
                          <div className="flex items-center mb-4">
                            <FileTextOutlined className="text-pink-500 text-lg mr-2" />
                            <Text className="text-gray-800 font-bold text-lg">
                              Thông tin điều trị
                            </Text>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Text className="font-semibold text-gray-700 block mb-1">
                                Ghi chú:
                              </Text>
                              <Paragraph className="mb-0 text-gray-600 bg-white rounded-lg p-3">
                                {treatment.note}
                              </Paragraph>
                            </div>
                            <div>
                              <Text className="font-semibold text-gray-700 block mb-1">
                                Mô tả:
                              </Text>
                              <Paragraph className="mb-0 text-gray-600 bg-white rounded-lg p-3">
                                {treatment.description}
                              </Paragraph>
                            </div>
                            <div className="flex justify-between items-center bg-blue-50 rounded-lg p-3">
                              <Text className="font-semibold text-gray-700">
                                Thời gian thực hiện:
                              </Text>
                              <Text className="font-bold text-blue-600 text-lg">
                                {treatment.durationDay} ngày
                              </Text>
                            </div>
                            <div className="flex justify-between items-center bg-white rounded-lg p-3">
                              <Text className="font-semibold text-gray-700">
                                Trạng thái:
                              </Text>
                              <Tag
                                color={getStatusColor(treatment.status)}
                                className="font-medium text-sm px-3 py-1"
                              >
                                {treatment.status}
                              </Tag>
                            </div>
                          </div>
                        </div>

                        <div className="bg-green-50 rounded-xl p-5">
                          <div className="flex items-center mb-4">
                            <CheckCircleOutlined className="text-green-500 text-lg mr-2" />
                            <Text className="text-green-800 font-bold text-lg">
                              Kết quả điều trị
                            </Text>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <Paragraph className="text-green-700 font-medium text-base mb-0 leading-relaxed">
                              {treatment.testResult}
                            </Paragraph>
                          </div>
                        </div>
                      </div>

                      {treatment.typeTest && treatment.typeTest.length > 0 && (
                        <div className="bg-blue-50 rounded-xl p-5">
                          <div className="flex items-center mb-4">
                            <ExperimentOutlined className="text-blue-500 text-lg mr-2" />
                            <Text className="text-blue-800 font-bold text-lg">
                              Các xét nghiệm ({treatment.typeTest.length})
                            </Text>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {treatment.typeTest.map((test, i) => (
                              <div
                                key={i}
                                className="bg-white rounded-lg p-4 shadow-sm"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                                  <div className="flex-1">
                                    <Text className="font-bold text-gray-800 block mb-2">
                                      {test.name}
                                    </Text>
                                    <Text className="text-gray-600 text-sm leading-relaxed">
                                      {test.description}
                                    </Text>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
