"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { Footer } from "@/components/Footer";
import Activities from "@/components/homepageComponents/Activities";
import { DescriptionBox } from "@/components/homepageComponents/DescriptionBox";
import Hero from "@/components/homepageComponents/Hero";
import LatestArticles from "@/components/homepageComponents/LatestArticles";
import { useActivities } from "@/hooks/useActivities";
import { useArticles } from "@/hooks/useArticles";
import { fetchData } from "@/utils/fetchData";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Home() {
  const pathName = usePathname();
  const { getAllArticles } = useArticles();
  const { getAllActivities } = useActivities();
  const [activities, setActivities] = useState<any[]>();
  const [articles, setArticles] = useState<any[]>();

  useEffect(() => {
    window.localStorage.setItem("currentAddress", pathName);

    fetchPageData();
  }, [pathName]);

  async function fetchPageData() {
    // const articlesPromise = getAllArticles();
    // const activitiesPromise = getAllActivities();

    // const [userResponse, certResponse] = await Promise.all([
    //   articlesPromise,
    //   activitiesPromise,
    // ]);

    const activitiesResponse = await fetchData(getAllActivities);

    console.log(activitiesResponse);
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col mb-10">
        <Hero />
        <section className="xl:w-[1300px] xl:h-[700px] lg:w-[1300px] lg:h-[700px] mx-auto mt-5">
          <img src="/images/groupPic.svg" alt="" className="w-full h-full" />
        </section>
        <DescriptionBox />
        <LatestArticles />
        <Activities />
        <Footer />
      </div>
    </main>
  );
}

export default WithNavbar(Home);
