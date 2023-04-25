import { MenuImageType } from '../../ExtendedHeader/ExtendedHeader'
import {
  browsRoute,
  cleansersRoute,
  faceOilsRoute,
  faceSerumsRoute,
  lipGlossesRoute,
  lipSticksRoute,
  mascaraRoute,
  moisturizersRoute,
} from '../../../helpers/routes'

export const skincareHeaderItems = [
  {
    image: MenuImageType.SKINCARE,
    sections: [
      {
        title: 'BY CATEGORY',
        submenu: [
          {
            submenuTitle: 'Cleansers',
            navigateTo: cleansersRoute,
          },
          {
            submenuTitle: 'Moisturizers',
            navigateTo: moisturizersRoute,
          },
        ],
      },
      {
        title: 'TREATMENTS',
        submenu: [
          {
            submenuTitle: 'Face Serums',
            navigateTo: faceSerumsRoute,
          },
          {
            submenuTitle: 'Face Oils',
            navigateTo: faceOilsRoute,
          },
        ],
      },
    ],
  },
]

export const makeupHeaderItems = [
  {
    image: MenuImageType.MAKE_UP,
    sections: [
      {
        title: 'EYES',
        submenu: [
          {
            submenuTitle: 'Mascara',
            navigateTo: mascaraRoute,
          },
          {
            submenuTitle: 'Brows',
            navigateTo: browsRoute,
          },
        ],
      },
      {
        title: 'LIPS',
        submenu: [
          {
            submenuTitle: 'Lipstick',
            navigateTo: lipSticksRoute,
          },
          {
            submenuTitle: 'Lip Glosses & Tints',
            navigateTo: lipGlossesRoute,
          },
        ],
      },
    ],
  },
]
