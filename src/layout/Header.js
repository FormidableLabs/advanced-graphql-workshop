import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <Wrapper>
      <WelcomeText>
        Welcome to build your own GraphQL client workshop!
      </WelcomeText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #ff6600;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const WelcomeText = styled.p`
  margin: 0;
  margin-right: 8px;
`;

export default Home;
