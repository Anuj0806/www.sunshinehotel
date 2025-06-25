// Function to display skeleton loading placeholders


function showSkeletonLoading() {
    for (let i = 0; i < 3; i++) {
        const hotelContainer = document.getElementById('hotelContainer');
        const skeletonCard = document.createElement('div');
        skeletonCard.className = 'hotel-skeleton skeleton';
        skeletonCard.innerHTML = `
            <div class="skeleton skeleton-image"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text" style="width: 50%;"></div>
        `;
        hotelContainer.appendChild(skeletonCard);
    }
}

const rooms = [
    {
        "photo": "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
        "hotel_id": 1,
        "description": "123 Main St, Cityville BEST ROOM",
        "ac_nonac": "Non AC",
        "floor": "1 Floor",
        "beds": "King Size Beds",
        "class": "Double room",
        "room_id": 1,
        "room_no": 101,
        "prize": 500,
        "pending": "UR",
        "approve": ""
    }
];
const hotels_data = [
    {
        "hotel_id": 1,
        "hotel_name": "Grand Plaza Hotel",
        "hotel_address": "123 Main St, Cityville ,Delhi",
        "hotel_mobile": 9896858587,
        "addhar_card": 1234567891234567,
        "pan_card": "ECEPA45325K"
    }
];
const rooms_local = localStorage.getItem('rooms');
let filteredRooms = rooms;
try {
    if (rooms_local) {
        const parsedData = JSON.parse(rooms_local);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
            filteredRooms = filteredRooms.concat(parsedData);
        }
    }
} catch (e) {
    console.error('Error parsing localStorage data:', e);
}

let rooms_json = filteredRooms.filter(room => room.pending === "UR");
const hotel_local = localStorage.getItem('hotels_data');
let hotel_json = hotels_data;
try {
    if (hotel_local) {
        const parsedData = JSON.parse(hotel_local);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
            hotel_json = hotel_json.concat(parsedData);
        }
    }
} catch (e) {
    console.error('Error parsing localStorage data:', e);
}



function onloadhomepage() {
    showSkeletonLoading();
    displayHotels_admin(rooms_json);
    document.querySelectorAll(".footer_data").forEach(function (element) {
        element.innerHTML = "ABCD HOTALS";
    });
    document.querySelectorAll(".footer_data_lic").forEach(function (element) {
        element.innerHTML = "&copy; 2023  ABCD HOTELS";
    });
}

function getHotelNameById(hotel_id) {
    const hotel = hotel_json.find(hotel => hotel.hotel_id === hotel_id);
    return hotel ? hotel.hotel_name : 'Unknown Hotel';
}
function getHotelAddressById(hotel_id) {
    const hotel = hotel_json.find(hotel => hotel.hotel_id === hotel_id);
    return hotel ? hotel.hotel_address : 'Unknown Hotel';
}


function apply_filter_admin() {
    const priceFilter = document.getElementById('price_filter').value;
    const addressFilter = document.getElementById('description_filter').value;
    const acFilter = document.getElementById('classInput_filter').value;
    const priceValue = priceFilter;
    const address = addressFilter || '';
    const ac = acFilter || '';
    let minPrice = 0;
    let maxPrice = Infinity;
    if (priceValue === '999') {
        maxPrice = 999;
    } else if (priceValue === '1000') {
        minPrice = 1000;
        maxPrice = 2999;
    } else if (priceValue === '3000') {
        minPrice = 3000;
        maxPrice = 4999;
    } else if (priceValue === '5000') {
        minPrice = 5000;
        maxPrice = Infinity;
    }


    const filteredHotels = rooms_json.filter(hotel => {
        const matchesPrice = hotel.prize >= minPrice && hotel.prize <= maxPrice;
        const matchesAddress = !address || getHotelAddressById(hotel.hotel_id).includes(address);
        const matchesAc = !ac || hotel.ac_nonac === ac;
        return matchesPrice && matchesAddress && matchesAc;
    });
    displayHotels_admin(filteredHotels);
}


function remove_filter_admin() {
    const priceFilter = document.getElementById('price_filter');
    const addressFilter = document.getElementById('description_filter');
    const acFilter = document.getElementById('classInput_filter');
    priceFilter.value = '';
    addressFilter.value = '';
    acFilter.value = '';
    displayHotels_admin(rooms_json);
}




function displayHotels_admin(rooms_json_data) {
    const hotelContainer = document.getElementById('hotelContainer');
    hotelContainer.innerHTML = ''; // Clear previous content  


    rooms_json_data.forEach(hotel => {
        const hotelCard = document.createElement('div');
        hotelCard.className = 'col s12 m6 l6'; // Materialize grid classes for responsiveness
        if (hotel.room_id !== 1) {
         hotelCard.innerHTML = `
        <div class="card hoverable equal-height"> <!-- Materialize Card -->
            <div class="card-image">
                <img src="${hotel.photo}" alt="Hotel Image" class="responsive-img hotel-image" 
                     onerror="this.onerror=null; this.src='default-image.jpg';">
            </div>
            <div class="card-content">
                <h5 class="hotel-name">${getHotelNameById(hotel.hotel_id)}</h5>
                <p class="hotel-address">${getHotelAddressById(hotel.hotel_id)}</p>
                <div class="hotel-rating">
                    <span class="hotel-star"><i class="material-icons">star</i> ${hotel.class}</span>
                    <span class="hotel-star"><i class="material-icons">ac_unit</i> ${hotel.ac_nonac}</span>
                </div>
                <p class="hotel-price"><b>Room Price:</b> ${hotel.prize}</p>
                <p class="hotel-description">${hotel.description}</p>
            </div>
            <div class="card-action">
                <button class="btn waves-effect cyan darken-2" onclick="login_alert()">Book Room</button>
            </div>
        </div>
    `;
        } else {
           hotelCard.innerHTML = `
        <div class="card hoverable equal-height"> <!-- Materialize Card -->
            <div class="card-image">
                <img src="${hotel.photo}" alt="Hotel Image" class="responsive-img hotel-image" 
                     onerror="this.onerror=null; this.src='default-image.jpg';">
            </div>
            <div class="card-content">
                <h5 class="hotel-name">${getHotelNameById(hotel.hotel_id)}</h5>
                <p class="hotel-address">${getHotelAddressById(hotel.hotel_id)}</p>
                <div class="hotel-rating">
                    <span class="hotel-star"><i class="material-icons">star</i> ${hotel.class}</span>
                    <span class="hotel-star"><i class="material-icons">ac_unit</i> ${hotel.ac_nonac}</span>
                </div>
                <p class="hotel-price"><b>Room Price:</b> ${hotel.prize}</p>
                <p class="hotel-description">${hotel.description}</p>
            </div>
            <div class="card-action">
                <button class="btn waves-effect cyan darken-2" >Demo Data Cant't Book</button>
            </div>
        </div>
    `;
          
        }

        hotelContainer.appendChild(hotelCard);
    });
}




function login_alert() {
    alert("To book This Please Login !");
    window.location = ("guestLogin.html");
}
