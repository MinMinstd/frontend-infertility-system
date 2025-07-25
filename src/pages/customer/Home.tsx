// src/pages/Home.tsx

import Banner from "../../components/Banner";
import Mission from "../../components/Mission";
import WhyChooseUs from "../../components/WhyChooseUs";
import Gratefull from "./Gratefull";
import Services from "./Services";

// Hiệu ứng trái tim rơi cho toàn trang
function FallingHeartsBg() {
  const hearts = [
    { left: '10%', size: 28, delay: '0s', duration: '6s', opacity: 0.7 },
    { left: '25%', size: 36, delay: '1.2s', duration: '7s', opacity: 0.5 },
    { left: '40%', size: 24, delay: '0.7s', duration: '5.5s', opacity: 0.6 },
    { left: '60%', size: 32, delay: '2s', duration: '8s', opacity: 0.8 },
    { left: '75%', size: 40, delay: '0.5s', duration: '7.5s', opacity: 0.5 },
    { left: '85%', size: 30, delay: '1.7s', duration: '6.5s', opacity: 0.6 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {hearts.map((h, i) => (
        <svg
          key={i}
          className="falling-heart absolute text-pink-500"
          style={{
            left: h.left,
            width: h.size,
            height: h.size,
            opacity: h.opacity,
            animationDelay: h.delay,
            animationDuration: h.duration,
          } as React.CSSProperties}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-[#fafaff] overflow-hidden">
        <FallingHeartsBg />
        <Banner />
        <Mission />
        <section className="py-16 bg-transparent" id="services">
          <Services />
        </section>

        {/* Main content grid */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Success Stories */}
            <div className="order-2 lg:order-1">
              <Gratefull limit={3} />
            </div>

            {/* Why Choose Us */}
            <div className="order-1 lg:order-2">
              <WhyChooseUs />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
