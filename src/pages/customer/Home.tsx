// src/pages/Home.tsx

import Banner from "../../components/Banner";
// import FeedbackCard from "../../components/FeedbackCard";
// import CTAButton from "../components/CTAButton"; đặt lịch tư vấn
import Mission from "../../components/Mission";
import FeedbackList from "./Feedback";
// import Doctors from "./Doctor";
import Services from "./Services";

export default function Home() {
  return (
    <>
      <Banner />
      <Mission />
      <Services />
      <FeedbackList />
    </>
  );
}
