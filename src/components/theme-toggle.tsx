'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = (resolvedTheme ?? 'light') === 'dark';

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Button
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={handleToggle}
      size="icon"
      variant="ghost"
    >
      {mounted && isDark && <Sun className="h-5 w-5" />}
      {mounted && !isDark && <Moon className="h-5 w-5" />}
      {!mounted && <Sun className="h-5 w-5" />}
    </Button>
  );
};

export default ThemeToggle;
