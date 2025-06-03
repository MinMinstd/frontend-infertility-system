import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import newsItems from "../data/newsItems";
import { Link } from "react-router-dom";

const carouselImages = [
  {
    src: " /Images/PhongKhamThanThien.jpg",
    alt: "Phòng khám hiện đại 1",
    title: "Phòng khám hiện đại",
  },
  {
    src: "/Images/TrangThietBi.jpg",
    alt: "Phòng khám hiện đại 2",
    title: "Trang thiết bị tiên tiến",
  },
  {
    src: "/Images/KhongGianThanThien.jpg ",
    alt: "Phòng khám hiện đại 3",
    title: "Không gian thân thiện",
  },
];

export default function Mission() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - 3/4 */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Sứ mệnh & Cơ sở vật chất
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
                Sứ mệnh của chúng tôi là mang lại hy vọng và hạnh phúc cho các
                gia đình hiếm muộn. Bệnh viện được trang bị hệ thống phòng lab
                hiện đại tiên tiến, phòng khám tiện nghi, không gian thân thiện
                và riêng tư.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-500 mt-4 rounded-full lg:mx-0 mx-auto" />
            </div>

            {/* Carousel */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden group">
              <div className="relative h-[500px] lg:h-[600px]">
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-8 left-8 text-white">
                      <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
                    </div>
                  </div>
                ))}

                {/* Controls */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Play/Pause */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-white scale-125"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 1/4 */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                Tin tức & Sự kiện
              </h3>

              <div className="space-y-6">
                {newsItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(item.date).toLocaleDateString("vi-VN")}
                        </span>
                        <Link
                          to={item.url || "#"}
                          className="text-pink-600 hover:text-pink-700 text-sm font-medium group-hover:translate-x-1 transition-all duration-300"
                        >
                          Xem thêm →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
