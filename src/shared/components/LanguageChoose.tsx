import { Dropdown, Menu } from 'antd';
import React, { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Language } from '../../core/constant/enum';
import { DropdownSpan } from '../styled/DropdownSpan';
import { VerticalMiddle } from '../styled/VerticalMiddle';
import WhiteDropdownSVG from '../../assets/imgs/filter-dropdown-white.svg';

const DropdownHolder = styled.div`
  height: 20px;
`;

export const LanguageChoose: FC = (): ReactElement => {
  const { t, i18n } = useTranslation();
 
  const LanguageMenu = (
    <Menu>
      <Menu.Item>
        <p onClick={() => i18n.changeLanguage(Language.en)} className="changeLanguage">
          English
        </p>
      </Menu.Item>
      <Menu.Item>
        <p onClick={() => i18n.changeLanguage(Language.zh)} className="changeLanguage">
          中文简体
        </p>
      </Menu.Item>
    </Menu>
  );

  return (
    <DropdownHolder>
      <Dropdown overlay={LanguageMenu}>
        <VerticalMiddle>
          <DropdownSpan>{ t('language') }</DropdownSpan>
          <img src={WhiteDropdownSVG} alt="" />
        </VerticalMiddle>
      </Dropdown>
    </DropdownHolder>
  );
};