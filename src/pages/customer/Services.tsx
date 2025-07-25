//Thông tin dịch vụ
// import { ServiceCard } from "../../components/ServiceCard";
import { Link, useNavigate } from "react-router-dom";
import { ServiceInfo } from "../../data/ServiceInformation";
import { motion } from "framer-motion";

export default function Services() {
  const navlink = useNavigate();
  const detailLink = (id: string) => {
    navlink(`/services/${id}`);
  };

  return (
    <section
      className="py-16 bg-transparent"
      id="services"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Header */}
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Dịch vụ của chúng tôi
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Chúng tôi cung cấp đầy đủ các dịch vụ chuyên khoa với công nghệ hiện
              đại và đội ngũ chuyên gia giàu kinh nghiệm
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          {/* Services Grid */}
          <div className="flex justify-center">
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
              {ServiceInfo.map((service, index) => {
                return (
                  <motion.div
                    key={service.id}
                    onClick={() => detailLink(service.id)}
                    className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-pink-200 cursor-pointer mb-4"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                    whileHover={{ scale: 1.04 }}
                  >
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 p-8">
                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
                        {service.description}
                      </p>

                      {/* CTA */}
                      <motion.button whileHover={{ scale: 1.08 }} className="inline-flex items-center text-pink-600 hover:text-pink-700 font-semibold group-hover:translate-x-2 transition-all duration-300">
                        Tìm hiểu thêm
                        <svg
                          className="w-5 h-5 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </motion.button>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-pink-100 to-blue-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-blue-100 to-pink-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div className="text-center mt-16" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            <Link to="/services">
              <motion.button whileHover={{ scale: 1.08 }} className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                Xem tất cả dịch vụ
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>

    // <section className="py-12 px-4 bg-pink-50" id="services">
    //   <div className="max-w-5xl mx-auto">
    //     <h2 className="text-2xl md:text-3xl font-bold text-center text-pink-600 mb-8">
    //       Dịch vụ của chúng tôi
    //     </h2>
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    //       {ServiceInfo.map((service) => (
    //         <ServiceCard
    //           key={service.id}
    //           {...service}
    //           detailLink={`/services/${service.id}`}
    //         />
    //       ))}
    //     </div>
    //   </div>
    // </section>
  );
}
