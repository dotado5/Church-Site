"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { Footer } from "@/components/Footer";
import Activities from "@/components/homepageComponents/Activities";
import Hero from "@/components/homepageComponents/Hero";
import LatestArticles from "@/components/homepageComponents/LatestArticles";
import LatestEvents from "@/components/homepageComponents/LatestEvents";
import { CoordinatorCorner } from "@/components/homepageComponents/CoordinatorCorner";
import useActivities from "@/hooks/useActivities";
import { useArticles } from "@/hooks/useArticles";
import { Activity, Article } from "@/types/dataTypes";
import { fetchData } from "@/utils/fetchData";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

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
    // Fetch all homepage data concurrently
    const [activitiesResponse, articlesResponse] = await Promise.all([
      fetchData(getAllActivities),
      fetchData(getAllArticles),
    ]);

    if (activitiesResponse && activitiesResponse.status === 200) {
      setActivities(activitiesResponse.data.data as Activity[]);
    }

    if (articlesResponse && articlesResponse.status === 200) {
      setArticles(articlesResponse.data.data as Article[]);
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col mb-10">
        <Hero />
        <section className="xl:w-[1300px] xl:h-[700px] lg:w-[1300px] lg:h-[700px] mx-auto mt-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <img src="/images/groupPic.svg" alt="" className="w-full h-full" />
          </motion.div>
        </section>
        <CoordinatorCorner />
        <LatestEvents />
        <LatestArticles fetchArticles={articles} />
        <Activities activities={activities} />
        <Footer />
      </div>
    </main>
  );
}

export default WithNavbar(Home);
