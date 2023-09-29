
posts_mgmt.on_posts((e, posts) => {
    load_posts(posts);
})

function load_posts(posts) {
    const hento_container = document.getElementById("hento_container");
    posts.forEach(post => {
        var url
        if (!((post.tags.general.includes("young") && post.rating != "s") || post.tags.general.includes("loli") || post.tags.general.includes("shota"))) {
        url = post.preview.url
        const image = fabricateElement(`<div class="hento-div"><a href="./pages/post.html"><img class="hento_post" src=${url} alt=${post.id}></img></a><div class="hento-info-preview"><span class="fav-count">❤️${post.fav_count}</span> <span class="score-total">⬆️${post.score.total}</span> <span class="post-rating" nonce="rAnd0m" style="color: ${post.rating == "s" ? "#58DF5A" : post.rating == "e" ? "#D54010" : "#F3E211"}">${post.rating.toUpperCase()}</span></div></div>`)
        image.addEventListener("click", () => { posts_mgmt.post_clicked(post) });
        hento_container.appendChild(image)
    }
});
}
var searchbar = document.getElementById("tag-input")
posts_mgmt.input_send(searchbar.value == "" ? "sylveon hyper_penis rating:e" : searchbar.value)
searchbar.addEventListener("keydown", (e, ev) => {
    var keycode = e.code || e.key;
    if (keycode == "Enter") {
        var container = document.getElementById("hento_container")
        Array.from(container.children).forEach((x) => x.remove())
        posts_mgmt.input_send(searchbar.value)
    }
});

function fabricateElement(html) {
    const element = document.createElement("template");
    element.innerHTML = html.trim();
    return element.content.firstElementChild;
}
