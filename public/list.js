const video = document.querySelector('video')

const prevButton = document.querySelector('#prev')
const nextButton = document.querySelector('#next')

function play(button) {
  const active = document.querySelector('[aria-current=page]')
  if (active) active.removeAttribute('aria-current')
  button.setAttribute('aria-current', 'page')

  const { href, prevId, nextId } = button.dataset

  video.src = href
  video.play()

  prevButton.dataset.prevId = prevId
  if (prevId) {
    prevButton.removeAttribute('disabled')
  } else {
    prevButton.setAttribute('disabled', 'disabled')
  }
  nextButton.dataset.nextId = nextId
  if (nextId) {
    nextButton.removeAttribute('disabled')
  } else {
    nextButton.setAttribute('disabled', 'disabled')
  }
}

prevButton.addEventListener('click', () => {
  const { prevId } = prevButton.dataset
  console.log(prevId)
  const button = document.querySelector(`[data-id="${prevId}"]`)
  console.log(button)
  if (button) {
    play(button)
  }
})

nextButton.addEventListener('click', () => {
  const { nextId } = nextButton.dataset
  console.log(nextId)
  const button = document.querySelector(`[data-id="${nextId}"]`)
  console.log(button)
  if (button) {
    play(button)
  }
})

document.querySelector('#delete').addEventListener('click', () => {
  const xhr = new XMLHttpRequest()
  xhr.open('delete', '/records')
  xhr.onload = () => {
    window.location.reload()
  }
  xhr.send()
})

document.querySelectorAll('.play').forEach((button) => {
  button.addEventListener('click', () => {
    play(button)
  })
})

document.querySelectorAll('.delete').forEach((button) => {
  button.addEventListener('click', () => {
    const { href } = button.dataset
    const xhr = new XMLHttpRequest()
    xhr.open('delete', href)
    xhr.onload = () => {
      window.location.reload()
    }
    xhr.send()
  })
})

document.querySelectorAll('.collapse').forEach((button) => {
  button.addEventListener('click', () => {
    const { id } = button.dataset

    const collapsed = button.classList.contains('collapsed')
    if (collapsed) {
      button.classList.remove('collapsed')
    } else {
      button.classList.add('collapsed')
    }

    const children = document.querySelectorAll(`[data-parent-id="${id}"]`)
    for (const child of children) {
      if (collapsed) {
        child.classList.remove('collapsed')
      } else {
        child.classList.add('collapsed')
      }
    }
  })
})
