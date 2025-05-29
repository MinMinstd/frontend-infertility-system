import { useEffect } from "react";

export default function Mission() {
  useEffect(() => {
    // Initialize carousel when component mounts
    const carousel = document.getElementById("default-carousel");
    const items = carousel?.getElementsByClassName("carousel-item");
    const indicators = carousel?.getElementsByClassName("carousel-indicator");
    let currentSlide = 0;

    function showSlide(index: number) {
      if (!items || !indicators) return;

      // Hide all slides
      for (let i = 0; i < items.length; i++) {
        items[i].classList.add("hidden");
        indicators[i].classList.remove("bg-white");
        indicators[i].classList.add("bg-white/50");
      }

      // Show current slide
      items[index].classList.remove("hidden");
      indicators[index].classList.remove("bg-white/50");
      indicators[index].classList.add("bg-white");
      currentSlide = index;
    }

    function nextSlide() {
      if (!items) return;
      showSlide((currentSlide + 1) % items.length);
    }

    function prevSlide() {
      if (!items) return;
      showSlide((currentSlide - 1 + items.length) % items.length);
    }

    // Add event listeners
    document
      .querySelector("[data-carousel-next]")
      ?.addEventListener("click", nextSlide);
    document
      .querySelector("[data-carousel-prev]")
      ?.addEventListener("click", prevSlide);

    // Show first slide
    showSlide(0);

    // Auto advance slides
    const interval = setInterval(nextSlide, 5000);

    return () => {
      clearInterval(interval);
      document
        .querySelector("[data-carousel-next]")
        ?.removeEventListener("click", nextSlide);
      document
        .querySelector("[data-carousel-prev]")
        ?.removeEventListener("click", prevSlide);
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-8 px-4 bg-white">
        {/* Grid left: 3/4 */}
        <div className="lg:col-span-3 flex flex-col h-[800px]">
          <div className="max-w-3xl mx-auto text-center lg:text-left mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-pink-600 mb-4">
              Sứ mệnh & Cơ sở vật chất
            </h2>
            <p className="text-gray-700 mb-4">
              Sứ mệnh của chúng tôi là mang lại hy vọng và hạnh phúc cho các gia
              đình hiếm muộn. Bệnh viện được trang bị hệ thống phòng lab hiện
              đại tiên tiến, phòng khám tiện nghi, không gian thân thiện và
              riêng tư.
            </p>
          </div>

          <div id="default-carousel" className="relative flex-1 w-full">
            {/* Carousel wrapper */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              {/* Item 1 */}
              <div className="hidden duration-700 ease-in-out carousel-item h-full">
                <img
                  src="/Images/Mission/ms_1.jpg"
                  className="absolute block w-full h-full object-cover"
                  alt="Phòng khám hiện đại 1"
                />
              </div>
              {/* Item 2 */}
              <div className="hidden duration-700 ease-in-out carousel-item h-full">
                <img
                  src="/Images/Mission/ms_2.jpg"
                  className="absolute block w-full h-full object-cover"
                  alt="Phòng khám hiện đại 2"
                />
              </div>
              {/* Item 3 */}
              <div className="hidden duration-700 ease-in-out carousel-item h-full">
                <img
                  src="/Images/Mission/ms_3.jpeg"
                  className="absolute block w-full h-full object-cover"
                  alt="Phòng khám hiện đại 3"
                />
              </div>
            </div>

            {/* Slider indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
              <button
                type="button"
                className="w-3 h-3 rounded-full carousel-indicator bg-white/50"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                className="w-3 h-3 rounded-full carousel-indicator bg-white/50"
                aria-current="false"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                className="w-3 h-3 rounded-full carousel-indicator bg-white/50"
                aria-current="false"
                aria-label="Slide 3"
              ></button>
            </div>

            {/* Slider controls */}
            <button
              type="button"
              className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                <svg
                  className="w-4 h-4 text-white rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                <svg
                  className="w-4 h-4 text-white rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>

        {/* Grid right: 1/4 */}
        <div className="lg:col-span-1 flex flex-col space-y-4">
          <div className="bg-pink-50 rounded-xl shadow-sm p-4">
            <div className="space-y-4">
              {/* News item 1 */}
              <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                <img
                  className="w-full h-48 object-cover"
                  src="/Images/Mission/ms_1.jpg"
                  alt="Tin tức về bệnh viện"
                />
                <div className="p-5">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                    Tin tức mới nhất về bệnh viện
                  </h5>
                  <p className="mb-3 font-normal text-gray-700">
                    Cập nhật những thông tin mới nhất về hoạt động và dịch vụ
                    của bệnh viện.
                  </p>
                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300">
                    Xem thêm
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* News item 2 */}
              <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                <img
                  className="w-full h-48 object-cover"
                  src="/Images/Mission/ms_2.jpg"
                  alt="Sự kiện sắp diễn ra"
                />
                <div className="p-5">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                    Sự kiện sắp diễn ra
                  </h5>
                  <p className="mb-3 font-normal text-gray-700">
                    Thông tin về các sự kiện, hội thảo và chương trình sắp diễn
                    ra tại bệnh viện.
                  </p>
                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300">
                    Xem thêm
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                <img
                  className="w-full h-48 object-cover"
                  src="/Images/Mission/ms_2.jpg"
                  alt="Sự kiện sắp diễn ra"
                />
                <div className="p-5">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                    Sự kiện sắp diễn ra
                  </h5>
                  <p className="mb-3 font-normal text-gray-700">
                    Thông tin về các sự kiện, hội thảo và chương trình sắp diễn
                    ra tại bệnh viện.
                  </p>
                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300">
                    Xem thêm
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
