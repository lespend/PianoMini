'use strict'

function showTalesOnDisplay() {
    let displayAllTales = document.querySelectorAll('.piano-display__tale')
    displayAllTales.forEach((elem) => {
        elem.style.opacity = 0.15
    })
    let displayRows = document.querySelectorAll('.piano-display__row')
    for (let i = 0; i < lastNumbersOfNotes.length; i++) {
        let numberOfNote = lastNumbersOfNotes[i]
        if (numberOfNote == -1) {
            continue
        }
        let displayTales = displayRows[numberOfNote].querySelectorAll('.piano-display__tale')
        displayTales[i].style.opacity = 1
    }
}

function addNoteInDisplay(numberOfNote) {
    lastNumbersOfNotes.pop()
    lastNumbersOfNotes.unshift(numberOfNote)
}

function playTune(key, volume) {
    let audio = new Audio('audio/q.wav')
    audio.volume = volume
    audio.src = `audio/${key}.wav`
    audio.play()

    const clickedKey = document.querySelector(`[data-key="${key}"]`)
    clickedKey.style.opacity = 0.6
    setTimeout(() => {
    clickedKey.style.opacity = 1
    }, 200)
}

let lastNumbersOfNotes = [-1, -1, -1, -1, -1, -1, -1]
let allowedKeys = ['q', 'w', 'e', 'r', 't', 'y', 'u']
let volume = 1
showTalesOnDisplay()

document.querySelectorAll('.piano-keys__key').forEach((key, index) => {
    key.addEventListener('click', () => {
        addNoteInDisplay(index)
        showTalesOnDisplay()
        playTune(key.dataset.key, volume)
    })
})

document.addEventListener('keydown', (el) => {
    let index = allowedKeys.indexOf(el.key)
    if (index != -1) {
        addNoteInDisplay(index)
        showTalesOnDisplay()
    }
    playTune(el.key, volume)
})

document.querySelector('.piano-column__range').addEventListener('input', function() {
    volume = this.value
    let columnDots = document.querySelector('.piano-column__dots')
    columnDots.style.width = `${60 + volume * 100}px`
    columnDots.style.height = `${60 + volume * 100}px`
})

