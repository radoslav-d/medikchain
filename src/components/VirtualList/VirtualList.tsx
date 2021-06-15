import { List } from '@material-ui/core';
import { ReactNode, useMemo, useRef, useState } from 'react';

export const DEFAULT_RENDER_BUFFER = 20;

interface VirtualListProps<T> {
  data: T[];
  mapping: (item: T) => ReactNode;
  height: number;
  childHeight: number;
  renderBuffer?: number;
  onEmptyList?: ReactNode;
}

export function VirtualList<T>(props: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const ref = useRef(null);

  const itemCount = props.data.length;
  const totalHeight = itemCount * props.childHeight;
  const renderBuffer = props.renderBuffer || DEFAULT_RENDER_BUFFER;
  const startNode = Math.max(
    0,
    Math.floor(scrollTop / props.childHeight) - renderBuffer
  );
  const visibleNodeCount = Math.min(
    itemCount - startNode,
    Math.ceil(props.height / props.childHeight) + 2 * renderBuffer
  );
  const offsetY = startNode * props.childHeight;

  const visibleChildren = useMemo(
    () =>
      props.data
        .slice(startNode, startNode + visibleNodeCount)
        .map(props.mapping),
    [startNode, visibleNodeCount, props.data, props.mapping]
  );
  const onScroll = (e: any) => {
    requestAnimationFrame(() => {
      setScrollTop(e.target.scrollTop);
    });
  };
  if (!props.data.length && props.onEmptyList) {
    return (
      <div
        style={{
          textAlign: 'center',
          height: props.height,
        }}
      >
        {props.onEmptyList}
      </div>
    );
  }
  return (
    <List
      style={{ height: props.height, overflow: 'auto' }}
      ref={ref}
      onScroll={onScroll}
    >
      <div
        style={{
          overflow: 'hidden',
          willChange: 'transform',
          height: totalHeight,
          position: 'relative',
        }}
      >
        <div
          style={{
            willChange: 'transform',
            transform: `translateY(${offsetY}px)`,
          }}
        >
          {visibleChildren}
        </div>
      </div>
    </List>
  );
}
