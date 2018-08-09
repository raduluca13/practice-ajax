function createPetCard(petInfo) {
    let card = document.createElement("div");
    card.classList.add("pet", `pet--${petInfo.type}`);

    let img = document.createElement("img");
    img.width = 64;
    img.src = petInfo.img || '/public/images/404.jpg';

    let nameEl = document.createElement("h1");
    nameEl.innerText = petInfo.name;

    let ageEl = document.createElement("p");
    ageEl.classList.add("age");
    ageEl.innerText = getAge(petInfo.created);

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "delete-btn");
    deleteBtn.innerText = "Delete";

    card.appendChild(img);
    card.appendChild(nameEl);
    card.appendChild(ageEl);
    card.appendChild(deleteBtn);

    return card;
}

function getAge(timestamp) {
    let age = Date.now() - timestamp;
    let days = Math.floor(age / (1000 * 60 * 60 * 24));

    return `${days} days old`;
}