import { ipcMain, app, BrowserWindow } from "electron";
import * as path from "path";
import E621 from "e621";
import { Post } from "e621";

const e621 = new E621();

let window: BrowserWindow;

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    })
  
  win.loadFile('index.html');
  //win.removeMenu();

  window = win;
}
app.whenReady().then(() => {
    createWindow()
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

function posts_update(posts: Post[]) {
  window.webContents.send("posts_update", posts);
}

e621.posts.search({ tags: "sylveon kemono rating:s -female -breasts", limit: 300, page: 1 }).then((posts) => {
  posts_update(posts);
})