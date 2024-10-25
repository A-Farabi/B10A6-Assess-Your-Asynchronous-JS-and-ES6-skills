// category fetching

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(category => displayCategory(category.categories))
}

const loadCategoryButton = (id) => {

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then(res => res.json())
        .then(data => showAllPets(data.data))



}

const displayCategory = (categories) => {
    // console.log(categories);

    const btnContainer = document.getElementById("buttonContainer")

    categories.forEach(element => {
        const { category_icon, category } = element
        console.log(category);
        // create btn 
        const btnDiv = document.createElement('div')

        btnDiv.innerHTML = `
        
        <button onclick="loadCategoryButton('${category}')" class="flex items-center space-x-2 p-3 rounded-lg border border-teal-400 bg-teal-100">
                  <img src="${category_icon}" alt="Cat" class="w-6 h-6" />
                  <span class="font-semibold">${category}</span>
                </button>
        
        `;
        btnContainer.append(btnDiv)
    });
}



fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(allPetsData => showAllPets(allPetsData.pets))

// const modalDetails = (petId) => {

//     fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
//     .then(res => res.json())
//     .then(data => modalData(data))

//     const modalContainer = document.createElement('div')
//     modalContainer.innerHTML = `
    
//     <dialog id="my_modal_1" class="modal">
// <div class="modal-box">
// <h3 class="text-lg font-bold">Hello!</h3>
// <p class="py-4">Press ESC key or click the button below to close</p>
// <div class="modal-action">
// <form method="dialog">
// <!-- if there is a button in form, it will close the modal -->
// <button class="btn">Close</button>
// </form>
// </div>
// </div>
// </dialog>
    
//     `

//     document.body.append(modalContainer)

//     const modalData = (modalData) =>{
        
//         const {petId} = modalData

//         const modalId = my_modal_`${petId}`

//         modalId.showModal()
//     }


// }

const modalDetails = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`) 
        .then(res => res.json())
        .then(data => {showModal(data.petData); 
        });
};



const showModal = (data) => { 

    const { pet_name, breed, birth, gender, price, image } = data; 

    console.log(pet_name, breed, birth, gender, price, image);

    const modalContainer = document.createElement('div'); 

    modalContainer.innerHTML = ` 

        <dialog class="modal"> 
            <div class="modal-box"> 
                <h3 class="text-lg font-bold">${pet_name}</h3>
                <p class="py-4"><span class="font-semibold">Breed:</span> ${breed || 'N/A'}</p>
                <p><span class="font-semibold">Birth:</span> ${birth || 'N/A'}</p> 
                <p><span class="font-semibold">Gender:</span> ${gender || 'N/A'}</p> 
                <p><span class="font-semibold">Price:</span> ${price || 'N/A'}</p> 
                <img src="${image}" alt="${pet_name}" class="w-full h-auto rounded"> 
                <div class="modal-action">
                    <button class="btn">Close</button>
                </div> 
            </div>
        </dialog>

    `;

    document.body.append(modalContainer);

    const modal = modalContainer.querySelector('dialog');

    modal.showModal();

    // Close modal on button click or ESC key
    modalContainer.querySelector('.btn').addEventListener('click', () => {
        
        modal.close();
        modalContainer.remove(); 
    });

    modal.addEventListener('close', () => { 
        
        modalContainer.remove(); 
    });
};

const showAllPets = (allPets) => {

    const cardContainer = document.getElementById('cardContainer')

    cardContainer.innerHTML = "";

    if (allPets.length == 0) {

        cardContainer.innerHTML = `
        
        <div class="flex flex-col items-center justify-center h-screen bg-[#fffcfc] w-full">
  <div class="flex flex-col items-center space-y-4">
    <div class="w-24 h-24 bg-#6b639c p-6 rounded-full">
      <img src="images/error.webp" alt="No information icon" />
    </div>

    <h2 class="text-2xl font-bold text-gray-800">
      No Information Available
    </h2>

    <p class="text-gray-500 text-center max-w-xl">
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.
    </p>
  </div>
</div>


        `;

    }


    allPets.forEach(allpet => {

        const { pet_name, breed, birth, gender, price, image, petId } = allpet

        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = `
        
        <div class="card border-2 border-gray-200 rounded-lg shadow-md">
                    <figure><img src="${image}" alt="Mister Tartosh" class="rounded-t-lg"></figure>
                    <div class="p-4">
                        <h3 class="font-bold">${pet_name}</h3>
                        <p><span class="font-semibold">Breed: ${breed || 'N/A'}</p>
                        <p><span class="font-semibold">Birth: ${birth || 'N/A'} </p>
                        <p><span class="font-semibold">Gender:</span> ${gender || 'N/A'}</p>
                        <p><span class="font-semibold">Price:</span> ${price || 'N/A'}</p>
                        <div class="flex justify-between mt-4">
                            <button class="likeBtn btn bg-gray-100 text-gray-700 rounded-lg px-4 py-2">Like</button>
                            <button class="btn bg-gray-100 text-gray-700 rounded-lg px-4 py-2">Adopt</button>
                            <button onclick="modalDetails('${allpet.petId}')" class=" btn bg-teal-100 text-teal-700 rounded-lg px-4 py-2">Deatils</button>
                        </div>
                    </div>
                </div>
        
        `

        cardContainer.append(cardDiv)

        // right side append

        const likeBtn = cardDiv.querySelector('.likeBtn');

        likeBtn.addEventListener('click', () => {
            const likedPetContainer = document.getElementById('likedPetContainer');

            const likedPet = document.createElement('img');
            likedPet.src = image;
            likedPet.alt = `${pet_name}`;
            likedPet.classList.add('w-16', 'h-16', 'shadow-md', 'rounded-md');
            likedPetContainer.appendChild(likedPet);
        });
        
    })



}


loadCategories()




// modal showing

// const modalBtn = cardDiv.querySelectorAll('modalBtn')

// modalBtn.addEventListener('click', () => {
//     const modal = document.createElement('div')
//     modal.innerHTML = `
    
//     <dialog id="my_modal_1" class="modal">
// <div class="modal-box">
// <h3 class="text-lg font-bold">Hello!</h3>
// <p class="py-4">Press ESC key or click the button below to close</p>
// <div class="modal-action">
// <form method="dialog">
// <!-- if there is a button in form, it will close the modal -->
// <button class="btn">Close</button>
// </form>
// </div>
// </div>
// </dialog>
    
//     `



// })

// my_modal_1.showModal()



// const modaBtn = document.querySelectorAll('.modalBtn')

//         modaBtn.forEach(btn =>{
//             btn.addEventListener('click', () =>{
//                 const modal = document.createElement('div')
//     modal.innerHTML = `
    
//     <dialog id="my_modal_1" class="modal">
// <div class="modal-box">
// <h3 class="text-lg font-bold">Hello!</h3>
// <p class="py-4">Press ESC key or click the button below to close</p>
// <div class="modal-action">
// <form method="dialog">
// <!-- if there is a button in form, it will close the modal -->
// <button class="btn">Close</button>
// </form>
// </div>
// </div>
// </dialog>
    
//     `;
//                 document.body.append(modal)

//                 showModal()

//             })
//         })

// const modalBtn = document.querySelector('.modalBtn')

//         modalBtn.addEventListener('click', ()=>{
//             console.log('clicked');
//         })