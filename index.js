// category fetching

fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(category => displayCategory(category.categories))

const displayCategory = (categories) => {
    console.log(categories);
    
    const btnContainer = document.getElementById("buttonContainer")

    categories.forEach(element => {
        const {category_icon, category} = element
        // create btn 
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
        
        <button class="flex items-center space-x-2 p-3 rounded-lg border border-teal-400 bg-teal-100">
                  <img src="${category_icon}" alt="Cat" class="w-6 h-6" />
                  <span class="font-semibold">${category}</span>
                </button>
        
        `;
        btnContainer.append(btnDiv)
    });
}

