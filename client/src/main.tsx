import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router/Router'
import './styles/index.css'
import store from './store'
import {Provider} from "react-redux";
import {QueryClientProvider, QueryClient} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'

const queryClient = new QueryClient()

export type RootState = ReturnType<typeof store.getState>

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Router/>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>,
)
