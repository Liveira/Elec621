const style_link = fabricateElement(
  '<link rel="stylesheet" href="styles/shell.css">'
);
const shell_overlay = fabricateElement(
  '<div class="shell_overlay shell_overlay_hidden"></div>'
);

document.head.appendChild(style_link);
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
  createIframe(src) {
    const iframe = fabricateElement(
      `<iframe class="shell_iframe" src="${src}"></iframe>`
    );
    iframe.addEventListener("load", () => {
      console.log("iframe loaded");
    });
    return iframe;
  }
  modal_iframe(src) {
    this.createContainer();
    this.show_modal();
    this.container.appendChild(this.createIframe(src));
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
modal.modal_iframe("pages/relogio.html");

function fabricateElement(html) {
  const element = document.createElement("template");
  element.innerHTML = html.trim();
  return element.content.firstElementChild;
}
