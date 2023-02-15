import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("posts", {
  on_posts: (callback: any) => {ipcRenderer.on("posts_update", callback)},
  input_send: (input: string) => ipcRenderer.invoke("search_reload", input)
})