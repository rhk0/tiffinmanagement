// FancyText.js
import React from "react";
import styled from "styled-components";

const StyledFancyText = styled.p`
  font-size: 24px;
  font-weight: bold;
  /* Other styles here */
`;

const FancyText = ({
  className,
  gradient,
  animate,
  animateDuration,
  children,
}) => {
  // Handle gradient and animation logic here if needed
  return <StyledFancyText className={className}>{children}</StyledFancyText>;
};

export default FancyText;
