"use client";

import React, { useEffect, useState } from "react";
import Activity from "../Activity";
import { Activity as ActivityType } from "@/types/dataTypes";
import Loader from "../Loader/Loader";

async function cleanDateFunction(date: string) {
  const cleanedDate = date.replace(/(\d+)(st|nd|rd|th)/, "$1");

  return cleanedDate;
}

const Activities = ({ activities }: { activities: ActivityType[] }) => {
  const [monthlyActivities, setMonthlyActivities] = useState<any[]>();

  useEffect(() => {
    groupActivitiesByMonth();
  }, [activities]);

  const groupActivitiesByMonth = async () => {
    const months: any = {};

    await activities.forEach(async (activity: ActivityType) => {
      const cleanedDate = await cleanDateFunction(activity.date);
      const date = new Date(cleanedDate);
      const month = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      if (!months[month]) {
        months[month] = [];
      }
      months[month].push(activity);
    });

    setMonthlyActivities(months);
  };

  if (!monthlyActivities) {
    return <Loader text={""} textColor={"mt-[2em]"} />;
  }

  return (
    <div className="flex flex-col items-center xl:w-[1250px] lg:w-[1250px] mx-auto mt-[4em] sm:mt-[4em] md:mt-[4em]">
      <h6 className="text-button xl:text-[20px] lg:text-[20px] sm:text-base md:text-base">
        KEEP IN LOOP WITH MOJ
      </h6>
      <h1 className="text-white xl:text-[54px] lg:text-[54px] sm:text-[24px] md:text-[24px] font-bold mb-5">
        Activities Timeline
      </h1>

      <div className="w-full">
        {Object.entries(monthlyActivities).map(
          ([month, activities]: [string, ActivityType[]]) => (
            <div
              className="w-full flex border-b-2 border-b-[#FFFFFF] pb-8"
              key={month}
            >
              <h2 className="w-1/2 text-[#a198ac] font-bold text-[42px] sm:hidden md:hidden">
                {month}
              </h2>
              <h2 className="w-[43%] text-[#a198ac] font-bold text-[20px] xl:hidden lg:hidden">
                {month.slice(0, 3)} {month.slice(-4, -1)}
              </h2>
              <div className="w-1/2 flex flex-col gap-5">
                {activities.map((activity: ActivityType) => (
                  <Activity
                    _id={activity._id}
                    name={activity.name}
                    date={activity.date}
                    description={activity.description}
                    key={activity._id}
                  />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Activities;
