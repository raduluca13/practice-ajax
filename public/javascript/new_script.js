(function onLoad() {
    PetService.getPets(
        function success(pets) {
            pets.forEach((e, index, arr) => {
                console.log(e.name);
                if (!(e.name === undefined)) {
                    let divContainer = document.getElementById('petsContainer');
                    let card = createPetCard(e);
                    divContainer.appendChild(card);
                }
            });
        },
        function error(type) {
            if (type === 'error') {
                console.log('networking error');
            } else console.log(`Server responded with status ${type}`);
        }
    );
})();

let createForm = document.getElementById('createForm');
createForm.addEventListener('submit', event => {
    let nameInput = document.getElementsByName('nameInput');
    nameInput.forEach(e => {
        if (e.parentElement.id === 'createForm') {
            let typeInput = document.getElementsByName('typeInput');
            let newPet = { name: e.value, type: typeInput[0].value };
            newPet = JSON.stringify(newPet);

            PetService.addPet(
                newPet,
                function success(response) {
                    response.forEach((e, index, arr) => {
                        console.log(response);
                        // debugger;
                        let divContainer = document.getElementById(
                            'petsContainer'
                        );
                        let card = createPetCard(e);
                        divContainer.appendChild(card);
                    });
                    //  createPetCard(petInfo);
                },
                function error(type) {
                    if (type === 'error') {
                        console.log('networking error');
                    } else
                        console.log(`Server responded with status ${type}`);
                }
            );
        }
    });
});

// SEARCH
let timeoutID;
let searchForm = document.getElementById('searchForm');
searchForm.addEventListener('input', event => {
    let nameInputVal =  searchForm.nameInput.value;
    
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function(){
        PetService.getPets(
            function success(response) {
                let petsContainer = document.getElementById('petsContainer');
                petsContainer.innerHTML = '';
                response.forEach( e => {
                    let card = createPetCard(e);
                    card.setAttribute('data-id',e.id)
                    petsContainer.appendChild(card);
                });            
            },
            function error(type) {
                if (type === 'error') {
                    console.log('networking error');
                } else
                    console.log(`Server responded with status ${type}`);
            },
            nameInputVal
        );
    }, 500);
});

// EDIT + DELETE 
// let petsContainer = document.getElementById('petsContainer');
// petsContainer.addEventListener('click', event => {
//     switch(event.target.dataset.type){
//         case 'edit':
//             console.log('editing');
//         break;
        
//         case 'delete':
//             if(event.target.parentElement.id === undefined) event.target.parentElement.remove();
//             if (!(event.target.id === undefined)) {
//                 PetService.deletePet(
//                     event.target.id,
//                     function succes(response) {
//                         console.log(response);
//                         event.target.parentElement.remove();
//                     },
//                     function error(type) {
//                         if (type === 'error') {
//                             console.log('networking error');
//                         } else console.log(`Server responded with status ${type}`);
//                     }
//                 );
//             }
//         break;
//     }
// });
