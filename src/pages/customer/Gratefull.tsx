"use client";

import { useNavigate } from "react-router-dom";
import sampleStories from "../../data/sampleStoriesData"; // Đảm bảo đường dẫn đúng với file chứa dữ liệu mẫu
import { Calendar, Star, ArrowRight } from "lucide-react";

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
      <div className="text-center lg:text-left mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Hành Trình Đi Tìm Thiên Thần
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
          Những câu chuyện truyền cảm hứng từ các gia đình đã thành công trong
          hành trình điều trị hiếm muộn
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-500 mt-4 rounded-full lg:mx-0 mx-auto" />
      </div>

      {/* Stories Grid - Changed to 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayStories.map((story) => (
          <div
            key={story.id}
            onClick={() => handleCardClick(story.id)}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-pink-200 cursor-pointer flex flex-col"
          >
            <div className="p-4 flex-1 flex flex-col">
              {/* Avatar - Centered */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-blue-400 p-0.5">
                  <img
                    src={story.avatarUrl || "/placeholder.svg"}
                    alt={story.userName}
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col text-center">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors flex-1 text-center">
                    {story.userName}
                  </h3>
                  <div className="flex items-center space-x-1 absolute top-4 right-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-2 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700">
                    {story.treatmentType}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {story.duration}
                  </span>
                </div>

                <h4 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {story.title}
                </h4>

                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3 text-sm flex-1">
                  {story.story}
                </p>

                <div className="mt-auto">
                  <div className="text-xs text-gray-500 mb-2">
                    Chia sẻ: {new Date(story.date).toLocaleDateString("vi-VN")}
                  </div>
                  <button className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium group-hover:translate-x-1 transition-all duration-300 text-sm">
                    Đọc thêm
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Hover effect bar */}
            <div className="h-1 bg-gradient-to-r from-pink-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gratefull;
