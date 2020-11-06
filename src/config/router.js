import React, { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import { isUserAuthenticated } from '../utils/auth'

import Layout from '../components/layout/index'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isUserAuthenticated() ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.object
}

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Coucou loading</p>}>
        <Switch>
          <Route
            exact
            path='/'
            component={lazy(() => import('../pages/login'))}
          />
          <Layout>
            <PrivateRoute
              exact
              path='/feed'
              component={lazy(() => import('../pages/feed'))}
            />
          </Layout>
          <Redirect to='/' />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
