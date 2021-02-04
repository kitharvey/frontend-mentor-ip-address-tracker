import React from 'react'
import Page from './page/Page';
import './scss/styles.scss'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Page  />
    </QueryClientProvider>
  );
}

export default App;
