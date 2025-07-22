import { useParams } from "react-router-dom";
import { Typography } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import UserApi from "../../servers/user.api";
import type { BlogPost } from "../../types/user.d";
import { SlideSplit } from "../../components/SlideSplit";
import { useEffect, useState } from "react";

const { Title, Text, Paragraph } = Typography;

export const GratefulDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState<BlogPost | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await UserApi.GetBlogPosts();
        if (Array.isArray(res.data)) {
          const found = res.data.find((s: BlogPost) => String(s.blogPostId) === String(id));
          setStory(found || null);
        }
        if (id) {
          // Fetch ảnh dạng blob
          const imgRes = await fetch(`https://localhost:7065/api/BlogPost/Image/${id}`);
          if (imgRes.ok) {
            const blob = await imgRes.blob();
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
          } else {
            setImageUrl(null);
          }
        }
      } catch {
        setStory(null);
        setImageUrl(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
    // Cleanup object URL khi unmount
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [id]);

  if (loading) return <div>Đang tải...</div>;
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
            {story.customerName || "Ẩn danh"}
          </Text>
          <Paragraph className="text-gray-600 text-lg leading-relaxed mb-8">
            {story.story}
          </Paragraph>
          {imageUrl && (
            <div className="flex justify-center py-4">
              <img src={imageUrl} alt="blog" style={{maxWidth: '100%', maxHeight: 400}} />
            </div>
          )}
          {/* Thời gian thực hiện bài post */}
          <div className="flex items-center gap-4 text-gray-500">
            <span className="flex items-center gap-2">
              <CalendarOutlined /> Thời gian: {story.treatmentType}
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
