import React from 'react';
import styled from 'styled-components';

export const LikeButton = ({ disabled, onClick }) => (
  <Button disabled={disabled} onClick={onClick}>
    <span role="img" aria-label="Like">
      👍
    </span>
  </Button>
);

const Button = styled.button`
  transition: background-color 0.33s;
  &:hover {
    background-color: #f6f6bf;
  }

  &:disabled {
    cursor: default;
  }
`;
