/**
 * Colors
 */

const palette = {
  main: '#FF0014',
  mainLight: '#FF7A85',
  mainDark: '#A80F1B',
  sub: '#FFBE32',
  subLight: '#FFE2A3',
  subDark: '#C38600',
  textPrimary: '#202020',
  textSecondary: '#707070',
  textDisabled: '#b0b0b0',
  textError: '#FF4343',
  textSuccess: '#3864FF',
  bgStep0: '#FFFFFF',
  bgStep1: '#f6f6f6',
  bgDimd: 'rgba(32,32,32,0.6)',
  dividers: '#EEEEEE',
  btnDefault: '#DEDEDE',
  border: '#BBBBBB',
};

/**
 * Font sizes
 */

const fontSizeNum = {
  h1: 80,
  h2: 64,
  h3: 52,
  h4: 40,
  h5: 32,
  h6: 24,
  Subtitle1: 20,
  Subtitle2: 16,
  Body1: 16,
  Body2: 14,
  Caption: 12,
  Overline: 10,
};

const fontSize = {};

Object.keys(fontSizeNum).forEach((key) => {
  fontSize[key] = `${fontSizeNum[key] / 16}rem`;
});

/**
 * Spacing
 */

const spacingNum = {
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};
const spacing = {};

Object.keys(spacingNum).forEach((key) => {
  spacing[key] = `${spacingNum[key]}px`;
});

/**
 * Breakpoints
 */

export const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const media = {};
const breakpointKeys = Object.keys(breakpoints);

breakpointKeys.forEach((key) => {
  media[key] = `@media (min-width: ${breakpoints[key]}px)`;
});

breakpointKeys.reduce((prevMin, key) => {
  const min = breakpoints[key];
  const max = min - 1;

  media[`${key}Down`] = `@media (max-width: ${max}px)`;

  if (prevMin) {
    media[`${key}Only`] = `@media (min-width: ${prevMin}px) and (max-width: ${max}px)`;
  }

  return min;
}, 0);

const grid = {
  cols: 12,
  gutter: '10px',
};

export { palette, fontSize, spacing, spacingNum, media, grid };
