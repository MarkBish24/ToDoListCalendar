const calendarBoxes = document.querySelectorAll('.calendar-box')
const monthHeader = document.querySelector('.month-header')
const rightButton = document.querySelector('#right-arrow')
const leftButton = document.querySelector('#left-arrow')
const inputBox = document.querySelector('.input-box')
const noteSubmitButton = document.querySelector('.input-button')
const inputTextBoxes = document.querySelectorAll('.input-text')
const dateTitle = document.querySelector('.date-title')


let date = new Date()
let currentDate = date
let date_data

fetch('../data/data.json').then(response => response.json())
.then(data => {
    date_data = data
    changeMonth(currentDate)

})


function changeMonth(date){
    let month = date.toLocaleString('en-US', { month: 'long' });
    let year = date.getFullYear();

    let firstDay = new Date(year, date.getMonth(), 0).getDay();
    let totalDays = new Date(year, date.getMonth() + 1, 0).getDate();

    console.log(firstDay, totalDays)

    monthHeader.textContent = `${month} ${year}`;

    calendarBoxes.forEach(box =>{
        box.textContent = ''
        box.classList.remove('is-a-day')
    })

    for (let i = 0; i < totalDays; i++){
        boxIndex = i + firstDay;
        if (calendarBoxes[boxIndex]) {
            calendarBoxes[boxIndex].classList.add('is-a-day'); // Apply the class

            //Creates a text element for the Day
            let textElement = document.createElement('div');
            textElement.textContent = i + 1;
            textElement.classList.add('day-number')
            calendarBoxes[boxIndex].appendChild(textElement)

            //Creates a Button to create an element
            let boxButton = document.createElement('button');
            boxButton.textContent = '+'
            boxButton.classList.add('day-button')
            let selectedDate = new Date(year, date.getMonth(), i + 1);
            boxButton.addEventListener('click', () => {
                showInputBox(selectedDate); // FIXED: Pass the exact date
            });
            calendarBoxes[boxIndex].appendChild(boxButton)
            //Add a notes container to hold all the notes
            let notesContainer = document.createElement('div');
            notesContainer.classList.add('notes-container');
            calendarBoxes[boxIndex].appendChild(notesContainer)

            addNoteToCalendar(selectedDate, calendarBoxes[boxIndex])
        }
    }
}

function addNoteToCalendar(temp_date, calendarBox){
    const date = new Date(temp_date);
    const dateKey = date.toISOString().split('T')[0];
    if (dateKey in date_data){
        for (let note of date_data[dateKey]){
            let noteElement = createNote(note)
            calendarBox.querySelector('.notes-container').appendChild(noteElement)
        }
    }
    else{
        return
    }
}

function createNote(note){
    let noteElement = document.createElement("div")
    noteElement.classList.add('note-box')
    noteElement.textContent = note.title
    return noteElement
}

noteSubmitButton.addEventListener('click', () =>{
    for (const textBox of inputTextBoxes){
        if(!textBox.value.trim()){
            return;
        }
    }
    let dateTitle = document.querySelector('date-title').textContent;
    let dateTime = document.querySelector('date-time').textContent;
    let dateDescription = document.querySelector('date-description').textContent;
})

function showInputBox(newNoteDate){
    inputBox.classList.toggle('show');
    dateTitle.textContent = newNoteDate.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
}

rightButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1)
    changeMonth(currentDate)
})

leftButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1)
    changeMonth(currentDate)
})