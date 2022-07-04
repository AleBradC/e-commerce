import {
  categoryCleansersRoute,
  categoryMoisturizersRoute,
  eyesBrowsRoute,
  eyesMascaraRoute,
  lipsLipGlossesRoute,
  lipsLipSticksRoute,
  treatmentsFaceOilsRoute,
  treatmentsFaceSerumsRoute,
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
            navigateTo: categoryCleansersRoute,
          },
          {
            submenuTitle: 'Moisturizers',
            navigateTo: categoryMoisturizersRoute,
          },
        ],
      },
      {
        title: 'TREATMENTS',
        submenu: [
          {
            submenuTitle: 'Face Serums',
            navigateTo: treatmentsFaceSerumsRoute,
          },
          {
            submenuTitle: 'Face Oils',
            navigateTo: treatmentsFaceOilsRoute,
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
            navigateTo: eyesMascaraRoute,
          },
          {
            submenuTitle: 'Brows',
            navigateTo: eyesBrowsRoute,
          },
        ],
      },
      {
        title: 'LIPS',
        submenu: [
          {
            submenuTitle: 'Lipstick',
            navigateTo: lipsLipSticksRoute,
          },
          {
            submenuTitle: 'Lip Glosses & Tints',
            navigateTo: lipsLipGlossesRoute,
          },
        ],
      },
    ],
  },
]
