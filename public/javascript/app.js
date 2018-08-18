(function initIIFE() {
    let petsContainer = document.getElementById('petsContainer');

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
})();
