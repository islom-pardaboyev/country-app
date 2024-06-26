"use strict"

// variables
const countriesCotainer = document.querySelector("#countries-container");
const likedCountriesLenght = document.querySelector('#likedCountriesLenght');
const basketLenght = document.querySelector('#basketLenght');
const selectCounriesName = document.querySelector("#selectCounriesName");
const modalCon = document.querySelector("#modalCon");
const mainContainer = document.querySelector("#mainContainer");
const likeBtn = document.querySelector('#likeBtn');
const basketBtn = document.querySelector('#basketBtn');
const countryName = document.querySelector("#countryName")

// empty arrays
let basketArray = [];
let likedCounties = [];
let countryNameArray = [];
let filter = [];


// liked country
likeBtn.addEventListener('click', () => {
    if (likedCounties.length == 0) {
        countriesCotainer.innerHTML = '<h1 class="flex min-w-screen min-h-screen items-center mx-auto font-bold text-3xl text-[#686D76]">Not Selected</h1>'
    } else {
        countriesCotainer.innerHTML = "";
        renderCountires(likedCounties, countriesCotainer);
    }
    filterBySelectTag(selectCounriesName, countriesCotainer, filter)
});

// country on the basket
basketBtn.addEventListener('click', () => {
    if (basketArray.length == 0) {
        countriesCotainer.innerHTML = '<h1 class="flex min-w-screen min-h-screen items-center mx-auto font-bold text-3xl text-[#686D76]">Not Selected</h1>'
    } else {
        countriesCotainer.innerHTML = "";
        renderCountires(basketArray, countriesCotainer);
    }
});

// putting the names in a separate array
function separateName(arr, nameArr) {
    arr.forEach(item => {
        if (!nameArr.includes(item.name)) {
            nameArr.push(item.name);
        }
    });
}

// append country's name to select tag
function countryNameAppendSelect(arr, htmlAttribute) {
    arr.forEach(item => {
        let name = document.createElement("option");
        name.textContent = item;
        htmlAttribute.append(name);
    });
}

// render countries
function renderCountires(arr, list) {
    arr.forEach(value => {
        let div = document.createElement('div');
        let img = document.createElement("img");
        let aboutDiv = document.createElement('div');
        let population = document.createElement('h1');
        let name = document.createElement('h1');
        let capital = document.createElement('h1');
        let id = document.createElement('h1');
        let btnDiv = document.createElement('div');
        let likeBtn = document.createElement("i");
        let basketBtn = document.createElement("i");
        let moreBtn = document.createElement("button");

        div.className = 'w-[400px] h-fit bg-[#2c3742] relative';
        btnDiv.className = 'flex btnDiv items-center gap-3 mt-2';
        basketBtn.className = 'cursor-pointer fa-solid fa-basket-shopping';

        // like btn
        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('text-red-500');
            if (likeBtn.classList.contains('text-red-500')) {
                if (!likedCounties.includes(value)) {
                    likedCounties.push(value);
                }

            } else {
                likedCounties = likedCounties.filter(item => item.id !== value.id);
            }
            likedCountriesLenght.innerHTML = `${likedCounties.length}`;
            console.log(likedCounties, likedCountriesLenght);
        });

        // basket btn
        basketBtn.addEventListener('click', () => {
            basketBtn.classList.toggle('text-cyan-400');
            if (basketBtn.classList.contains('text-cyan-400')) {
                if (!basketArray.includes(value)) {
                    basketArray.push(value);
                    console.log(basketBtn);
                }
            } else {
                basketArray = basketArray.filter(item => item.id !== value.id);
            }
            basketLenght.innerHTML = `${basketArray.length}`;
            console.log(basketArray, basketLenght);
        });

        // more btn
        moreBtn.addEventListener('click', () => {
            modalCon.classList.add("transition-all", "duration-300", "top-[50%]");
            modalCon.classList.remove("top-[-200%]");
            mainContainer.className = "transition-all duration-300 blur-md";
            modalCon.innerHTML = `<i class="fa-solid fa-xmark absolute top-3 cursor-pointer right-3 text-[#212b36] bg-white rounded-full w-[30px] h-[30px] flex items-center justify-center text-2xl"></i>
            
            <img src="${value.flag}" width="500" height="300" alt="">
            <div class="ml-auto text-2xl">
            <h1><strong>Population:</strong> ${value.population}</h1>
            <h1><strong>Capital:</strong> ${value.capital}</h1>
            <h1><strong>Name:</strong> ${value.name}</h1>
            <h1><strong>ID:</strong> ${value.id}</h1>
            </div>`;

            let closeModalCountry = document.querySelector(".fa-xmark");
            console.log(closeModalCountry);

            closeModalCountry.addEventListener('click', () => {
                closeModal();
            });

            document.addEventListener('keydown', handleEscKey);
        });

        moreBtn.innerHTML = `More...`;
        moreBtn.className = 'bg-sky-600 px-2 rounded-md text-xl';

        img.src = value.flag;
        img.className = "min-h-[300px]";
        id.className = 'absolute bg-white/50 font-bold rounded-full w-[50px] h-[50px] flex items-center justify-center text-black top-2 right-2';

        name.innerHTML = `<span class="font-bold">Name: </span>${value.name}`;
        id.innerHTML = value.id;
        population.innerHTML = `<span class="font-bold">Population: </span>${value.population}`;
        capital.innerHTML = `<span class="font-bold">Capital: </span>${value.capital}`;
        likeBtn.className = `fa-solid text-[20px] fa-heart cursor-pointer`;

        aboutDiv.className = "p-3";

        aboutDiv.append(id, population, name, capital, btnDiv);
        btnDiv.append(likeBtn, basketBtn, moreBtn);
        div.append(img, aboutDiv);

        list.append(div);
    });
}

// close modal function
function closeModal() {
    modalCon.classList.remove("top-[50%]");
    modalCon.classList.add("top-[-200%]");
    mainContainer.className = "transition-all duration-300 blur-none";
    document.removeEventListener('keydown', handleEscKey);
}

// function filter by search name
function filterBySearchName(name, nameArr) {
    name.addEventListener('input', () => {
        const inputValue = name.value.toLowerCase();
        nameArr = countries.filter(item => item.name.toLowerCase().includes(inputValue))
        countriesCotainer.innerHTML = ""
        renderCountires(nameArr, countriesCotainer)
    })
}

// filter by selectTag
function filterBySelectTag(countryName, countryContainer, filterArray) {
    countryName.addEventListener('change', () => {
        let name = countryName.value

        if (name === "All" || name === "") {
            countriesCotainer.innerHTML = "";
            renderCountires(countries, countryContainer);
        } else {
            filterArray = countries.filter(country => country.name === name)
            countryContainer.innerHTML = "";
            renderCountires(filterArray, countryContainer)
        }
    })
}

// handle Esc key press
function handleEscKey(e) {
    if (e.key === "Escape") {
        closeModal();
    }
}

// calling function
renderCountires(countries, countriesCotainer);
separateName(countries, countryNameArray);
countryNameAppendSelect(countryNameArray, selectCounriesName);
filterBySelectTag(selectCounriesName, countriesCotainer, filter)
filterBySearchName(countryName, countriesCotainer)