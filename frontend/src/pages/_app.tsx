import 'public/static/global.css'
import * as R from 'ramda'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import {AppContext, AppProps} from 'next/app'
import {BatchHttpLink} from '@apollo/client/link/batch-http'
import {collectionsConfig} from 'config'
import cookies from 'next-cookies'
import {DBContextProvider} from 'common/DBContext'
import {getDataFromTree} from '@apollo/client/react/ssr'
import Head from 'next/head'
import {initDbOnServerSide} from 'common/db/helpers'
import {isServer} from 'common/helpers'
import React from 'react'
import withApollo from 'next-with-apollo'

const App = (props: AppProps & {
  apollo: ApolloClient<InMemoryCache>
}) => {
  return <ApolloProvider client={props.apollo}>
    <DBContextProvider dbDump={props.pageProps.db.dbDump}>
      <Head>
        <title>GraphQL Replication Playground</title>
        <link href="/favicon.png" rel="icon" type="image/x-icon" />
      </Head>

      {React.createElement(props.Component, props.pageProps)}
    </DBContextProvider>
  </ApolloProvider>
}

App.getInitialProps = async (params: AppContext) => {
  let db
  let pageProps = {}

  if(isServer()) {
    db = await initDbOnServerSide({collectionsConfig: R.values(collectionsConfig)})
  }

  try {
    pageProps = params.Component.getInitialProps ? await params.Component.getInitialProps(params.ctx) : {}
  } catch(error) {
    // Is server side
    if(params.ctx.res) {
      params.ctx.res.statusCode = 500
    }

    pageProps = {error: 'Server error', statusCode: 500}
  }

  return {pageProps: {
    ...pageProps,
    cookies : cookies(params.ctx),
    db,
    pathname: params.ctx.pathname,
    query   : params.ctx.query,
  }}
}

// withApollo still relies on Apollo Client v2.
// However it seems to work fine with Apollo Client v3 in most cases, although types are incorrect.
// https://github.com/lfades/next-with-apollo/issues/147#issuecomment-697275968
// @ts-ignore
export default withApollo(params => new ApolloClient({
  cache: new InMemoryCache().restore(params.initialState || {}),

  link: new BatchHttpLink({
    credentials: 'same-origin',
    fetch      : fetch,

    headers: {

      // Accept and Content-Type headers are required by Storefront API
      accept        : 'application/json',
      'content-type': 'application/json',
    },

    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  }),

// @ts-ignore
}), {getDataFromTree})(App)
