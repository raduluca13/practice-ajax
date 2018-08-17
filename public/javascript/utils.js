/**
 *
 * @param {{name: string, type: string, created: number}} param0
 */
function createPetCard({ name, type, id, created }, isEditable = false) {
    let card = document.createElement('div');
    card.classList.add('pet', `pet--${type}`);
    card.setAttribute('id', id);

    let img = document.createElement('img');
    img.width = 64;
    img.src = `public/images/${type}.jpg`;
    img.alt = `${type} image`;

    let nameEl = document.createElement('h1');
    nameEl.contentEditable = isEditable;
    nameEl.innerText = name;

    let ageEl = document.createElement('p');
    let days = document.createElement('span');
    days.contentEditable = isEditable;
    days.innerText = getAge(created);

    ageEl.classList.add('age');
    ageEl.appendChild(document.createElement('span'));
    ageEl.appendChild(days);

    let editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'edit-btn');
    editBtn.setAttribute('data-type', 'edit');
    editBtn.setAttribute('id', id);
    editBtn.innerText = 'Edit';

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'delete-btn');
    deleteBtn.setAttribute('data-type', 'delete');
    deleteBtn.setAttribute('id', id);
    deleteBtn.innerText = 'Delete';

    card.appendChild(img);
    card.appendChild(nameEl);
    card.appendChild(ageEl);
    if (!isEditable) {
        card.appendChild(editBtn);
        card.appendChild(deleteBtn);
    }
    else{
        nameEl.setAttribute('data-type', 'name');
        ageEl.setAttribute('data-type', 'age');
    }

    return card;
}

function getAge(timestamp) {
    let age = Date.now() - timestamp;
    let days = Math.floor(age / (1000 * 60 * 60 * 24));

    return days;
}
