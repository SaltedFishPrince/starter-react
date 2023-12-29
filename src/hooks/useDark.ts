import { useLocalStorageState } from 'ahooks';
import React from 'react';

type Theme = 'dark' | 'light';

const prefersDark
  = window.matchMedia
  && window.matchMedia('(prefers-color-scheme: dark)').matches;

export function useDark() {
  const [theme, setTheme] = useLocalStorageState<Theme>(
    'color-schema',
    {
      defaultValue: prefersDark ? 'dark' : 'light',
    },
  );

  const [isDark, setIsDark] = React.useState(() => theme === 'dark');
  const toggleTheme = React.useCallback((event: React.MouseEvent) => {
    // @ts-expect-error experimental API
    const isAppearanceTransition = document.startViewTransition
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isAppearanceTransition) {
      setIsDark(!isDark);
      return;
    }
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );
    // @ts-expect-error: Transition API
    const transition = document.startViewTransition(async () => {
      setIsDark(!isDark);
      document.documentElement.classList.toggle('dark', !isDark);
    });
    transition.ready
      .then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        document.documentElement.animate(
          {
            clipPath: !isDark
              ? [...clipPath].reverse()
              : clipPath,
          },
          {
            duration: 400,
            easing: 'ease-out',
            pseudoElement: !isDark
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)',
          },
        );
      });
  }, [isDark]);

  React.useEffect(() => {
    setTheme(isDark ? 'dark' : 'light');
  }, [isDark, setTheme]);

  return [isDark, toggleTheme] as const;
}
