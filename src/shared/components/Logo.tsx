import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import LogoSVG from '../../assets/imgs/logo.svg';

const LogoStyled = styled.img`
  width: 170px;
  height: 40px;
`;

export const Logo: FC = (): ReactElement => {
  return <a href="/">
    <LogoStyled src={LogoSVG} />
  </a>;
};