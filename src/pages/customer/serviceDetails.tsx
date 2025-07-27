import { useParams } from "react-router-dom";
import { Typography, Steps, Card } from "antd";
import { ServiceInfo } from "../../data/ServiceInformation";

const { Title, Paragraph, Text } = Typography;

const ServiceDetails = () => {
  const { id } = useParams();
  const service = ServiceInfo.find((s) => s.id === id);

  if (!service) {
    return <div>Không tìm thấy dịch vụ</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Title level={2} className="text-blue-700 mb-6">
        {service.title}
      </Title>
      <Paragraph className="text-lg mb-8">{service.description}</Paragraph>

      <Title level={3} className="mb-6">
        Quy trình điều trị
      </Title>
      {service.steps && service.steps.length > 0 ? (
        <Steps
          direction="vertical"
          current={-1}
          items={service.steps.map((step) => ({
            title: (
              <Text strong className="text-lg">
                {step.title}
              </Text>
            ),
            description: (
              <Card className="mt-2" bordered={false}>
                <Paragraph>{step.description}</Paragraph>
                {step.duration && (
                  <Text type="secondary" className="block mt-2">
                    Thời gian: {step.duration}
                  </Text>
                )}
                {step.notes && (
                  <Text type="warning" className="block mt-2">
                    Lưu ý: {step.notes}
                  </Text>
                )}
              </Card>
            ),
          }))}
        />
      ) : (
        <Text type="secondary">Chưa có thông tin quy trình điều trị.</Text>
      )}
    </div>
  );
};

export default ServiceDetails;
