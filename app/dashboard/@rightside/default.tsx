"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type workHistoryType = {
  title: string;
  companylogo: string;
  company: string;
  date: string;
};

type certificationType = {
  title: string;
  company: string;

  link: string;
};

const workHistory: workHistoryType[] = [
  {
    title: "FE Developer",
    companylogo: "/company-logo/gallery-investasi.png",
    company: "Gallery Investasi - UHAMKA",
    date: "May 2023 - June 2023",
  },
  {
    title: "FE Developer",
    companylogo: "/company-logo/ftii-uhamka.webp",
    company: "Teknoka 8 - UHAMKA",
    date: "June 2023 - Oct 2023",
  },
  {
    title: "FE Developer",
    companylogo: "/company-logo/piljur.png",
    company: "PT. Pilihanmu Indonesia Jaya",
    date: "Feb 2024 - June 2024",
  },
  {
    title: "Web & SEO Developer",
    companylogo: "/company-logo/digibuddy.webp",
    company: "Digibuddy.id",
    date: "June 2025 - Oct 2025",
  },
];

const certifcation: certificationType[] = [
  {
    title: "Belajar Dasar Pemrograman Web",

    company: "Dicoding",
    link: "https://www.dicoding.com/certificates/JMZV1474JXN9",
  },
  {
    title: "Belajar Fundamental Front-end Web Development",

    company: "Dicoding",
    link: "https://www.dicoding.com/certificates/81P2V3J3QPOY",
  },
  {
    title: "Belajar Membuat Front-end Web untuk pemula",

    company: "Dicoding",
    link: "https://www.dicoding.com/certificates/4EXG41E0DPRL",
  },
  {
    title: "Internship Frontend Developer",

    company: "PT.Pilihanmu Indonesia Jaya",
    link: "https://drive.google.com/file/d/1J60JCDJzN2wnHWLMe5TT3yMagXBRFG_0/view?usp=drive_link",
  },
  {
    title: "MSIB Batch 6",

    company: "Kampus Merdeka",
    link: "https://drive.google.com/file/d/156VEyjilYOTEgWaS4xsRd32MjSfJdaA4/view?usp=drive_link",
  },
  {
    title: "Web Programming - FYEP",

    company: "Plan International",
    link: "https://drive.google.com/file/d/1N5R_xUa9bLNCNtG-Jz7f3ihToRE_sHru/view?usp=sharing",
  },
];
function Rightside() {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: 1.2,
          type: "spring",
          stiffness: 200,
        },
      }}
      className="flex flex-col md:hidden lg:block sticky md:top-5 justify-center gap-4  w-full md:min-w-44 md:max-w-fit "
    >
      {/* CV Download */}
      <div className="flex flex-col gap-4 rounded-lg p-6 bg-[var(--component-color)] border border-neutral-800">
        <span className="text-neutral-300 text-md font-extrabold">CV Download</span>
        <div className="flex max-w-80">
          <Link href={"/"} className="text-xs text-neutral-300 rounded-full max-w-72 ">
            <p>Discover my front-end expertise. Download my CV to see how I can contribute to your projects!</p>
          </Link>
        </div>
        <button type="button" className="bg-[#696969] text-xs text-neutral-50 h-7 w-full rounded-md">
          <a href="/CV-Rifqi-Favian-H.pdf" download={"CV Rifqi Favian Hibatullah.pdf"}>
            Download
          </a>
        </button>
      </div>

      {/* Work History */}
      <div className="flex flex-col gap-5 rounded-lg p-6 bg-[var(--component-color)] border border-neutral-800">
        <div className="flex flex-col gap-4">
          <span className="text-neutral-400 text-base">Work History</span>
          {workHistory.map((work, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="flex justify-between">
                <div className="flex">
                  <Image src={work.companylogo} alt="Company Logo" width={30} height={30} className="self-center me-2 object-cover h-[30px]" />
                  <div className="flex flex-col text-neutral-300">
                    <span className="text-xs font-bold">{work.title}</span>
                    <span className="text-[8px]">{work.company}</span>
                  </div>
                </div>

                <span className="text-neutral-300 text-[8px] italic justify-self-end text-end ">{work.date}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col border-t-2 border-neutral-600 pt-4">
          <span className="text-neutral-400 text-base mb-2">Certification</span>
          {certifcation.map((certificate, i) => (
            <Link key={i} href={certificate.link} target={"_blank"}>
              <motion.div whileHover={{ backgroundColor: "#282828" }} className="flex flex-col p-2 cursor-pointer rounded-md">
                <div className="flex justify-between">
                  <div className="flex">
                    <div className="flex flex-col text-neutral-300">
                      <span className="text-xs font-bold">{certificate.title}</span>
                      <span className="text-[8px]">{certificate.company}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Rightside;
