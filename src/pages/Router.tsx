import { Suspense, lazy } from 'react'
import Loading from '../components/Loading'
import { Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./Home'))
const Login = lazy(() => import('./Login'))
const SignUp = lazy(() => import('./SignUp'))
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
          path="/signup"
          element={
            <Suspense fallback={<Loading />}>
              <SignUp />
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
