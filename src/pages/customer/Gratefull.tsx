// import { Card, Avatar, Typography, Tag } from "antd";
// import { CalendarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import sampleStories from "../../data/sampleStoriesData"; // Đảm bảo đường dẫn đúng với file chứa dữ liệu mẫu
import { Calendar, Star, ArrowRight } from "lucide-react";

// const { Title, Text, Paragraph } = Typography;

interface GratefullProps {
  limit?: number;
}

export const Gratefull = ({ limit }: GratefullProps) => {
  const navigate = useNavigate();
  const displayStories = limit ? sampleStories.slice(0, limit) : sampleStories;

  const handleCardClick = (storyId: string) => {
    navigate(`/gratefull/${storyId}`); // Sửa lại để khớp với route trong App.tsx
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gradient-to-b from-pink-50 to-blue-50 rounded-3xl shadow-lg">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Hành Trình Đi Tìm Thiên Thần
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
          Những câu chuyện truyền cảm hứng từ các gia đình đã thành công trong
          hành trình điều trị hiếm muộn
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-500 mt-4 rounded-full lg:mx-0 mx-auto" />
      </div>

      {/* Stories Grid */}
      <div className="space-y-6">
        {displayStories.map((story) => (
          <div
            key={story.id}
            onClick={() => handleCardClick(story.id)}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-pink-200 cursor-pointer"
          >
            <div className="p-2">
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-blue-400 p-0.5">
                    <img
                      src={story.avatarUrl || "/placeholder.svg"}
                      alt={story.userName}
                      className="w-full h-full rounded-full object-cover bg-white"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                      {story.userName}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700">
                      {story.treatmentType}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {story.duration}
                    </span>
                  </div>

                  <h4 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {story.title}
                  </h4>

                  <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {story.story}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Chia sẻ:{" "}
                      {new Date(story.date).toLocaleDateString("vi-VN")}
                    </span>
                    <button className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium group-hover:translate-x-1 transition-all duration-300">
                      Đọc thêm
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover effect bar */}
            <div className="h-1 bg-gradient-to-r from-pink-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>
        ))}
      </div>

      {/* View All Button */}
      {/* <div className="text-center pt-6">
        <button className="inline-flex items-center bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          Xem tất cả câu chuyện
          <Heart className="w-5 h-5 ml-2" />
        </button>
      </div> */}
    </div>

    // <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-50 py-12">
    //   <div className="max-w-7xl mx-auto">
    //     <div className="text-center mb-12">
    //       <Title level={1} className="text-pink-600 !mb-4 font-bold">
    //         Câu Chuyện Thành Công
    //       </Title>
    //       <Paragraph className="text-gray-600 text-lg">
    //         Những câu chuyện truyền cảm hứng từ các gia đình đã thành công trong
    //         hành trình điều trị hiếm muộn
    //       </Paragraph>
    //     </div>

    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
    //       {sampleStories.map((story) => (
    //         <Card
    //           key={story.id}
    //           onClick={() => handleCardClick(story.id)}
    //           className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-0 aspect-square cursor-pointer"
    //           style={{
    //             background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    //           }}
    //           bodyStyle={{ padding: 0 }}
    //         >
    //           {" "}
    //           <div className="flex flex-col items-center justify-center p-6">
    //             {/* Avatar Section */}
    //             <div className="mb-6 w-full flex flex-col items-center">
    //               <div className="w-1/2 aspect-square relative mb-4">
    //                 <Avatar
    //                   src={story.avatarUrl}
    //                   className="!w-full !h-full border-4 border-pink-200"
    //                   style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
    //                 />
    //               </div>
    //               <Text strong className="block text-lg text-center">
    //                 {story.userName}
    //               </Text>
    //               <div className="mt-2 flex justify-center"></div>
    //             </div>

    //             {/* Content Section */}
    //             <div className="space-y-4 w-full">
    //               <div className="text-center">
    //                 <Title level={4} className="text-blue-700 !mb-2">
    //                   {story.title}
    //                 </Title>
    //                 <Tag color="pink" className="rounded-full px-4 py-1">
    //                   {story.treatmentType}
    //                 </Tag>
    //               </div>

    //               <Paragraph className="text-gray-600 text-base leading-relaxed px-2 text-center line-clamp-4">
    //                 {story.story}
    //               </Paragraph>

    //               {/* Footer Section */}
    //               <div className="flex flex-col items-center gap-2 text-sm text-gray-500 pt-4 border-t border-gray-100">
    //                 <span className="flex items-center gap-2">
    //                   <CalendarOutlined /> Thời gian: {story.duration}
    //                 </span>
    //                 <span className="flex items-center gap-2">
    //                   Chia sẻ:{" "}
    //                   {new Date(story.date).toLocaleDateString("vi-VN")}
    //                 </span>
    //               </div>
    //             </div>
    //           </div>
    //         </Card>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Gratefull;
