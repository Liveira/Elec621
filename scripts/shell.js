let shell_root = document.currentScript.src.replace("/scripts/shell.js", "");

const style_link = fabricateElement(
  `<link rel="stylesheet", href="${shell_root}/styles/shell.css">`
);
const shell_overlay = fabricateElement(
  '<div class="shell_overlay shell_overlay_hidden"></div>'
);

document.head.append(style_link);
document.body.prepend(shell_overlay);

class Modal {
  container;
  closeable;
  constructor(closeable = true) {
    this.createContainer();
    this.closeable = closeable;
    shell_overlay.addEventListener("click", () => {
      this.close_modal_or();
    });
  }
  createContainer() {
    const container = fabricateElement(
      '<div class="shell_modal_container"></div>'
    );
    shell_overlay.appendChild(container);
    this.container = container;
    return container;
  }
  createWebview(src, preload = null) {
    const webview = fabricateElement(
      preload === null
        ? `<webview src="${src}"></webview>`
        : `<webview src="${src}" preload="${preload}">`
    );
    webview.onload = () => {
      console.log("webview loaded");
    };
    return webview;
  }
  add_Button(text, callback) {
    const button = fabricateElement(`<p class="shell_button">${text}</p>`);
    button.addEventListener("click", callback);

    const button_containers = document.getElementsByClassName("shell_button_container");
    if (button_containers.length > 0) {
      button_containers[0].appendChild(button);
    }
    else {
      const button_container = fabricateElement('<div class="shell_button_container"></div>');
      button_container.appendChild(button);
      this.add_html(button_container);
    }
  }
  add_html(node) {
    this.container.appendChild(node);
  }
  add_iframe(src, preload) {
    this.container.appendChild(
      this.createWebview(src, preload)
    );
  }
  show_modal() {
    shell_overlay.classList.remove("shell_overlay_hidden");
    this.container.classList.add("shell_modal_anim");
    shell_overlay.classList.add("shell_overlay_anim");
  }
  close_modal_or() {
    if (!this.closeable) return;
    this.close_modal();
  }
  close_modal() {
    shell_overlay.classList.add("shell_overlay_hidden");
    this.container.classList.remove("shell_modal_anim");
    shell_overlay.classList.add("shell_overlay_anim");
  }
  destroy() {
    const modals = Array.from(document.getElementsByClassName("shell_modal_container"));
    modals.forEach(modal => {
      modal.remove();
    });
  }
}

//AQUI ANTONEO GOZTAVOOOOOOOOOOO
const modal = new Modal(false);
modal.add_iframe("./pages/blacklist.html", "./pages/preloads/blacklist.js");
modal.show_modal();

function fabricateElement(html) {
  const element = document.createElement("template");
  element.innerHTML = html.trim();
  return element.content.firstElementChild;
}
