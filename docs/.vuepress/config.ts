import { defaultTheme } from 'vuepress'
import navbar from './configs/navBar'
import sidebar from './configs/sidebar'
export default {
  title: "华若相惜",
  description: "腹有诗书气自华",
  theme: defaultTheme({

    sidebar: {
      '/': [
        {
          text: 'Git',
          collapsible: true,
          children: ['/git/gitPage.md'],
        },
        {
          text: 'React',
          collapsible: true,
          children: ['/day/ref.md', '/day/useEffectAndUseState.md'],
        },
      ],
      // '/day/': [

      //   {
      //     text: 'React',
      //     collapsible: true,
      //     children: ['/day/ref.md', '/day/useEffectAndUseState.md'],
      //   },
      // ]
    },
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
    ],
  }),

}