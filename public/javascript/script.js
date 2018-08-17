// import { ajax } from "./ajax";

// import * as myFunction from "./ajax.js";
(function onLoad() {
    let x = new XMLHttpRequest();
    x.open('GET', '/pets');
    x.addEventListener('load', e => {
        console.log(x);
        switch (x.status) {
            case 200:
                let pets = JSON.parse(x.response);
                pets.forEach((e, index, arr) =>{
                    let divContainer = document.getElementById("petsContainer");
                    let card = createPetCard(e);
                    divContainer.appendChild(card);
                });
                //  createPetCard(petInfo);
                
                // let div  = document.createElement("div");
                // div.ClassList.addClass("pet pet--dog");
                // divContainer.appendChild(div);
                break;
            default:
                break;
        }
    });
    x.addEventListener('error', e => console.log('ERROR AT  CLIENT'));
    x.send();
})();

let createForm = document.getElementById('createForm');
createForm.addEventListener('click', (event) => {
    event.preventDefault();
    // event.stopPropagation(); 
    console.log(event.target);
    if(event.target.type === 'select-one'){
        /* [Violation] Added non-passive event listener to a scroll-blocking 'mousewheel' event.
        /* Consider marking event handler as 'passive' to make the page more responsive. 
        /*See https://www.chromestatus.com/feature/5745543795965952
        */
        event.stopPropagation();
    }
    if(event.target.type === 'submit'){
        let nameInput = document.getElementsByName('nameInput');
        console.log(nameInput);
        nameInput.forEach( (e) => {
            console.log(e);
            // console.log(e.parentElement);
            if(e.parentElement.id === 'createForm'){
                console.log(e.value);
                let typeInput = document.getElementsByName('typeInput');
                console.log(typeInput[0].value);
                let newPet = {'name':e.value, 'type':typeInput[0].value};
                console.log(newPet);
                newPet = JSON.stringify(newPet);
                ajax('POST', '/pets', newPet);
            }
        });
        

    }
});

let petsContainer = document.getElementById('petsContainer');
// petsContainer.addEventListener('click', (event)=>event.target.parentElement.remove());
petsContainer.addEventListener('click', (event)=>{
    if(!(event.target.parentElement === petsContainer)){
        event.target.parentElement.remove();
    }
});

function ajax(method, url, payload){
    // ? regex to check method and url writing (aka 'Get'/'get'/'gET')
    let request = new XMLHttpRequest();
    
    console.log('method: ', method, 'url: ', url, 'payload: ', payload);
    debugger;
    request.open(method, url);

    if(method === 'GET'){
        request.addEventListener('load', e => {
            switch (request.status) {
                case 200:
                    let pets = JSON.parse(request.response);
                    console.log(pets);
                    debugger;
                    /* response
                    {e.name, e.type, e.id, e.created}
                    */
                    pets.forEach((e, index, arr) =>{
                        let divContainer = document.getElementById("petsContainer");
                        let card = createPetCard(e);
                        divContainer.appendChild(card);
                    });
                    //  createPetCard(petInfo);
                    
                    // let div  = document.createElement("div");
                    // div.ClassList.addClass("pet pet--dog");
                    // divContainer.appendChild(div);
                    break;
                default:
                    break;
            }
        });
        request.addEventListener('error', e => console.log('Error in networking'));
        request.send();
    }
    else if(method === 'POST'){
        request.addEventListener('load', e => {
            switch (request.status) {
                case 200:
                console.log('response: ', request.response);
                    let pet = JSON.parse(request.response);
                    console.log(pet);
                    break;
                    /* response
                    {e.name, e.type, e.id, e.created}
                    */
                    createPetCard(pet);
                    
                    // let div  = document.createElement("div");
                    // div.ClassList.addClass("pet pet--dog");
                    // divContainer.appendChild(div);
                    break;
                default:
                    break;
            }
        });
        request.addEventListener('error', e => console.log('Error in networking'));
        // console.log(payload);
        // debuuger;
        request.send(payload);
    }
    else if(method === 'PUT'){

    }
    else if(method === 'DELETE'){

    }
    
};


// var promise = import(ajax);
// console.log(promise);

// import {ajax} from './ajax'; // or './module'
// let val = ajax(); // val is "Hello";