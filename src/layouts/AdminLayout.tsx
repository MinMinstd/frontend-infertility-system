import { Link } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <Link to="/">
      <AdminLayout />
    </Link>
  );
};
