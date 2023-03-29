import { createAction, createSlice } from "@reduxjs/toolkit";
import { lStorage } from "../host/lstorage";

export const ThemeValues = <const>["light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
    "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi",
    "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business",
    "acid", "lemonade", "night", "coffee", "winter"];
export type Theme = typeof ThemeValues[number];

export type Frame = "none" | "account" | "settings" |
    "editor-conf" | "editor-fs" | "network" |
    "stats" | "host-cache" | "quick-save";

const initialState: {
    modal: "none" | "login",
    frame: Frame,
    frameXs: boolean,
    window: "none" | "error" | "loading" | "prerun" | "run" | "select",
    theme: Theme,
    editor: boolean,
    wideScreen: boolean,
    fullScreen: boolean,
} = {
    modal: "none",
    frame: "none",
    frameXs: false,
    window: "none",
    theme: (lStorage.getItem("theme") ?? "dark") as Theme,
    editor: false,
    wideScreen: true,
    fullScreen: false,
};

export const uiSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        theme: (state, a: { payload: Theme }) => {
            lStorage.setItem("theme", a.payload);
            state.theme = a.payload;
        },
        modalLogin: (state) => {
            state.modal = "login";
        },
        modalNone: (state) => {
            state.modal = "none";
        },
        frameNone: (state) => {
            state.frame = "none";
            state.frameXs = false;
        },
        frameAccount: (state) => {
            toggleFrameIfNeeded(state, "account");
            state.frameXs = false;
        },
        frameSettings: (state) => {
            state.frame = "settings";
            state.frameXs = false;
        },
        frameNetwork: (state) => {
            state.frame = "network";
            state.frameXs = false;
        },
        frameStats: (state) => {
            state.frame = "stats";
            state.frameXs = false;
        },
        frameConf: (state) => {
            state.frame = "editor-conf";
            state.frameXs = false;
        },
        frameFs: (state) => {
            state.frame = "editor-fs";
            state.frameXs = false;
        },
        frameHostCache: (state) => {
            state.frame = "host-cache";
            state.frameXs = false;
        },
        frameQuickSave: (state) => {
            state.frame = "quick-save";
            state.frameXs = true;
        },
        windowSelect: (state) => {
            state.window = "select";
        },
        setEditor: (state, a: { payload: boolean }) => {
            state.editor = a.payload;
        },
        setWideScreen: (state, a: { payload: boolean }) => {
            state.wideScreen = a.payload;
        },
        setFullScreen: (state, a: { payload: boolean }) => {
            state.fullScreen = a.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAction<string>("dos/bndLoad"), (s, a) => {
                s.window = "loading";
            })
            .addCase(createAction<string>("editor/extract"), (s, a) => {
                s.window = "loading";
            })
            .addCase(createAction<string>("editor/ready"), (s, a) => {
                s.window = "prerun";
            })
            .addCase(createAction<string>("dos/bndReady"), (s, a) => {
                s.window = "prerun";
            })
            .addCase(createAction<string>("dos/bndPlay"), (s, a) => {
                s.window = "run";
                s.frame = "none";
            })
            .addMatcher((action: { type: string }) => {
                return action.type.startsWith("dos/") &&
                    action.type.endsWith("Error");
            }, (s, a) => {
                s.window = "error";
            });
    },
});

function toggleFrameIfNeeded(
    state: typeof initialState,
    newFrame: typeof initialState.frame) {
    if (state.frame === newFrame) {
        state.frame = "none";
    } else {
        state.frame = newFrame;
    }
}
