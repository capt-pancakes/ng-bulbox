"use strict";
const bulbox = {
  alert: _alert,
  modal: _modal,
  confirm: _confirm,
  dismiss: __killDialog
};

function _alert() {
  console.log("heya");
  __dialog();
}

function _modal() {
  console.log("Hey it's a modal");
}

function _confirm() {
  console.log("hey confirm");
}

function __dialog() {
  const parent = document.createElement("div");
  parent.className = "modal is-active";
  parent.id = "bulbox-diag-" + window.newId();

  const backdrop = document.createElement("div");
  backdrop.className = "modal-background animate__animated animate__fadeIn animate__faster";

  const content = document.createElement("div");
  content.className = "modal-card animate__animated animate__fadeInDown" ;

  // Card Header
  const contentHeader = document.createElement("div");
  contentHeader.className = "modal-card-head";

  const contentHeaderTitle = document.createElement("p");
  contentHeaderTitle.className = "modal-card-title";
  contentHeaderTitle.innerText = "Modal Title";

  const contentHeaderBtn = document.createElement("button");
  contentHeaderBtn.className = "delete";

  contentHeader.appendChild(contentHeaderTitle);
  contentHeader.appendChild(contentHeaderBtn);

  // Card Body
  const body = document.createElement("section");
  body.className = "modal-card-body";

  // Card Footer
  const footer = document.createElement("footer");
  footer.className = "modal-card-foot";

  const footerSaveBtn = document.createElement("button");
  footerSaveBtn.className = "button is-primary";
  footerSaveBtn.innerText = "Save Changes";

  const footerCancelBtn = document.createElement("button");
  footerCancelBtn.className = "button";
  footerCancelBtn.innerText = "Cancel";
  footerCancelBtn.setAttribute("onclick", `window.bulbox.dismiss('${parent.id}')`)
  footer.appendChild(footerSaveBtn);
  footer.appendChild(footerCancelBtn);

  // Build Content
  content.appendChild(contentHeader);
  content.appendChild(body);
  content.appendChild(footer);

  // Build Modal
  parent.appendChild(backdrop);
  parent.appendChild(content);

  document.body.append(parent);
}

function __killDialog(id) {
  const el = document.querySelector('#' + id);
  el.lastElementChild.className = "modal-card animate__animated animate__fadeOutUp animate__faster	";
  setTimeout(() => {
    el.parentNode.removeChild(el);
  }, 400);
//   bulmabox.params = bulmabox.params.filter((q) => q.id != id);
}

window["bulbox"] = bulbox;
window["newId"] = function () {
  return "xxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
