const defaultConfig = require('tailwindcss/defaultConfig')
const plugin = require('tailwindcss/plugin')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },

  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        '.grid-auto-col-1': {
          gridAutoColumns: 'minmax(0, 1fr)',
        },

        '.grid-auto-col-auto': {
          gridAutoColumns: 'auto',
        },

        '.grid-auto-col-full': {
          gridAutoColumns: '100%',
        },
      }, ['responsive'])
    }),

    plugin(({addUtilities}) => {
      addUtilities({
        '.justify-items-center': {
          justifyItems: 'center',
        },

        '.justify-items-end': {
          justifyItems: 'end',
        },

        '.justify-items-start': {
          justifyItems: 'start',
        },

        '.justify-items-stretch': {
          justifyItems: 'stretch',
        },
      }, ['responsive'])
    }),

    plugin(({addUtilities}) => {
      addUtilities({
        '.justify-self-center': {
          justifySelf: 'center',
        },

        '.justify-self-end': {
          justifySelf: 'end',
        },

        '.justify-self-start': {
          justifySelf: 'start',
        },

        '.justify-self-stretch': {
          justifySelf: 'stretch',
        },
      }, ['responsive'])
    }),

    plugin(({addUtilities}) => {
      addUtilities({
        '.place-content-center': {
          placeContent: 'center',
        },

        '.place-content-end': {
          placeContent: 'end',
        },

        '.place-content-start': {
          placeContent: 'start',
        },
      }, ['responsive'])
    }),

    plugin(({addUtilities}) => {
      addUtilities({
        '.place-items-center': {
          placeItems: 'center',
        },

        '.place-items-end': {
          placeItems: 'end',
        },

        '.place-items-start': {
          placeItems: 'start',
        },

        '.place-items-stretch': {
          placeItems: 'stretch',
        },
      }, ['responsive'])
    }),

    plugin(({addUtilities}) => {
      addUtilities({
        '.grid-area-full': {
          gridArea: '1/1/-1/-1',
        },
      }, ['responsive'])
    }),

    ({addUtilities}) => addUtilities({
      '.backdrop-filter-blur-1': {
        backdropFilter: 'blur(4px)',
      },

      '.backdrop-filter-blur-2': {
        backdropFilter: 'blur(8px)',
      },

      '.backdrop-filter-blur-3': {
        backdropFilter: 'blur(12px)',
      },

      '.backface-hidden': {
        backfaceVisibility: 'hidden',
      },

      '.line-clamp': {
        display        : '-webkit-box',
        overflow       : 'hidden',
        WebkitBoxOrient: 'vertical',
      },

      '.line-clamp-2': {
        WebkitLineClamp: '2',
      },

      '.line-clamp-3': {
        WebkitLineClamp: '3',
      },

      '.line-clamp-4': {
        WebkitLineClamp: '4',
      },

      '.line-clamp-5': {
        WebkitLineClamp: '5',
      },

      '.line-clamp-6': {
        WebkitLineClamp: '6',
      },

      '.transform-preserve': {
        transformStyle: 'preserve-3d',
      },

      '.transition-flip': {
        transition: '.8s cubic-bezier(.175, .885, .32, 1.275)',
      },
    }),
  ],

  theme: {
    extend: {
      fontFamily: {
        main: ['"Helvetica", sans-serif'],
      },

      gridTemplateColumns: {
        '1fr/auto'             : '1fr auto',
        '1fr/minmax(0/360)/1fr': '1fr minmax(0, calc(360 * .25rem)) 1fr',
        'auto/1fr'             : 'auto 1fr',
        'auto/1fr/auto'        : 'auto 1fr auto',
      },

      gridTemplateRows: {
        '1fr/auto'     : '1fr auto',
        'auto/1fr'     : 'auto 1fr',
        'auto/1fr/auto': 'auto 1fr auto',
      },

      inset: {
        '1/2': '50%',
        full : '100%',
      },

      spacing: {
        full      : '100%',
        'screen-x': '100vw',
        'screen-y': '100vh',
      },

      transitionProperty: {
        'transform/opacity' : 'transform, opacity',
        'visibility/opacity': 'visibility, opacity',
      },

      width: {
        'max-content': 'max-content',
      },
    },
  },

  variants: {
    cursor : [...defaultConfig.variants.cursor, 'disabled'],
    opacity: [...defaultConfig.variants.opacity, 'group-hover', 'group-focus'],
  },
}
