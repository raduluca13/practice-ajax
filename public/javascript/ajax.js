function ajax(method, url, payload){
    // regex to check method and url writing (aka 'Get'/'get'/'gET')
    let request = new XMLHttpRequest();
    request.open(method, url);
    if(method === 'GET'){
        request.addEventListener('load', e => {
            switch (request.status) {
                case 200:
                    let pets = JSON.parse(request.response);
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
                    let pet = JSON.parse(request.response);
                    console.log(pet);
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
        request.send(payload);
    }
    else if(method === 'PUT'){

    }
    else if(method === 'DELETE'){

    }
    
};

export {ajax};