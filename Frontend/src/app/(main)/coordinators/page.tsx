"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { Footer } from "@/components/Footer";
import Loader from "@/components/Loader/Loader";
import CoordOfMonthBox from "@/components/coordPageComponents/CoordOfMonthBox";
import CoordinatorsSpotlight from "@/components/coordPageComponents/CoordinatorsSpotlight";
import useCoordinator from "@/hooks/useCoordinator";
import { Coordinator } from "@/types/dataTypes";
import React, { useEffect, useState } from "react";

const Coordinators = () => {
  const { getAllCoordinators } = useCoordinator();

  const [coordinatorOfTheMonth, setCoordinatorOfTheMonth] =
    useState<Coordinator>();

  useEffect(() => {
    fetchCoordinators();
  }, []);

  async function fetchCoordinators() {
    const coordinatorsResponse = await getAllCoordinators();

    if (coordinatorsResponse?.status === 200) {
      const allCoordinators: Coordinator[] = coordinatorsResponse.data.data;

      for (const coordinator of allCoordinators) {
        if (coordinator.name === "Fatoki Victor") {
          setCoordinatorOfTheMonth(coordinator);
        }
      }
    }
  }

  if (!coordinatorOfTheMonth) {
    return <Loader text={""} textColor={"my-[10%]"} />;
  }

  return (
    <div className="w-[1300px] h-[700px] mx-auto sm:w-full md:w-full">
      <CoordOfMonthBox
        name={coordinatorOfTheMonth?.name}
        occupation={coordinatorOfTheMonth.occupation}
        phone_number={coordinatorOfTheMonth.phone_number}
        image_url={coordinatorOfTheMonth.image_url}
        about={coordinatorOfTheMonth.about}
      />
      <CoordinatorsSpotlight />
      <Footer />
    </div>
  );
};

export default WithNavbar(Coordinators);
