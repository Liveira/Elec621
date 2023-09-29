import { contextBridge, ipcRenderer } from "electron";
import { Post } from "e621";


contextBridge.exposeInMainWorld("posts_mgmt", {
  on_posts: (callback: any) => { return ipcRenderer.on("posts_update", callback); },
  input_send: (input: string) => {
      return ipcRenderer.invoke("search_reload", input);
  },
  post_clicked: (post: Post) => {
      return ipcRenderer.invoke("post_clicked", post);
  },
  get_current_search: () => {
      return ipcRenderer.invoke("get_current_search");
  }
});
contextBridge.exposeInMainWorld("pages", {
  posts_page: (id: number) => { ipcRenderer.invoke("posts_page", id); }
});
contextBridge.exposeInMainWorld("negus", {
  cum: () => console.log("sussy baka")
});
