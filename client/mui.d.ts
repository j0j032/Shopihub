import "@mui/material/styles/createPalette";
import {Palette, PaletteColor, PaletteColorOptions} from "@mui/material";

declare module "@mui/material/styles/createPalette" {
    interface Palette {
        neutral: PaletteColorOptions | PaletteColor;
    }
}

type PaletteKey = keyof Palette
export type PaletteColorKey = keyof Palette[PaletteKey]
