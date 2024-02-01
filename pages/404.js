import Image from "next/image";

export default function Custom404() {
  return (
    <div className="p-5 h-[90vh]">
      <div className="bg-red-200 w-[80%] h-full mx-auto relative">
        <Image
          src="/404PageImg.jpg"
          fill
          className=" object-container"
          loading="lazy"
          alt="404 error page"
        />
      </div>          
    </div>
  );
}
