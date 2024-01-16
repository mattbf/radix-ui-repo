import { PropsWithChildren } from 'react';
import styled, { keyframes } from 'styled-components';

const skeletonloadanimate = keyframes`
 0% { background-color: hsla(0, 0%,26%,0.05) }
 100% { background-color: hsla(0, 0%,26%,0.1) }
`;

const Skeleton = styled.div`
  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 100%;
  border-radius: 0.5rem;
  animation: ${skeletonloadanimate} 1s linear infinite alternate;
`;

export const SkeletonBox = (props: PropsWithChildren<object>) => (
  <Skeleton {...props}>{props.children}</Skeleton>
);
