import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Loading, { Size } from './Components/Loading/Loading'
import { Header } from './Components/Header/Header'
import {
  allProductsRoute,
  bagRoute,
  categoryCleansersRoute,
  categoryMoisturizersRoute,
  eyesBrowsRoute,
  eyesMascaraRoute,
  homeRoute,
  lipsLipGlossesRoute,
  lipsLipSticksRoute,
  logInRoute,
  productRoute,
  registerRoute,
  searchRoute,
  treatmentsFaceOilsRoute,
  treatmentsFaceSerumsRoute,
} from './Helpers/routes'

const HomePage = React.lazy(() => import('./Pages/HomePage/HomePage'))
const LogInPage = React.lazy(() => import('./Pages/LogInPage/LogInPage'))
const BagPage = React.lazy(() => import('./Pages/BagPage/BagPage'))
const ProductPage = React.lazy(() => import('./Pages/ProductPage/ProductPage')) // TO DO with ID
const RegisterPage = React.lazy(() => import('./Pages/RegisterPage/RegisterPage'))
const SearchPage = React.lazy(() => import('./Pages/SearchPage/SearchPage'))

const AllProductsPage = React.lazy(
  () => import('./Pages/ProductsPages/AllProductsPage/AllProductsPage')
)
const MascaraProductsPage = React.lazy(
  () =>
    import(
      './Pages/ProductsPages/MakeupProductsPages/EyesProductsPages/MascaraProductsPage/MascaraProductsPage'
    )
)
const BrowsProductsPage = React.lazy(
  () =>
    import(
      './Pages/ProductsPages/MakeupProductsPages/EyesProductsPages/BrowsProductsPage/BrowsProductsPage'
    )
)
const LipGlossesProductsPage = React.lazy(
  () =>
    import(
      './Pages/ProductsPages/MakeupProductsPages/LipsProductsPages/LipGlossesProductsPage/LipGlossesProductsPage'
    )
)
const LipSticksProductsPage = React.lazy(
  () =>
    import(
      './Pages/ProductsPages/MakeupProductsPages/LipsProductsPages/LipSticksProductsPage/LipSticksProductsPage'
    )
)
const CleansersProductsPage = React.lazy(
  () =>
    import(
      './Pages/ProductsPages/SkinCareProductsPages/ProductsByCategoryPages/CleansersProductsPage/CleansersProductsPage'
    )
)
const MoisturizersProductsPage = React.lazy(
  () =>
    import(
      './Pages/ProductsPages/SkinCareProductsPages/ProductsByCategoryPages/MoisturizersProductsPage/MoisturizersProductsPage'
    )
)
const FaceOilsProductsPage = React.lazy(
  () =>
    import(
      './Pages/ProductsPages/SkinCareProductsPages/TreatmentsProductsPages/FaceOilsProductsPage/FaceOilsProductsPage'
    )
)
const FaceSerumsProductsPage = React.lazy(
  () =>
    import(
      './Pages/ProductsPages/SkinCareProductsPages/TreatmentsProductsPages/FaceSerumsProductsPage/FaceSerumsProductsPage'
    )
)

function App() {
  return (
    <Suspense fallback={<Loading size={Size.LARGE} fullScreen />}>
      <Header />
      <Routes>
        <Route path={homeRoute} element={<HomePage />} />
        <Route path={logInRoute} element={<LogInPage />} />
        <Route path={productRoute} element={<ProductPage />} />
        <Route path={registerRoute} element={<RegisterPage />} />
        <Route path={searchRoute} element={<SearchPage />} />
        <Route path={bagRoute} element={<BagPage />} />

        <Route path={allProductsRoute} element={<AllProductsPage />} />

        <Route path={eyesMascaraRoute} element={<MascaraProductsPage />} />
        <Route path={eyesBrowsRoute} element={<BrowsProductsPage />} />

        <Route path={lipsLipGlossesRoute} element={<LipGlossesProductsPage />} />
        <Route path={lipsLipSticksRoute} element={<LipSticksProductsPage />} />

        <Route path={categoryCleansersRoute} element={<CleansersProductsPage />} />
        <Route path={categoryMoisturizersRoute} element={<MoisturizersProductsPage />} />

        <Route path={treatmentsFaceOilsRoute} element={<FaceOilsProductsPage />} />
        <Route path={treatmentsFaceSerumsRoute} element={<FaceSerumsProductsPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
