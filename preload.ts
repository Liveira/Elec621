import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("posts", {
  on_posts: (callback: any) => {ipcRenderer.on("posts_update", callback)}
})