import { ExtrinsicStatus } from '../../core/constant/enum';
import FailedSvg from '../../assets/imgs/fail.svg';
import SuccessSvg from '../../assets/imgs/success.svg';
import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { StatusStyled } from '../styled/StatusStyled';

const Span = styled.span`
  margin-left: 5px;
  color: #2A292B;
`;

export const ExtrinsicStatusSpan: FC<{ status: ExtrinsicStatus }> = ({ status }): ReactElement => {
  const { t } = useTranslation();

  switch (status) {
    case ExtrinsicStatus.Failed:
      return (
        <StatusStyled>
          <img style={{ width: '10px', height: '10px' }} src={FailedSvg} alt=""/>
          <Span>
            {t('Failed')}
          </Span>
        </StatusStyled>
      );
    case ExtrinsicStatus.Success:
      return (
        <StatusStyled>
          <img style={{ width: '10px', height: '10px' }} src={SuccessSvg} alt=""/>
          <Span>
            {t('Success')}
          </Span>
        </StatusStyled>
      );
  }
};