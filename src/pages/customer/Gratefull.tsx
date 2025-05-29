import { Card, Avatar, Typography, Tag } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import sampleStories from "../../data/sampleStoriesData"; // Đảm bảo đường dẫn đúng với file chứa dữ liệu mẫu

const { Title, Text, Paragraph } = Typography;

export const Gratefull = () => {
  const navigate = useNavigate();

  const handleCardClick = (storyId: string) => {
    navigate(`/gratefull/${storyId}`); // Sửa lại để khớp với route trong App.tsx
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-50 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Title level={1} className="text-blue-700 mb-4">
            Câu Chuyện Thành Công
          </Title>
          <Paragraph className="text-gray-600 text-lg">
            Những câu chuyện truyền cảm hứng từ các gia đình đã thành công trong
            hành trình điều trị hiếm muộn
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {sampleStories.map((story) => (
            <Card
              key={story.id}
              onClick={() => handleCardClick(story.id)}
              className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-0 aspect-square cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              }}
              bodyStyle={{ padding: 0 }}
            >
              {" "}
              <div className="flex flex-col items-center justify-center p-6">
                {/* Avatar Section */}
                <div className="mb-6 w-full flex flex-col items-center">
                  <div className="w-1/2 aspect-square relative mb-4">
                    <Avatar
                      src={story.avatarUrl}
                      className="!w-full !h-full border-4 border-pink-200"
                      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    />
                  </div>
                  <Text strong className="block text-lg text-center">
                    {story.userName}
                  </Text>
                  <div className="mt-2 flex justify-center"></div>
                </div>

                {/* Content Section */}
                <div className="space-y-4 w-full">
                  <div className="text-center">
                    <Title level={4} className="text-blue-700 !mb-2">
                      {story.title}
                    </Title>
                    <Tag color="pink" className="rounded-full px-4 py-1">
                      {story.treatmentType}
                    </Tag>
                  </div>

                  <Paragraph className="text-gray-600 text-base leading-relaxed px-2 text-center line-clamp-4">
                    {story.story}
                  </Paragraph>

                  {/* Footer Section */}
                  <div className="flex flex-col items-center gap-2 text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-2">
                      <CalendarOutlined /> Thời gian: {story.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      Chia sẻ:{" "}
                      {new Date(story.date).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gratefull;
