import { Card, Avatar, Typography, Tag } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

interface SuccessStory {
  id: string;
  userName: string;
  title: string;
  story: string;
  treatmentType: string;
  date: string;
  avatarUrl?: string;
  duration: string;
  rating: number;
}

const sampleStories: SuccessStory[] = [
  {
    id: "1",
    userName: "Nguyễn Thu Hà",
    title: "Hành trình 2 năm chiến đấu với vô sinh",
    story:
      "Sau 2 năm điều trị tại bệnh viện, cuối cùng chúng tôi đã đón được thiên thần nhỏ về với gia đình. Cảm ơn đội ngũ y bác sĩ đã luôn đồng hành và hỗ trợ chúng tôi trong suốt quá trình điều trị.",
    treatmentType: "IVF",
    date: "2025-05-15",
    duration: "2 năm",
    rating: 5,
    avatarUrl: "https://api.dicebear.com/6.x/avataaars/svg?seed=Ha",
  },
  {
    id: "2",
    userName: "Trần Văn Minh",
    title: "Phép màu đến sau 3 lần thử IUI",
    story:
      "Vợ chồng tôi đã trải qua 3 lần thực hiện IUI và cuối cùng đã thành công. Đội ngũ y tế tại đây thực sự chuyên nghiệp và tận tâm. Họ không chỉ điều trị mà còn là chỗ dựa tinh thần cho chúng tôi.",
    treatmentType: "IUI",
    date: "2025-05-10",
    duration: "1.5 năm",
    rating: 5,
    avatarUrl: "https://api.dicebear.com/6.x/avataaars/svg?seed=Minh",
  },
  {
    id: "3",
    userName: "Lê Thị Hương",
    title: "Niềm vui nhân đôi với song thai",
    story:
      "Sau nhiều năm chờ đợi, chúng tôi đã may mắn có được hai thiên thần nhỏ. Cảm ơn đội ngũ bác sĩ đã giúp chúng tôi thực hiện ước mơ làm cha mẹ.",
    treatmentType: "IVF",
    date: "2025-05-08",
    duration: "3 năm",
    rating: 5,
    avatarUrl: "https://api.dicebear.com/6.x/avataaars/svg?seed=Huong",
  },
  {
    id: "4",
    userName: "Phạm Thanh Tùng",
    title: "Hạnh phúc đến từ sự kiên trì",
    story:
      "Chúng tôi đã trải qua nhiều thất bại nhưng không bỏ cuộc. Giờ đây niềm hạnh phúc đã mỉm cười với gia đình nhỏ của chúng tôi.",
    treatmentType: "ICSI",
    date: "2025-05-05",
    duration: "2.5 năm",
    rating: 5,
    avatarUrl: "https://api.dicebear.com/6.x/avataaars/svg?seed=Tung",
  },
];

export const Gratefull = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-50 py-12 px-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
          {sampleStories.map((story) => (
            <Card
              key={story.id}
              className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-0"
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
