// src/components/OnlineConsult.tsx
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function OnlineConsult() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setSubmitted(true);
    reset();
  };

  return (
    <section className="py-12 px-4 bg-blue-50" id="consult">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-8">
          Tư vấn trực tuyến
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-white p-6 rounded-xl shadow-lg"
        >
          <div>
            <label className="block font-medium mb-1">Câu hỏi của bạn</label>
            <textarea
              {...register("question", { required: "Vui lòng nhập câu hỏi" })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.question && (
              <p className="text-red-500 text-sm">
                {errors.question.message as string}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all duration-200"
          >
            Gửi câu hỏi
          </button>
          {submitted && (
            <p className="text-green-600 text-center mt-2">
              Câu hỏi đã được gửi! Vui lòng chờ phản hồi từ tư vấn viên.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
