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

        // Assign a category class for coloring
        const categoryClass = guest.category.toLowerCase(); // "family", "friend", "collegue"
        //Assign rsvpStatus and rsvpClass
        const rsvpStatus = guest.isAttending ? '👍 Attending' : '👎 Not Attending';
        const rsvpClass = guest.isAttending ? 'attending' : 'not-attending';
        
        //create a div for holding the guest entry {name, category, rsvpStatus} and toggle rsvp, edit and remove buttons
        entry.innerHTML = `<p> 
                            <strong>${index + 1}.</strong> ${guest.name}
                            <span class="category-label ${categoryClass}">${guest.category}</span>
                            <span class="rsvp-status ${rsvpClass}">${rsvpStatus}</span>
                        </p>
                        <button class="toggle-rsvp" data-index="${index}">Toggle RSVP</button>
                        <button class="edit-btn" data-index="${index}">Edit</button>
                        <button class="remove" data-index="${index}">Remove</button>
                        `
        displayBox.appendChild(entry);

    })
}
//add guest through the input box and submit button
let addGuest = document.querySelector('.btn-submit');
addGuest.addEventListener('click', function(e) {
    e.preventDefault();

    const nameInput = document.querySelector('.guest-txt');
    const name = nameInput.value;
    const radios = document.querySelectorAll('input[name=guest-type]');

    let category = '';

    radios.forEach(radio => {
        if (radio.checked) {
            category = radio.value; 
        }
    });

    if (!name || !category) {
        alert("Please enter a name and select a category!");
        return;
    }
    
    let guests = getGuests(); // retrieve before using

    //Limit the number of guests to 10
    if (guests.length >= 10) {
    alert('Guest limit reached (maximum 10).');
    return;
    }

    
    saveGuests(guests);
    renderGuests();

    // Prevent duplicate (same name and category)
    const isDuplicate = guests.some(g => g.name.toLowerCase() === name.toLowerCase() && g.category === category);
    if (isDuplicate) {
        alert('This guest and category already exist.');
        return;
    }

    //save the guest entry to locaStorage (saveGuests()) as an object array
    guests.push({ name, category, isAttending: false});
    saveGuests(guests);
    renderGuests();

    //  clear form fields after submission
    nameInput.value = '';
    radios.forEach(radio => radio.checked = false);
});

//delete guest by name
let deleteGuest = document.querySelector('.btn-delete-guest');
deleteGuest.addEventListener('click', function () {
    const input = document.querySelector('.guest-txt');
    const nameToDelete = input.value.toLowerCase();

    if (!nameToDelete) {
        alert('Please enter a guest name to delete.');
        return;
    }

    let guests = getGuests();
    const index = guests.findIndex(g => g.name.toLowerCase() === nameToDelete);

    if (index === -1) {
        alert(`No guest named "${input.value}" found.`);
        return;
    }

    guests.splice(index, 1);
    saveGuests(guests);
    renderGuests();
    input.value = ''; // Clear input
});

// Handle toggle rsvp, edit and remove using event delegation

let displayGuest = document.getElementById('display-box');
displayGuest.addEventListener('click', function (e) {
    const guests = getGuests();
    const index = e.target.getAttribute('data-index');

if (e.target.classList.contains('remove')) {
        if (index !== null && guests[index]) {
            guests.splice(index, 1);
            saveGuests(guests);
            renderGuests();
        }
    }

    if (e.target.classList.contains('edit-btn')) {
        const guest = guests[index];
        document.querySelector('.guest-txt').value = guest.name;

        // Check the correct radio (category) selection
        const radios = document.querySelectorAll('input[name="guest-type"]');
        radios.forEach(radio => {
            if (radio.value === guest.category) radio.checked = true;
        });

        // Remove original for update
        guests.splice(index, 1);
        saveGuests(guests);
        renderGuests();
    }

if (e.target.classList.contains('toggle-rsvp')) {
        guests[index].isAttending = !guests[index].isAttending;
        saveGuests(guests);
        renderGuests();
    }
});
// data held in localStorage rendered on page load
document.addEventListener('DOMContentLoaded', renderGuests);