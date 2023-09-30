/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    NEXT_PUBLIC_MONGO_URI: process.env.NEXT_PUBLIC_MONGO_URI,
    //   SECRET_KEY:
    //     "THESECRETISVERYSECRETandITCANNOTbeSHAREDwithOTHER-_2PERSONS__ORBEpublic",
    //   MEDIA_TO_MEDIAURL_CONVERTER:
    //     "https://api.cloudinary.com/v1_1/dcgmbgmyk/image/upload",
    //   CLOUD_NAME: "dcgmbgmyk",
    //   UPLOAD_PRESET: "e-comm",
    //   PRODUCTION_DOMAIN: "https://shop-easee.vercel.app",
    //   DEVELOPMENT_DOMAIN: "http://localhost:3000",
  },
};
// passwords = McHoTA00JN6goxAr mongodb.
module.exports = nextConfig;
