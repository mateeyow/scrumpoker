import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

const Home = lazy(() => import('../home/Home'))
const ScrumMaster = lazy(() => import('../scrum-master/ScrumMaster'))
const Member = lazy(() => import('../member/Member'))

const BasePage = () => (
  <Suspense fallback={null}>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/session/:roomId' component={ScrumMaster} />
      <Route path='/room/:roomId' component={Member} />
    </Switch>
  </Suspense>
)

export default BasePage
