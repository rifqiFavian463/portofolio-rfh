"use client";
import Image from "next/image";
import Link from "next/link";
import { IoMailOutline } from "react-icons/io5";
import { PiShapesThin, PiMagicWandThin, PiHouseLight, PiBookOpenTextLight } from "react-icons/pi";
import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CiInstagram, CiLinkedin } from "react-icons/ci";
import { FaXTwitter, FaGithub } from "react-icons/fa6";

type socialType = {
  id: number;
  name: string;
  position: string;
  image: JSX.Element;
  link: string;
};

const skills: string[] = [
  "HTML",
  "CSS",
  "Tailwind CSS",
  "SASS",
  "Bootstrap",
  "Javascript",
  "TypeScript",
  "JQuery",
  "React JS",
  "Next.js",
  "Framer Motion",
  "Mockoon",
  "Express.js",
  "MongoDB",
  "Cypress.io",
  "PostgreSQL",
  "Git",
  "GitHub",
  "Clip Studio Paint",
];
const social: socialType[] = [
  {
    id: 1,
    name: "Instagram",
    position: "www.instagram.com/rifqiifh_",
    link: "https://www.instagram.com/rifqiifh_",
    image: <CiInstagram className="text-lg text-neutral-300" />,
  },
  {
    id: 2,
    name: "LinkedIn",
    position: "www.Linkedin.com/rifqifavianh",
    link: "https://www.linkedin.com/in/rifqifavianh/",
    image: <CiLinkedin className="text-lg text-neutral-300" />,
  },
  {
    id: 3,
    name: "Github",
    position: "www.github.com/rifqiFavian463",
    image: <FaGithub className="text-lg text-neutral-300" />,
    link: "https://github.com/rifqiFavian463",
  },
  {
    id: 4,
    name: "Twitter",
    position: "www.x.com/okuta_ko",
    image: <FaXTwitter className="text-lg text-neutral-300" />,
    link: "https://x.com/okuta_ko",
  },
];

function Leftside() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>();
  const [active, setActive] = useState<boolean>(true);

  const x = useMotionValue(0);

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: 0.6,
          type: "spring",
          stiffness: 200,
        },
      }}
      className="flex flex-col sticky md:top-5 justify-center gap-8 p-6 w-full md:w-[22rem] rounded-lg bg-[var(--component-color)] border border-neutral-800"
    >
      {/* Profile */}
      <div className="flex justify-between items-start">
        <div className="relative">
          <Image className="rounded-full" src={"/profile-picture.jpeg"} width={130} height={130} alt="profil-epicture" />
          <div className="w-3 h-3 absolute bottom-6 right-2 bg-[#dcfc35] rounded-full cursor-pointer animate-pulse" onClick={() => setActive(!active)}></div>
          <div className={`absolute flex items-center gap-2 bottom-4 -right-20  ${active && "border-[#dcfc35] border"} rounded-2xl px-2 py-1 h-max w-max mt-4 text-[10px] text-[#dcfc35]`}>
            {active && "Open to work"}
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={"/"} className="bg-[var(--bg-color-secondary)] text-lg text-neutral-300 rounded-full p-2">
            <PiHouseLight />
          </Link>
          <Link href={"/"} className="bg-[var(--bg-color-secondary)] text-lg text-neutral-300 rounded-full p-2">
            <PiBookOpenTextLight />
          </Link>
        </div>
      </div>
      {/* About */}
      <div className="flex flex-col justify-center items-center md:items-start gap-3">
        <span className="font-extrabold text-neutral-300 text-center md:text-start text-lg sm:text-xl">Rifqi Favian Hibatullah</span>
        <span className=" font-bold text-neutral-300 text-center md:text-start text-xs">
          rifqifavianhibatullah@gmail.com <IoMailOutline className="inline-block" />
        </span>
      </div>
      {/* Skills */}
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <span key={i} className="bg-[var(--bg-color-secondary)] font-bold text-[10px] w-max text-center py-1 px-2 text-neutral-300 rounded-lg">
              {skill}
            </span>
          ))}
        </div>
      </div>
      {/* Bio */}
      <div className="flex flex-col gap-4">
        <span className="text-neutral-300 text-lg font-extrabold">Bio</span>
        <p className="text-neutral-300 text-xs">
          Frontend Developer dengan pengalaman 13 bulan, fresh graduate S1 Teknik Informatika. Berfokus pada pengembangan aplikasi web yang responsif dan scalable, serta siap berkontribusi dalam tim
          untuk menghadirkan solusi digital yang berdampak.
        </p>
        <div className="flex flex-wrap md:flex-nowrap gap-y-2 justify-between">
          <span className="text-neutral-300 text-xs font-semibold flex items-center gap-1 w-40">
            <PiShapesThin className="text-lg" /> More than 1 years experience.
          </span>
          <span className="text-neutral-300 text-xs font-semibold flex items-center gap-1">
            <PiMagicWandThin className="text-lg" /> 8+ Projects.
          </span>
        </div>
      </div>
      {/* Social */}
      <div
        className="flex  border-t-2 border-neutral-600 pt-6 flex-row items-center justify-around  
    cursor-pointer
    "
      >
        {social.map((testimonial, idx) => (
          <div
            className="relative"
            key={testimonial.name}
            onMouseEnter={() => setHoveredIndex(testimonial.id)}
            onMouseLeave={() => {
              setHoveredIndex(null);
            }}
          >
            <AnimatePresence mode="wait">
              {hoveredIndex === testimonial.id && (
                <motion.div
                  initial={{ opacity: 0, translateX: "50%", right: "50%", top: "-2.5rem", scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    top: "-3.5rem",
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 10,
                    },
                  }}
                  exit={{ opacity: 0, top: "-2.5rem", scale: 0.5 }}
                  className="absolute right-1/2 translate-x-1/2 -top-14 flex text-xs flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
                >
                  <div className="absolute z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                  <div className="absolute w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                  <div className="font-bold text-white relative z-30 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-neutral-300">{testimonial.position}</div>
                </motion.div>
              )}
            </AnimatePresence>
            <Link href={testimonial.link} target="_blank">
              <p>{testimonial.image}</p>
            </Link>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Leftside;
