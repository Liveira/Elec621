
posts.on_posts((e, posts) => {
    load_posts(posts);
})

function load_posts(posts) {
    const hento_container = document.getElementById("hento_container");
    posts.forEach(post => {
        if (post.tags.general.includes("young") && post.rating != "s") {
            const image = fabricateElement(`<img class="hento_post" src=${post.file.url} alt=${post.id}></img>`)
            hento_container.appendChild(image);
        } else { 
            const image = fabricateElement(`<img class="hento_post" src=${post.preview.url} alt=${post.id}></img>`)
            hento_container.appendChild(image);
        }
    });
}
var searchbar = document.getElementById("tag-input")
searchbar.addEventListener("keydown", (e, ev) => {
    var keycode = e.code || e.key;
    if (keycode == "Enter"){
        var container = document.getElementById("hento_container")
        Array.from(container.children).forEach((x) => x.remove())
        posts.input_send(searchbar.value)

    }
});

function fabricateElement(html) {
  const element = document.createElement("template");
  element.innerHTML = html.trim();
  return element.content.firstElementChild;
}