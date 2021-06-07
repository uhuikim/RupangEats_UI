/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import { BreakpointsType, grid, media } from '../../styles/variables';
import { BreakPoints } from './Col';

interface Props {
  className?: string;
  center?: BreakPoints;
  noGutter?: boolean;
}

const row = css`
  display: flex;
  flex-wrap: wrap;
`;
const gutter = css`
  margin-left: -${grid.gutter};
  margin-right: -${grid.gutter};
`;
const justifyCenter = (breakpoint: BreakPoints) => {
  if (breakpoint === 'xs') {
    return css`
      justify-content: center;
    `;
  }
  return css`
    ${media[breakpoint as BreakpointsType]} {
      justify-content: center;
    }
  `;
};

export const Row: React.FC<Props> = ({ children, className, center, noGutter = false }) => {
  return (
    <div className={className} css={[row, center && justifyCenter(center), !noGutter && gutter]}>
      {children}
    </div>
  );
};

export default Row;
