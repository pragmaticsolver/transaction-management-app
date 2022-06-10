import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import Footer from '@/layout/Footer'
import Navbar from '@/layout/Navbar'

import Home from '@/screens/Home'
import NotFound from '@/screens/NotFound'
import ScreenTransactionList from '@/screens/transaction/List'
import ScreenTransactionForm from '@/screens/transaction/Form'

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container flex-grow p-4 mx-auto">
        <QueryClientProvider client={queryClient}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/transaction">
              <ScreenTransactionList />
            </Route>
            <Route path="/transaction/edit/:id">
              <ScreenTransactionForm />
            </Route>
            <Route path="/transaction/create">
              <ScreenTransactionForm />
            </Route>
            <Route path="/transaction/view/:id">
              <ScreenTransactionForm />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </QueryClientProvider>
      </main>
      <Footer />
    </>
  )
}

export default App
