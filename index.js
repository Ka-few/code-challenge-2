// This function will enable the application to get guest data from localStorage
function getGuests() {
    return JSON.parse(localStorage.getItem('guests') || '[]');
}

// This function will enable the application to save guest data from localStorage
function saveGuests(guests) {
    localStorage.setItem('guests', JSON.stringify(guests));
}

//This function renders the guest data on the output container which is the display-box
const renderGuests = ()=> {
    let displayBox = document.getElementById('display-box');
    displayBox.innerHTML = '';
    let guests = getGuests();
    guests.forEach((guest, index) =>{
        let entry = document.createElement('div');
        entry.classList.add('guest-entry');

        const categoryClass = guest.category.toLowerCase();

        entry.innerHTML = `<p> ${guest.name} ${guest.category}</p>`
        displayBox.appendChild(entry);

    })
}

let addGuest = document.querySelector('.btn-submit');
addGuest.addEventListener('click', function(e) {
    e.preventDefault();

    let nameInput = document.querySelector('.guest-txt');
    let name = nameInput.value.trim(); // trim to remove whitespace

    let radios = document.querySelectorAll('input[name=guest-type]');
    let category = '';

    radios.forEach(radio => {
        if (radio.checked) {
            category = radio.value; // safer and cleaner
        }
    });

    if (!name || !category) {
        alert("Please enter a name and select a category!");
        return;
    }

    let guests = getGuests(); // retrieve before using
    guests.push({ name, category });
    saveGuests(guests);
    renderGuests();

    // Optional: clear form fields after submission
    nameInput.value = '';
    radios.forEach(r => r.checked = false);
});


// here the data held in localStorage rendered on page load
document.addEventListener('DOMContentLoaded', renderGuests);