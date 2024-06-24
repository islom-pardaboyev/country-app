const countriesCotainer = document.querySelector("#countries-container");
const likedCountriesLenght = document.querySelector('#likedCountriesLenght');
const basketLenght = document.querySelector('#basketLenght');
const selectCounriesName = document.querySelector("#selectCounriesName")

// empty arrays
let basketArray = []
let likedCounties = []
let countryNameArray = []

// liked country
likedCountriesLenght.addEventListener('click', () => {
    countriesCotainer.innerHTML = ""
    renderCountires(likedCounties, countriesCotainer)
})

// conutry on the basket
basketLenght.addEventListener('click', () => {
    countriesCotainer.innerHTML = ""
    renderCountires(basketArray, countriesCotainer)
})

// putting the names in a separate array
function separateName(arr, nameArr) {
    arr.forEach(item => {
        if (!nameArr.includes(item.name)) {
            nameArr.push(item.name)
        }
    })
}

// append country's name to select tag
function countryNameAppendSelect(arr, htmlAttribute) {
    arr.forEach(item => {
        let name = document.createElement("option")
        name.textContent = item
        htmlAttribute.append(name)
    })
}

// render countries
function renderCountires(arr, list) {
    users = arr.forEach(value => {
        let div = document.createElement('div')
        let img = document.createElement("img")
        let aboutDiv = document.createElement('div')
        let population = document.createElement('h1')
        let name = document.createElement('h1')
        let capital = document.createElement('h1')
        let id = document.createElement('h1')
        let btnDiv = document.createElement('div')
        let likeBtn = document.createElement("i")
        let basketBtn = document.createElement("i")
        let moreBtn = document.createElement("button")

        div.className = 'w-[400px] h-fit bg-[#2c3742] relative'
        btnDiv.className = 'flex btnDiv items-center gap-3 mt-2';
        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('text-red-500');
            if (likeBtn.classList.contains('text-red-500')) {
                likedCounties.push(value);
            } else {
                likedCounties = likedCounties.filter(item => item.id !== value.id);
            }
            likedCountriesLenght.innerHTML = `${likedCounties.length}`;
            console.log(likedCounties, likedCountriesLenght);
        });
        

        basketBtn.addEventListener('click', () => {
            basketBtn.classList.toggle('active')
            if (basketBtn.classList.contains('active')) {
                basketArray.push(value)

            } else {
                basketArray = basketArray.filter(item => item.id !== value.id)
            }
            basketLenght.innerHTML = `${basketArray.length}`;
            console.log(basketArray, basketLenght);
        })

        moreBtn.innerHTML = `More...`
        moreBtn.className = 'bg-sky-600 px-2 rounded-md text-xl'
        basketBtn.className = 'cursor-pointer'


        img.src = value.flag
        img.className = "min-h-[300px]"
        id.className = 'absolute bg-white/50 font-bold rounded-full w-[50px] h-[50px] flex items-center justify-center text-black top-2 right-2'


        name.innerHTML = `<span class="font-bold">Name: </span>${value.name}`
        id.innerHTML = value.id
        population.innerHTML = `<span class="font-bold">Population: </span>${value.population}`
        capital.innerHTML = `<span class="font-bold">Capital: </span>${value.capital}`
        likeBtn.className = `fa-solid text-[20px] fa-heart cursor-pointer`;
        basketBtn.innerHTML = `<img src="images/basket-svgrepo-com.svg" width="25" alt="" />`;

        aboutDiv.className = "p-3"

        aboutDiv.append(id, population, name, capital, btnDiv)
        btnDiv.append(likeBtn, basketBtn, moreBtn)
        div.append(img, aboutDiv)

        list.append(div)
    });
}

// calling function
renderCountires(countries, countriesCotainer)
separateName(countries, countryNameArray)
countryNameAppendSelect(countryNameArray, selectCounriesName)