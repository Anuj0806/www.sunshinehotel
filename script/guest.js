var public_key = "Bc6Q0uME5PARDagYq";
function footerFunction() {
    document.querySelectorAll(".footer_data").forEach(function (element) {
        element.innerHTML = "ABCD HOTELS";
    });
    document.querySelectorAll(".footer_data_inc").forEach(function (element) {
        element.innerHTML = "&copy; 2023 ABCD HOTELS";
    });
}



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

function getHotelNameById(hotel_id) {
    const hotel = hotel_json.find(hotel => hotel.hotel_id === hotel_id);
    return hotel ? hotel.hotel_name : 'Unknown Hotel';
}
function getHotelAddressById(hotel_id) {
    const hotel = hotel_json.find(hotel => hotel.hotel_id === hotel_id);
    return hotel ? hotel.hotel_address : 'Unknown Hotel';
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



function onloadguestloginpage() {
    showSkeletonLoading();
    document.querySelectorAll(".footer_data").forEach(function (element) {
        element.innerHTML = "ABCD HOTALS";
    });
    document.querySelectorAll(".footer_data_lic").forEach(function (element) {
        element.innerHTML = "&copy; 2023  ABCD HOTELS";
    });
    displayHotels(rooms_json);
}




function apply_filter() {
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
    displayHotels(filteredHotels);
}


function remove_filter() {
    const priceFilter = document.getElementById('price_filter');
    const addressFilter = document.getElementById('description_filter');
    const acFilter = document.getElementById('classInput_filter');
    priceFilter.value = '';
    addressFilter.value = '';
    acFilter.value = '';
    displayHotels(rooms_json);
}






function displayHotels(hotels) {
  const hotelContainer = document.getElementById('hotelContainer');
    hotelContainer.innerHTML = ''; // Clear previous content  

      hotels.forEach(hotel => {
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
                <button class="btn waves-effect cyan darken-2" onclick="show_vacent_room(${hotel.room_id})">Book Room</button>
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

function validatePANString(input) {
    // Define the regex pattern
    var pattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    // Test the input against the pattern
    return pattern.test(input);
}
function validate16Digits(input) {
    var pattern = /^\d{16}$/;
    return pattern.test(input);
}
function validate10Digits(input) {
    var pattern = /^\d{10}$/;
    return pattern.test(input);
}
function validphonenumber(input) {
    var pattern = /^\d+$/;
    return pattern.test(input);
}

function validateGmail(email) {
    var gmail_regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (gmail_regex.test(email)) {
        return true;
    } else {
        return false; // Email is invalid
    }
}

function validatePassword(password) {
    var pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (pattern.test(password)) {
        return true;
    } else {
        return false;
    }
}



const guest_data = [
    {
        "guest_id": 101,
        "Name": "Jane Doe",
        "Phone": 9876543210,
        "address": "456 Oak St, Springfield, IL",
        "email": "admin@gmail.com",
        "password": "1234"
    }
];






const guest_local = localStorage.getItem('guest_data');
let guest_json = guest_data || []; // Initialize guest_json with an empty array if guest_data is not defined

try {
    if (guest_local) {
        const parsedData = JSON.parse(guest_local);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
            guest_json = guest_json.concat(parsedData);
        }
    }
} catch (e) {
    console.error('Error parsing localStorage data:', e);
}

function getlogin_data_guest() {
    var isOkFilelds = true;
    const params = new URLSearchParams();
    var guest_username = document.getElementById("guest_username").value;
    var guest_password = document.getElementById("guest_password").value;
    if (guest_username === "" && guest_password === "") {
        alert("All Filed Required");
        isOkFilelds = false;
    } else {
        if (guest_username === "") {
            alert("Email is  Required");
            isOkFilelds = false;
        }
        if (guest_password === "") {
            alert("Password is Required");
            isOkFilelds = false;
        }
    }


    if (guest_username !== "") {
        if (!validateGmail(guest_username)) {
            alert("Please enter a valid Gmail address.");
            isOkFilelds = false;
            document.getElementById("guest_username").value = "";
        }
    }

    if (isOkFilelds) {
        if (guest_username) {
            params.append('email', guest_username);
        }
        if (guest_password) {
            params.append('password', guest_password);
        }
        document.getElementById("loaderactive_save").style.display = "grid";
        document.getElementById("disablebutton_save").style.display = "none";
        // Check if the email and password match an entry in the employee_login array
        const employee = guest_json.find(guest => guest.email === guest_username && guest.password === guest_password);
        if (employee) {

            sessionStorage.setItem('GusetEmail', guest_username);
            alert("Welcome Guest");

            document.getElementById("guest_username").value = "";
            document.getElementById("guest_password").value = "";
            document.getElementById("loaderactive_save").style.display = "none";
            document.getElementById("disablebutton_save").style.display = "inline";
            window.location = "guestHomePage.html";
        } else {
            // Login failed
            alert("Invalid email or password.");
            document.getElementById("guest_username").value = "";
            document.getElementById("guest_password").value = "";

            document.getElementById("loaderactive_save").style.display = "none";
            document.getElementById("disablebutton_save").style.display = "inline";
        }
    }
}




//guest resister data
const params_guest_register = new URLSearchParams();
function sendOTP() {
    var isOkFilelds = true;
    var guest_name = document.getElementById("guest_name").value;
    var guest_phone = document.getElementById("guest_phone").value;
    var guest_add = document.getElementById("guest_add").value;
    var guest_email = document.getElementById("guest_email").value;
    var guest_password = document.getElementById("guest_password_register").value;
    if (guest_name === "" && guest_password === "") {
        alert("All Filed Required");
        isOkFilelds = false;
    } else {
        if (guest_name === "") {
            alert("Name is  Required");
            isOkFilelds = false;
        } else
        if (guest_phone === "") {
            alert("Phone is Required");
            isOkFilelds = false;
        } else
        if (guest_add === "") {
            alert("Address is Required");
            isOkFilelds = false;
        } else
        if (guest_email === "") {
            alert("Email is Required");
            isOkFilelds = false;
        } else
        if (guest_password === "") {
            alert("Password is Required");
            isOkFilelds = false;
        }
    }
    if (guest_password !== "") {
        if (!validatePassword(guest_password)) {
            alert("Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter.");
            document.getElementById("guest_password_register").value = "";
            isOkFilelds = false;
        }
    }
    if (guest_phone !== "") {
        if (!validphonenumber(guest_phone)) {
            alert("Please enter a valid phone number.");
            document.getElementById("guest_phone").value = "";
            isOkFilelds = false;
        }
    }
    if (guest_email !== "") {
        if (!validateGmail(guest_email)) {
            alert("Please enter a valid Gmail address.");
            isOkFilelds = false;
            document.getElementById("guest_email").value = "";
        }
    }

    if (isOkFilelds) {

        document.getElementById("loaderactive").style.display = "grid";
        document.getElementById("sendotp_start").style.display = "none";

        if (guest_name) {
            params_guest_register.append('name', guest_name);
        }
        if (guest_email) {
            params_guest_register.append('email', guest_email);
        }
        if (guest_phone) {
            params_guest_register.append('phone', guest_phone);
        }
        if (guest_add) {
            params_guest_register.append('address', guest_add);
        }

        if (guest_password) {
            params_guest_register.append('password', guest_password);
        }

        let guests = JSON.parse(localStorage.getItem('guest_data')) || [];
        let guestIndex = guests.findIndex(guest => guest.email === guest_email);
        if (guestIndex !== -1) {
            alert("Error: Guest is already registered with this email.");
            document.getElementById("loaderactive").style.display = "none";
            document.getElementById("sendotp_start").style.display = "inline";
            return;
        }

        var otp = Math.floor(Math.random() * 900000) + 100000;
        if (otp) {
            params_guest_register.append('otp_generated', otp);
        }
        if (typeof emailjs !== 'undefined') {
            emailjs.init(public_key); // Replace with your public key

            var templateParams = {
                header: "Hi, " + guest_name + " ,",
                message: "Thank you for registering with our hotel. To complete the registration process, please use the following One-Time Password (OTP):",
                reply_to: guest_email,
                otp: otp
            };


            emailjs.send('service_qpgwb67', 'template_txt0u2y', templateParams).then(
                    (response) => {
                alert("OTP is successfully send on your Email");
                resetOTPInputs();
                document.getElementById("otpPopup").style.display = "flex";
                guest_name = document.getElementById("guest_name").value = "";
                guest_phone = document.getElementById("guest_phone").value = "";
                guest_add = document.getElementById("guest_add").value = "";
                guest_email = document.getElementById("guest_email").value = "";
                guest_password = document.getElementById("guest_password_register").value = "";
                startCountdown();
                document.getElementById("loaderactive").style.display = "none";
                document.getElementById("sendotp_start").style.display = "inline";

            },
                    (error) => {
                alert("Error sending email");
                guest_name = document.getElementById("guest_name").value = "";
                guest_phone = document.getElementById("guest_phone").value = "";
                guest_add = document.getElementById("guest_add").value = "";
                guest_email = document.getElementById("guest_email").value = "";
                guest_password = document.getElementById("guest_password_register").value = "";
                document.getElementById("loaderactive").style.display = "none";
                document.getElementById("sendotp_start").style.display = "inline";
            }
            );
        } else {
            alert('EmailJS library not loaded');
            document.getElementById("loaderactive").style.display = "none";
            document.getElementById("sendotp_start").style.display = "inline";
        }
        document.getElementById("loaderactive").style.display = "none";
        document.getElementById("sendotp_start").style.display = "inline";
    }
}

function closePopup() {
    var confirmation = confirm("If you quit, then you need to register again.");
    if (confirmation) {
        document.getElementById("otpPopup").style.display = "none";
    }
}

function closePopup_edit_details() {
    document.getElementById("editPopup").style.display = "none";
}

function closePopup_bookRoom_guest() {
    document.getElementById("otpPopup").style.display = "none";
}

function moveToNext(elem, event) {
    const key = event.keyCode || event.which;

    // Handle backspace separately in onkeydown
    if (key === 8 && elem.value.length === 0) { // Backspace key is pressed
        let prev = elem.previousElementSibling;
        if (prev && prev.classList.contains('email-otp-input')) {
            prev.focus();
            prev.value = ""; // Clear the previous field
            prev.disabled = false; // Enable previous field
            elem.disabled = true; // Disable current field
        }
    }
}

function handleInput(elem) {
    if (elem.value.length === elem.maxLength) { // Move forward when the input length matches its max length
        let next = elem.nextElementSibling;
        if (next && next.classList.contains('email-otp-input')) {
            next.disabled = false;
            next.focus();
        }
    }
}





function resendemail() {
    document.getElementById("loaderactive_pop").style.display = "grid";
    document.getElementById("disablebutton").style.display = "none";
    document.getElementById("disablebuttonsave").style.display = "none";
    if (typeof emailjs !== 'undefined') {
        emailjs.init(public_key); // Replace with your public key


        var otp = Math.floor(Math.random() * 900000) + 100000;
        params_guest_register.set('otp_generated', otp);

        var templateParams = {
            header: "Hi, " + params_guest_register.get("name") + " ,",
            message: "Thank you for registering with our hotel. To complete the registration process, please use the following One-Time Password (OTP):",
            reply_to: params_guest_register.get("email"),
            otp: otp
        };

        emailjs.send('service_qpgwb67', 'template_txt0u2y', templateParams).then(
                (response) => {
            alert("OTP is resend successfully send on your Email");
            resetOTPInputs();
            document.getElementById("otpPopup").style.display = "flex";
            guest_name = document.getElementById("guest_name").value = "";
            guest_phone = document.getElementById("guest_phone").value = "";
            guest_add = document.getElementById("guest_add").value = "";
            guest_email = document.getElementById("guest_email").value = "";
            guest_password = document.getElementById("guest_password_register").value = "";
            document.getElementById("disablebutton").style.display = "none";
            startCountdown();

        },
                (error) => {
            alert("Error sending email");
            guest_name = document.getElementById("guest_name").value = "";
            guest_phone = document.getElementById("guest_phone").value = "";
            guest_add = document.getElementById("guest_add").value = "";
            guest_email = document.getElementById("guest_email").value = "";
            guest_password = document.getElementById("guest_password_register").value = "";
        }
        );
    } else {
        alert('EmailJS library not loaded');
    }
    document.getElementById("disablebutton").style.display = "inline";
    document.getElementById("loaderactive_pop").style.display = "none";
//                document.getElementById("disablebutton").style.display = "inline";
    document.getElementById("disablebuttonsave").style.display = "inline";

}

function saveGuestData(newGuest) {
    let guests = JSON.parse(localStorage.getItem('guest_data')) || [];
    let emailExists = guests.some(guest => guest.email === newGuest.email);
    if (emailExists) {
        alert("Error: This email is already registered.");
        return false;
    }
    let lastGuestId = guests.length > 0 ? guests[guests.length - 1].guest_id : 100;
    newGuest.guest_id = lastGuestId + 1;
    guests.push(newGuest);
    localStorage.setItem('guest_data', JSON.stringify(guests));
    alert("Guest data saved successfully.");
    return true;
}

function saveOTP() {
    let otpInputs = document.querySelectorAll('.email-otp-input');
    let otp = '';
    for (let input of otpInputs) {
        if (input.value === '') {
            alert('Please enter all 6 digits of the OTP.');
            return;
        }
        otp += input.value;
    }
    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
//        const params = new URLSearchParams();
        if (otp === params_guest_register.get("otp_generated")) {
            document.getElementById("loaderactive_pop").style.display = "grid";
            document.getElementById("disablebuttonsave").style.display = "none";

            const guest_data = {
                "Name": params_guest_register.get("name"),
                "Phone": params_guest_register.get("phone"),
                "address": params_guest_register.get("address"),
                "email": params_guest_register.get("email"),
                "password": params_guest_register.get("password")
            };
            var check = saveGuestData(guest_data);
            if (check) {
                document.getElementById("otpPopup").style.display = "none";
                window.location = "guestLogin.html";
            }
        } else {
            alert("Your OTP did not match");
            resetOTPInputs();
        }
    } else {
        alert("Please enter a valid 6-digit OTP.");
    }

}



const forgot_password_guest = new URLSearchParams();
function change_guest_pass() {
    var isOkFilelds = true;
//    const params = new URLSearchParams();
    var user_name = document.getElementById("user_name").value;
    var user_email = document.getElementById("user_email").value;
    if (user_name === "" && user_email === "") {
        alert("All Filed Required");
        isOkFilelds = false;
    } else {
        if (user_name === "") {
            alert("Name is  Required");
            isOkFilelds = false;
        }
        if (user_email === "") {
            alert("Email is Required");
            isOkFilelds = false;
        }
    }
    if (user_email !== "") {
        if (!validateGmail(user_email)) {
            alert("Please enter a valid Gmail address.");
            isOkFilelds = false;
            document.getElementById("user_email").value = "";
        }
    }
    if (user_email !== 'admin@gmail.com') {
        if (isOkFilelds) {
            document.getElementById("loaderactive").style.display = "grid";
            document.getElementById("disablebutton").style.display = "none";

            let guests = JSON.parse(localStorage.getItem('guest_data')) || [];
            let guestIndex = guests.findIndex(guest => guest.email === user_email);
            if (guestIndex === -1) {
                alert("Error: Guest not found with the provided email.");
                document.getElementById("user_name").value = "";
                document.getElementById("user_email").value = "";
                document.getElementById("loaderactive").style.display = "none";
                document.getElementById("disablebutton").style.display = "inline";
                return;
            }


            if (user_name) {
                forgot_password_guest.append('name', user_name);
            }
            if (user_email) {
                forgot_password_guest.append('email', user_email);
            }



            var otp = Math.floor(Math.random() * 900000) + 100000;

            if (typeof emailjs !== 'undefined') {
                emailjs.init(public_key); // Replace with your public key

                var templateParams = {
                    header: "Hi, " + user_name + " ,",
                    message: "OTP For Change Guest Password. This OTP is valid for 5 minutes",
                    reply_to: user_email,
                    otp: otp
                };


                emailjs.send('service_qpgwb67', 'template_txt0u2y', templateParams).then(
                        (response) => {
                    alert("OTP is successfully send on your Email");
                    forgot_password_guest.append('otp_generated', otp);
                    startCountdown();
                    resetOTPInputs();
                    document.getElementById("otpPopup").style.display = "flex";
                    document.getElementById("user_name").value = "";
                    document.getElementById("user_email").value = "";

                },
                        (error) => {
                    alert("Error sending email");
                    document.getElementById("otpPopup").style.display = "none";
                    document.getElementById("user_name").value = "";
                    document.getElementById("user_email").value = "";
                }
                );
            } else {
                alert('EmailJS library not loaded');
            }
            document.getElementById("loaderactive").style.display = "none";
            document.getElementById("disablebutton").style.display = "inline";


        }
    } else {
        alert("This is Temp E-mail to Test The Website Inside");
        document.getElementById("user_name").value = "";
        document.getElementById("user_email").value = "";
    }
}


function resendemail_guest() {
    document.getElementById("loaderactive_pop").style.display = "grid";
    document.getElementById("disablebutton_pop").style.display = "none";
    document.getElementById("disablebuttonsave").style.display = "none";


    var otp = Math.floor(Math.random() * 900000) + 100000;

    if (typeof emailjs !== 'undefined') {
        emailjs.init(public_key); // Replace with your public key

        var templateParams = {
            header: "Hi, " + forgot_password_guest.get("name") + " ,",
            message: "OTP For Change Guest Password. This OTP is valid for 5 minutes",
            reply_to: forgot_password_guest.get("email"),
            otp: otp
        };


        emailjs.send('service_qpgwb67', 'template_txt0u2y', templateParams).then(
                (response) => {

            alert("OTP is resend successfully send on your Email");
            forgot_password_guest.set('otp_generated', otp);
            document.getElementById("old_password").value = "";
            document.getElementById("new_password").value = "";
            resetOTPInputs();
            startCountdown();

        },
                (error) => {
            alert("Error sending email! Please Try After Some Time");
            document.getElementById("otpPopup").style.display = "none";
            document.getElementById("user_name").value = "";
            document.getElementById("user_email").value = "";
        }
        );
    } else {
        alert('EmailJS library not loaded');
    }

    document.getElementById("loaderactive_pop").style.display = "none";
    document.getElementById("disablebuttonsave").style.display = "inline";
}

function updateGuestPassword(email, newPassword) {   
    let guestIndex = guest_json.findIndex(guest => guest.email === email.trim());
    if (guestIndex !== -1) {
        guest_json[guestIndex].password = newPassword;
        localStorage.setItem('guest_data', JSON.stringify(guest_json));
        alert("Password updated successfully.");
        return  true;
    } else {
        alert("Error: Guest not found with the provided email.");
//        document.getElementById("otpPopup").style.display = "none";
//        document.getElementById("user_name").value = "";
//        document.getElementById("user_email").value = "";
        return false;
    }
}


function save_guest_password() {
    let otpInputs = document.querySelectorAll('.email-otp-input');
    let otp = '';
    for (let input of otpInputs) {
        if (input.value === '') {
            alert('Please enter all 6 digits of the OTP.');
            return;
        }
        otp += input.value;
    }
    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
        var isOkFilelds = true;
        var old_password = document.getElementById("old_password").value;
        var new_password = document.getElementById("new_password").value;
        if (new_password === "" && old_password === "") {
            alert("All Filed Required");
            isOkFilelds = false;
        } else {

            if (new_password === "") {
                alert("Re-enter Password is Required");
                isOkFilelds = false;
            }
            if (old_password === "") {
                alert("Password is Required");
                isOkFilelds = false;
            }
        }
        if (new_password !== "") {
            if (!validatePassword(new_password)) {
                alert("Re-Eneter Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter.");
                document.getElementById("new_password").value = "";
                isOkFilelds = false;
            }
        }
        if (old_password !== "") {
            if (!validatePassword(old_password)) {
                alert("Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter.");
                document.getElementById("old_password").value = "";
                isOkFilelds = false;

            }
        }
        if (old_password !== "" && new_password !== "") {
            if (validatePassword(old_password) && validatePassword(new_password)) {
                if (old_password !== new_password) {
                    alert("Password is not match");
                    document.getElementById("new_password").value = "";
                    document.getElementById("old_password").value = "";
                    isOkFilelds = false;
                }
            }
        }

        if (isOkFilelds) {
            if (otp === forgot_password_guest.get("otp_generated")) {
                document.getElementById("loaderactive_pop").style.display = "grid";
                document.getElementById("disablebuttonsave").style.display = "none";
                document.getElementById("disablebutton_pop").style.display = "none";

                var check = updateGuestPassword(forgot_password_guest.get("email"), new_password);
                if (check) {
                    document.getElementById("loaderactive").style.display = "none";
                    document.getElementById("disablebuttonsave").style.display = "inline";
                    document.getElementById("disablebutton_pop").style.display = "inline";
                    window.location = "guestLogin.html";
                }

            } else {
                alert("Your OTP did not match");
                resetOTPInputs();
            }
        }
    } else {
        alert("Please enter a valid 6-digit OTP.");
    }
}









function resendOTP() {
    // Your logic to resend OTP
    resetOTPInputs();
    alert("OTP resent successfully!");
}

function resetOTPInputs() {
    let otpInputs = document.querySelectorAll('.email-otp-input');
    otpInputs.forEach((input, index) => {
        input.value = '';
        input.disabled = index !== 0;
    });
    otpInputs[0].focus();
}


function startCountdown() {
    var countdownElement = document.getElementById('countdown');
    var resendButton = document.getElementById('disablebutton_pop');

    var timeLeft = 30;

    var timer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timer);
            countdownElement.textContent = 'You can resend now';
            resendButton.disabled = false;
            resendButton.style.display = "inline";
        } else {
            countdownElement.textContent = 'Resend available in ' + timeLeft + ' seconds';
        }
        timeLeft -= 1;
    }, 1000);
}


function showFields() {
    var paymentMethod = document.getElementById("card_type").value;
    var cardFields = document.getElementById("cardFields");
    var holder_name = document.getElementById("holder_name");
    var card_number = document.getElementById("card_number");
    var exp_date = document.getElementById("exp_date");
    var cvv = document.getElementById("cvv");
    var upiImage = document.getElementById("upiImage");
    if (paymentMethod === "VISA" || paymentMethod === "Master Card" || paymentMethod === "Rupay Card") {
        cardFields.style.display = "block";
        holder_name.required = true;
        card_number.required = true;
        exp_date.required = true;
        cvv.required = true;
    } else {
        cardFields.style.display = "none";
        holder_name.required = false;
        card_number.required = false;
        exp_date.required = false;
        cvv.required = false;
        holder_name.value = "";
        card_number.value = "";
        exp_date.value = "";
        cvv.value = "";
    }
    if (paymentMethod === "UPI") {
        cardFields.style.display = "none";
        upiImage.style.display = "block";
        setTimeout(() => upiImage.style.opacity = 1, 100);
        holder_name.value = "";
        card_number.value = "";
        exp_date.value = "";
        cvv.value = "";
    }
}

function emptty_pop_up_fileds() {
//    document.getElementById("guest_name").value = "";
//    document.getElementById("guest_address").value = "";
//    document.getElementById("guest_email").value = "";
//    document.getElementById("checkin_date").value = "";
    document.getElementById("checkout_date").value = "";
    document.getElementById("card_type").value = "";
    document.getElementById("exampleInputAmount").value = "";
    document.getElementById("room_id").value = "";
// card details
    document.getElementById("holder_name").value = "";
    document.getElementById("card_number").value = "";
    document.getElementById("exp_date").value = "";
    document.getElementById("cvv").value = "";
}

function show_vacent_room(room_id) {
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
    let rooms_json_filter = rooms_json.filter(room => room.room_id === parseInt(room_id));
    const GusetEmailSession = sessionStorage.getItem('GusetEmail');
    if (GusetEmailSession !== 'admin@gmail.com') {
        let guest_json_filter = guest_json.filter(guest => guest.email === GusetEmailSession);
        emptty_pop_up_fileds();
        document.getElementById('otpPopup').style.display = 'flex';
        document.getElementById('room_no_display').innerHTML = rooms_json_filter[0].room_no;
        document.getElementById('price').value = rooms_json_filter[0].prize;
        document.getElementById('room_id').value = rooms_json_filter[0].room_id;
        document.getElementById('hotel_id').value = rooms_json_filter[0].hotel_id;
        document.getElementById('guest_email').value = guest_json_filter[0].email;
        document.getElementById('guest_address').value = guest_json_filter[0].address;
        document.getElementById('guest_name').value = guest_json_filter[0].Name;
        M.updateTextFields(); // This function updates the labels to their correct state
    } else {
        alert("This is the demo email. If you want to book a room, then Sign Up first.");
        return;
    }
}


function closePopup_bookRoom() {
    document.getElementById("otpPopup").style.display = "none";
}
function closePopup_geustDetails() {
    document.getElementById("editPopup").style.display = "none";
}

function getCurrentDateTimeFormatted() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const millisecond = String(now.getMilliseconds()).padStart(3, '0');
    return `INV${year}${month}${day}${hour}${minute}${second}${millisecond}`;
}

function update_room(targetRoomId) {
    let rooms_local = localStorage.getItem('rooms');
    if (rooms_local) {
        let rooms_json = JSON.parse(rooms_local);
        let roomUpdated = false;
        rooms_json.forEach(room => {
            if (room.room_id === parseInt(targetRoomId, 10)) {
                room.approve = "";    // Update the approve field
                room.pending = "P";      // Empty the pending field
                roomUpdated = true;    // Indicate that a room was updated
            }
        });
        if (roomUpdated) {
            localStorage.setItem('rooms', JSON.stringify(rooms_json));
        } else {
        }
    } else {

    }
}

function validateDates(check_in, check_out) {
    var checkInDate = new Date(check_in);
    var checkOutDate = new Date(check_out);

    if (checkOutDate < checkInDate) {
        return true; // Prevent further actions if needed
    }
    // If valid, you can proceed with your logic here
    return false;
}



function book_vacent_room() {
    var guest_name = document.getElementById("guest_name").value;
    var guest_address = document.getElementById("guest_address").value;
    var guest_email = document.getElementById("guest_email").value;
    var check_in = document.getElementById("checkin_date").value;
    var check_out = document.getElementById("checkout_date").value;
    var card_type = document.getElementById("card_type").value;
    var price = document.getElementById("exampleInputAmount").value;
    var room_id = document.getElementById("room_id").value;
    var hotel_id = document.getElementById("hotel_id").value;

// card details
    var holder_name = document.getElementById("holder_name").value;
    var card_number = document.getElementById("card_number").value;
    var exp_date = document.getElementById("exp_date").value;
    var cvv = document.getElementById("cvv").value;

    if (!guest_name || !guest_address || !guest_email || !check_in || !check_out || !card_type || !price) {
        alert("All fields are required");
        return;
    } else if (card_type !== 'UPI') {
        if (!holder_name || !cvv || !exp_date || !card_number) {
            alert("Card Details are Required");
            return;
        }
    }


    const dateOne = new Date(check_in);
    const dateTwo = new Date(check_out);
    const timeDiff = Math.abs(dateTwo - dateOne);
    var days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    var room_price = price / days;
    var currentdate = new Date();


    var filteredDataRoom = rooms_json.filter(rooms => rooms.room_id === parseInt(room_id, 10));

    if (validateDates(check_in, check_out)) {
        alert("Checkout details Wrong");
        document.getElementById("guest_name").value = "";
        document.getElementById("guest_address").value = "";
        document.getElementById("guest_email").value = "";
        document.getElementById("checkin_date").value = "";
        document.getElementById("checkout_date").value = "";
        document.getElementById("card_type").value = "";
        document.getElementById("exampleInputAmount").value = "";
        return;
    }

    const booking_details =
            {
                "email": guest_email,
                "room_id": room_id,
                "class": filteredDataRoom[0].class,
                "beds": filteredDataRoom[0].beds,
                "floor": filteredDataRoom[0].floor,
                "ac": filteredDataRoom[0].ac_nonac,
                "room_prize": room_price,
                "booking_price": price,
                "date_time": currentdate,
                "days_stay": days,
                "check_in": check_in,
                "check_out": check_out,
                "payment_mode": card_type,
                "invoice_no": getCurrentDateTimeFormatted(),
                "who_book": "G",
                "approve_date": "",
                "disapprove_date": null,
                "card_no": card_type === 'UPI' ? "------" : card_number,
                "card_name": card_type === 'UPI' ? "----" : holder_name,
                "cvv": card_type === 'UPI' ? "----" : cvv,
                "month": card_type === 'UPI' ? "---" : exp_date,
                "year": card_type === 'UPI' ? "----" : exp_date,
                "guest_name": guest_name,
                "guest_address": guest_address,
                "reservation_status": "UR",
                "approve_status": "P",
                "checkout_date": "",
                "show_invoice": "Y",
                "hotel_id": parseInt(hotel_id)
            };

    update_room(room_id);
    let bookinDetails = JSON.parse(localStorage.getItem('booking_details')) || [];
    let lastBookingId = bookinDetails.length > 0 ? bookinDetails[bookinDetails.length - 1].booking_id : 100;
    booking_details.booking_id = lastBookingId + 1;
    bookinDetails.push(booking_details);
    localStorage.setItem('booking_details', JSON.stringify(bookinDetails));


    document.getElementById('otpPopup').style.display = 'none';
    document.getElementById("guest_name").value = "";
    document.getElementById("guest_address").value = "";
    document.getElementById("guest_email").value = "";
    document.getElementById("checkin_date").value = "";
    document.getElementById("checkout_date").value = "";
    document.getElementById("card_type").value = "";
    document.getElementById("exampleInputAmount").value = "";
    alert("Room Booked successfully.");
    window.location = "guestHomePage.html";

}

function calculate_price() {
    var checkinDate = document.getElementById("checkin_date").value;
    var price = document.getElementById("price").value;
    var checkoutDate = document.getElementById("checkout_date").value;
    const dateOne = new Date(checkinDate);
    const dateTwo = new Date(checkoutDate);
    const timeDiff = Math.abs(dateTwo - dateOne);
    var days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    var totalPrice = days * price;
    document.getElementById("exampleInputAmount").value = totalPrice.toFixed(2);
    M.updateTextFields(); // This function updates the labels to their correct state
}


function getDetails(email) {
    const filteredData = guest_json.filter(guest => guest.email === email);
    if (filteredData.length > 0) {
        // If email is found
        const guest = filteredData[0];
        document.getElementById("guest_name").value = guest.Name;
        document.getElementById("guest_address").value = guest.address;
        document.getElementById("guest_address").readOnly = true;
        document.getElementById("guest_name").readOnly = true;
        M.updateTextFields(); // This function updates the labels to their correct state

    } else {
        // If email is not found
        document.getElementById("guest_name").value = "";
        document.getElementById("guest_address").value = "";
        document.getElementById("guest_address").readOnly = false;
        document.getElementById("guest_name").readOnly = false;
    }

}

function formatDateTime(isoString) {
    // Parse the ISO string into a Date object
    const date = new Date(isoString);
    // Format the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Construct the formatted string
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getRoomNumberById(room_id) {
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

    const room_no = filteredRooms.find(room => room.room_id === parseInt(room_id));
    return room_no ? room_no.room_no : 'Unknown Room';
}

function populatePaymentGuest() {
    const session_guest_email = sessionStorage.getItem('GusetEmail');
    footerFunction();
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    const booking_local = localStorage.getItem('booking_details');
    const bookingParsedData = JSON.parse(booking_local);


    const filteredData = bookingParsedData.filter(booking => booking.email === session_guest_email && (booking.approve_status === "A" || booking.reservation_status === "CO"));
    filteredData.sort((a, b) => a.room_id - b.room_id);

    if (filteredData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="10" style="text-align: center;">No booking data available</td></tr>';
        return;
    }

    filteredData.forEach(booking => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${booking.email}</td>
            <td>${getRoomNumberById(booking.room_id)}</td>
            <td>${booking.room_prize}</td>
            <td>${booking.reservation_status === "CO" ? "Checked Out" : "Confirmed"}</td>
            <td>${booking.check_in}</td>
            <td>${booking.check_out}</td>
            <td>${formatDateTime(booking.date_time)}</td>
            <td>${booking.days_stay}</td>
            <td style="text-align: center">
                <button class="btn waves-effect waves-light"   role="button" onclick="generatePDF('${booking.booking_id}')">Download Invoice</button>
            </td>           
        `;
        tableBody.appendChild(row);
    });
}


function getHotelNameById(hotel_id) {
    const hotel = hotel_json.find(hotel => hotel.hotel_id === hotel_id);
    return hotel ? hotel.hotel_name : 'Unknown Hotel';
}

function generatePDF(booking_id) {
    const booking_local = localStorage.getItem('booking_details');
    const bookingParsedData = JSON.parse(booking_local);
    const invoiceData = bookingParsedData.filter(booking => booking.booking_id === parseInt(booking_id));
    const {jsPDF} = window.jspdf;
    const pdf = new jsPDF();

    // Add Hotel Name and Invoice Title
    pdf.setFont('times', 'bold');
    pdf.setFontSize(16);
    pdf.text(getHotelNameById(invoiceData[0].hotel_id), pdf.internal.pageSize.getWidth() / 2, 20, {align: 'center'});
    pdf.setFontSize(14);
    pdf.text('Hotel Invoice', pdf.internal.pageSize.getWidth() / 2, 30, {align: 'center'});

    // Add Invoice Details
    pdf.setFont('times', 'normal');
    pdf.setFontSize(12);
    pdf.text(`Invoice Number: ${invoiceData[0].invoice_no}`, 20, 50);
    pdf.text(`Customer Name: ${invoiceData[0].guest_name}`, 20, 60);
    pdf.text(`Address: ${invoiceData[0].guest_address}`, 20, 70);
    pdf.text(`Payment Mode: ${invoiceData[0].payment_mode}`, 20, 80);
    pdf.text(`Invoice Date: ${formatDateTime(invoiceData[0].date_time)}`, 20, 90);

    // Add QR Code
    const qr = new QRious({
        value: 'https://anuj0806.github.io/Sun-Shine-Hotel/',
        size: 100
    });
    const qrImage = qr.toDataURL();
    pdf.addImage(qrImage, 'PNG', 150, 50, 50, 50);

    // Add Room Details Table
    pdf.text('Room Details', 20, 110);
    pdf.autoTable({
        startY: 120,
        head: [['Room Number', 'Room Type', 'Check-in', 'Check-out', 'Price per Night', 'Status']],
        body: [
            [
                invoiceData[0].room_id,
                invoiceData[0].ac,
                invoiceData[0].check_in,
                invoiceData[0].check_out,
                invoiceData[0].room_prize,
                invoiceData[0].approve_status === 'A' && invoiceData.reservation_status === 'CO' ? 'Check Out' : 'Confirmed'
            ]
        ]
    });

    // Add Total Amount
    pdf.setFontSize(14);
    pdf.text(`Total Amount: $${invoiceData[0].booking_price}`, 160, pdf.previousAutoTable.finalY + 20, {align: 'right'});

    // Add Footer
    pdf.setFontSize(12);
    pdf.text('Thank you for using Our Hotel Service.', pdf.internal.pageSize.getWidth() / 2, pdf.previousAutoTable.finalY + 40, {align: 'center'});
    pdf.text('(This is a computer-generated invoice, no signature required)', pdf.internal.pageSize.getWidth() / 2, pdf.previousAutoTable.finalY + 50, {align: 'center'});

    // Download the PDF
    pdf.save(`${invoiceData[0].guest_name}_${invoiceData[0].invoice_no}.pdf`);
}





function display_guest_details() {

    const GusetEmailSession = sessionStorage.getItem('GusetEmail');
    if (GusetEmailSession !== 'admin@gmail.com') {
        let guest_json_data = guest_json.filter(guest => guest.email === GusetEmailSession);

        document.getElementById('editPopup').style.display = 'flex';
        document.getElementById('guest_name_header').innerHTML = guest_json_data[0].Name;

        document.getElementById('guest_name_edit').value = guest_json_data[0].Name;
        document.getElementById('guest_email_edit').value = guest_json_data[0].email;
        document.getElementById('guest_phone').value = guest_json_data[0].Phone;
        document.getElementById('guest_add').value = guest_json_data[0].address;
        document.getElementById('geust_id').value = guest_json_data[0].guest_id;
        M.updateTextFields(); // This function updates the labels to their correct state
    } else {
        alert("This is the demo email. If you want to Check website, then Sign Up first.");
        return;
    }
}





function saveGuestDetais() {
    var guest_name = document.getElementById('guest_name_edit').value;
    var guest_email = document.getElementById('guest_email_edit').value;
    var guest_phone = document.getElementById('guest_phone').value;
    var guest_add = document.getElementById('guest_add').value;
    var guest_id = document.getElementById('geust_id').value;

    let guest_data_local = localStorage.getItem('guest_data');

    if (guest_data_local) {
        let guest_data = JSON.parse(guest_data_local);
        let guestUpdated = false;

        guest_data.forEach(guest => {
            if (guest.guest_id === parseInt(guest_id, 10)) {
                guest.Name = guest_name;      // Update the Name field
                guest.Phone = guest_phone;     // Update the Phone field
                guest.address = guest_add;   // Update the address field
                guest.email = guest_email;     // Update the email field
                guestUpdated = true;   // Indicate that the guest data was updated
            }
        });
        if (guestUpdated) {
            localStorage.setItem('guest_data', JSON.stringify(guest_data));
            alert(`Guest data for guest_id ${guest_id} has been updated.`);
        } else {
            alert(`No guest found with guest_id ${guest_id}.`);
        }
    } else {
        alert('No guest data found in localStorage.');
    }
}
