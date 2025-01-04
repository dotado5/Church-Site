import Image from "next/image";
import React from "react";
import location_icon from "../../../public/images/location_icon.png";
import call_icon from "../../../public/images/call_icon.png";
import mail_icon from "../../../public/images/mail_icon.png";
import { Button } from "../Button";

const ContactForm = () => {
  return (
    <div className="flex w-full gap-[119px] items-center mt-[128px] mb-[130px]">
      <div className="w-[280px] flex flex-col gap-[16px]">
        <p className="flex items-center text-white text-[18px] gap-[8px]">
          <Image src={location_icon} alt={""} />
          1, Church Street, off Oluwu, Ikeja Lagos State, Nigeria.
        </p>
        <p className="flex items-center text-white text-[18px] gap-[8px]">
          <Image src={call_icon} alt={""} />
          +234 706 793 5319
        </p>
        <p className="flex items-center text-white text-[18px] gap-[8px]">
          <Image src={mail_icon} alt={""} />
          fatokivictor2@gmail.com
        </p>
      </div>

      <form className="w-full flex flex-col gap-[32px]">
        <div className="w-full flex gap-[20px]">
          <div className="flex flex-col items-start w-full gap-4">
            <label htmlFor="" className="text-white text-[20px] font-medium">
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
            <label htmlFor="" className="text-white text-[20px] font-medium">
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
          <label htmlFor="" className="text-white text-[20px] font-medium">
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
          <label htmlFor="" className="text-white text-[20px] font-medium">
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
          className="text-[20px] font-medium w-[210px] text-center pl-8"
        />
      </form>
    </div>
  );
};

export default ContactForm;
