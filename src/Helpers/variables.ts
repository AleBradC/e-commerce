import {
  cleansersRoute,
  moisturizersRoute,
  browsRoute,
  mascaraRoute,
  lipGlossesRoute,
  lipSticksRoute,
  faceOilsRoute,
  faceSerumsRoute,
} from './routes'

import { MenuImageType } from '../Components/ExtendedHeader/ExtendedHeader'

export const options = [
  {
    label: 'High to low',
    value: 'byHigherPrice',
  },
  {
    label: 'Low to high',
    value: 'byLowerPrice',
  },
]

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
