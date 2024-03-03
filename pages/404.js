import Head from "next/head";
import Image from "next/image";

export default function Custom404() {
  return (
    <>
  <Head>
    <title>Page Not Found | Next.</title>
  </Head>
    <div className="p-5 h-[90vh]">
      <div className="w-[80%] h-full mx-auto relative">
        <Image
          src="/404PageImg.jpg"
          fill
          className="object-container object-center"
          loading="lazy"
          alt="404 error page"
        />
      </div>          
    </div>
    </>
  );
}
