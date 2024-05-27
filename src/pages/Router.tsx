import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loading from '../components/Loading'

const Home = lazy(() => import('./Home'))
const Login = lazy(() => import('./Login'))
const NotFound = lazy(() => import('./NotFound'))

function Router() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </>
  )
}

export default Router
