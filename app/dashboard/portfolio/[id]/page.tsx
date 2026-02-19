/* eslint-disable react/no-unescaped-entities */
"use client";

import useSWR from "swr";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

type detailPortfolioType = {
  id: number;
  companyPicture: string;
  companyName: string;
  date?: string;
  desc: string;
  techstack: string[];
  projectImage: string[];
};

function Detail({ params }: { params: { id: string } }) {
  const { id } = params;
  const [hidden, setHidden] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const { data, isLoading } = useSWR(`/api/portfolio/${id}`, (url) => fetch(url).then((res) => res.json()));
  const detailPortfolio: detailPortfolioType = data?.data;
  return (
    <div className="w-full md:max-w-fit flex flex-col gap-3 lg:w-[32rem]">
      <div className="flex items-center mb-4 gap-x-3">
        <Link href="/dashboard">
          <IoMdArrowBack className="text-4xl text-neutral-300 border border-neutral-600 w-6 h-6 p-1 rounded-full" />
        </Link>
        <span className="text-base text-neutral-400">Detail</span>
      </div>
      {/* Render data */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
            delay: 0.9,
            type: "spring",
            stiffness: 200,
          },
        }}
      >
        {isLoading ? (
          <div className="flex flex-col">
            <div className="flex items-center gap-x-3 p-4 rounded-md">
              <Skeleton className="h-[35px] w-[35px] rounded-full" />
              <div className="flex flex-col">
                <Skeleton className="w-28 rounded-md h-2" />
                <Skeleton className="w-40 rounded-md h-2 mt-1" />
              </div>
            </div>
            {Array.from({ length: 2 }).map((_, index) => (
              <>
                <Skeleton key={index} className="rounded-md h-2 mt-2.5 w-full" />
              </>
            ))}
            <Skeleton className="rounded-md h-2 mt-3 w-12" />
            <div className="flex gap-2 flex-wrap w-fit lg:max-w-[32rem] mt-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="rounded-md h-4 w-12" />
              ))}
            </div>
            <div className="mt-3 flex gap-3">
              <Skeleton className="rounded-md w-[250px] h-[130px]" />
              <Skeleton className="rounded-md w-[250px] h-[130px]" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-3">
              <Image src={detailPortfolio?.companyPicture} width={35} height={35} alt="profile-picture" className="rounded-full w-[35px] h-[35px] object-cover self-stretch" />
              <div className="flex flex-col">
                <span className="text-neutral-400 text-sm font-bold">{detailPortfolio?.companyName}</span>
                <span className="text-neutral-400 text-xs">{detailPortfolio?.date && detailPortfolio?.date}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-4 description">
              <div>
                <motion.div
                  initial={{ height: "5rem", opacity: 0, overflow: "hidden" }}
                  animate={{
                    height: hidden ? "5rem" : "auto",
                    opacity: 1,
                    overflow: "hidden",
                  }}
                  transition={{ duration: 0.5 }}
                  onUpdate={(latest) => {
                    if (latest.height !== "auto") {
                      setIsAnimating(true);
                    }
                  }}
                  onAnimationComplete={() => setIsAnimating(false)}
                  className={`text-neutral-300 text-sm w-fit lg:max-w-[32rem] ${hidden ? " h-20 overflow-hidden" : "h-auto"} `}
                >
                  <motion.p>{detailPortfolio?.desc}</motion.p>
                </motion.div>
                {detailPortfolio?.desc?.length > 200 && (
                  <button disabled={isAnimating} className="text-neutral-300 text-xs font-bold text-start" onClick={() => setHidden(!hidden)}>
                    {hidden ? "Read More" : "Read Less"}
                  </button>
                )}
              </div>
              <div className="flex gap-3 w-fit flex-wrap lg:max-w-[32rem]">
                {detailPortfolio?.techstack?.map((item, i) => (
                  <span key={i} className="bg-[var(--bg-color-secondary)] font-bold text-[10px] w-max text-center py-1 px-2 text-neutral-300 rounded-lg self-center">
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-col xl:flex-row gap-3 flex-wrap justify-center xl:justify-start">
                {detailPortfolio?.projectImage.map((item, i) => (
                  <Image key={i} src={item} width={800} height={300} alt="piljur-picture" className="rounded-md w-full xl:w-[14.3rem] self-center " />
                ))}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default Detail;
