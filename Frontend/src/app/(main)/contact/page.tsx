"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { Footer } from "@/components/Footer";
import ContactForm from "@/components/contactPageComponent/ContactForm";
import IFrameBox from "@/components/contactPageComponent/IFrameBox";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Contact = () => {
  const pathName = usePathname();
  //   console.log(pathName);

  useEffect(() => {
    window.localStorage.setItem("currentAddress", pathName);
  }, [pathName]);

  return (
    <div className="w-[1300px] h-[700px] mx-auto">
      <div className="flex flex-col items-center mb-[128px] mt-[128px]">
        <h1 className="text-[65px] font-bold text-white text-center">
          Stay Connected with MOJ- Let's Keep the Conversation Going!
        </h1>
        <p className="text-white text-[18px] text-center">
          Contact Us for Inquiries, Suggestions, or Just to Say Hello - We'd
          Love to Hear from You!
        </p>
      </div>

      <ContactForm />
      <IFrameBox />
      <Footer />
    </div>
  );
};

export default WithNavbar(Contact);
