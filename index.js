// category fetching

const loadCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(category => displayCategory(category.categories))
}

const loadCategoryButton = (id) =>{

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

const showAllPets = (allPets) => {

    const cardContainer = document.getElementById('cardContainer')

    cardContainer.innerHTML = "";

    allPets.forEach(allpet => {

        const { pet_name, breed, birth, gender, price, image } = allpet

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
                            <button class="btn bg-gray-100 text-gray-700 rounded-lg px-4 py-2">Like</button>
                            <button class="btn bg-teal-100 text-teal-700 rounded-lg px-4 py-2">Adopt</button>
                            <button class="btn bg-gray-100 text-gray-700 rounded-lg px-4 py-2">Details</button>
                        </div>
                    </div>
                </div>
        
        `

        cardContainer.append(cardDiv)

    })
}


loadCategories()
