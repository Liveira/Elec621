const shell_root = document.currentScript.src;

const root = location.href.split(shell_root).join("");

//const cum = document.location.replace(shell_root.replace());
const style_link = fabricateElement(
  '<link rel="stylesheet" href="/styles/shell.css">'
);
const shell_overlay = fabricateElement(
  '<div class="shell_overlay shell_overlay_hidden"></div>'
);

document.head.append(rootFix, style_link);
document.body.prepend(shell_overlay);

class Modal {
  constructor() {
    shell_overlay.addEventListener("click", () => {
      this.close_modal();
    });
  }
  container;
  createContainer() {
    const container = fabricateElement(
      '<div class="shell_modal_container"></div>'
    );
    shell_overlay.appendChild(container);
    this.container = container;
    return container;
  }
  createIframe(src, iframe_width, iframe_height) {
    const iframe = fabricateElement(
      `<iframe class="shell_iframe" src="${src}" width="${iframe_width}" height="${iframe_height}"></iframe>`
    );
    iframe.addEventListener("load", () => {
      console.log("iframe loaded");
    });
    return iframe;
  }
  modal_iframe(src, iframe_width = "80%", iframe_height = "80%") {
    this.createContainer();
    this.show_modal();
    this.container.appendChild(
      this.createIframe(src, iframe_width, iframe_height)
    );
  }
  show_modal() {
    shell_overlay.classList.remove("shell_overlay_hidden");
    this.container.classList.add("shell_modal_anim");
    shell_overlay.classList.add("shell_overlay_anim");
  }
  close_modal() {
    shell_overlay.classList.add("shell_overlay_hidden");
    this.container.classList.remove("shell_modal_anim");
    shell_overlay.classList.add("shell_overlay_anim");
  }
}

const modal = new Modal();
modal.modal_iframe("pages/relogio.html", "100%", "100%");

function fabricateElement(html) {
  const element = document.createElement("template");
  element.innerHTML = html.trim();
  return element.content.firstElementChild;
}
