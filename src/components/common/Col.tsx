/** @jsxRuntime classic */
/** @jsx jsx */
import { useMemo } from 'react';
import { jsx, css } from '@emotion/react';

import { grid, media } from '../../styles/variables';

const breakPoints = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const offsetAliasNames = ['first', 'last'] as const;

export type BreakPoints = typeof breakPoints[number];
type Size = boolean | number | 'auto';
type ColSettings = {
  span?: Size;
  order?: number;
  offset?: number | typeof offsetAliasNames[number];
  center?: boolean;
};
type OffsetAlias = Record<typeof offsetAliasNames[number], number>;

export interface Props {
  className?: string;
  xs?: Size | ColSettings;
  sm?: Size | ColSettings;
  md?: Size | ColSettings;
  lg?: Size | ColSettings;
  xl?: Size | ColSettings;
}

const offsetAlias: OffsetAlias = {
  first: -1,
  last: 13,
};
const base = css`
  position: relative;
  width: 100%;
  padding-left: ${grid.gutter};
  padding-right: ${grid.gutter};
`;
const flexible = css`
  flex-basis: 0;
  flex-grow: 1;
  min-width: 0;
  max-width: 100%;
`;

/**
 * 칼럼 크기 스타일 만들기
 * @param settings
 * @param breakPoint
 */
const makeCol = (settings: ColSettings, breakPoint: BreakPoints) => {
  // 크기
  const span = settings.span
    ? (() => {
        // auto layout column
        if (typeof settings.span === 'boolean' && settings.span) {
          return flexible;
        }

        // variable width content
        if (settings.span === 'auto') {
          return css`
            flex: 0 0 auto;
            width: auto;
            max-width: 100%;
          `;
        }

        // setting column width
        if (typeof settings.span === 'number' && settings.span >= 1 && settings.span <= grid.cols) {
          const width: number = ((settings.span as number) / grid.cols) * 100;

          return css`
            flex: 0 0 ${width}%;
            max-width: ${width}%;
          `;
        }

        return null;
      })()
    : null;

  // 순서
  const order = settings.order
    ? css`
        order: ${settings.order};
      `
    : null;

  // 오프셋
  const offsetNumber = (() => {
    if (!settings.offset) return null;

    // number (1 <= n <= cols)
    if (typeof settings.offset === 'number' && settings.offset >= 1 && settings.offset <= grid.cols) {
      return settings.offset;
    }

    // alias (first, last)
    if (typeof settings.offset === 'string' && offsetAliasNames.includes(settings.offset)) {
      return offsetAlias[settings.offset];
    }

    return null;
  })();
  const offset = offsetNumber
    ? css`
        margin-left: ${(offsetNumber / grid.cols) * 100}%;
      `
    : null;

  // 중앙 정렬
  const center = settings.center
    ? css`
        display: flex;
        align-items: center;
      `
    : null;

  // 완성된 스타일
  const styles = css`
    ${span}
    ${order}
    ${offset}
    ${center}
  `;

  // 가장 작은 브레이크 포인트 지정 시 media query 없이 적용
  if (breakPoint === 'xs') {
    return styles;
  }

  // 브레이크 포인트에 맞는 media query 적용
  return css`
    ${media[breakPoint as BreakpointsType]} {
      ${styles};
    }
  `;
};

export const Col: React.FC<Props> = ({ children, className, xs, sm, md, lg, xl }) => {
  const styles = useMemo(() => {
    const props = { xs, sm, md, lg, xl };

    // 각 브레이크 포인트별 사이즈로 스타일 추가
    const colStyles = [];

    breakPoints.forEach((breakPoint) => {
      const value = props[breakPoint];

      if (!value) return;

      // span 값만 지정됐을 경우 object 스타일로 정규화
      const settings: ColSettings = typeof value === 'object' ? value : { span: value as Size };

      // order 값이 지정되었으나 span 값이 없을 경우 auto layout으로 지정
      if (settings.order && !settings.span) {
        settings.span = true;
      }

      colStyles.push(makeCol(settings, breakPoint));
    });

    // 지정된 스타일이 없을 경우 디폴트로 플랙시블 칼럼 스타일 적용
    if (!colStyles.length) {
      colStyles.push(makeCol({ span: true }, 'xs'));
    }

    return colStyles;
  }, [xs, sm, md, lg, xl]);

  return (
    <div className={className} css={[base, ...styles]}>
      {children}
    </div>
  );
};

export default Col;
