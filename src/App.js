import React from "react";
import styled from "styled-components";
import Header from "./layout/Header";
import Home from "./modules";

const Wrapper = styled.div`
  min-height: 100%;
  padding: 8px 16px;
  background-color: #f6f6ef;
`;

const App = () => (
  <>
    <Header />
    <Wrapper>
      <Home />
    </Wrapper>
  </>
);

export default App;
