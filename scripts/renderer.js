
posts.on_posts((e, posts) => {
    load_posts(posts);
})

function load_posts(posts) {
    const hento_container = document.getElementById("hento_container");
    posts.forEach(post => {
        var url
        if (post.tags.general.includes("young") && post.rating != "s") {
            url = post.file.url
        } else { 
            url = post.preview.url
        }
        const image = fabricateElement(`<div class="hento-div"><img class="hento_post" src=${url} alt=${post.id}></img><div class="hento-info-preview"><span class="fav-count">❤️${post.fav_count}</span> <span class="score-total">⬆️${post.score.total}</span> <span class="post-rating">${post.rating.toUpperCase()}</span></div></div>`)
        hento_container.appendChild(image);
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