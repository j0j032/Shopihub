import {CssBaseline, PaletteMode, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {themeSettings} from "../config/theme";
import {useSelector} from "react-redux";
import {useMemo} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Dashboard} from "../pages/Dashboard";
import Layout from "../pages/Layout";
import {Products} from "../pages/Products";
import {Customers} from "../pages/Customers";
import {Transactions} from "../pages/Transactions";
import {Geography} from "../pages/Geography";
import {Overview} from "../pages/Overview";
import {Daily} from "../pages/Daily";
import {Monthly} from "../pages/Monthly";
import {Breakdown} from "../pages/Breakdown";

interface GlobalState {
    global: {
        mode: string;
    }
}

function Router() {
    const mode = useSelector((state: GlobalState) => state.global.mode)
    const theme = useMemo(() => createTheme(themeSettings(mode as PaletteMode)), [mode])
    return (
        <div className='app'>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Routes>
                        <Route element={<Layout/>}>
                            <Route path='/' element={<Navigate to='/dashboard' replace/>}/>
                            <Route path='/dashboard' element={<Dashboard/>}/>
                            <Route path='/products' element={<Products/>}/>
                            <Route path='/customers' element={<Customers/>}/>
                            <Route path='/transactions' element={<Transactions/>}/>
                            <Route path='/geography' element={<Geography/>}/>
                            <Route path='/overview' element={<Overview/>}/>
                            <Route path='/daily' element={<Daily/>}/>
                            <Route path='/monthly' element={<Monthly/>}/>
                            <Route path='/breakdown' element={<Breakdown/>}/>
                        </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    )
}

export default Router
