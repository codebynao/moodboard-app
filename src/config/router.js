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
        isUserAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
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
          <Route exact path='/'>
            {isUserAuthenticated() ? (
              <Redirect to='/feed' />
            ) : (
              <Redirect to='/login' />
            )}
          </Route>
          <Route
            exact
            path='/login'
            component={lazy(() => import('../pages/login'))}
          />
          <Layout>
            <Switch>
              <PrivateRoute
                exact
                path='/feed'
                component={lazy(() => import('../pages/feed'))}
              />
              <PrivateRoute
                exact
                path='/user'
                component={lazy(() => import('../pages/user'))}
              />
              <PrivateRoute
                exact
                path='/user/moodboards/:slug'
                component={lazy(() => import('../pages/moodboardDetails'))}
              />
              <Redirect to='/login' />
            </Switch>
          </Layout>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
