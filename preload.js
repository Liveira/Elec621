"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("posts", {
    on_posts: (callback) => { electron_1.ipcRenderer.on("posts_update", callback); }
});
