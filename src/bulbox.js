/* AUTHOR: capt-pancakes */
'use strict'
const bulbox = {
  alert: _alert,
  dialog: _dialog,
  confirm: _confirm,
  dismiss: __killDialog,
  options: {
    title: undefined,
    body: undefined,
    buttons: {
      confirm: {
        text: 'Okay',
        color: 'is-primary',
        cb: undefined
      },
      dismiss: undefined
    },
    size: 'lg',
    bodyIsHtml: false,
    animation: 'appear'    
  },
  getAnimation: function(){
    var animIn = "";
    var animOut = "";
  
    switch (this.options.animation) {
      case 'appear':
        animIn = 'appear';
        animOut = 'disappear';
        break;
      case 'zoom':
        animIn = 'zoomIn';
        animOut = 'zoomOut';
        break;
      case 'flip':
        animIn = 'flipInY';
        animOut = 'flipOutY';
        break;
      default:
        animIn = 'appear';
        animOut = 'disappear';
        break;
    }
    return {in: animIn, out: animOut};
  }
}

/*
 Each method expects an object that contains a Title, Body, Okay text, Cancel text, and Okay callback and Cancel callback
*/

function _alert(obj) {
  if (!obj) var obj = {}

  if (!obj.title) obj.title = 'Alert!'

  __buildDialog(obj)
}

function _dialog(obj) {
  if (obj.bodyIsHtml === undefined) obj.bodyIsHtml = true
  __buildCustomDialog(obj)
}

function _confirm(obj) {
  if (obj && !obj.title) obj.title = 'Please Confirm'
  __buildDialog(obj)
}

function __buildDialog({ title, body, buttons, callback, size, bodyIsHtml}) {
  var animData = window.bulbox.getAnimation();
  const parent = document.createElement('div')
  parent.className = 'modal is-active'
  parent.id = 'bulbox-diag-' + __newId()

  const backdrop = document.createElement('div')
  backdrop.className = 'modal-background ' + animData.in;

  const content = document.createElement('div')
  if (size === 'sm') content.style = 'width: 400px'
  content.className = 'modal-card ' + animData.in;

  // Card Header
  const contentHeader = document.createElement('div')
  contentHeader.className = 'modal-card-head'

  const contentHeaderTitle = document.createElement('p')
  contentHeaderTitle.className = 'modal-card-title'
  contentHeaderTitle.innerText = title

  const contentHeaderBtn = document.createElement('button')
  contentHeaderBtn.className = 'delete'
  contentHeaderBtn.setAttribute(
    'onclick',
    `window.bulbox.dismiss('${parent.id}')`
  )

  contentHeader.appendChild(contentHeaderTitle)
  contentHeader.appendChild(contentHeaderBtn)

  // Card Body
  const bodyEl = document.createElement('section')
  if (body) {
    bodyEl.className = 'modal-card-body'
    if (bodyIsHtml) {
      console.log('body is', body)
      bodyEl.innerHTML = body[0].innerHTML
    } else {
      bodyEl.innerText = body
    }
  }

  // Card Footer
  const footer = document.createElement('footer')
  footer.className = 'modal-card-foot justify-space-between'
  if (buttons) {
    if (buttons.dismiss) {
      const footerCancelBtn = document.createElement('button')
      footerCancelBtn.className = 'button ' + buttons.dismiss.color
      footerCancelBtn.innerText = buttons.dismiss.text
      footerCancelBtn.addEventListener('click', (el, event) => {
        window.bulbox.dismiss(parent.id)
        callback(false)
      })
      footer.appendChild(footerCancelBtn)
    }

    if (buttons.confirm) {
      const footerSaveBtn = document.createElement('button')
      let localClasses = 'button ' + buttons.confirm.color
      if (!buttons.dismiss) localClasses += ' is-fullwidth'
      footerSaveBtn.style = 'margin-left: auto'
      footerSaveBtn.className = localClasses
      footerSaveBtn.innerText = buttons.confirm.text
      footerSaveBtn.addEventListener('click', (el, event) => {
        window.bulbox.dismiss(parent.id)
        callback(true)
      })
      footer.appendChild(footerSaveBtn)
    }
  }

  // Build Content
  content.appendChild(contentHeader)
  content.appendChild(bodyEl)
  content.appendChild(footer)

  // Build Modal
  parent.appendChild(backdrop)
  parent.appendChild(content)

  document.body.append(parent)
}

function __buildCustomDialog({ body, size, title, buttons, callback}) {
  var animData = window.bulbox.getAnimation();

  const parent = document.createElement('div')
  parent.className = 'modal is-active'
  parent.id = 'bulbox-diag-' + __newId()

  const backdrop = document.createElement('div')
  backdrop.className = 'modal-background ' + animData.in;

  const content = document.createElement('div')
  if (size) {
    if (size === 'sm') content.style = 'width: 400px'
  }

  content.className = 'modal-card ' + animData.in;

  // Card Header
  const contentHeader = document.createElement('div')
  contentHeader.className = 'modal-card-head'

  const contentHeaderTitle = document.createElement('p')
  contentHeaderTitle.className = 'modal-card-title is-size-5'
  contentHeaderTitle.innerText = title

  const contentHeaderBtn = document.createElement('button')
  contentHeaderBtn.className = 'delete'
  contentHeaderBtn.setAttribute(
    'onclick',
    `window.bulbox.dismiss('${parent.id}')`
  )

  contentHeader.appendChild(contentHeaderTitle)
  contentHeader.appendChild(contentHeaderBtn)

  content.innerHTML = body[0].innerHTML
  content.prepend(contentHeader)

  if (buttons) {
    // Card Footer
    const footer = document.createElement('footer')
    footer.className = 'modal-card-foot justify-space-between'
    if (buttons) {
      if (buttons.dismiss) {
        const footerCancelBtn = document.createElement('button')
        footerCancelBtn.className = 'button ' + buttons.dismiss.color
        footerCancelBtn.innerText = buttons.dismiss.text
        footerCancelBtn.addEventListener('click', (el, event) => {
          window.bulbox.dismiss(parent.id)
          if (callback) callback(false)
        })
        footer.appendChild(footerCancelBtn)
      }

      if (buttons.confirm) {
        const footerSaveBtn = document.createElement('button')
        let localClasses = 'button ' + buttons.confirm.color
        if (!buttons.dismiss && (buttons.confirm.size && buttons.confirm.size !== 'sm')) localClasses += ' is-fullwidth'
        footerSaveBtn.style = 'margin-left: auto'
        footerSaveBtn.className = localClasses
        footerSaveBtn.innerText = buttons.confirm.text
        footerSaveBtn.addEventListener('click', (el, event) => {
          window.bulbox.dismiss(parent.id)
          if (callback) callback(true)
        })
        footer.appendChild(footerSaveBtn)
      }
    }
    content.appendChild(footer)
  } else {
    //   content.querySelector('footer').querySelector()
  }

  parent.appendChild(backdrop)
  parent.appendChild(content)
  document.body.append(parent)
}

function __killDialog(id) {
  var animData = window.bulbox.getAnimation();

  const el = document.querySelector('#' + id)
  el.firstElementChild.className = 'modal-background ' + animData.out;
  el.lastElementChild.className = 'modal-card ' + animData.out;

  setTimeout(() => {
    el.parentNode.removeChild(el)
    bulbox.options = {
      title: undefined,
      body: undefined,
      buttons: {
        confirm: {
          text: 'Okay',
          color: 'is-primary',
          cb: undefined
        },
        dismiss: undefined
      },
      size: 'lg',
      bodyIsHtml: false,
      animation: 'appear'
    }
  }, 400)
  //   bulmabox.params = bulmabox.params.filter((q) => q.id != id);
}

window['bulbox'] = bulbox
function __newId() {
  return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
