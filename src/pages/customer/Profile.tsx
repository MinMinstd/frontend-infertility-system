import { useState } from "react";
import ProfileCard from "../../components/ProfileCard";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
  });

  const handleSave = (values: UserProfile) => {
    setProfile(values);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      <ProfileCard profile={profile} onSave={handleSave} />
    </div>
  );
};

export default Profile;
