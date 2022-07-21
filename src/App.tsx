import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Loading, { Size } from './Components/Loading/Loading'
import { Header } from './Components/Header/Header'
import {
  allProductsRoute,
  bagRoute,
  browsRoute,
  cleansersRoute,
  faceOilsRoute,
  faceSerumsRoute,
  homeRoute,
  lipGlossesRoute,
  lipSticksRoute,
  logInRoute,
  mascaraRoute,
  moisturizersRoute,
  productRoute,
  searchRoute,
} from './helpers/routes'

import { Footer } from './Components/Footer/Footer'

const HomePage = React.lazy(() => import('./Pages/HomePage/HomePage'))
const LogInPage = React.lazy(() => import('./Pages/LogInPage/LogInPage'))
const BagPage = React.lazy(() => import('./Pages/BagPage/BagPage'))
const ProductPage = React.lazy(() => import('./Pages/ProductPage/ProductPage')) // TO DO with ID
const SearchPage = React.lazy(() => import('./Pages/SearchPage/SearchPage'))

const AllProductsPage = React.lazy(() => import('./Pages/ProductsPages/AllProductsPage/AllProductsPage'))
const MascaraProductsPage = React.lazy(
  () => import('./Pages/ProductsPages/MakeupProductsPages/EyesProductsPages/MascaraProductsPage')
)
const BrowsProductsPage = React.lazy(
  () => import('./Pages/ProductsPages/MakeupProductsPages/EyesProductsPages/BrowsProductsPage')
)
const LipGlossesProductsPage = React.lazy(
  () => import('./Pages/ProductsPages/MakeupProductsPages/LipsProductsPages/LipGlossesProductsPage')
)
const LipSticksProductsPage = React.lazy(
  () => import('./Pages/ProductsPages/MakeupProductsPages/LipsProductsPages/LipSticksProductsPage')
)
const CleansersProductsPage = React.lazy(
  () => import('./Pages/ProductsPages/SkinCareProductsPages/ProductsByCategoryPages/CleansersProductsPage')
)
const MoisturizersProductsPage = React.lazy(
  () => import('./Pages/ProductsPages/SkinCareProductsPages/ProductsByCategoryPages/MoisturizersProductsPage')
)
const FaceOilsProductsPage = React.lazy(
  () => import('./Pages/ProductsPages/SkinCareProductsPages/TreatmentsProductsPages/FaceOilsProductsPage')
)
const FaceSerumsProductsPage = React.lazy(
  () => import('./Pages/ProductsPages/SkinCareProductsPages/TreatmentsProductsPages/FaceSerumsProductsPage')
)

function App() {
  return (
    <Suspense fallback={<Loading size={Size.LARGE} fullScreen />}>
      <Header />
      <Routes>
        <Route path={homeRoute} element={<HomePage />} />
        <Route path={logInRoute} element={<LogInPage />} />
        <Route path={productRoute} element={<ProductPage />} />
        <Route path={searchRoute} element={<SearchPage />} />
        <Route path={bagRoute} element={<BagPage />} />

        <Route path={allProductsRoute} element={<AllProductsPage />} />

        <Route path={mascaraRoute} element={<MascaraProductsPage />} />
        <Route path={browsRoute} element={<BrowsProductsPage />} />

        <Route path={lipGlossesRoute} element={<LipGlossesProductsPage />} />
        <Route path={lipSticksRoute} element={<LipSticksProductsPage />} />

        <Route path={cleansersRoute} element={<CleansersProductsPage />} />
        <Route path={moisturizersRoute} element={<MoisturizersProductsPage />} />

        <Route path={faceOilsRoute} element={<FaceOilsProductsPage />} />
        <Route path={faceSerumsRoute} element={<FaceSerumsProductsPage />} />
      </Routes>
      <Footer />
    </Suspense>
  )
}

export default App
