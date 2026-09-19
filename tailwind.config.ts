import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FFFFFF',
        'bg-subtle': '#F6F8FB',
        surface: '#FFFFFF',
        border: '#E4E9F0',
        'border-strong': '#CBD5E1',
        text: '#0B1220',
        'text-body': '#24303F',
        'text-muted': '#5B6779',
        'text-faint': '#8494A8',
        brand: '#0E63C4',
        'brand-hover': '#0A4E9E',
        'brand-soft': '#EBF3FD',
        'brand-ink': '#0A3F73',
        tossup: '#8A6100',
        'tossup-bg': '#FFFBEB',
        'tossup-bd': '#FCE8A5',
        lean: '#B54708',
        'lean-bg': '#FFF7ED',
        'lean-bd': '#FCD9B6',
        likely: '#0E63C4',
        'likely-bg': '#EBF3FD',
        'likely-bd': '#C9DFF7',
        solid: '#5B6473',
        'solid-bg': '#F8FAFC',
        'solid-bd': '#D8DEE7',
        moved: '#B42318',
        'moved-bg': '#FEF2F2',
        'moved-bd': '#FBD5D5',
        live: '#0BA360',
      },
      fontFamily: {
        ui: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
