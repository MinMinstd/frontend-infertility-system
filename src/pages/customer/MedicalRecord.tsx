import React, { useState, useCallback, useEffect } from "react";
import { Card, Typography, Button, Timeline, Tag, Space, Spin } from "antd";
import { Link } from "react-router-dom";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import type {
  CurrentService,
  MedicalRecordDetail,
  TreatmentHistory,
} from "../../types/medicalRecord.d";
import UserApi from "../../servers/user.api";

const { Title, Text } = Typography;

const currentServices: CurrentService[] = [
  {
    id: "SVC001",
    name: "Thụ tinh nhân tạo IUI",
    startDate: "2024-03-01",
    status: "Đang thực hiện",
    doctor: "BS. Trần Văn C",
    nextAppointment: "2024-03-15",
  },
];

const MedicalRecord: React.FC = () => {
  const [expandedStages, setExpandedStages] = useState<string[]>([]);
  const [medicalRecord, setMedicalRecord] = useState<TreatmentHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      console.log("Error", error);
      console.error("Invalid date:", dateString);
      return "Ngày không hợp lệ";
    }
  }, []);

  const renderMedicalRecordDetails = useCallback(
    (details: MedicalRecordDetail[]) => {
      return (
        <Timeline
          items={details.map((detail, detailIndex) => ({
            color: "green",
            children: (
              <div key={detailIndex} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <Text strong className="text-base">
                    {formatDate(detail.date)}
                  </Text>
                  <Tag color="success">Hoàn thành</Tag>
                </div>
                <div className="space-y-2">
                  <div>
                    <Text type="secondary">Kết quả xét nghiệm: </Text>
                    <Text className="text-green-600 font-medium">
                      {detail.testResult}
                    </Text>
                  </div>
                  <div>
                    <Text type="secondary">Ghi chú: </Text>
                    <Text>{detail.note}</Text>
                  </div>
                  {detail.treatmentRoadmapId && (
                    <div>
                      <Text type="secondary">ID lộ trình điều trị: </Text>
                      <Text>{detail.treatmentRoadmapId}</Text>
                    </div>
                  )}
                </div>
              </div>
            ),
          }))}
        />
      );
    },
    [formatDate]
  );

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const res = await UserApi.GetMedicalRecorDetail();
        setMedicalRecord(res.data);
        console.log("Data medical record đưa lên nè: ", res.data);
        setMedicalRecord(res.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Lỗi không thể load được danh sách medical record: ",
          error
        );
        setLoading(false);
      }
    };

    fetchMedicalRecords();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Dịch vụ đang sử dụng */}
      <Card className="rounded-xl shadow-lg">
        <Title level={3} className="text-pink-600 font-bold mb-4 text-center">
          Dịch vụ đang sử dụng
        </Title>
        {currentServices.map((service) => (
          <div key={service.id} className="p-4 border rounded-lg mb-4">
            <Space direction="vertical" size="small" className="w-full">
              <div className="flex justify-between items-center">
                <Text strong className="text-lg">
                  {service.name}
                </Text>
                <Tag color="processing">{service.status}</Tag>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Text type="secondary">Bác sĩ phụ trách:</Text>
                  <Text strong> {service.doctor}</Text>
                </div>
                <div>
                  <Text type="secondary">Ngày bắt đầu:</Text>
                  <Text strong> {formatDate(service.startDate)}</Text>
                </div>
                <div>
                  <Text type="secondary">Lịch hẹn tiếp theo:</Text>
                  <Text strong> {formatDate(service.nextAppointment)}</Text>
                </div>
              </div>
            </Space>
          </div>
        ))}
      </Card>

      {/* Lịch sử điều trị với quá trình chi tiết */}
      <Card className="rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <Title level={3} className="text-pink-600 font-bold mb-0">
            Lịch sử điều trị
          </Title>
          <Link to="/user/treatment_management">
            <Button
              type="primary"
              className="bg-pink-500 hover:bg-pink-600 border-none rounded-lg text-white px-4 py-1 text-base font-semibold"
            >
              Xem chi tiết
            </Button>
          </Link>
        </div>

        {!loading && medicalRecord.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            Không có hồ sơ điều trị nào để hiển thị.
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Spin size="large" />
          </div>
        ) : (
          <Timeline>
            {medicalRecord.map((item, index) => (
              <Timeline.Item
                key={item.attempt ?? index} // Hoặc item.id nếu có
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
                    <div>
                      <Text type="secondary">Lần thử: </Text>
                      <Text strong>{item.attempt}</Text>
                    </div>
                  </div>

                  {/* Quá trình điều trị chi tiết cho từng giai đoạn */}
                  {expandedStages.includes(index.toString()) && (
                    <div className="px-4 pb-4 bg-gray-50">
                      {renderMedicalRecordDetails(
                        item.medicalRecordDetails || []
                      )}
                    </div>
                  )}
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
