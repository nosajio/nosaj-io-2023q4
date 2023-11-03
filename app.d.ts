declare module '*.svg?svgr' {
  import React from 'react';
  const SVG: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  export default SVG;
}

type Nullable<T> = T | null;
