import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-white">
      <span className="font-montserrat text-[8rem] md:text-[12rem] font-light text-gray-100 select-none leading-none">
        404
      </span>
      <h1 className="text-xl md:text-2xl font-medium text-app-black mt-4">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-2 text-sm text-app-gray ">
        {location.pathname}
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-app-black text-white text-sm font-medium rounded-full hover:bg-app-black/90 transition duration-300 cursor-pointer whitespace-nowrap"
      >
        <i className="ri-arrow-left-line"></i>
        홈으로 돌아가기
      </Link>
    </div>
  );
}