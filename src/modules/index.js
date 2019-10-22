import React from "react";
import gql from "graphql-tag";
import Thread from "./Thread";
// import { useQuery } from "../lib/useQuery";
import { useScrollToTop } from "../common/useScrollToTop";

const THREADS_QUERY = gql`
  query($sortBy: SortBy!, $skip: Int, $limit: Int) {
    threads(sortBy: $sortBy, limit: $limit, skip: $skip) {
      id
      text
      title
      createdBy {
        id
        username
      }
      createdAt
      hasUserLiked
      likesNumber
      repliesNumber
    }
  }
`;

const Home = () => {
  useScrollToTop();
  //TODO: Replace these with useQuery hook you wrote

  let fetching = true;
  let data = {};

  // const [{ fetching, data }] = useQuery({
  //   query: THREADS_QUERY,
  //   variables: { sortBy: "LATEST" }
  // });

  if (fetching) return <p>Loading...</p>;

  return (
    <div>
      {data.threads.map(thread => (
        <Thread key={thread.id} {...thread} />
      ))}
    </div>
  );
};

export default Home;
