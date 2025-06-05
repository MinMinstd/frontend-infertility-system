// This is a pure content component for the admin nested layout. Do not add layout/sidebar/header/footer here.
import React from "react";
import { Table, Button } from "antd";

const CustomerList: React.FC = () => {
  const dataSource = [
    {
      key: "1",
      name: "123213123213",
      id: "12345678",
      email: "123123123123@gmail.com",
      action: "Xem chi tiết",
    },
  ];

  const columns = [
    { title: <span className="text-pink-600 font-semibold">Tên khách hàng</span>, dataIndex: "name", key: "name" },
    { title: <span className="text-pink-600 font-semibold">Mã khách hàng</span>, dataIndex: "id", key: "id" },
    { title: <span className="text-pink-600 font-semibold">Email</span>, dataIndex: "email", key: "email" },
    {
      title: <span className="text-pink-600 font-semibold">Hành động</span>,
      key: "action",
      render: (record) => (
        <Button
          type="primary"
          className="bg-pink-500 hover:bg-pink-600 border-none rounded-lg text-white"
          onClick={() => console.log("View details for:", record.id)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-4">Danh sách khách hàng</h2>
      <Table dataSource={dataSource} columns={columns} pagination={false} className="rounded-lg overflow-hidden" />
    </div>
  );
};

export default CustomerList;
