"use client";

import Magnet from "@/blocks/Animations/Magnet/Magnet";

import {
  Text,
  Button,
  Column,
  Row,
  Flex,
  Input,
  Textarea,
  useToast,
} from "@once-ui-system/core";
import { ArrowUpRight } from "lucide-react";

import { Instrument_Serif, Inter } from "next/font/google";

import { useEffect, useRef, useState } from "react";
import FlowingMenu from "@/blocks/Components/FlowingMenu/FlowingMenu";

import { IoArrowDownSharp } from "react-icons/io5";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import React from "react";
const instrument_serif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

const inter = Inter({
  weight: ["400", "700", "800", "900", "600", "500", "300", "200", "100"],
  subsets: ["latin"],
});

const demoItems = [
  {
    link: "https://www.ibm.com/skillsbuild/",
    text: "Python Development Intern",
    image: "https://media.licdn.com/dms/image/v2/D4E12AQFDzoz7Y7euXA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1725239493797?e=2147483647&v=beta&t=VD3mjw-5-oJ71D6A_-6YRZChiYhkoekxUmcR5qh-GLo",
    desc: "Project-based internship focusing on Python development with IBM SkillsBuild.",
  },
  {
    link: "https://github.com/SoumyadipSil",
    text: "Full Stack Developer",
    image: "/me.webp",
    desc: "As a Full-stack developer, I build innovative projects and contribute to open-source. My stack includes React, Next.js, TypeScript, etc.",
  },
  {
    link: "https://github.com/SoumyadipSil",
    text: "Software Engineer",
    image: "/me.webp",
    desc: "Working as a Software Engineer, building and maintaining web applications since 2020.",
  },
  {
    link: "https://www.linkedin.com/in/soumyadip-sil/",
    text: "Data Science & AI/ML",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM9lvt8PkTxyucGQyg-xUMa_3CcGdMtxTqTg&s",
    desc: "Project-based learning in Data Science, AI, and Machine Learning with Python at the Academy of Skill Development.",
  },
];
const eduItems = [
  {
    link: "",
    text: "B.Tech in ECE",
    image: "https://i.postimg.cc/Nf0CjJv5/Whats-App-Image-2024-07-20-at-12-32-15-AM.jpg",
    desc: "University of Engineering & Management, Kolkata",
  },
];

export default function Experience() {
  return (
    <>
      <Column
        fillWidth
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
          boxShadow: "inset 0 25px 25px -25px #1c1c1ccc",
          backgroundColor: "#F9F4EB",
        }}
        vertical="start"
        horizontal="center"
        gap="128"
        paddingBottom="64"
      >
        <div
          style={{
            backgroundColor: "transparent",
            height: "50px",
            position: "relative",
            width: "100vw",
          }}
          className="svg-header-experience"
        />
        <div
          style={{
            position: "absolute",
            width: "100vw",
            height: "180px",
            top: 0,
            left: 0,
            zIndex: 2,
            pointerEvents: "none",
            overflow: "hidden",
          }}
          className="svg-header-experience"
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1920 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
            preserveAspectRatio="none"
          >
            <path d="M0 180 Q960 -80 1920 180 V0 H0 V180 Z" fill="#031113" />
          </svg>
        </div>
        <Column
          fillWidth
          horizontal="center"
          vertical="start"
          paddingTop="xl"
          paddingX="m"
          id="experiences"
        >
          <Row fillWidth horizontal="between" paddingBottom="m">
            <Text
              className={inter.className + " text-joke-1"}
              style={{ textAlign: "left", color: "#031113" }}
              data-theme="dark"
            >
              SOME RANDOM JOKE
            </Text>
            <Text
              className={inter.className + " text-joke-2"}
              style={{
                textTransform: "uppercase",
                textAlign: "right",
                color: "#031113",
              }}
              data-theme="dark"
            >
              Why do programmers prefer dark mode?{" "}
              <i>Because light attracts bugs!</i>
            </Text>{" "}
            <Row>
              {[
                {
                  svg: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                      className="icon"
                      style={{
                        width: "100%",
                        height: "100%",
                        color: "#031113",
                      }}
                    >
                      <path
                        fill="currentColor"
                        d="M10 0h10v10H10zM0 10h10v10H0z"
                      ></path>
                    </svg>
                  ),
                  bg: "#e5daf6",
                },
                {
                  svg: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="icon"
                      style={{
                        width: "100%",
                        height: "100%",
                        color: "#031113",
                      }}
                    >
                      <path
                        d="M20 0H6v2h2v4h2v2h2v2h2V8h2V6h2V2h2V0ZM6 10v2H4v2H2v4H0v2h14v-2h-2v-4h-2v-2H8v-2H6Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  ),
                  bg: "#ffd2f3",
                },
                {
                  svg: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="icon"
                      style={{
                        width: "100%",
                        height: "100%",
                        color: "#031113",
                      }}
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M0 0h20v20H0V0Zm4 16v-2H2V6h2V4h2V2h8v2h2v2h2v8h-2v2h-2v2H6v-2H4Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  ),
                  bg: "#fcdca6",
                },
              ].map(({ svg, bg }, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: bg,
                    width: 23,
                    height: 27,
                    marginLeft: i === 0 ? "5.5vw" : "10px",
                    padding: "5px",
                  }}
                >
                  {svg}
                </div>
              ))}
            </Row>
          </Row>
          <Row
            fillWidth
            horizontal="center"
            fitHeight
            style={{ paddingInline: "13vw" }}
          >
            {" "}
            <Text
              style={{
                fontSize: "120px",
                textAlign: "center",
                lineHeight: "1",
                fontWeight: "lighter",
                color: "#031113",
              }}
              className={instrument_serif.className + " text-hero"}
            >
              Experience and
              <br />
              <span
                style={{
                  fontStyle: "italic",
                  color: "#7a5a37ff",
                  textAlign: "center",
                }}
                className={instrument_serif.className}
              >
                Education
              </span>
            </Text>
          </Row>
          <style>
            {`
                  @keyframes spin {
                    100% { transform: rotate(360deg); }
                  }
                  `}
          </style>
          <Flex height={4}></Flex>
          <IoArrowDownSharp
            color="#7a5a37ff"
            size={100}
            className="down-arrow"
          />
          <Flex height={3}></Flex>
          <Flex style={{ paddingInline: "13vw" }} fillWidth>
            <FlowingMenu items={demoItems} />
          </Flex>
          {/* <Flex fitHeight center fillWidth paddingY="s">
            {" "}
            <span
              style={{
                display: "inline-block",
                animation: "spin 2s linear infinite",
                fontSize: "120px",
                textAlign: "center",
                lineHeight: "1",
                fontWeight: "lighter",
                color: "#031113",
              }}
            >
              ✷
            </span>{" "}
          </Flex>

          <Flex style={{ paddingInline: "13vw" }} fillWidth>
            <FlowingMenu items={eduItems} />
          </Flex> */}
        </Column>
      </Column>{" "}
    </>
  );
}
