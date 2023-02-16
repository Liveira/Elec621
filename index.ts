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
      icon:'icons/Elec621_logo.png'
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

let currentPage = 1;


//@ts-ignore
let query: Query = { search: undefined, page: undefined, posts: undefined, currentPost: undefined };

ipcMain.handle("search_reload", (e, tags) => {
    query.search = tags;
    query.page = currentPage;
    e621.posts.search({ tags: tags, limit: 75, page: currentPage }).then((posts) => {
        posts_update(posts);
        query.posts = posts;
    });
});
ipcMain.handle("get_current_search", (e) => {
    return query;
});
ipcMain.handle("post_clicked", (e, post) => { 

  query.currentPost = post;
    window.loadFile("./pages/post.html");
});

type Query = {
  search: string,
  page: number,
  posts: Post[],
  currentPost: Post;
}