import {CssBaseline, PaletteMode, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {themeSettings} from "./theme";
import {useSelector} from "react-redux";
import {useMemo} from "react";

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
            <ThemeProvider theme={theme}>
                <CssBaseline/>
            </ThemeProvider>

        </div>
    )
}

export default App
