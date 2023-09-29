
posts_mgmt.get_current_search().then((query) => {
    console.log(query)

    let image;

    switch (query.currentPost.file.ext) {
        case "swf":
            image = fabricateElement(`<object type="application/x-shockwave-flash" class="post-image" data="${query.currentPost.file.url}">`)
            break;
    
        default:
            image = fabricateElement(`<img class="post-image" src=${query.currentPost.file.url}></img>`)
            break;
    }

    var container = document.getElementById("post")
    container.append(image);

});


function fabricateElement(html) {
    const element = document.createElement("template");
    element.innerHTML = html.trim();
    return element.content.firstElementChild;
}