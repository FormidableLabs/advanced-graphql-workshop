import React from "react";
import styled from "styled-components";
// import { useMutation } from "../lib/useMutation";
import { timeDifferenceForDate } from "../utils/timeDiff";
import { LikeButton } from "./LikeButton";

const LIKE_THREAD_MUTATION = `
  mutation($id: ID!) {
    likeThread(threadId: $id) {
      id
      hasUserLiked
      likesNumber
    }
  }
`;

const Thead = ({
  title,
  text,
  createdBy,
  likesNumber,
  repliesNumber,
  id,
  createdAt
}) => {
  // TODO: Replace these with useMutation
  let result = { fetching: true };
  let like = id => {};
  // const [result, like] = useMutation(LIKE_THREAD_MUTATION);

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>{text}</Content>
      <CreatedBy>
        Created by: {createdBy.username} - {timeDifferenceForDate(createdAt)}
      </CreatedBy>
      <TextGroup>
        <LikeButton disabled={result.fetching} onClick={() => like({ id })} />
        <Likes>{likesNumber} likes</Likes>
      </TextGroup>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-bottom: 1px solid black;
  margin-bottom: 12px;
  padding: 16px;
`;

const Title = styled.h3`
  margin-bottom: 6px;
  margin-top: 0;
`;

const Content = styled.p`
  margin-bottom: 2px;
  margin-top: 0;
`;

const CreatedBy = styled.p`
  font-size: 12px;
  margin-bottom: 2px;
  margin-top: 0;
`;

const Likes = styled(CreatedBy)`
  margin-left: 12px;
  margin-right: 12px;
`;

const TextGroup = styled.div`
  align-items: center;
  display: flex;
`;

export default Thead;
