/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '1.25rem',
  			md: '2rem',
  			xl: '2.5rem'
  		},
  		screens: {
  			'2xl': '1440px'
  		}
  	},
  	extend: {
  		colors: {
  			/* --- Brand palette, sampled from the Royal Decor logo --- */
  			// The logo's near-black wordmark: body text and dark sections.
  			navy: {
  				DEFAULT: '#0A0A0A',
  				deep: '#050505',
  				soft: '#1A1A1D'
  			},
  			ivory: {
  				DEFAULT: '#F7F3EA',
  				warm: '#FBF9F4'
  			},
  			// The logo's crimson: R monogram, rule and chevrons. Primary accent.
  			crimson: {
  				DEFAULT: '#7A1030',
  				dark: '#5E0B24',
  				light: '#B04561'
  			},
  			// The logo's royal blue, from "EXCLUSIVE". Supporting accent only.
  			royal: {
  				DEFAULT: '#132257',
  				dark: '#0C1739',
  				light: '#3C4E93'
  			},
  			sand: {
  				DEFAULT: '#D8C7AD',
  				light: '#E8DDCB'
  			},
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
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 6px)',
  			sm: 'calc(var(--radius) - 10px)',
  			card: '28px',
  			panel: '36px'
  		},
  		fontFamily: {
  			display: [
  				'Manrope',
  				'ui-sans-serif',
  				'system-ui',
  				'sans-serif'
  			],
  			sans: [
  				'Inter',
  				'ui-sans-serif',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		letterSpacing: {
  			tightest: '-0.045em',
  			editorial: '-0.03em',
  			label: '0.18em'
  		},
  		fontSize: {
  			display: [
  				'clamp(3rem, 7vw, 7rem)',
  				{
  					lineHeight: '1.18',
  					letterSpacing: '-0.04em'
  				}
  			],
  			section: [
  				'clamp(2.25rem, 4.4vw, 4rem)',
  				{
  					lineHeight: '1.02',
  					letterSpacing: '-0.035em'
  				}
  			],
  			stat: [
  				'clamp(3rem, 6vw, 5.5rem)',
  				{
  					lineHeight: '0.9',
  					letterSpacing: '-0.04em'
  				}
  			],
  			label: [
  				'0.6875rem',
  				{
  					lineHeight: '1',
  					letterSpacing: '0.18em'
  				}
  			]
  		},
  		boxShadow: {
  			soft: '0 2px 8px rgba(17,24,39,0.04), 0 12px 32px rgba(17,24,39,0.06)',
  			lift: '0 8px 20px rgba(17,24,39,0.06), 0 24px 56px rgba(17,24,39,0.10)',
  			glass: '0 8px 40px rgba(11,13,16,0.16)',
  			nav: '0 1px 2px rgba(17,24,39,0.04), 0 10px 40px rgba(17,24,39,0.08)'
  		},
  		transitionTimingFunction: {
  			premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
  			smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'fade-up': {
  				from: {
  					opacity: '0',
  					transform: 'translateY(24px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'none'
  				}
  			},
  			'fade-in': {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			'hero-zoom': {
  				from: {
  					transform: 'scale(1.06)'
  				},
  				to: {
  					transform: 'scale(1)'
  				}
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(-50%)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-up': 'fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both',
  			'fade-in': 'fade-in 1s ease both',
  			'hero-zoom': 'hero-zoom 1.8s cubic-bezier(0.22,1,0.36,1) both',
  			marquee: 'marquee 40s linear infinite'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
};
