const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '8px',
        sm: '2rem'
      },
      screens: {
        xs: '431px',
        sm: '601px',
        md: '769px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1320px'
      }
    },
    screens: {
      xs: '431px',
      sm: '601px',
      md: '769px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1500px'
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        poppins: ['var(--font-poppins)', ...fontFamily.sans],
        vujahday: ['var(--font-vujahday)', ...fontFamily.sans],
        nunito: ['var(--font-nunito)', ...fontFamily.sans]
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        'light-active': '#118707', // text active on light bg
        'dark-active': '#1bb10a', // text active on dark bg
        'bg-disabled': '#556c7d', // bg color when disabled (inactive)
        'bg-on-light': '#159608', // bg color when light bg
        'bg-on-dark': '#19b10a' // bg color when dark bg
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      maxWidth: {
        '9/10': '90%',
        '8.5/10': '85%',
        '8/10': '80%',
        '7/10': '70%',
        '6.5/10': '65%',
        '6/10': '60%'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
