import Image from "next/image";
import React from "react";
import location_icon from "../../../public/images/location_icon.png";
import call_icon from "../../../public/images/call_icon.png";
import mail_icon from "../../../public/images/mail_icon.png";
import { Button } from "../Button";

const ContactForm = () => {
  return (
    <div className="flex w-full gap-[119px] sm:gap-8 md:gap-8 items-center sm:items-start md:items-start mt-[128px] sm:mt-[4em] md:mt-[4em] mb-[130px] sm:mb-[4em] md:mb-[4em] sm:flex-col-reverse md:flex-col-reverse">
      <div className="w-[280px] flex flex-col gap-[16px]">
        <p className="flex items-center text-white text-[18px] gap-[8px] sm:text-base md:text-base">
          <Image src={location_icon} alt={""} />
          1, Church Street, off Oluwu, Ikeja Lagos State, Nigeria.
        </p>
        <p className="flex items-center text-white text-[18px] gap-[8px] sm:text-base md:text-base">
          <Image src={call_icon} alt={""} />
          +234 706 793 5319
        </p>
        <p className="flex items-center text-white text-[18px] gap-[8px] sm:text-base md:text-base">
          <Image src={mail_icon} alt={""} />
          fatokivictor2@gmail.com
        </p>
      </div>

      <form className="w-full flex flex-col gap-[32px]">
        <div className="w-full flex gap-[20px]">
          <div className="flex flex-col items-start w-full gap-4">
            <label
              htmlFor=""
              className="text-white text-[20px] font-medium sm:text-base md:text-base"
            >
              Name
            </label>
            <input
              type="text"
              name=""
              id=""
              className="bg-transparent border-b-2 border-b-[#FFFFFF] w-full"
            />
          </div>
          <div className="flex flex-col items-start w-full gap-4">
            <label
              htmlFor=""
              className="text-white text-[20px] font-medium sm:text-base md:text-base"
            >
              Email Address
            </label>
            <input
              type="text"
              name=""
              id=""
              className="bg-transparent border-b-2 border-b-[#FFFFFF] w-full"
            />
          </div>
        </div>
        <div className="flex flex-col items-start w-full gap-4">
          <label
            htmlFor=""
            className="text-white text-[20px] font-medium sm:text-base md:text-base"
          >
            Subject
          </label>
          <input
            type="text"
            name=""
            id=""
            className="bg-transparent border-b-2 border-b-[#FFFFFF] w-full"
          />
        </div>
        <div className="flex flex-col items-start w-full gap-4">
          <label
            htmlFor=""
            className="text-white text-[20px] font-medium sm:text-base md:text-base"
          >
            Message
          </label>
          <input
            type="text"
            name=""
            id=""
            className="bg-transparent border-b-2 border-b-[#FFFFFF] w-full"
          />
        </div>
        <Button
          content={"Send Message"}
          icon={false}
          className="text-[20px] sm:text-base md:text-base font-medium w-[210px] sm:w-[150px] md:w-[150px] text-center pl-8 sm:pl-4 md:pl-4"
        />
      </form>
    </div>
  );
};

export default ContactForm;
