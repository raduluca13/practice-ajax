(function initIIFE() {
    let spinnerList = document.getElementsByClassName('spinner');
    let spinner = spinnerList[0];
    spinner.classList.add('spinner--active');
    let petsContainer = document.getElementById('petsContainer');

    
    PetService.getPets(
        function success(pets) {
            spinner.classList.remove('spinner--active');
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
    
    petsContainer.addEventListener('click', function onClick(e) {
        if (e.target.tagName === 'BUTTON') {
            switch (e.target.dataset.type) {
                case 'edit':
                    PetService.getPet(
                        function succes(pet){
                            swal({
                                title: 'Edit pet',
                                html: createPetCard(
                                    {
                                        name: pet.name,
                                        type: pet.type,
                                        created: pet.created
                                    },
                                    true
                                ),
                                confirmButtonText: 'Save',
                                showCancelButton: true,
                                cancelButtonText: 'Cancel',
                                width: '50%'
                            }).then(function(){
                                let name = document.querySelector('.pet [data-type="name"]').innerText;
                                let age = document.querySelector('.pet [data-type="age"]').innerText;
                                let payload = { 
                                    "id":e.target.id,
                                    "type": pet.type,
                                    "name": name, 
                                    "created": (Date.now()-(age*86400))
                                };
                                payload = JSON.stringify(payload);
                                PetService.updatePet(
                                    payload,
                                    function success(response){
                                        //manipulate DOM
                                        console.log(response);
                                        debugger;
                                    },
                                    function error(type){
                                        console.log(`Server responded with type ${type}`);
                                    }
                                )

                            });
                        },
                        function error(type){
                            console.log(`Server responded with status ${type}`);
                        }
                        ,
                        e.target.id
                    );
                    
                    break;
                case 'delete':
                    if(event.target.parentElement.id === undefined) event.target.parentElement.remove();
                    if (!(event.target.id === undefined)) {
                        PetService.deletePet(
                            event.target.id,
                            function succes(response) {
                                console.log(response);
                                event.target.parentElement.remove();
                            },
                            function error(type) {
                                if (type === 'error') {
                                    console.log('networking error');
                                } else console.log(`Server responded with status ${type}`);
                            }
                        );
                    }
                    break;
                default:
                    break;
            }
        }
    });

    let createForm = document.getElementById('createForm');
    createForm.addEventListener('submit', event => {
    event.preventDefault();

    let nameInput = createForm.nameInput.value;
    let typeInput = createForm.typeInput.value;
    let newPet = JSON.stringify({ name: nameInput, type: typeInput });
    
    PetService.addPet(
        newPet,
        pet => {
            let divContainer = document.getElementById('petsContainer');
            let card = createPetCard(pet);
            divContainer.appendChild(card);
        },
        type => {
            if (type === 'error') {
                console.log('networking error');
            } else console.log(`Server responded with status ${type}`);
        }
    );
    });

    // SEARCH
    let timeoutID;
    let searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('input', event => {
        let nameInputVal = searchForm.nameInput.value;

        clearTimeout(timeoutID);
        timeoutID = setTimeout(function() {
            petsContainer.classList.add('inactive');
            spinner.classList.add('spinner--active');
            PetService.getPets(
                function success(response) {
                    spinner.classList.remove('spinner--active');
                    petsContainer.classList.remove('inactive');
                    petsContainer.innerHTML = '';
                    response.forEach(e => {
                        let card = createPetCard(e);
                        card.setAttribute('data-id', e.id);
                        petsContainer.appendChild(card);
                    });
                },
                function error(type) {
                    if (type === 'error') {
                        console.log('networking error');
                    } else console.log(`Server responded with status ${type}`);
                },
                nameInputVal
            );
        }, 500);
    });

    let loginBtn = document.getElementById('loginBtn');
    let logoutBtn = document.getElementById('logoutBtn');

    loginBtn.addEventListener('click', event => {
        loginBtn.setAttribute('disabled', true);
        logoutBtn.setAttribute('disabled', true);

        AuthService.login(
            (response, header) => {
                alert(`${response} logged in`);
                logoutBtn.removeAttribute('disabled');
            },
            type => {
                console.log(`Server responded with ${type} status`);
                loginBtn.removeAttribute('disabled');
                // logoutBtn.setAttribute('disabled', false);
            }
        );
        
    });

    logoutBtn.addEventListener('click', event => {
        loginBtn.setAttribute('disabled', true);
        logoutBtn.setAttribute('disabled', true);

        AuthService.logout(
            response => {
                alert(`${response} logged out`);
                loginBtn.removeAttribute('disabled');
            },
            type => {
                alert(`Server responded with ${type} status`);
                // loginBtn.setAttribute('disabled', false);
                loginBtn.removeAttribute('disabled');
            }
        );
    });

})();
