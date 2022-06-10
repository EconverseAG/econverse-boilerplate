import type { FunctionComponent } from 'react';
import React from 'react';

interface OverlayProps {
  children: React.ReactNode;
}

export const Overlay: FunctionComponent<OverlayProps> = ({ children }) => {
  return <div>{children}</div>;
};
