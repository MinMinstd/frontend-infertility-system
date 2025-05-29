import { useParams } from "react-router-dom";
import { Typography } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import sampleStories from "../../data/sampleStoriesData"; // Đảm bảo đường dẫn đúng với file chứa dữ liệu mẫu
import { SlideSplit } from "../../components/SlideSplit";

const { Title, Text, Paragraph } = Typography;

export const GratefulDetail = () => {
  const { id } = useParams();

  // Tìm story từ id
  const story = sampleStories.find((s) => s.id === id);

  if (!story) {
    return <div>Không tìm thấy câu chuyện</div>;
  }

  return (
    <div className="min-h-screen py-4 px-4 bg-gradient-to-b">
      <div className="max-w-4xl mx-auto p-8">
        {/* container câu chuyện */}
        <div className="flex flex-col ">
          {/* thông tin chi tiết về câu chuyện */}
          <Title level={2} className="text-blue-700 mb-4">
            {story.title}
          </Title>
          <Text strong className="text-xl mb-4">
            {story.userName}
          </Text>
          <Paragraph className="text-gray-600 text-lg leading-relaxed mb-8">
            {story.story}
          </Paragraph>
          <div className="grid grid-cols-2 gap-4 px-2 py-4">
            {/* Đây là chỗ post hình ảnh */}
            <img src="../public/Images/Banner.jpg" alt="bayby" />
            <img src="../public/Images/Banner.jpg" alt="bayby" />
            <img src="../public/Images/Banner.jpg" alt="bayby" />
          </div>
          {/* Thời gian thực hiện bài post */}
          <div className="flex items-center gap-4 text-gray-500">
            <span className="flex items-center gap-2">
              <CalendarOutlined /> Thời gian: {story.duration}
            </span>
            <span>
              Chia sẻ: {new Date(story.date).toLocaleDateString("vi-VN")}
            </span>
          </div>
        </div>
      </div>

      {/* split slide */}
      <div className="max-w-4xl mx-auto py-6">
        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-center w-full text-4xl text-pink-700 mb-8">
            <span className="font-bold">BÀI VIẾT TRI ÂN KHÁC</span>
          </div>

          <div className="w-full">
            <SlideSplit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GratefulDetail;
