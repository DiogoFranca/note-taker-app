const textarea = document.querySelector('#note')
const myNotes = document.querySelector('#notes')
const container = document.querySelector('.container')
let counter = 1
let textModal

document.addEventListener('click', e => {
  const el = e.target

  if (el.classList.contains('btn-modal')) {
    console.log('funcionando...');
    showTheEntireText(textModal);

    const divModal = document.querySelector('.div-modal');
    const divModalContent = document.querySelector('.div-modal-content');

    divModal.style.display = 'flex';
    divModalContent.style.display = 'inline'
    document.body.style.overflow =  'hidden';

  }

  if (el.classList.contains('content-span')) {
    const divModalContent = document.querySelector('.div-modal-content').parentNode.remove();
    document.body.style.overflow =  'auto';
    console.log(divModalContent);
  }

  if (!textarea.value) return

  if (el.classList.contains('btn-add')) {
    const noteTaker = criaNoteTaker(textarea.value);

    if (counter === 1) {
      noteTaker.removeMessageDefault()
    }
    textModal = noteTaker.addElementOnScreen()
    // cleanInput()
  }
})

function cleanInput() {
  textarea.value = ''
}

const newDiv = {
  createDiv() {
    const div = document.createElement('div')
    return div
  }
}

const newH1 = {
  createH1() {
    const h1 = document.createElement('h1')
    return h1
  }
}

const newP = {
  createP() {
    const p = document.createElement('p')
    return p
  }
}

const newButton = {
  createButton() {
    const button = document.createElement('button')
    return button
  }
}

const removeMessage = {
  removeMessageDefault() {
    myNotes.innerText = ''
  }
}

const addElement = {
  addElementOnScreen() {
    const div = newDiv.createDiv()
    const h1 = newH1.createH1()
    const p = newP.createP()
    const button = newButton.createButton()

    const textModal = this.textNote
    const text =
      this.textNote.length >= 88
        ? this.textNote.substr(0, 88) + '...'
        : this.textNote

    h1.innerText = `Note ${counter}`

    p.innerText = text
    p.setAttribute('id', 'modal-text')

    button.innerText = 'View Detail'
    button.setAttribute('class', 'btn-modal')

    h1.setAttribute('id', 'title-div')
    div.setAttribute('id', 'div-notes')

    div.appendChild(h1)
    div.appendChild(p)
    div.appendChild(button)

    myNotes.appendChild(div)
    counter++
    return textModal
  }
}

function createSpan() {
  const span = document.createElement('span')
  return span
}

function showTheEntireText(textNote) {
  const divModal = newDiv.createDiv()
  const divModalContent = newDiv.createDiv()
  const span = createSpan()
  const p = newP.createP()

  p.innerText = '';
  span.innerText = 'X'
  span.setAttribute('class', 'content-span')
  p.innerText = textNote
  divModal.setAttribute('class', 'div-modal')

  divModalContent.setAttribute('class', 'div-modal-content')
  divModalContent.appendChild(span)
  divModalContent.appendChild(p)
  divModal.appendChild(divModalContent)
  document.body.appendChild(divModal)
 
}

const noteTakerPrototype = Object.assign(
  {},
  newDiv,
  newH1,
  newP,
  newButton,
  addElement,
  removeMessage,
  cleanInput
)

function criaNoteTaker(textareaValue) {
  return Object.create(noteTakerPrototype, {
    textNote: { value: textareaValue }
  })
}
