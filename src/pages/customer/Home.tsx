// src/pages/Home.tsx

import Banner from "../../components/Banner";
import Mission from "../../components/Mission";
import WhyChooseUs from "../../components/WhyChooseUs";
import Gratefull from "./Gratefull";
import Services from "./Services";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50">
        <Banner />
        <Mission />
        <Services />

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
