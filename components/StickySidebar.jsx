'use client';

import { useEffect, useRef, useState } from 'react';

// Sidebar that scrolls WITH the page (no inner scrollbar). When its bottom edge
// reaches the bottom of the viewport it sticks there, and stays stuck until the
// left column (its grid/flex parent) finishes. If the sidebar is shorter than
// the viewport it simply sticks at the top.
// Works by setting `top` to (viewportHeight - sidebarHeight - gap) when negative.
export default function StickySidebar({ children, className = '', gap = 20 }) {
  const ref = useRef(null);
  const [top, setTop] = useState(gap);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const update = () => setTop(Math.min(gap, window.innerHeight - el.offsetHeight - gap));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [gap]);

  return (
    <aside ref={ref} className={`lg:sticky lg:self-start ${className}`} style={{ top }}>
      {children}
    </aside>
  );
}
