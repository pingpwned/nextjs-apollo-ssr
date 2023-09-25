import { client } from "@/client";
import { CacheUtil } from "@/utils/cache";
import { gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";

const cache = new CacheUtil();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cacheKey = "date";

  const query = gql`
    query {
      date
      __typename
    }
  `;

  try {
    if (cache.get(cacheKey)) {
      res.status(200).json(cache.get(cacheKey));
    } else {
      const {
        data: { date },
      }: any = await client.query({
        query,
      });
      cache.set(cacheKey, date);
      res.status(200).json(date);
    }
  } catch (error) {
    console.error("error ***********", error);
    res.status(500).json({ error: "Some error" });
  }
};

export default handler;
