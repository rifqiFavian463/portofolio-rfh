"use client";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { PiCodeThin } from "react-icons/pi";
import { motion } from "framer-motion";
type portfolioDataType = {
  id: number;
  thumbnail: string;
  title: string;
  desc: string;
};

function Dashboard() {
  const { data, error, isLoading } = useSWR("/api/portfolio", (url) => fetch(url).then((res) => res.json()));

  const portfolioData: portfolioDataType[] = data?.data;
  const [hidden, setHidden] = useState<boolean>(true);

  return (
    <div className="w-full md:max-w-fit flex flex-col gap-7">
      {/* Header Frontend*/}
      <div className="flex gap-3 items-center">
        <PiCodeThin className="text-6xl text-neutral-50 min-w-40" />
        <div className="flex flex-col max-w-80 gap-1">
          <span className="text-base md:text-lg font-extrabold text-neutral-300">
            Portfolio, <span className="text-[#dcfc35] text-base md:text-lg">A Front-end Journey</span>
          </span>
          <span className="text-xs md:text-sm text-neutral-400">Check out my portfolio and explore the projects where I have crafted seamless frontend experiences!.</span>
        </div>
      </div>

      {/* Frontend Portfolio */}
      <div className="flex flex-col border-t-2 border-neutral-600 py-6">
        {error && <div className="text-red-500">{error}</div>}
        <div className={`flex flex-col w-full bg-[--component-color] rounded-md  ${hidden ? "overflow-hidden h-[30rem] " : "h-auto"}`}>
          {/* Data */}
          {isLoading ? (
            <>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-x-3 p-4 rounded-md">
                  <Skeleton className="h-[80px] w-[150px] rounded-md" />
                  <div className="flex flex-col">
                    <Skeleton className="w-28 rounded-md h-2" />
                    <Skeleton className="w-40 rounded-md h-2 mt-1" />
                    <Skeleton className="w-8 rounded-md h-2 mt-6" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {portfolioData?.map((item) => (
                <Link key={item.id} href={`/dashboard/portfolio/${item.id}`}>
                  <motion.div whileHover={{ backgroundColor: "#282828" }} className="flex items-center gap-x-3 p-4 rounded-md cursor-pointer">
                    <Image src={item.thumbnail} alt="Portfolio" width={150} height={100} className="rounded-md w-[120px] h-[100px] object-cover xl:w-[175px] " />
                    <div className="flex flex-col">
                      <span className="text-[.8rem] lg:text-[.7rem] xl:text-sm text-neutral-400">{item.title}</span>
                      <span className="text-[.7rem] lg:text-[.6rem] xl:text-xs font-bold text-neutral-400">{item.desc}</span>
                      <span className="text-[.7rem] lg:text-[.6rem] xl:text-xs  text-neutral-300 font-bold text-start mt-3">More</span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </>
          )}
        </div>
        <button className="text-xs text-neutral-300 font-bold text-center mt-3 cursor-pointer" onClick={() => setHidden(!hidden)}>
          {hidden ? "Show More" : "Show Less"}
        </button>
      </div>

      {/* Header Illustrator */}
      <div className="flex gap-5 items-center bg-[--component-color] rounded-md px-4 py-3">
        <Image src="/illustration/illustration2.webp" alt="Illustration Thumbnail" width={135} height={135} className="w-[135px] h-[135px] object-cover object-left-top rounded-md" />
        <div className="flex flex-col max-w-80 gap-1">
          <span className="text-base md:text-lg font-extrabold text-neutral-300">
            Gallery, <span className="text-[#dcfc35] text-base md:text-lg">A Illustrator Journey</span>
          </span>
          <span className="text-xs md:text-sm text-neutral-400">Explore my vibrant anime illustrations, capturing emotion and dynamic scenes with bold, expressive artistry.</span>
          <button type="button" className="bg-[#696969] text-xs text-neutral-50 h-7 w-full rounded-md mt-4">
            <Link href="dashboard/gallery">Explore Art</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
