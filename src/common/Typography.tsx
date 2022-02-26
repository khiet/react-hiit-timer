import styled from 'styled-components';
import {
  typography,
  TypographyProps,
} from 'styled-system';
import { Box } from './Box';

export const Typography = styled(Box)<TypographyProps>(
  {},
  typography,
);
