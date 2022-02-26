import styled from 'styled-components';

import {
  color,
  ColorProps,
  space,
  SpaceProps,
  border,
  BorderProps,
  position,
  PositionProps,
  layout,
  LayoutProps,
  flexbox,
  FlexboxProps,
} from 'styled-system';

export type BoxProps = ColorProps &
  SpaceProps &
  BorderProps &
  PositionProps &
  LayoutProps &
  Omit<FlexboxProps, 'flex'>

export const Box = styled.div<BoxProps>(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  color,
  space,
  border,
  position,
  layout,
  flexbox,
);
