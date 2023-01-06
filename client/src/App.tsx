import {CssBaseline, PaletteMode, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {themeSettings} from "./theme";
import {useSelector} from "react-redux";
import {useMemo} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Dashboard} from "./scenes/Dashboard";
import {Layout} from "./scenes/Layout";

interface GlobalState {
    global: {
        mode: string;
    }
}

function App() {
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
                        </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    )
}

export default App
