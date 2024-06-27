"use strict";

// variables
const countriesContainer = document.querySelector("#countries-container");
const likedCountriesLength = document.querySelector('#likedCountriesLenght');
const basketLength = document.querySelector('#basketLenght');
const selectCountriesName = document.querySelector("#selectCounriesName");
const modalContainer = document.querySelector("#modalCon");
const mainContainer = document.querySelector("#mainContainer");
const likeBtn = document.querySelector('#likeBtn');
const basketBtn = document.querySelector('#basketBtn');
const countryNameInput = document.querySelector("#countryName");

// empty arrays
let basketArray = [];
let likedCountries = [];
let countryNameArray = [];
let filter = [];

// liked country
likeBtn.addEventListener('click', () => {
    if (likedCountries.length === 0) {
        countriesContainer.innerHTML = '<h1 class="flex min-w-screen min-h-screen items-center mx-auto font-bold text-3xl text-[#686D76]">Not Selected</h1>';
    } else {
        countriesContainer.innerHTML = "";
        renderCountries(likedCountries, countriesContainer);
    }
    filterBySelectTag(selectCountriesName, countriesContainer, filter);
});

// country in the basket
basketBtn.addEventListener('click', () => {
    if (basketArray.length === 0) {
        countriesContainer.innerHTML = '<h1 class="flex min-w-screen min-h-screen items-center mx-auto font-bold text-3xl text-[#686D76]">Not Selected</h1>';
    } else {
        countriesContainer.innerHTML = "";
        renderCountries(basketArray, countriesContainer);
    }
    filterBySelectTag(selectCountriesName, countriesContainer, filter);
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
        name.setAttribute("value", item)
        htmlAttribute.append(name);
    });
}

// render countries
function renderCountries(arr, list) {
    list.innerHTML = ""
    arr.forEach(value => {
        let div = document.createElement('div');
        div.className = 'w-[400px] h-fit bg-[#2c3742] hover:scale-105 transition-all duration-300 rounded-md overflow-hidden relative';

        div.innerHTML = `
            <img src="${value.flag}" class="min-h-[300px]" alt="">
            <div class="p-3">
                <h1 class="absolute bg-white/50 font-bold rounded-full w-[50px] h-[50px] flex items-center justify-center text-black top-2 right-2">${value.id}</h1>
                <h1><span class="font-bold">Population: </span>${value.population}</h1>
                <h1><span class="font-bold">Name: </span>${value.name}</h1>
                <h1><span class="font-bold">Capital: </span>${value.capital}</h1>
                <div class="flex btnDiv items-center gap-3 mt-2">
                    <i class="fa-solid fa-heart text-[20px] cursor-pointer ${value.isLike ? 'text-red-500' : 'text-white'}"></i>
                    <i class="fa-solid fa-bookmark text-[20px] cursor-pointer ${value.isBasket ? 'text-cyan-500' : 'text-white'}"></i>
                    <button class="bg-sky-600 px-2 rounded-md text-xl">More...</button>
                </div>
            </div>
        `;

        const likeBtn = div.querySelector('.fa-heart');
        likeBtn.addEventListener('click', () => {
            value.isLike = !value.isLike;
            likeBtn.classList.toggle('text-red-500', value.isLike);
            likeBtn.classList.toggle('text-white', !value.isLike);

            if (value.isLike) {
                if (!likedCountries.includes(value)) {
                    likedCountries.push(value);
                }
            } else {
                likedCountries = likedCountries.filter(item => item.id !== value.id);
            }
            likedCountriesLength.innerHTML = likedCountries.filter(item => item.isLike).length;
        });

        const basketBtn = div.querySelector('.fa-bookmark');
        basketBtn.addEventListener('click', () => {
            value.isBasket = !value.isBasket;
            basketBtn.classList.toggle('text-cyan-500', value.isBasket);
            basketBtn.classList.toggle('text-white', !value.isBasket);

            if (value.isBasket) {
                if (!basketArray.includes(value)) {
                    basketArray.push(value);
                }
            } else {
                basketArray = basketArray.filter(item => item.id !== value.id);
            }
            basketLength.innerHTML = basketArray.filter(item => item.isBasket).length;
        });

        const moreBtn = div.querySelector('button');
        moreBtn.addEventListener('click', () => {
            modalContainer.classList.add("transition-all", "duration-300", "top-[50%]");
            modalContainer.classList.remove("top-[-200%]");
            mainContainer.className = "transition-all duration-300 blur-md";
            modalContainer.innerHTML = `
                <i class="fa-solid fa-xmark absolute top-3 cursor-pointer right-3 text-[#212b36] bg-white rounded-full w-[30px] h-[30px] flex items-center justify-center text-2xl"></i>
                <img src="${value.flag}" width="500" height="300" alt="Flag of ${value.name}">
                <div class="ml-auto text-2xl">
                    <h1><strong>Population:</strong> ${value.population}</h1>
                    <h1><strong>Capital:</strong> ${value.capital}</h1>
                    <h1><strong>Name:</strong> ${value.name}</h1>
                    <h1><strong>ID:</strong> ${value.id}</h1>
                </div>`;

            const closeModalCountry = document.querySelector(".fa-xmark");
            closeModalCountry.addEventListener('click', closeModal);
            document.addEventListener('keydown', handleEscKey);
        });

        list.append(div);
    });
}


// close modal function
function closeModal() {
    modalContainer.classList.remove("top-[50%]");
    modalContainer.classList.add("top-[-200%]");
    mainContainer.className = "transition-all duration-300 blur-none";
    document.removeEventListener('keydown', handleEscKey);
}

// function filter by search name
function filterBySearchName(nameInput, container) {
    nameInput.addEventListener('input', () => {
        const inputValue = nameInput.value.toLowerCase().trim();
        const filteredCountries = countries.filter(item => item.name.toLowerCase().includes(inputValue) || String(item.id).toLowerCase().includes(inputValue) || item.capital.toLowerCase().includes(inputValue));
        renderCountries(filteredCountries, container);
    });
}

// filter by select tag
function filterBySelectTag(selectElement, container, filterArray) {
    selectElement.addEventListener('change', () => {
        const selectedName = selectElement.value;
        if (selectedName === "All" || selectedName === "") {
            renderCountries(countries, container);
        } else {
            filterArray = countries.filter(country => country.name === selectedName);
            renderCountries(filterArray, container);
        }
    });
}

// handle Esc key press
function handleEscKey(e) {
    if (e.key === "Escape") {
        closeModal();
    }
}

// function calling
renderCountries(countries, countriesContainer);
separateName(countries, countryNameArray);
countryNameAppendSelect(countryNameArray, selectCountriesName);
filterBySelectTag(selectCountriesName, countriesContainer, filter);
filterBySearchName(countryNameInput, countriesContainer);