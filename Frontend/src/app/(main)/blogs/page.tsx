"use client";

import WithNavbar from "@/Layout/WithNavbar";
import { Footer } from "@/components/Footer";
import LatestArticles from "@/components/blogPageComponents/LatestArticles";
import { useArticles } from "@/hooks/useArticles";
import Http from "@/services/Http";
import { Article } from "@/types/dataTypes";
import { fetchData } from "@/utils/fetchData";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// const region = process.env.AWS_REGION;
// const bucket_name = process.env.AWS_S3_BUCKET;
// const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// Setup S3 client
// const s3 = new S3Client({
//   region: region,
//   credentials: {
//     accessKeyId: accessKeyId ?? "",
//     secretAccessKey: secretAccessKey ?? "",
//   },
// });

const Blogs = () => {
  const { getAllArticles } = useArticles();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const articlesResponse = await fetchData(getAllArticles);

    if (articlesResponse.status === 200) {
      setArticles(articlesResponse.data.data as Article[]);
    }
  }

  return (
    <div className="w-[1300px] h-[700px] sm:w-full md:w-full mx-auto flex flex-col items-center mt-[100px] sm:mt-6 md:mt-6">
      <div className="flex flex-col items-center mb-[128px]">
        <h1 className="text-[65px] font-bold text-white text-center sm:text-[36px] md:text-[42px]">
          Mojites Talk Corner: Safe Space to Share, Learn, and Grow Together
        </h1>
        <p className="text-white text-[18px] sm:text-base md:text-base text-center">
          For Media enquiries, please contact{" "}
          <span className="text-[#FFD600] ">fatokivictor2@gmail.com</span>
        </p>
      </div>

      <LatestArticles fetchArticles={articles} />
      <Footer />
    </div>
  );
};

export default WithNavbar(Blogs);
