import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Loading from './components/Loading/Loading'
import { Header } from './components/Header/Header'
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

import { Footer } from './components/Footer/Footer'

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'))
const LogInPage = React.lazy(() => import('./pages/LogInPage/LogInPage'))
const BagPage = React.lazy(() => import('./pages/BagPage/BagPage'))
const SearchPage = React.lazy(() => import('./pages/SearchPage/SearchPage'))
const ProductPage = React.lazy(() => import('./pages/ProductPage/ProductPage')) // TO DO with ID
const AllProductsPage = React.lazy(() => import('./pages/ProductsPages/AllProductsPage/AllProductsPage'))
const MascaraProductsPage = React.lazy(
  () => import('./pages/ProductsPages/MakeupProductsPages/EyesProductsPages/MascaraProductsPage')
)
const BrowsProductsPage = React.lazy(
  () => import('./pages/ProductsPages/MakeupProductsPages/EyesProductsPages/BrowsProductsPage')
)
const LipGlossesProductsPage = React.lazy(
  () => import('./pages/ProductsPages/MakeupProductsPages/LipsProductsPages/LipGlossesProductsPage')
)
const LipSticksProductsPage = React.lazy(
  () => import('./pages/ProductsPages/MakeupProductsPages/LipsProductsPages/LipSticksProductsPage')
)
const CleansersProductsPage = React.lazy(
  () => import('./pages/ProductsPages/SkinCareProductsPages/ProductsByCategoryPages/CleansersProductsPage')
)
const MoisturizersProductsPage = React.lazy(
  () => import('./pages/ProductsPages/SkinCareProductsPages/ProductsByCategoryPages/MoisturizersProductsPage')
)
const FaceOilsProductsPage = React.lazy(
  () => import('./pages/ProductsPages/SkinCareProductsPages/TreatmentsProductsPages/FaceOilsProductsPage')
)
const FaceSerumsProductsPage = React.lazy(
  () => import('./pages/ProductsPages/SkinCareProductsPages/TreatmentsProductsPages/FaceSerumsProductsPage')
)

function App() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
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
