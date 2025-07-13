import React, { useState, useCallback, useEffect } from "react";
import { Card, Typography, Button, Timeline, Tag, Space, Spin } from "antd";
import { Link } from "react-router-dom";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import type {
  CurrentService,
  TreatmentHistory,
} from "../../types/medicalRecord.d";
import UserApi from "../../servers/user.api";

const { Title, Text } = Typography;

const MedicalRecord: React.FC = () => {
  const [expandedStages, setExpandedStages] = useState<string[]>([]);

  // Lưu trữ danh sách hồ sơ điều trị
  const [medicalRecord, setMedicalRecord] = useState<TreatmentHistory[]>([]);
  const [medicalLoading, setmedicalLoading] = useState<boolean>(true);

  // Lưu trữ dịch vụ hiện tại
  const [currentServices, setCurrentServices] = useState<CurrentService[]>([]);
  const [currentServicesLoading, setcurrentServicesLoading] =
    useState<boolean>(true);

  const handleStageExpand = useCallback((stageIndex: string) => {
    setExpandedStages((prev) =>
      prev.includes(stageIndex)
        ? prev.filter((id) => id !== stageIndex)
        : [...prev, stageIndex]
    );
  }, []);

  const formatDate = useCallback((dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString("vi-VN");
    } catch (error) {
      console.error("Error formatting date:", error);
      console.error("Invalid date:", dateString);
      return "Ngày không hợp lệ";
    }
  }, []);

  //Lấy danh sách hồ sơ điều trị
  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const res = await UserApi.GetMedicalRecord();
        console.log("Hồ sơ điều trị:", res.data);
        setMedicalRecord(res.data);
        setmedicalLoading(false);
      } catch (error) {
        console.error(
          "Lỗi không thể load được danh sách medical record: ",
          error
        );
        setmedicalLoading(false);
      }
    };

    fetchMedicalRecords();
  }, []);

  //Lấy danh sách dịch vụ hiện tại đang sử dụng
  useEffect(() => {
    const fetchCurrentServices = async () => {
      try {
        const res = await UserApi.GetCurrentService();
        console.log("Dịch vụ hiện tại:", res.data);
        setCurrentServices(res.data); //Đang trả ra dạng object, không phải mảng nếu là list thì cần setCurrentServices(res.data);
        setcurrentServicesLoading(false);
      } catch (error) {
        console.error("Lỗi không thể load được dịch vụ hiện tại: ", error);
      }
      setcurrentServicesLoading(false);
    };
    fetchCurrentServices();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Loading dịch vụ */}
      {currentServicesLoading ? (
        <div className="flex justify-center py-6">
          <Spin size="large" />
        </div>
      ) : currentServices.length === 0 ? (
        <div className="text-center text-gray-500 py-6">
          Không có dịch vụ hiện tại nào để hiển thị.
        </div>
      ) : (
        <Card className="rounded-xl shadow-lg">
          <Title level={3} className="text-pink-600 font-bold mb-4 text-center">
            Dịch vụ đang sử dụng
          </Title>
          {currentServices.map((service, index) => (
            <div key={index} className="p-4 border rounded-lg mb-4">
              <Space direction="vertical" size="small" className="w-full">
                <div className="flex justify-between items-center">
                  <Text strong className="text-lg">
                    {service.nameService}
                  </Text>
                  <Tag color="processing">{service.status}</Tag>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Text type="secondary">Bác sĩ phụ trách:</Text>
                    <Text strong> {service.fullName}</Text>
                  </div>
                  <div>
                    <Text type="secondary">Ngày bắt đầu:</Text>
                    <Text strong> {formatDate(service.startDate)}</Text>
                  </div>
                  <div>
                    <Text type="secondary">Ngày kết thúc tiếp theo:</Text>
                    <Text strong> {formatDate(service.endDate)}</Text>
                  </div>
                  <div>
                    <Text type="secondary">Mô tả dịch vụ:</Text>
                    <Text strong> {service.description}</Text>
                  </div>
                </div>
              </Space>
            </div>
          ))}
        </Card>
      )}

      {!medicalLoading && medicalRecord.length === 0 && (
        <div className="text-center text-gray-500 py-6">
          Không có hồ sơ điều trị nào để hiển thị.
        </div>
      )}

      {/* Lịch sử điều trị với quá trình chi tiết */}
      <Card className="rounded-xl shadow-lg">
        <Title level={3} className="text-pink-600 font-bold mb-4 text-center">
          Lịch sử điều trị
        </Title>

        {medicalLoading ? (
          <div className="flex justify-center items-center py-8">
            <Spin size="large" />
          </div>
        ) : (
          <Timeline>
            {medicalRecord.map((item, index) => (
              <Timeline.Item
                key={item.attempt ?? index}
                color={item.status === "Thành công" ? "green" : "pink"}
              >
                <div className="border rounded-lg overflow-hidden">
                  <div
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => handleStageExpand(index.toString())}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleStageExpand(index.toString())
                    }
                    role="button"
                    tabIndex={0}
                    aria-expanded={expandedStages.includes(index.toString())}
                    aria-label={`Xem chi tiết ${item.stage}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Text strong className="text-lg">
                          {item.stage}
                        </Text>
                        {expandedStages.includes(index.toString()) ? (
                          <DownOutlined className="text-pink-500 text-xs" />
                        ) : (
                          <RightOutlined className="text-pink-500 text-xs" />
                        )}
                      </div>
                      <Tag
                        color={
                          item.status === "Thành công"
                            ? "success"
                            : "processing"
                        }
                      >
                        {item.status}
                      </Tag>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div>
                        <Text type="secondary">Ngày bắt đầu: </Text>
                        <Text strong>{formatDate(item.startDate)}</Text>
                      </div>
                      <div>
                        <Text type="secondary">Ngày kết thúc: </Text>
                        <Text strong>{formatDate(item.endDate)}</Text>
                      </div>
                    </div>

                    <div className="mb-2">
                      <Text type="secondary">Chẩn đoán: </Text>
                      <Text strong>{item.diagnosis}</Text>
                    </div>
                    <div className="mb-2">
                      <Text type="secondary">Lần thử: </Text>
                      <Text strong>{item.attempt}</Text>
                    </div>

                    <Link
                      to={`/user/treatment_process/${item.medicalRecordId}`}
                    >
                      <Button
                        type="link"
                        className="text-pink-600 hover:text-pink-800 px-0 mt-2"
                      >
                        Xem chi tiết
                      </Button>
                    </Link>
                  </div>
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        )}
      </Card>
    </div>
  );
};

export default MedicalRecord;
