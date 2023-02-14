posts.on_posts((e, posts) => {
    load_posts(posts);
})

function load_posts(posts) {
    const hento_container = document.getElementById("hento_container");
    posts.forEach(post => {
        const container = fabricateElement(`<div><>`)
        const image = fabricateElement(`<img class="hento_post" src=${post.preview.url} alt=${post.id}></img>`)
        hento_container.appendChild(image);
    });
}

function fabricateElement(html) {
  const element = document.createElement("template");
  element.innerHTML = html.trim();
  return element.content.firstElementChild;
}