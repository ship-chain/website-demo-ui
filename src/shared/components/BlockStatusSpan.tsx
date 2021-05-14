import { BlockStatus } from '../../core/constant/enum';
import FailedSvg from '../../assets/imgs/failed.svg';
import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { StatusStyled } from '../styled/StatusStyled';

const Circle = styled.div`
  border-radius: 5px;
  width: 10px;
  height: 10px;
`;

const Success = styled(Circle)`
  background-color: #00D595;
`;

const Fail = styled(Circle)`
  background-color: #FFD21D;
`;

const Span = styled.span`
  margin-left: 5px;
  color: #2A292B;
`;

export const BlockStatusSpan: FC<{status: BlockStatus}> = ({ status }): ReactElement => {
  const { t } = useTranslation();

  switch (status) {
    case BlockStatus.Failed:
      return (
        <StatusStyled>
          <img style={{ width: '10px', height: '10px' }} src={FailedSvg} alt=""/>
          <Span>
            {t('Failed')}
          </Span>
        </StatusStyled>
      );
    case BlockStatus.Finalized:
      return (
        <StatusStyled>
          <Success />
          <Span>
            {t('Finalized')}
          </Span>
        </StatusStyled>
      );
    case BlockStatus.Unfinalized:
      return (
        <StatusStyled>
          <Fail />
          <Span>
            {t('Unfinalized')}
          </Span>
        </StatusStyled>
      );
  }
};