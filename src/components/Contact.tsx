import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

export default function Contact() {
  return (
    <section className="py-12 px-4 bg-white" id="contact">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-8">
          Liên hệ
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-6 w-6 text-pink-500" />
              <span>123 Đường ABC, Quận 1, TP.HCM</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-6 w-6 text-blue-500" />
              <span>0123 456 789</span>
            </div>
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="h-6 w-6 text-green-500" />
              <span>info@benhvienhiemmuon.vn</span>
            </div>
            <div className="flex items-center gap-2">
              <GlobeAltIcon className="h-6 w-6 text-blue-700" />
              <a
                href="https://facebook.com"
                className="hover:underline text-blue-700"
              >
                Facebook
              </a>
              <span>|</span>
              <a
                href="https://zalo.me"
                className="hover:underline text-green-600"
              >
                Zalo
              </a>
            </div>
          </div>
          <div className="flex-1">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.123456789!2d106.700000000!3d10.776000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zMTDCsDQ2JzMzLjYiTiAxMDbCsDQyJzAwLjAiRQ!5e0!3m2!1svi!2s!4v1680000000000!5m2!1svi!2s"
              width="100%"
              height="250"
              className="rounded-lg border-2 border-blue-100"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
