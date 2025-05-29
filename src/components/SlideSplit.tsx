export const SlideSplit = () => {
  const cardData = [
    {
      id: 1,
      image: "/docs/images/carousel/carousel-1.svg",
      title: "Hành trình đến với thiên thần nhỏ",
      description: "Câu chuyện về quá trình điều trị IVF thành công sau 2 năm.",
    },
    {
      id: 2,
      image: "/docs/images/carousel/carousel-2.svg",
      title: "Niềm vui bất ngờ",
      description: "Chia sẻ trải nghiệm điều trị và thành công bất ngờ.",
    },
    {
      id: 3,
      image: "/docs/images/carousel/carousel-3.svg",
      title: "Đừng bao giờ từ bỏ hy vọng",
      description: "Câu chuyện về sự kiên trì và niềm tin trong điều trị.",
    },
    {
      id: 4,
      image: "/docs/images/carousel/carousel-4.svg",
      title: "Món quà từ thiên đường",
      description: "Hành trình 3 năm và kết quả ngọt ngào.",
    },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-6">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {card.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
