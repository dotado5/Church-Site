"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { Footer } from "@/components/Footer";
import Activities from "@/components/homepageComponents/Activities";
import { DescriptionBox } from "@/components/homepageComponents/DescriptionBox";
import Hero from "@/components/homepageComponents/Hero";
import LatestArticles from "@/components/homepageComponents/LatestArticles";
import useActivities from "@/hooks/useActivities";
import { useArticles } from "@/hooks/useArticles";
import { Activity, Article } from "@/types/dataTypes";
import { fetchData } from "@/utils/fetchData";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Home() {
  const pathName = usePathname();
  const { getAllArticles } = useArticles();
  const { getAllActivities } = useActivities();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchPageData();
  }, [pathName]);

  async function fetchPageData() {
    const activitiesResponse = await fetchData(getAllActivities);
    const articlesResponse = await fetchData(getAllArticles);

    if (activitiesResponse.status === 200) {
      setActivities(activitiesResponse.data.data as Activity[]);
    }

    if (articlesResponse.status === 200) {
      setArticles(articlesResponse.data.data as Article[]);
    }

    console.log(articlesResponse);
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
        <Activities activities={activities} />
        <Footer />
      </div>
    </main>
  );
}

export default WithNavbar(Home);
