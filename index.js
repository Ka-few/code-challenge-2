let addGuest = document.querySelector('.btn-submit');
addGuest.addEventListener('click', function(e){
    e.preventDefault();
    let nameInput = document.querySelector('.guest-txt');
    let name = nameInput.value;
    let radios = document.querySelectorAll('input[name=guest-type]');
    let output = document.querySelector('.dis-output');

    let category = '';
    radios.forEach(radio=> {
        if (radio.checked) {
            category = radio.nextSibling.textContent;
        }
    });

    if (!name || !category) {
        alert("Please enter a name and select a category!");
        return;
    }
    output.textContent = name + category;
})