// import { Card, Avatar, Typography, Tag } from "antd";
// import { CalendarOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../../servers/user.api";
import type { BlogPost } from "../../types/user.d";
import { Calendar, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// const { Title, Text, Paragraph } = Typography;

interface GratefullProps {
  limit?: number;
}

export const Gratefull = ({ limit }: GratefullProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState({
    title: "",
    treatmentType: "",
    story: "",
    imageFile: null as File | null,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await UserApi.GetBlogPosts();
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        }
      } catch {
        // Xử lý lỗi nếu cần
      }
    };
    fetchPosts();
  }, []);

  const displayStories = limit ? posts.slice(0, limit) : posts;

  const handleCardClick = (blogPostId: number) => {
    navigate(`/gratefull/${blogPostId}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setForm((prev) => ({ ...prev, imageFile: file || null }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.treatmentType || !form.title || !form.story) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    const formData = new FormData();
    formData.append("Title", form.title);
    formData.append("Story", form.story);
    formData.append("TreatmentType", form.treatmentType);
    if (form.imageFile) {
      formData.append("ImageFile", form.imageFile);
    }
    try {
      await UserApi.PostBlog(formData);
      // Sau khi đăng thành công, reload lại danh sách bài viết
      const res = await UserApi.GetBlogPosts();
      if (Array.isArray(res.data)) {
        setPosts(res.data);
      }
      setForm({ title: "", treatmentType: "", story: "", imageFile: null });
      setError("");
      setIsModalOpen(false);
    } catch {
      setError("Đăng bài thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-transparent">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 text-2xl font-bold"
              onClick={() => setIsModalOpen(false)}
              aria-label="Đóng"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4 text-pink-600">Chia sẻ câu chuyện của bạn</h3>
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dịch vụ bạn sử dụng</label>
                <input
                  type="text"
                  name="treatmentType"
                  value={form.treatmentType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="VD: IVF, IUI, ..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Nhập tiêu đề câu chuyện"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
                <textarea
                  name="story"
                  value={form.story}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 min-h-[100px]"
                  placeholder="Chia sẻ câu chuyện của bạn..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh (tùy chọn)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-pink-600 hover:to-blue-600 transition-all duration-300"
                >
                  Đăng bài
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <motion.div className="bg-transparent rounded-3xl shadow-2xl p-8" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <motion.div className="text-center lg:text-left" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Hành Trình Đi Tìm Thiên Thần
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
            Những câu chuyện truyền cảm hứng từ các gia đình đã thành công trong
            hành trình điều trị hiếm muộn
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-500 mt-4 rounded-full lg:mx-0 mx-auto" />
        </motion.div>
        <motion.div className="flex justify-end mb-6 mt-4" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
          <motion.button
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-pink-600 hover:to-blue-600 transition-all duration-300"
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.08 }}
          >
            Chia sẻ câu chuyện
          </motion.button>
        </motion.div>
        <motion.div className="space-y-6 mt-6" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
          {displayStories.map((story) => (
            <motion.div
              key={story.blogPostId}
              onClick={() => handleCardClick(story.blogPostId)}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-pink-200 cursor-pointer mb-4"
              whileHover={{ scale: 1.04 }}
            >
              <div className="p-2">
                <div className="flex items-start space-x-4">
                  {/* Không hiển thị avatar hay bất kỳ hình ảnh nào */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                        {story.customerName || "Ẩn danh"}
                      </h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
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
                        {new Date(story.date).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {story.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {story.story}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Chia sẻ: {new Date(story.date).toLocaleDateString("vi-VN")}
                      </span>
                      <motion.button whileHover={{ scale: 1.08 }} className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium group-hover:translate-x-1 transition-all duration-300">
                        Đọc thêm
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-pink-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Gratefull;
