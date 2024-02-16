import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import { store } from './services/state/store.ts'
import { Provider as ReduxProvider, useDispatch } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    {/* <React.StrictMode> */}
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
    {/* </React.StrictMode> */}
  </QueryClientProvider>,
)
