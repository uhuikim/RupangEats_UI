/** @jsxRuntime classic */
/** @jsx jsx */
import { ElementType } from 'react';
import { jsx, css } from '@emotion/react';

import { media } from '../../styles/variables';

type Fluid = boolean | 'sm' | 'md' | 'lg' | 'xl';

interface Props {
  as?: ElementType;
  className?: string;
  fluid?: Fluid;
}

const baseStyle = css`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

const mediaQuery = {
  sm: css`
    ${media.sm} {
      max-width: 540px;
    }
  `,
  md: css`
    ${media.md} {
      max-width: 720px;
    }
  `,
  lg: css`
    ${media.lg} {
      max-width: 960px;
    }
  `,
  xl: css`
    ${media.xl} {
      max-width: 1140px;
    }
  `,
};

const mediaStyle = (fluid: Fluid) => css`
  ${(!fluid || fluid === 'sm') && mediaQuery.sm}
  ${(!fluid || fluid === 'sm' || fluid === 'md') && mediaQuery.md}
  ${(!fluid || fluid === 'sm' || fluid === 'md' || fluid === 'lg') && mediaQuery.lg}
  ${(!fluid || fluid === 'sm' || fluid === 'md' || fluid === 'lg' || fluid === 'xl') &&
  mediaQuery.xl}
`;

export const Container: React.FC<Props> = ({
  as: Element = 'div',
  className,
  fluid = false,
  ...props
}) => <Element className={className} css={[baseStyle, mediaStyle(fluid)]} {...props} />;

export default Container;
