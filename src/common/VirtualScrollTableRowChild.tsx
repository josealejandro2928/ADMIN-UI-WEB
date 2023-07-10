import React from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * A wrapper component for children of
 * VirtualScroll. Computes inline style and
 * handles whether to display props.children.
 */
function VirtualScrollTableRowChild({ height, children }: { height: number; children: any }) {
  const [ref, inView] = useInView();
  const style = {
    height: `${height}px`,
    overflow: 'hidden',
  };
  return (
    <tr style={style} ref={ref}>
      {inView ? children : null}
    </tr>
  );
}

export default VirtualScrollTableRowChild;
