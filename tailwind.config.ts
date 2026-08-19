import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#020914',
        'deep-bg': '#061421',
        surface: '#081D2E',
        'ocean-blue': '#13507A',
        'electric-blue': '#1E90FF',
        'electric-cyan': '#00D4FF',
        'primary-text': '#E6F7FF',
        'secondary-text': '#A7C0D2',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'cyan-glow-gradient': 'linear-gradient(135deg, rgba(0,212,255,0.15) 0%, rgba(30,144,255,0.05) 50%, rgba(2,9,20,0) 100%)',
        'electric-gradient': 'linear-gradient(90deg, #1E90FF 0%, #00D4FF 100%)',
        'text-electric': 'linear-gradient(135deg, #E6F7FF 30%, #00D4FF 70%, #1E90FF 100%)',
      },
      boxShadow: {
        'cyan-glow': '0 0 30px -5px rgba(0, 212, 255, 0.4)',
        'cyan-glow-lg': '0 0 60px -10px rgba(0, 212, 255, 0.6)',
        'electric-glow': '0 0 30px -5px rgba(30, 144, 255, 0.5)',
        'inner-glow': 'inset 0 0 20px 0 rgba(0, 212, 255, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-gentle': 'float 8s ease-in-out infinite',
        'glow-cyan': 'glowCyan 4s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowCyan: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(0, 212, 255, 0.3))' },
          '100%': { opacity: '0.9', filter: 'drop-shadow(0 0 35px rgba(0, 212, 255, 0.8))' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
