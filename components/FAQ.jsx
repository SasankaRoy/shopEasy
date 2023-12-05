import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Moment from "react-moment";
import moment from "moment";

const FAQ = ({ productID }) => {
  const user = useSelector((state) => state.user);
  const [alertBox, setAlertBox] = useState(false);
  const [questionAndAswer, setQuestionAndAswer] = useState("");
  const [getUpdatedReview, setGetUpdatedReviews] = useState(0);
  const [showReviews, setShowReviews] = useState([]);
  const [forQA, setForQA] = useState({
    type: "qustion",
    questionId: "",
  });
  const getUpdateReveiws = async () => {
    try {
      const res = await axios.get(`/api/reviews?pId=${productID}`);
      if (res.status === 200) {
        setShowReviews([...res.data.reviews]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUpdateReveiws();
  }, [getUpdatedReview]);

  const handleOnChange = (e) => {
    setQuestionAndAswer(e.target.value);
  };
  const handleOnSubmit = async (e) => {
    console.log(e.target.innerHTML);

    try {
      if (!user.userInfo) return setAlertBox(true);
      let sendReview;
      if (e.target.innerHTML === "Ask") {
        sendReview = await axios.post("/api/reviews", {
          question: questionAndAswer,
          userName: user.userInfo.userName,
          productID,
        });
      } else {
        sendReview = await axios.post("/api/reviews", {
          productID,
          questionID: forQA.questionId,
          answer: questionAndAswer,
        });
      }
      if (sendReview.status === 200) {
        setGetUpdatedReviews(getUpdatedReview + 1);
        setQuestionAndAswer("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 2, ease: "anticipate" }}
      className="h-auto w-full py-2 px-5 mt-10"
    >
      <h1 className="text-3xl font-bold tracking-wider text-center capitalize">
        Reviews & FAQ
      </h1>
      {/* reviews */}
      <div className="flex justify-evenly items-center mt-8 py-3">
        <div className="relative">
          <CircularProgress
            variant="determinate"
            value={85}
            size={"7rem"}
            thickness={2}
            style={{ color: "orange" }}
          />
          <h2 className="absolute top-[27%] left-[36%] text-lg lg:text-xl font-bold tracking-wide text-orange-400">
            85%
          </h2>
          <h1 className="text-center mt-2 capitalize tracking-wider text-lg lg:text-xl font-semibold">
            product
          </h1>
        </div>
        <div className="relative">
          <CircularProgress
            variant="determinate"
            value={70}
            size={"7rem"}
            thickness={2}
            style={{ color: "#DB2777" }}
          />
          <h2 className="absolute top-[27%] left-[36%] text-lg lg:text-xl font-bold tracking-wide text-pink-600">
            70%
          </h2>
          <h1 className="text-center mt-2 capitalize tracking-wider text-lg lg:text-xl font-semibold">
            Quality
          </h1>
        </div>
        <div className="relative">
          <CircularProgress
            variant="determinate"
            value={60}
            size={"7rem"}
            thickness={2}
            style={{ color: "green" }}
          />
          <h2 className="absolute top-[27%] left-[36%] text-lg lg:text-xl font-bold tracking-wide text-green-700">
            60%
          </h2>
          <h1 className="text-center mt-2 capitalize tracking-wider text-lg lg:text-xl font-semibold">
            Satisfaction
          </h1>
        </div>
      </div>
      {/* FAQ */}
      <div className="flex flex-col justify-start items-center py-3   mt-5">
        <div className="flex-1 flex flex-col justify-start items-start space-y-8 overflow-y-auto scroll-smooth w-full lg:w-[80%] mx-auto py-1 lg:p-4">
          {showReviews.map((cur, id) => (
            <>
              <div
                key={id}
                className="flex flex-col justify-start items-start space-y-2 "
              >
                <div className="flex justify-start items-center space-x-4">
                  <span className="text-base text-[#212a2f] font-bold tracking-wide capitalize">
                    {cur.user}
                  </span>

                  <span className="text-[12px] font-semibold tracking-wide text-[212a2f]">
                    {moment(cur.updatedAt).fromNow()}
                  </span>
                </div>
                <h1 className="text-xl font-extrabold tracking-wider capitalize text-[#212a2f]">
                  <span className="text-lg text-[#212a2f]/60">Q :</span>
                  {cur.question} ?
                </h1>
                <p className="text-md text-[#212a2f]/80 font-semibold capitalize tracking-wider">
                  <span className="text-base text-[#212a2f]/60">A :</span>
                  {!cur.answer ? (
                    <>
                      {user.userInfo?.role === "admin" ||
                      user.userInfo?.role === "manager" ? (
                        <>
                          <button
                            onClick={() =>
                              setForQA({
                                type: "answer",
                                questionId: cur._id,
                              })
                            }
                            className="px-3 py-1 rounded-md shadow-lg ml-3"
                          >
                            Answer
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    <>{cur.answer}</>
                  )}
                </p>
              </div>
            </>
          ))}
        </div>
        <div className="flex justify-center items-center space-x-5 lg:w-[50%] w-full mx-auto shadow-md py-2 rounded-md mt-2">
          <input
            type="text"
            onChange={handleOnChange}
            value={questionAndAswer}
            placeholder={
              forQA.type === "qustion"
                ? "Clear your doubt ?..."
                : "reply here..."
            }
            className="w-[70%] text-lg font-semibold tracking-wider
          text-[#212a2f]  p-2 border-none outline-none
            focus:ring-1 focus:ring-gray-400 bg-transparent rounded-md"
          />
          <button
            onClick={handleOnSubmit}
            className="text-xl font-bold tracking-wider
          w-[20%] text-white  py-2 bg-green-400 hover:bg-green-500
          rounded-md transition-all duration-150 ease-in-out"
          >
            {forQA.type === "qustion" ? "Ask" : "Reply"}
          </button>
        </div>
      </div>

      {/* Alert Box */}
      {alertBox && <AlertBox setAlertBox={setAlertBox} />}
    </motion.div>
  );
};

export default FAQ;

const AlertBox = ({ setAlertBox }) => {
  const router = useRouter();
  return (
    <>
      <div className="fixed z-50 flex justify-center items-center w-full h-full  left-0 top-0">
        <div className="bg-white w-[40%] mx-auto rounded-md shadow-md p-4">
          <p className="font-semibold text-xl tracking-wide">
            Kindly Login to give reveiw to a product! Click Login to processed
            to login page.
          </p>
          <div className="flex justify-end items-center mt-3 space-x-5">
            <button
              onClick={() => setAlertBox(false)}
              className="bg-red-400 text-white tracking-wide px-4 py-2 rounded-md shadow-md text-lg font-semibold border-none outline-none"
            >
              Cancel
            </button>
            <button
              onClick={() => router.push("/auth/login")}
              className="px-4 py-2 text-lg font-semibold tracking-wide shadow-md border-none outline-none rounded-md"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
