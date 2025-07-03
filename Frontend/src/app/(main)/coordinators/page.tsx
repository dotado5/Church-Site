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
  const { getAllCoordinators, getFeaturedCoordinator } = useCoordinator();

  const [coordinatorOfTheMonth, setCoordinatorOfTheMonth] = useState<Coordinator | null>(null);
  const [allCoordinators, setAllCoordinators] = useState<Coordinator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoordinatorData();
  }, []);

  async function fetchCoordinatorData() {
    try {
      setLoading(true);
      
      // Fetch featured coordinator and all coordinators concurrently
      const [featuredResponse, coordinatorsResponse] = await Promise.all([
        getFeaturedCoordinator(),
        getAllCoordinators(),
      ]);

      // Handle featured coordinator
      if (featuredResponse?.status === 200) {
        setCoordinatorOfTheMonth(featuredResponse.data.data as Coordinator);
      }

      // Handle all coordinators
      if (coordinatorsResponse?.status === 200) {
        const coordinators: Coordinator[] = coordinatorsResponse.data.data;
        // Filter out featured coordinator from the spotlight list
        const nonFeaturedCoordinators = coordinators.filter(coord => !coord.isFeatured);
        setAllCoordinators(nonFeaturedCoordinators);
      }
    } catch (error) {
      console.error("Error fetching coordinator data:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader text="Loading coordinators..." textColor="my-[10%]" />;
  }

  return (
    <div className="w-[1300px] h-[700px] mx-auto sm:w-full md:w-full">
      {coordinatorOfTheMonth && (
        <CoordOfMonthBox
          name={coordinatorOfTheMonth.name}
          occupation={coordinatorOfTheMonth.occupation}
          phone_number={coordinatorOfTheMonth.phone_number}
          image_url={coordinatorOfTheMonth.image_url}
          about={coordinatorOfTheMonth.about}
          isFeatured={coordinatorOfTheMonth.isFeatured}
        />
      )}
      
      {!coordinatorOfTheMonth && (
        <div className="flex flex-col items-center gap-[48px] mb-[128px] sm:mt-6 md:mt-6">
          <div className="flex flex-col items-center gap-[16px]">
            <h1 className="text-white text-[65px] sm:text-[36px] md:text-[42px] font-bold text-center">
              Coordinator of the Month
            </h1>
            <p className="text-[22px] text-white text-center sm:text-base md:text-base">
              No featured coordinator available at the moment.
            </p>
          </div>
        </div>
      )}

      <CoordinatorsSpotlight coordinators={allCoordinators} />
      <Footer />
    </div>
  );
};

export default WithNavbar(Coordinators);
