import Image from "next/image";

export default function Custom404({ error }) {
  console.log(error);
  return (
    <div className="p-5 h-[90vh]">
      <div className="bg-red-200 w-[80%] mx-auto relative">
        <Image
          src="/404PageImg.jpg"
          fill
          className=" object-cover z-40"
          loading="lazy"
          alt="404 error page"
        />
      </div>
      <h1 className="text-3xl text-center font-semibold">
        Custom 404 Error page
      </h1>
    </div>
  );
}
