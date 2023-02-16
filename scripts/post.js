
posts_mgmt.get_current_search().then((query) => {
    console.log(query)
    const image = fabricateElement(`<img class="post-image" src=${query.currentPost.file.url}></img>`)
    var container = document.getElementById("post")
    container.append(image);

});


function fabricateElement(html) {
    const element = document.createElement("template");
    element.innerHTML = html.trim();
    return element.content.firstElementChild;
}