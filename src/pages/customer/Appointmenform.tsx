// src/components/AppointmentForm.tsx
import { useForm } from "react-hook-form";

export default function AppointmentForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = (data) => {
    alert("Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn.");
    reset();
    console.log(data);
  };

  return (
    <section className="py-12 px-4 bg-white" id="appointment">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-8">
          Đặt lịch hẹn
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-blue-50 p-6 rounded-xl shadow-lg"
        >
          <div>
            <label className="block font-medium mb-1">Họ tên</label>
            <input
              {...register("name", { required: "Vui lòng nhập họ tên" })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">
                {errors.name.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Ngày sinh</label>
            <input
              type="date"
              {...register("dob", { required: "Vui lòng chọn ngày sinh" })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm">
                {errors.dob.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Giới tính</label>
            <select
              {...register("gender", { required: "Vui lòng chọn giới tính" })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">
                {errors.gender.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">
              Dịch vụ muốn sử dụng
            </label>
            <input
              {...register("service", { required: "Vui lòng nhập dịch vụ" })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.service && (
              <p className="text-red-500 text-sm">
                {errors.service.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Ngày giờ mong muốn</label>
            <input
              type="datetime-local"
              {...register("datetime", { required: "Vui lòng chọn ngày giờ" })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.datetime && (
              <p className="text-red-500 text-sm">
                {errors.datetime.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Ghi chú</label>
            <textarea
              {...register("note")}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all duration-200"
          >
            Đặt lịch hẹn
          </button>
          {isSubmitSuccessful && (
            <p className="text-green-600 text-center mt-2">
              Đặt lịch thành công!
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
