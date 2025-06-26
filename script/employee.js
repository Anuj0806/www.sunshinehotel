// Function to dynamically load a script
var public_key = "Bc6Q0uME5PARDagYq";

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


function closePopup() {
    var confirmation = confirm("If you quit, then you need to register again.");
    if (confirmation) {
        document.getElementById("otpPopup").style.display = "none";
    }
}
function closePopup_bookRoom() {
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
            resendButton.disabled = true;
            resendButton.style.display = "none";
        }
        timeLeft -= 1;
    }, 1000);
}

function footerFunction() {

    document.querySelectorAll(".footer_data").forEach(function (element) {
        element.innerHTML = "RAJ HOTELS";
    });
    document.querySelectorAll(".footer_data_lic").forEach(function (element) {
        element.innerHTML = "&copy; 2023 RAJ HOTELS";
    });
}

function hotelNameFunction() {
    const hotelName = sessionStorage.getItem('employeeHotelName');
    document.getElementById('hotelName').textContent = hotelName;
    document.getElementById('hotelName').textContent = hotelName;

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


function generateRandomString(len) {
    const valid = "abcdefghijklmnopqr@#$%&stuvwxyzABCDEFGH@#$%&IJKLMNOPQRS@#$%&TUVWXYZ0123456789";
    let st = '';

    for (let i = 0; i < len; i++) {
        st += valid.charAt(Math.floor(Math.random() * valid.length));
    }
    return st;
}


const rooms = [

    {
        "photo": "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
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
]

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


const employee_login = [
    {
        "emp_id": 1,
        "emp_id_hotel": "H1001",
        "name": "John Doe",
        "address": "123 Main St, Cityville",
        "phone": 9876543210,
        "email": "employee@gmail.com",
        "password": "1234",
        "type": "A",
        "hotel_id": 1
    }
];

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

const rooms_local = localStorage.getItem('rooms');
let rooms_json = rooms;

try {
    if (rooms_local) {
        const parsedData = JSON.parse(rooms_local);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
            rooms_json = rooms_json.concat(parsedData);
        }
    }
} catch (e) {
    console.error('Error parsing localStorage data:', e);
}

const employee_local = localStorage.getItem('employee_login');
let employee_json = employee_login;

try {
    if (employee_local) {
        const parsedData = JSON.parse(employee_local);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
            employee_json = employee_json.concat(parsedData);
        }
    }
} catch (e) {
    console.error('Error parsing localStorage data:', e);
}

function getlogin_data_employee() {
    var isOkFilelds = true;
    var employee_username = document.getElementById("employee_username").value;
    var employee_password = document.getElementById("employee_password_login").value;

    if (employee_username === "" && employee_password === "") {
        alert("All Fields Required");
        isOkFilelds = false;
    } else {
        if (employee_username === "") {
            alert("Email is Required");
            isOkFilelds = false;
        }
        if (employee_password === "") {
            alert("Password is Required");
            isOkFilelds = false;
        }
    }

    if (employee_username !== "") {
        if (!validateGmail(employee_username)) {
            alert("Please enter a valid Gmail address.");
            isOkFilelds = false;
            document.getElementById("employee_username").value = "";
        }
    }

    if (isOkFilelds) {

        document.getElementById("loaderactive_login").style.display = "grid";
        document.getElementById("disablebutton_login").style.display = "none";

        // Check if the email and password match an entry in the employee_login array
//            const employee = employee_login.find(emp => emp.email === employee_username && emp.password === employee_password);
//            
//            
//             const employeesArrayString = localStorage.getItem("employee_login_hotel");
//             
//            const employee_local_sto = employeesArrayString.find(emp => emp.email === employee_username && emp.password === employee_password);

        const employeeInArray = employee_login.find(emp => emp.email === employee_username && emp.password === employee_password);

        // Retrieve and parse data from localStorage
        const employeesArrayString = localStorage.getItem("employee_login");
        const employeesArray = employeesArrayString ? JSON.parse(employeesArrayString) : [];

        // Check in parsed localStorage data
        const employeeInLocalStorage = employeesArray.find(emp => emp.email === employee_username && emp.password === employee_password);

        // Determine which employee object to use
        const employee = employeeInArray || employeeInLocalStorage;

        if (employee) {

            function getHotelNameById(hotel_id) {
                const hotel = hotel_json.find(hotel => hotel.hotel_id === hotel_id);
                return hotel ? hotel.hotel_name : 'Unknown Hotel';
            }

            sessionStorage.setItem('employeeEmail', employee_username);
            sessionStorage.setItem('employeeHotelId', employee.hotel_id);
            sessionStorage.setItem('employeeType', employee.type);
            sessionStorage.setItem('employeeHotelName', getHotelNameById(employee.hotel_id));

            if (employee.type === "R" || employee.type === "SA") {
                alert('Welcome Employee');
                window.location = 'employee_homepage.html';
            } else if (employee.type === "A") {
                alert("Welcome Admin");
                window.location = "employee_homepage.html";
            }
            document.getElementById("employee_username").value = "";
            document.getElementById("employee_password_login").value = "";

            document.getElementById("loaderactive_login").style.display = "none";
            document.getElementById("disablebutton_login").style.display = "block";

        } else {
            // Login failed
            alert("Invalid email or password.");
            document.getElementById("employee_username").value = "";
            document.getElementById("employee_password_login").value = "";

            document.getElementById("loaderactive_login").style.display = "none";
            document.getElementById("disablebutton_login").style.display = "block";
        }
    }
}



function add_hotel_details() {
    var isOkFilelds = true;
    var employee_Username = document.getElementById("employee_Username").value;
    var employee_add = document.getElementById("employee_add").value;
    var employee_phone = document.getElementById("employee_phone").value;
    var employee_email = document.getElementById("employee_email").value;
    var employee_password = generateRandomString(10);
    var hotel_name = document.getElementById("hotel_name").value;
    var hotel_add = document.getElementById("hotel_add").value;
    var employee_addhar = document.getElementById("employee_addhar").value;
    var employee_pan = document.getElementById("employee_pan").value;

    if (employee_Username === "" || employee_add === "" || employee_phone === "" || employee_email === ""
            || hotel_name === "" || hotel_add === "" || employee_addhar === "" || employee_pan === "") {
        alert("All fields are required.");
        isOkFilelds = false;
    } else if (!validatePANString(employee_pan)) {
        alert("Please enter a valid PAN Number.");
        document.getElementById("employee_pan").value = "";
        isOkFilelds = false;
    } else if (!validate16Digits(employee_addhar) || !validphonenumber(employee_addhar)) {
        alert("Aadhaar number should be 16 digits.");
        document.getElementById("employee_addhar").value = "";
        isOkFilelds = false;
    } else if (!validate10Digits(employee_phone) || !validphonenumber(employee_phone)) {
        alert("Phone number should be 10 digits.");
        document.getElementById("employee_phone").value = "";
        isOkFilelds = false;
    } else if (!validateGmail(employee_email)) {
        alert("Please enter a valid Gmail address.");
        isOkFilelds = false;
        document.getElementById("employee_email").value = "";
    }

    if (isOkFilelds) {
        document.getElementById("loaderactive_login").style.display = "grid";
        document.getElementById("disablebutton_login").style.display = "none";
//        setTimeout(() => {
            // Retrieve the existing array from localStorage
            const employeesArrayString = localStorage.getItem("employee_login");
            const employeesArray = employeesArrayString ? JSON.parse(employeesArrayString) : [];

            //hotel data
            const hotelArrayString = localStorage.getItem("hotels_data");
            const hotelArray = hotelArrayString ? JSON.parse(hotelArrayString) : [];
            // Check if the email already exists in the array
            const emailExists = employeesArray.some(emp => emp.email === employee_email);

            if (emailExists) {
                alert("An employee with this email already exists.");
                employee_Username = document.getElementById("employee_Username").value = "";
                employee_add = document.getElementById("employee_add").value = "";
                employee_phone = document.getElementById("employee_phone").value = "";
                employee_email = document.getElementById("employee_email").value = "";
//            employee_password = document.getElementById("employee_password").value = "";
                hotel_name = document.getElementById("hotel_name").value = "";
                hotel_add = document.getElementById("hotel_add").value = "";
                employee_addhar = document.getElementById("employee_addhar").value = "";
                employee_pan = document.getElementById("employee_pan").value = "";
                document.getElementById("loaderactive_login").style.display = "none";
                document.getElementById("disablebutton_login").style.display = "inline";
                return;
            }

            // If email does not exist, proceed with adding the new employee data
            const lastEmpId = localStorage.getItem("lastEmpId");
            const lastEmpIdNumber = lastEmpId ? parseInt(lastEmpId, 10) : 1;
            const nextEmpId = lastEmpIdNumber + 1;

            const lastHotelId = localStorage.getItem("lastHotelId");
            const lastHotelIdNumber = lastHotelId ? parseInt(lastHotelId, 10) : 1;
            const nextHotelId = lastHotelIdNumber + 1;

            const employee_login_hotel = {
                "emp_id": nextEmpId,
                "emp_id_hotel": "SUNEMP" + nextEmpId,
                "name": employee_Username,
                "address": employee_add,
                "phone": employee_phone,
                "email": employee_email,
                "password": employee_password,
                "type": "A",
                "hotel_id": nextHotelId
            };
            
            const hotel_details = {
                "hotel_id": nextHotelId,
                "hotel_name": hotel_name,
                "hotel_address": hotel_add,
                "hotel_mobile": employee_phone,
                "addhar_card": employee_addhar,
                "pan_card": employee_pan
            };
         
            if (typeof emailjs !== 'undefined') {
                    emailjs.init(public_key); // Replace with your public key

                var templateParams = {
                    employee_id: "SUNEMP" + nextEmpId,               
                    reply_to: employee_email,
                    User_password: employee_password,
                    User_name: employee_email,
                    message: "Thank you for joining our Hotel Management System. You are now registered as a hotel owner.\n\
                                    Here are your login details:"
                };

                emailjs.send('service_qpgwb67', 'template_ur5e3q4', templateParams).then(
                        (response) => {
                 
                    alert("Successfully added a hotel. Please login. The username and password will be sent to your email address.");
                    // Add the new employee data to the array
                    employeesArray.push(employee_login_hotel);
                    // Add the new hotel data to the array
                    hotelArray.push(hotel_details);

                    localStorage.setItem("employee_login", JSON.stringify(employeesArray));
                    localStorage.setItem("hotels_data", JSON.stringify(hotelArray));
                    localStorage.setItem("lastEmpId", nextEmpId); // Store the latest employee ID
                    localStorage.setItem("lastHotelId", nextHotelId); // Store the latest employee ID

                    employee_Username = document.getElementById("employee_Username").value = "";
                    employee_add = document.getElementById("employee_add").value = "";
                    employee_phone = document.getElementById("employee_phone").value = "";
                    employee_email = document.getElementById("employee_email").value = "";
                    hotel_name = document.getElementById("hotel_name").value = "";
                    hotel_add = document.getElementById("hotel_add").value = "";
                    employee_addhar = document.getElementById("employee_addhar").value = "";
                    employee_pan = document.getElementById("employee_pan").value = "";
                    window.location = "employee_login.html";

                    document.getElementById("loaderactive_login").style.display = "none";
                    document.getElementById("disablebutton_login").style.display = "inline";
                },
                        (error) => {
                    alert("Error sending email");
                    employee_Username = document.getElementById("employee_Username").value = "";
                    employee_add = document.getElementById("employee_add").value = "";
                    employee_phone = document.getElementById("employee_phone").value = "";
                    employee_email = document.getElementById("employee_email").value = "";
                    hotel_name = document.getElementById("hotel_name").value = "";
                    hotel_add = document.getElementById("hotel_add").value = "";
                    employee_addhar = document.getElementById("employee_addhar").value = "";
                    employee_pan = document.getElementById("employee_pan").value = "";

                    document.getElementById("loaderactive_login").style.display = "none";
                    document.getElementById("disablebutton_login").style.display = "inline";
                }
                );
            } else {
                alert('EmailJS library not loaded');
            }

//        }, 2000); // 2 seconds delay
        employee_Username = document.getElementById("employee_Username").value = "";
        employee_add = document.getElementById("employee_add").value = "";//ejw te2401
        employee_phone = document.getElementById("employee_phone").value = "";
        employee_email = document.getElementById("employ ee_email").value = "";
        hotel_name = document.getElementById("hotel_name").value = "";
        hotel_add = document.getElementById("hotel_add").value = "";
        employee_addhar = document.getElementById("employee_addhar").value = "";
        employee_pan = document.getElementById("employee_pan").value = "";

        document.getElementById("loaderactive_login").style.display = "none";
        document.getElementById("disablebutton_login").style.display = "inline";
    }
}








//reset employee Password
const forgot_password_employee = new URLSearchParams();
function change_employee_pass() {
    var isOkFilelds = true;
    var employee_id = document.getElementById("user_name").value;
//    alert(employee_id);
    var user_email = document.getElementById("user_email").value;
    if (employee_id === "" && user_email === "") {
        alert("All Filed Required");
        isOkFilelds = false;
    } else {
        if (employee_id === "") {
            alert("Employee ID is  Required");
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
    if (user_email !== 'employee@gmail.com') {
        if (isOkFilelds) {
            const employeesArrayString = localStorage.getItem("employee_login");
            const employeesArray = employeesArrayString ? JSON.parse(employeesArrayString) : [];
            const emailExists = employeesArray.some(emp => emp.email === user_email && emp.emp_id_hotel === employee_id);
            if (!emailExists) {
                alert("An employee with this email is not exists.");
                document.getElementById("user_name").value = "";
                document.getElementById("user_email").value = "";
                return;
            }
            document.getElementById("loaderactive").style.display = "grid";
            document.getElementById("disablebutton").style.display = "none";
            setTimeout(() => {
                var otp = Math.floor(Math.random() * 900000) + 100000;
                if (employee_id) {
                    forgot_password_employee.append('employee_id', employee_id);
                }
                if (user_email) {
                    forgot_password_employee.append('email', user_email);
                }
                if (otp) {
                    forgot_password_employee.append('otp_generated', otp);
                }

                if (typeof emailjs !== 'undefined') {
                    emailjs.init(public_key); // Replace with your public key

                    var templateParams = {
                        header: "Hi, Your Employee ID is  " + employee_id + " ,",
                        message: "OTP For Change Employee Password. This OTP is valid for 5 minutes",
                        reply_to: user_email,
                        otp: otp
                    };


                    emailjs.send('service_qpgwb67', 'template_txt0u2y', templateParams).then(
                            (response) => {
                        alert("OTP is successfully send on your Email");
                        resetOTPInputs();
                        document.getElementById("otpPopup").style.display = "flex";
                        document.getElementById("user_name").value = "";
                        document.getElementById("user_email").value = "";
                        startCountdown();
                    },
                            (error) => {
                        alert("Error sending email");
                        document.getElementById("user_name").value = "";
                        document.getElementById("user_email").value = "";
                    }
                    );
                } else {
                    alert('EmailJS library not loaded');
                }
            }, 2000); // 2 seconds delay
        }
    } else {
        alert("This is Temp E-mail to Test The Website Inside");
        document.getElementById("user_name").value = "";
        document.getElementById("user_email").value = "";
    }
}


function resendemail_employee() {
    document.getElementById("loaderactive_pop").style.display = "grid";
    document.getElementById("disablebutton_pop").style.display = "none";
    document.getElementById("disablebuttonsave").style.display = "none";
    var otp = Math.floor(Math.random() * 900000) + 100000;
    if (typeof emailjs !== 'undefined') {
        emailjs.init(public_key); // Replace with your public key

        var templateParams = {
            header: "Hi, Your Employee ID is  " + forgot_password_employee.get("employee_id") + " ,",
            message: "OTP For Change Employee Password. This OTP is valid for 10 minutes",
            reply_to: forgot_password_employee.get("email"),
            otp: otp
        };
        emailjs.send('service_qpgwb67', 'template_txt0u2y', templateParams).then(
                (response) => {
            alert("OTP is resend successfully send on your Email");
            resetOTPInputs();
            forgot_password_employee.set('otp_generated', otp);
            document.getElementById("otpPopup").style.display = "flex";
            document.getElementById("user_name").value = "";
            document.getElementById("user_email").value = "";
            document.getElementById("disablebutton_pop").style.display = "none";
            document.getElementById("disablebuttonsave").style.display = "inline";
            document.getElementById("loaderactive_pop").style.display = "none";
            startCountdown();
        },
                (error) => {
            alert("Error sending email");
            document.getElementById("user_name").value = "";
            document.getElementById("user_email").value = "";
        }
        );
    } else {
        alert('EmailJS library not loaded');
    }
}


function save_employee_password() {
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
            if (otp === forgot_password_employee.get("otp_generated")) {
                const params = new URLSearchParams();
                document.getElementById("loaderactive_pop").style.display = "grid";
                document.getElementById("disablebuttonsave").style.display = "none";

                let employeeData = JSON.parse(localStorage.getItem('employee_login')) || [];
                // Find the employee with the matching emp_id and email
                let employee = employeeData.find(emp => emp.emp_id_hotel === forgot_password_employee.get("employee_id") && emp.email === forgot_password_employee.get("email"));
                if (employee) {
                    // Update the password
                    employee.password = new_password;
                    // Save the updated data back to localStorage
                    localStorage.setItem('employee_login', JSON.stringify(employeeData));
                    alert('Password updated successfully.');
                    document.getElementById("otpPopup").style.display = "none";
                    window.location = "employee_login.html";
                } else {
                    alert('Employee not found.');
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







function populate_rooms() {

    const tableBody = document.querySelector('.scrollit tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    const hotels_id_storage = parseInt(sessionStorage.getItem('employeeHotelId'), 10);
//    const hotels_id_storage = ;
    const employeeEmail = sessionStorage.getItem('employeeEmail');
    let filteredData;
    if (employeeEmail === 'employee.gmail.com') {
        filteredData = rooms_json.filter(rooms => rooms.hotel_id === hotels_id_storage && rooms.room_id === 1);
    } else {
        filteredData = rooms_json.filter(rooms => rooms.hotel_id === hotels_id_storage && rooms.room_id !== 1);
    }


    filteredData.sort((a, b) => a.room_id - b.room_id);
    if (filteredData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No rooms data available</td></tr>';
        return;
    }

    filteredData.forEach(room => {
        const row = document.createElement('tr');

        // Construct the row's inner HTML
        row.innerHTML = `
        <td>${room.room_no}</td>
        <td>${room.class}</td>
        <td>${room.beds}</td>
        <td>${room.floor}</td>
        <td>${room.ac_nonac}</td>
        <td>${room.prize}</td>`;

        // Conditionally add the delete button only if room_id is not 1
        if (room.room_id !== 1) {
            row.innerHTML += `
            <td style="text-align: center">
                <a onclick="return edit_rooms('${room.room_id}');">
                    <button class="btn waves-effect waves-light"    role="button">Edit</button>
                </a>
            </td>
            <td style="text-align: center">
                <a onclick="return rooms_delete('${room.room_id}');">
                    <button class="btn waves-effect waves-light"   role="button">Delete</button>
                </a>
            </td>`;
        } else {
            row.innerHTML += `<td colspan='2'>Demo Data</td>`; // Add an empty cell if no delete button is added
        }

        tableBody.appendChild(row);
    });
}


function edit_rooms(room_id) {
    document.getElementById("otpPopup").style.display = "flex";
    const filteredData = rooms_json.filter(rooms => rooms.room_id === parseInt(room_id));
    filteredData.forEach(room => {
        console.log(room);
        document.getElementById("room_id_display").innerHTML = room.room_no;
        document.getElementById("room_no").value = room.room_no;
        document.getElementById("beds").value = room.beds;
        document.getElementById("floor").value = room.floor;
        document.getElementById("ac_nonac").value = room.ac_nonac;
        document.getElementById("price").value = room.prize;
        document.getElementById("room_class").value = room.class;
        document.getElementById("room_id").value = room.room_id;
        document.getElementById("message").value = room.description;
        // Re-initialize Materialize select elements
        M.FormSelect.init(document.querySelectorAll('select'));

        // Update the text fields to refresh their labels
        M.updateTextFields();
    });
}
function saveEditRoom() {
    var room_id = document.getElementById("room_id").value;
    var beds = document.getElementById("beds").value;
    var floor = document.getElementById("floor").value;
    var ac_nonac = document.getElementById("ac_nonac").value;
    var price = document.getElementById("price").value;
    var room_class = document.getElementById("room_class").value;
    var message = document.getElementById("message").value;

    if (!beds || !floor || !ac_nonac || !price || !room_class) {
        alert("All Field Required");
        return;
    }

    // Save the updated details back to local storage
    let roomLocal = JSON.parse(localStorage.getItem('rooms')) || [];
    const roomIndex = roomLocal.findIndex(rooms => rooms.room_id === parseInt(room_id, 10));
    if (roomIndex !== -1) {
        roomLocal[roomIndex].beds = beds;
        roomLocal[roomIndex].floor = floor;
        roomLocal[roomIndex].ac_nonac = ac_nonac;
        roomLocal[roomIndex].prize = price;
        roomLocal[roomIndex].class = room_class;
        roomLocal[roomIndex].description = message;

        localStorage.setItem('rooms', JSON.stringify(roomLocal));
        alert('Room Update successfully.');
        window.location = "edit_room.html";
    } else {
        console.log('room with the specified ID not found.');
    }
}







function add_new_employee() {
    const employeeEmail = sessionStorage.getItem('employeeEmail');
    if (employeeEmail === 'employee@gmail.com') {
        alert("This is the demo email. If you want to add a room,If you want to add room please add Hotel first");
        window.location = "addEmployee.html"
        return;
    }
    var isOkFilelds = true;
    const params = new URLSearchParams();
    var emp_id = document.getElementById("emp_id").value;
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var number = document.getElementById("number").value;
    var email = document.getElementById("email").value;
    var password = generateRandomString(12);
    var emp_type = document.getElementById("emp_type").value;

    if (emp_id === "" && name === "" && address === "" && number === "" && email === "" && emp_type === "") {
        alert("All Filed Required");
        isOkFilelds = false;
    } else if (emp_id === "") {
        alert("Employee ID is  Required");
        isOkFilelds = false;
    } else if (name === "") {
        alert("Name is Required");
        isOkFilelds = false;
    } else if (address === "") {
        alert("Address is Required");
        isOkFilelds = false;
    } else if (number === "") {
        alert("Employee Number is  Required");
        isOkFilelds = false;
    } else if (email === "") {
        alert("Email is Required");
        isOkFilelds = false;
    } else if (emp_type === "") {
        alert("Employee Type is Required");
        isOkFilelds = false;
    }
    if (number !== "") {
        if (!validphonenumber(number)) {
            alert("Please enter a valid phone number.");
            document.getElementById("number").value = "";
            isOkFilelds = false;
        }
    }
    if (email !== "") {
        if (!validateGmail(email)) {
            alert("Please enter a valid Gmail address.");
            document.getElementById("email").value = "";
            isOkFilelds = false;
        }
    }



    if (isOkFilelds) {
        let employee_json = JSON.parse(localStorage.getItem('employee_login')) || [];
        var employeeIndexID = employee_json.findIndex(employee => employee.emp_id_hotel === emp_id.trim());
        if (employeeIndexID !== -1) {
            alert("Error: This Employee ID is Already Exist");
            document.getElementById("emp_id").value = "";
            return;
        }

        var confirmation = confirm("Check the Email once ageain! The Password of the employee send on this Email. The email :-" + email);
        if (!confirmation) {
            document.getElementById("email").value = "";
            return;
        }


        document.getElementById("loaderactive").style.display = "grid";
        document.getElementById("disablebutton").style.display = "none";


        let employeeIndex = employee_json.findIndex(employee => employee.email === email);
        if (employeeIndex !== -1) {
            alert("Error: Employee is already registered with this email.");
            document.getElementById("loaderactive").style.display = "none";
            document.getElementById("disablebutton").style.display = "inline";
            document.getElementById("emp_id").value = "";
            document.getElementById("name").value = "";
            document.getElementById("address").value = "";
            document.getElementById("number").value = "";
            document.getElementById("email").value = "";
            document.getElementById("emp_type").value = "";
            return;
        }
        setTimeout(() => {

            if (typeof emailjs !== 'undefined') {
                emailjs.init(public_key); // Replace with your public key

                var templateParams = {
                    employee_id: emp_id,
                    reply_to: email,
                    User_name: email,
                    User_password: password,
                    message: "Thank you for choosing Sun Shine Hotel. Congratulations! You are appointed as a new Employee of our hotel. \n\
                                    Below we Mentioned the Email and Password to Login into our System"
                };

                emailjs.send('service_qpgwb67', 'template_ur5e3q4', templateParams).then(
                        (response) => {
                    const hotels_id_storage = parseInt(sessionStorage.getItem('employeeHotelId'), 10);


                    const lastEmpId = localStorage.getItem("lastEmpId");
                    const lastEmpIdNumber = lastEmpId ? parseInt(lastEmpId, 10) : 0;
                    const nextEmpId = lastEmpIdNumber + 1;
                    // Create new employee object
                    const newEmployee = {
                        emp_id: nextEmpId,
                        emp_id_hotel: emp_id, // Adjust if needed or fetch dynamically
                        name: name,
                        address: address,
                        phone: parseInt(number, 10),
                        email: email,
                        password: password,
                        type: emp_type,
                        hotel_id: hotels_id_storage
                    };

                    // Retrieve existing employees from localStorage
                    const existingEmployees = JSON.parse(localStorage.getItem('employee_login')) || [];
                    // Add new employee to the list
                    existingEmployees.push(newEmployee);
                    // Save updated employee list to localStorage
                    localStorage.setItem('employee_login', JSON.stringify(existingEmployees));
                    localStorage.setItem("lastEmpId", nextEmpId); // Store the latest employee ID
                    alert("Employee details added successfully.");

                    // Reset form fields
                    document.getElementById("emp_id").value = "";
                    document.getElementById("name").value = "";
                    document.getElementById("address").value = "";
                    document.getElementById("number").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("emp_type").value = "";
                    document.getElementById("loaderactive").style.display = "none";
                    document.getElementById("disablebutton").style.display = "inline";

                },
                        (error) => {
                    alert("Error sending email");
                    document.getElementById("emp_id").value = "";
                    document.getElementById("name").value = "";
                    document.getElementById("address").value = "";
                    document.getElementById("number").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("emp_type").value = "";
                    document.getElementById("loaderactive").style.display = "none";
                    document.getElementById("disablebutton").style.display = "inline";
                }
                );
            } else {
                alert('EmailJS library not loaded');
                document.getElementById("loaderactive").style.display = "none";
                document.getElementById("disablebutton").style.display = "inline";
            }



        }, 2000); // 2 seconds delay
    }

}



function populate_employee() {
    const tableBody = document.querySelector('.scrollit tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    // Retrieve data from localStorage   
    const hotels_id_storage = parseInt(sessionStorage.getItem('employeeHotelId'), 10);
//    const hotels_id_storage = ;
    const employeeEmail = sessionStorage.getItem('employeeEmail');
    let filteredData;
    if (employeeEmail === 'employee.gmail.com') {
        filteredData = employee_json.filter(employee => employee.hotel_id === hotels_id_storage && employee.email === 'employee@gmail.com');
    } else {
        filteredData = employee_json.filter(employee => employee.hotel_id === hotels_id_storage && employee.email !== 'employee@gmail.com');
    }
    filteredData.sort((a, b) => a.emp_id - b.emp_id);
    if (filteredData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No rooms data available</td></tr>';
        return;
    }
    filteredData.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${employee.emp_id_hotel}</td>
                    <td>${employee.name}</td>
                    <td>${employee.address}</td>
                    <td>${employee.phone}</td>
                    <td>${employee.email}</td>
                    <td>${employee.type}</td>`;
        // Conditionally add the delete button only if room_id is not 1
        if (employee.email !== 'employee@gmail.com') {
            if (employee.type !== 'A') {
                row.innerHTML += `
              <td style="text-align: center">
                        <a  onclick="return edit_employee('${employee.emp_id}');">
                            <button class="btn waves-effect waves-light"   role="button">Edit Employee</button>
                        </a>
                    </td>
                <td style="text-align: center">
                        <a  onclick="return employee_delete('${employee.emp_id}');">
                            <button  class="btn waves-effect waves-light"   role="button">Delete</button>
                        </a>
                    </td>`;
            } else {
                row.innerHTML += `<td colspan='2' style='text-align:center'>Can't Change From Here</td>`; // Add an empty cell if no delete button is added
            }
        } else {
            row.innerHTML += `<td>Demo Data</td>`; // Add an empty cell if no delete button is added
        }
        tableBody.appendChild(row);
    }
    );
}
function edit_employee(employee_id) {
    document.getElementById("otpPopup").style.display = "flex";
    const filteredEmployeeData = employee_json.filter(employee => employee.emp_id === parseInt(employee_id));

    filteredEmployeeData.forEach(employee => {
        document.getElementById("employee_id_display").innerHTML = employee.emp_id_hotel;
        document.getElementById("emp_id_hotel").value = employee.emp_id_hotel;
        document.getElementById("name").value = employee.name;
        document.getElementById("address").value = employee.address;
        document.getElementById("phone").value = employee.phone;
        document.getElementById("email").value = employee.email;
        document.getElementById("emp_type").value = employee.type;
        document.getElementById("employee_id").value = employee_id;
        M.FormSelect.init(document.querySelectorAll('select'));

        // Update the text fields to refresh their labels
        M.updateTextFields();     
    });
}
function saveEditEmployee() {
    var employee_id = document.getElementById("employee_id").value;
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var emp_type = document.getElementById("emp_type").value;

    if (!employee_id || !name || !address || !phone || !email || !emp_type) {
        alert("All Field Required");
        return;
    }

    // Save the updated details back to local storage
    let employeeLocal = JSON.parse(localStorage.getItem('employee_login')) || [];
    const employeeIndex = employee_json.findIndex(employee => employee.emp_id === parseInt(employee_id, 10));
    if (employeeIndex !== -1) {
        employeeLocal[employeeIndex].name = name;
        employeeLocal[employeeIndex].address = address;
        employeeLocal[employeeIndex].phone = phone;
        employeeLocal[employeeIndex].email = email;
        employeeLocal[employeeIndex].type = emp_type;

        localStorage.setItem('employee_login', JSON.stringify(employeeLocal));
        alert('Employee Update successfully.');
        window.location = "editEmployee.html";
    } else {
        alert('Employee with the specified ID not found.');
    }
}








function employee_delete(employee_id) {
    var confirmation = confirm('Do you want to delete the employee details? All details of the employee are deleted from the system.');
    if (confirmation) {
        var employee_login = JSON.parse(localStorage.getItem('employee_login')) || [];
        if (employee_login.length > 0) {
            var employeeIndex = employee_login.findIndex(employee => employee.emp_id === parseInt(employee_id, 10));
            if (employeeIndex !== -1) {
                if (employee_login[employeeIndex].type === 'A') {
                    alert('Error: Admin Employees cannot be deleted.');
                } else {
                    employee_login.splice(employeeIndex, 1);
                    localStorage.setItem('employee_login', JSON.stringify(employee_login));
                    alert('Employee data has been deleted from localStorage.');
                    window.location = "editEmployee.html";
                }
            } else {
                alert('Employee not found in localStorage.');
            }
        } else {
            alert('No employee data found in localStorage.');
        }

    }
    return false;
}


function rooms_delete(room_id) {
    var confirmation = confirm('Do you want to delete the room details.');
    if (confirmation) {
        // Retrieve the guest data from localStorage, with a fallback to an empty array if null
        var roomDataLocal = JSON.parse(localStorage.getItem('rooms')) || [];

        // Check if the guest data array has any elements
        if (roomDataLocal.length > 0) {
            // Find the index of the guest with the given guest_id
            var roomIndex = roomDataLocal.findIndex(room => room.room_id === parseInt(room_id, 10));

            if (roomIndex !== -1) {
                // Remove the guest from the array
                roomDataLocal.splice(roomIndex, 1);

                // Update the localStorage with the new guest array
                localStorage.setItem('rooms', JSON.stringify(roomDataLocal));
                alert('Room data has been deleted from localStorage.');

                // Redirect to the "show_Guest.html" page
                window.location = "edit_room.html";
            } else {
                alert('Employee not found in localStorage.');
            }
        } else {
            alert('No Room data found in localStorage.');
        }
    }
    return false;
}



function previewImage() {
    const fileInput = document.getElementById('imageInput').value;
    const imgElement = document.getElementById('image');
    imgElement.src = fileInput;
}



function add_room_details() {
    const employeeEmail = sessionStorage.getItem('employeeEmail');
    if (employeeEmail === 'employee@gmail.com') {
        alert("This is the demo email. If you want to add a room,If you want to add room please add Hotel first");
        window.location = "add_room.html";
        return;
    }
    var isOkFields = true;
    var room_no = document.getElementById("room_no").value;
    var room_class = document.getElementById("Room_Class").value;
    var room_beds = document.getElementById("Room_beds").value;
    var floor = document.getElementById("floor").value;
    var type = document.getElementById("type").value;
    var price = document.getElementById("price").value;
    var message = document.getElementById("message").value;
    var photoInput = document.getElementById("imageInput").value;


    if (!room_no || !room_class || !room_beds || !floor || !type || !price || !message || !photoInput) {
        alert("All fields are required");
        isOkFields = false;
    }

    if (isOkFields) {

        var rooms = JSON.parse(localStorage.getItem('rooms')) || [];
        // Find the index of the guest with the given guest_id
        var roomIndex = rooms.findIndex(room => room.room_no === room_no.trim());
        if (roomIndex !== -1) {
            alert("This Room No is Already Exist");
            room_no.value = "";
            return;
        }
        const lastRoomId = localStorage.getItem("lastRoomId");
        const lastRoomIdNumber = lastRoomId ? parseInt(lastRoomId, 10) : 1;
        const nextRoomId = lastRoomIdNumber + 1;
        const hotels_id_storage = parseInt(sessionStorage.getItem('employeeHotelId'), 10);

        document.getElementById("loaderactive").style.display = "grid";
        document.getElementById("disablebutton").style.display = "none";
        var newRoom = {
            "photo": photoInput,
            "hotel_id": hotels_id_storage, // You might need to update this based on your application
            "description": message,
            "ac_nonac": type,
            "floor": floor,
            "beds": room_beds,
            "class": room_class,
            "room_id": nextRoomId, // Generate a unique ID (you might have a different approach)
            "room_no": room_no,
            "prize": parseFloat(price),
            "pending": "UR",
            "approve": ""
        };

        // Retrieve existing rooms from localStorage or initialize as empty array


        // Add the new room to the array
        rooms.push(newRoom);

        // Save the updated array back to localStorage
        localStorage.setItem('rooms', JSON.stringify(rooms));
        localStorage.setItem("lastRoomId", nextRoomId); // Store the latest employee ID
        window.location = "add_room.html";
        room_no.value = "";
        document.getElementById("Room_Class").value = "";
        document.getElementById("Room_beds").value = "";
        floor.value = "";
        type.value = "";
        price.value = "";
        message.value = "";
        photoInput.value = "";

        // Hide loader and show button (assuming these elements exist)
        document.getElementById("loaderactive").style.display = "none";
        document.getElementById("disablebutton").style.display = "block";

        alert("Room details added successfully");

    }
}





function populate_vacant_rooms() {

    const tableBody = document.querySelector('.scrollit tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    // Retrieve data from localStorage

    const employeeEmail = sessionStorage.getItem('employeeEmail');

    const hotels_id_storage = parseInt(sessionStorage.getItem('employeeHotelId'), 10);
//    const hotels_id_storage = ;
    let filteredData;
    if (employeeEmail === 'employee.gmail.com') {
        filteredData = rooms_json.filter(rooms => rooms.hotel_id === hotels_id_storage && rooms.pending === "UR" && rooms.room_id === 1);
    } else {
        filteredData = rooms_json.filter(rooms => rooms.hotel_id === hotels_id_storage && rooms.pending === "UR" && rooms.room_id !== 1);
    }

    filteredData.sort((a, b) => a.room_id - b.room_id);
    if (filteredData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No rooms data available</td></tr>';
        return;
    }
    filteredData.forEach(room => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${room.room_no}</td>
                    <td>${room.class}</td>
                    <td>${room.beds}</td>
                    <td>${room.floor}</td>
                    <td>${room.ac_nonac}</td>
                    <td>${room.prize}</td> `;
        // Conditionally add the delete button only if room_id is not 1                    
        if (room.room_id !== 1) {
            row.innerHTML += `
                    <td style="text-align: center">
                        <a onclick="show_vacent_room('${room.room_id}','${room.room_no}','${room.prize}')">
                            <button class="btn waves-effect waves-light"   role="button">Book Room</button>
                        </a>
                    </td>`;
        } else {
            row.innerHTML += `<td>Demo Data</td>`; // Add an empty cell if no delete button is added
        }

        tableBody.appendChild(row);
    });
}


function show_vacent_room(room_id, room_no, price) {
    document.getElementById('otpPopup').style.display = 'flex';
    document.getElementById('book_room_no').innerHTML = room_no;
    document.getElementById('price').value = price;
    document.getElementById('room_id').value = room_id;
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
                room.approve = "A";    // Update the approve field
                room.pending = "";      // Empty the pending field
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
    if (!guest_name || !guest_address || !guest_email || !check_in || !check_out || !card_type || !price) {
        alert("All fields are required");
        return;
    } else if (guest_email === "admin@gmail.com") {
        alert("This email is for temporary use; please use another email.");
        window.location = "vacantRoom.html";
        return;
    }


    const dateOne = new Date(check_in);
    const dateTwo = new Date(check_out);
    const timeDiff = Math.abs(dateTwo - dateOne);
    var days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    var room_price = price / days;
    var currentdate = new Date();
    const hotels_id_storage = parseInt(sessionStorage.getItem('employeeHotelId'), 10);


    var filteredDataRoom = rooms_json.filter(rooms => rooms.room_id === parseInt(room_id, 10));

    if (validateDates(check_in, check_out)) {
        alert("Checkout details Wrong");
//        document.getElementById("guest_name").value = "";
//        document.getElementById("guest_address").value = "";
//        document.getElementById("guest_email").value = "";
//        document.getElementById("checkin_date").value = "";
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
                "who_book": "E",
                "approve_date": null,
                "disapprove_date": null,
                "card_no": "------",
                "card_name": "----",
                "cvv": "----",
                "month": "---",
                "year": "----",
                "guest_name": guest_name,
                "guest_address": guest_address,
                "reservation_status": "R",
                "approve_status": "A",
                "checkout_date": "",
                "show_invoice": "Y",
                "hotel_id": hotels_id_storage
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
    window.location = "vacantRoom.html";

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

function populate_reserved_rooms() {

    const tableBody = document.querySelector('.scrolldown tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    const booking_local = localStorage.getItem('booking_details');



    const bookingParsedData = JSON.parse(booking_local);
    // Retrieve data from localStorage

    const hotels_id_storage = parseInt(sessionStorage.getItem('employeeHotelId'), 10);
//    const hotels_id_storage = ;
    const filteredData = bookingParsedData.filter(rooms => rooms.hotel_id === hotels_id_storage && rooms.approve_status === "A" && rooms.reservation_status === "R");
    filteredData.sort((a, b) => a.room_id - b.room_id);
    if (filteredData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;" >No rooms data available</td></tr>';
        return;
    }


    filteredData.forEach(room => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${getRoomNumberById(room.room_id)}</td>
                    <td>${room.room_prize}</td>
                    <td>${room.check_in}</td>
                    <td>${room.check_out}</td>
                    <td>${room.days_stay}</td>
                    <td>${formatDateTime(room.date_time)}</td>                            
                   
                    <td style="text-align: center">
                        <a onclick="check_out('${room.booking_id}','${room.room_id}')">
                            <button class="btn waves-effect waves-light"  role="button">Check Out</button>
                        </a>
                    </td>
                `;
        tableBody.appendChild(row);
    });
}






function check_out(booking_id, room_id) {
    let bookinDetails = JSON.parse(localStorage.getItem('booking_details')) || [];
    // Find the index of the booking with the specified ID
    const bookingIndex = bookinDetails.findIndex(booking => booking.booking_id === parseInt(booking_id, 10));
    if (bookingIndex !== -1) {
        // Update the fields for the found booking
        bookinDetails[bookingIndex].checkout_date = new Date();
        bookinDetails[bookingIndex].reservation_status = 'CO';
        // Save the updated details back to local storage
        let roomLocal = JSON.parse(localStorage.getItem('rooms')) || [];
        const roomIndex = roomLocal.findIndex(rooms => rooms.room_id === parseInt(room_id, 10));
        if (roomIndex !== -1) {
            roomLocal[roomIndex].approve = "";
            roomLocal[roomIndex].pending = 'UR';
            localStorage.setItem('rooms', JSON.stringify(roomLocal));
        } else {
            console.log('room with the specified ID not found.');
        }


        localStorage.setItem('booking_details', JSON.stringify(bookinDetails));
        alert('Check Out successfully.');
        window.location = "reserverd_room.html";
    } else {
        console.log('Booking with the specified ID not found.');
    }
}



function getGuestNameById(guest_email) {
    const guestName = guest_json.find(guest => guest.email === guest_email);
    return guestName ? guestName.Name : 'Not Resgister';
}

function populate_Payment() {
    const tableBody = document.querySelector('.scrollit tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    const booking_local = localStorage.getItem('booking_details');

    const bookingParsedData = JSON.parse(booking_local);
    // Retrieve data from localStorage

    const hotels_id_storage = parseInt(sessionStorage.getItem('employeeHotelId'), 10);
//    const hotels_id_storage = ;
    const filteredData = bookingParsedData.filter(booking => booking.hotel_id === hotels_id_storage && booking.approve_status === "A" && booking.reservation_status === "CO" );
    filteredData.sort((a, b) => a.room_id - b.room_id);
    if (filteredData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No rooms data available</td></tr>';
        return;
    }
    filteredData.forEach(booking => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${booking.invoice_no}</td>
                    <td>${booking.email}</td>
                    <td>${booking.guest_name}</td>
                    <td>Check Out</td>
                    <td>${booking.payment_mode}</td>
                    <td>${formatDateTime(booking.date_time)}</td>                                                       
                    <td style="text-align: center">
                        <a onclick="generatePDF('${booking.booking_id}')">
                            <button class="btn waves-effect waves-light"   role="button">Download Invoice</button>
                        </a>
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



function getRoomNumberById(room_id) {
    const room_no = rooms_json.find(room => room.room_id === parseInt(room_id));
    return room_no ? room_no.room_no : 'Unknown Room';
}

function populateApproveRoom() {

    const tableBody = document.querySelector('.scrollit tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    const booking_local = localStorage.getItem('booking_details');

    const bookingParsedData = JSON.parse(booking_local);
    // Retrieve data from localStorage
    const hotels_id_storage = parseInt(sessionStorage.getItem('employeeHotelId'), 10);
//    const hotels_id_storage = ;
    const filteredData = bookingParsedData.filter(rooms => rooms.hotel_id === parseInt(hotels_id_storage) && rooms.approve_status === "P" && rooms.reservation_status === "UR");

    if (filteredData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No rooms data available</td></tr>';
        return;
    }

    filteredData.forEach(room => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${formatDateTime(room.date_time)}</td>
                    <td>${getRoomNumberById(room.room_id)}</td>
                    <td>${room.room_prize}</td>                   
                    <td>${room.check_in}</td>
                    <td>${room.check_out}</td>
                    <td>${room.days_stay}</td>                                 
                   <td style="text-align: center">
                        <a onclick="approveRoom('${room.booking_id}')">
                            <button class="btn waves-effect waves-light"   role="button">Approve Room</button>
                        </a>
                    </td>
                    <td style="text-align: center">
                        <a onclick="disapproveRoom('${room.booking_id}')">
                            <button class="btn waves-effect waves-light"   role="button">Disapprove Room</button>
                        </a>
                    </td>
                `;
        tableBody.appendChild(row);
    });
}

function approveRoom(booking_id) {
    let bookinDetails = JSON.parse(localStorage.getItem('booking_details')) || [];
    var currentdate = new Date();
    // Find the index of the booking with the specified ID
    const bookingIndex = bookinDetails.findIndex(booking => booking.booking_id === parseInt(booking_id, 10));
    if (bookingIndex !== -1) {
        // Update the fields for the found booking
        bookinDetails[bookingIndex].checkout_date = new Date();
        bookinDetails[bookingIndex].approve_status = 'A';
        bookinDetails[bookingIndex].reservation_status = 'R';
        bookinDetails[bookingIndex].approve_date = currentdate;
        // Save the updated details back to local storage
        let roomLocal = JSON.parse(localStorage.getItem('rooms')) || [];
        const roomIndex = roomLocal.findIndex(rooms => rooms.room_id === parseInt(bookinDetails[bookingIndex].room_id, 10));
        if (roomIndex !== -1) {
            roomLocal[roomIndex].approve = "A";
            roomLocal[roomIndex].pending = "";
            localStorage.setItem('rooms', JSON.stringify(roomLocal));
        } else {
            console.log('room with the specified ID not found.');
        }
        localStorage.setItem('booking_details', JSON.stringify(bookinDetails));
        alert('Room Approved successfully.');
        window.location = "approveRoom.html";
    } else {
        console.log('Booking with the specified ID not found.');
    }
}


function disapproveRoom(booking_id) {
    let bookinDetails = JSON.parse(localStorage.getItem('booking_details')) || [];
    var currentdate = new Date();
    // Find the index of the booking with the specified ID
    const bookingIndex = bookinDetails.findIndex(booking => booking.booking_id === parseInt(booking_id, 10));
    if (bookingIndex !== -1) {
        // Update the fields for the found booking
        bookinDetails[bookingIndex].checkout_date = new Date();
        bookinDetails[bookingIndex].approve_status = 'DIS';
        bookinDetails[bookingIndex].reservation_status = 'R_DIS';
        bookinDetails[bookingIndex].disapprove_date = currentdate;
        // Save the updated details back to local storage
        let roomLocal = JSON.parse(localStorage.getItem('rooms')) || [];
        const roomIndex = roomLocal.findIndex(rooms => rooms.room_id === parseInt(bookinDetails[bookingIndex].room_id, 10));
        if (roomIndex !== -1) {
            roomLocal[roomIndex].approve = "";
            roomLocal[roomIndex].pending = "UR";
            localStorage.setItem('rooms', JSON.stringify(roomLocal));
        } else {
            console.log('room with the specified ID not found.');
        }
        localStorage.setItem('booking_details', JSON.stringify(bookinDetails));
        alert('Room Disapprove successfully.');
        window.location = "approveRoom.html";
    } else {
        console.log('Booking with the specified ID not found.');
    }

}


var public_key = "Bc6Q0uME5PARDagYq";
function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.onload = () => {

        if (callback)
            callback();
    };
    script.onerror = () => {
        console.error(`Error loading script from ${url}`);
    };
    document.head.appendChild(script); // or document.body.appendChild(script);
}

