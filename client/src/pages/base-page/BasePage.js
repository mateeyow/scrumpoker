import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

const Home = lazy(() => import('../home/Home'))

const BasePage = () => (
  <Suspense fallback={null}>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </Suspense>
)

export default BasePage
