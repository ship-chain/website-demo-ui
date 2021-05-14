import { Dropdown, Menu } from 'antd';
import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import OptionsSVG from '../../assets/imgs/options.svg';

const OptionInputStyled = styled.div`
  cursor: pointer;
  background: #F6F5F7;
  height: 28px;
  display: flex;
  align-items: center;
  padding: 6px 7px;
  margin-left: 11px;
`;

const OptionImg = styled.img`
  margin-left: 8px;
  width: 16px;
  height: 16px;
`;

export interface Option {
  label: string;
  value: string;
}

export const OptionInput: FC<{
  options: Option[],
  choose?: Option,
  onChoose: (choose: Option) => void; 
}> = ({ options, choose, onChoose }): ReactElement => {

  const menu = (
    <Menu>
      {
        options.map(option => (
          <Menu.Item key={option.value} onClick={ () => onChoose(option) }>
            <span>{option.label}</span>
          </Menu.Item>
        ))
      }
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <OptionInputStyled>
        { choose?.label }
        <OptionImg src={OptionsSVG} alt="" />
      </OptionInputStyled>
    </Dropdown>
  );

};