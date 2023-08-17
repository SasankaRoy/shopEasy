/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    MONGO_URI:
      "mongodb+srv://babu-E-comm:McHoTA00JN6goxAr@e-comm.ydg5kjg.mongodb.net/?retryWrites=true&w=majority",
    SECRET_KEY:
      "THESECRETISVERYSECRETandITCANNOTbeSHAREDwithOTHER-_2PERSONS__ORBEpublic",
    MEDIA_TO_MEDIAURL_CONVERTER:
      "https://api.cloudinary.com/v1_1/dcgmbgmyk/image/upload",
    CLOUD_NAME: "dcgmbgmyk",
    UPLOAD_PRESET: "e-comm",
  },
};
// passwords = McHoTA00JN6goxAr mongodb.
module.exports = nextConfig;
