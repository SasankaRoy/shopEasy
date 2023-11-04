import React from 'react'

export const SkeletonLoading = () => {
    const counter = 3;

    const Skeleton = () => {
        return (
          <>
            <div
              initial={{
                opacity: 0,
              }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeIn", delay: 0.1 }}
              className="h-[400px] bg-[#000000]/40 animationEffects lg:h-[450px] snap-center flex-shrink-0  rounded-md hoverEffects shadow-md"
            >
              <div className="w-full h-[65%] lg:h-[70%] relative overflow-hidden ImageDiv rounded-t-md"></div>
              <div className="p-2 lg:p-3">
                <div className="w-[90%] rounded-md h-10 bg-[#000000]/50"></div>
                <hr className="bg-gray-400 my-2" />
                <div className="w-[40%] h-10 bg-[#000000]/50 rounded-md"></div>
              </div>
            </div>
          </>
        );
    }
    return Array(counter).fill(<Skeleton/>)
}
