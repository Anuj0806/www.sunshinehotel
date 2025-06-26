
function validateGmail(email) {
    var gmail_regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (gmail_regex.test(email)) {
        return true;
    } else {
        return false; // Email is invalid
    }
}
function footerFunction() {
    document.querySelectorAll(".footer_data").forEach(function (element) {
        element.innerHTML = "RAJ HOTELS";
    });
    document.querySelectorAll(".footer_data_lic").forEach(function (element) {
        element.innerHTML = "&copy; 2023  RAJ HOTELS";
    });
}

const admin_data = [
    {
        "admin_id": 1,
        "email": "admin1@gmail.com",
        "password": "1234"
    }
];

function getlogin_data_admin() {
    var isOkFilelds = true;

    var admin_username = document.getElementById("admin_username").value;
    var admin_password = document.getElementById("admin_password").value;
    if (admin_username === "" && admin_password === "") {
        alert("All Filed Required");
        isOkFilelds = false;
    } else {
        if (admin_username === "") {
            alert("Email is  Required");
            isOkFilelds = false;
        }
        if (admin_password === "") {
            alert("Password is Required");
            isOkFilelds = false;
        }
    }

    if (admin_username !== "") {
        if (!validateGmail(admin_username)) {
            alert("Please enter a valid Gmail address.");
            isOkFilelds = false;
            document.getElementById("admin_username").value = "";
        }
    }

    if (isOkFilelds) {

        document.getElementById("loaderactive").style.display = "grid";
        document.getElementById("disablebutton").style.display = "none";     
            // Check if the email and password match an entry in the employee_login array
            const employee = admin_data.find(admin => admin.email === admin_username && admin.password === admin_password);
            if (employee) {

                sessionStorage.setItem('AdminEmail', admin_username);

                document.getElementById("loaderactive").style.display = "none";
                document.getElementById("disablebutton").style.display = "block";
                alert("Welcome Admin");
                window.location = "adminHomePage.html";
                document.getElementById("admin_username").value = "";
                document.getElementById("admin_password").value = "";

            } else {
                // Login failed
                alert("Invalid email or password.");
                document.getElementById("admin_username").value = "";
                document.getElementById("admin_password").value = "";

                document.getElementById("loaderactive").style.display = "none";
                document.getElementById("disablebutton").style.display = "block";
            }
    }
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


let hotels_data_json = hotels_data;

const hotels_data_local = localStorage.getItem('hotels_data');
try {
    if (hotels_data_local) {
        const parsedData = JSON.parse(hotels_data_local);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
            hotels_data_json = hotels_data_json.concat(parsedData);
        }
    }
} catch (e) {
    console.error('Error parsing localStorage data:', e);
}

const employee_login_hotel = [
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

const employeeData = localStorage.getItem('employee_login');
let employee_login_json = employee_login_hotel;

try {
    if (employeeData) {
        const parsedData = JSON.parse(employeeData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
            employee_login_json = employee_login_json.concat(parsedData);
        }
    }
} catch (e) {
    console.error('Error parsing localStorage data:', e);
}
// Function to populate the table
function populate_employee() {
    const AdminEmail = sessionStorage.getItem('AdminEmail');
    const tableBody = document.querySelector('.scrollit tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    // Retrieve data from localStorage
    let filteredData;
    if (AdminEmail === 'admin1@gmail.com') {
        filteredData = employee_login_json.filter(employee => employee.type === 'A');
    } else {
        filteredData = employee_login_json.filter(employee => employee.type === 'A' && employee.email !== 'employee@gmail.com');
    }
//    const filteredData = employee_login_json.filter(employee => employee.type === 'A');
    filteredData.sort((a, b) => a.emp_id - b.emp_id);
    if (filteredData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No employee data available</td></tr>';
        return;
    }

    function getHotelNameById(hotel_id) {
        const hotel = hotels_data_json.find(hotel => hotel.hotel_id === hotel_id);
        return hotel ? hotel.hotel_name : 'Unknown Hotel';
    }

    filteredData.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${employee.emp_id}</td>
                    <td>${getHotelNameById(employee.hotel_id)}</td>
                    <td>${employee.name}</td>
                    <td>${employee.address}</td>
                    <td>${employee.phone}</td>
                    <td>${employee.email}</td>        
                    <td>${employee.type}</td>`;
        // Conditionally add the delete button only if room_id is not 1
        if (AdminEmail === 'admin1@gmail.com') {
            row.innerHTML += `<td></td>`; // Add an empty cell if no delete button is added
        } else {
            if (employee.email !== 'employee@gmail.com') {
                row.innerHTML += `
         
                    <td style="text-align: center">
                        <a  onclick="return employee_delete_admin('${employee.emp_id}');">
                            <button class="btn waves-effect waves-light"  role="button">Delete</button>
                        </a>
                    </td>`;
            } else {
                row.innerHTML += `<td>Demo Data</td>`; // Add an empty cell if no delete button is added
            }
        }

        tableBody.appendChild(row);
    });
}
// Populate table on page load





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


// Function to populate the table
function populate_guest() {
    const tableBody = document.querySelector('.scrollit tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    // Retrieve data from localStorage
    const employeeData = localStorage.getItem('guest_data');
    let guest_login_json = guest_data;

    try {
        if (employeeData) {
            const parsedData = JSON.parse(employeeData);
            if (Array.isArray(parsedData) && parsedData.length > 0) {
                guest_login_json = guest_login_json.concat(parsedData);
            }
        }
    } catch (e) {
        console.error('Error parsing localStorage data:', e);
    }
    const AdminEmail = sessionStorage.getItem('AdminEmail');
    let filteredguestData;
    if (AdminEmail === 'admin1@gmail.com') {
        filteredguestData = guest_login_json;
    } else {
        filteredguestData = guest_login_json.filter(guest => guest.email !== 'admin@gmail.com');
    }

    filteredguestData.sort((a, b) => a.guest_id - b.guest_id);
    if (filteredguestData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No Guest data available</td></tr>';
        return;
    }


    filteredguestData.forEach(guest => {
        const row = document.createElement('tr');
        row.innerHTML = `             
                    <td>${guest.Name}</td>
                    <td>${guest.Phone}</td>
                    <td>${guest.address}</td>
                    <td>${guest.email}</td>`;
        // Conditionally add the delete button only if room_id is not 1
        if (AdminEmail === 'admin1@gmail.com') {
            row.innerHTML += `<td></td>`; // Add an empty cell if no delete button is added
        } else {
            if (guest.email !== 'admin@gmail.com') {
                row.innerHTML += `
          <td style="text-align: center">
                        <a href="#" onclick="return guest_delete_admin('${guest.guest_id}');">
                            <button class="btn waves-effect waves-light"  role="button">Delete</button>
                        </a>
                    </td>`;
            } else {
                row.innerHTML += `<td>Demo Data</td>`; // Add an empty cell if no delete button is added
            }
        }
        tableBody.appendChild(row);
    });
}
// Populate table on page load





// Function to populate the table
function populate_hotel_detail() {
    const tableBody = document.querySelector('.scrollit tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    // Retrieve data from localStorage 
    const AdminEmail = sessionStorage.getItem('AdminEmail');
    let filteredhotelData;
    if (AdminEmail === 'admin1@gmail.com') {
        filteredhotelData = hotels_data_json.filter(hotel => hotel.hotel_id === 1);
    } else {
        filteredhotelData = hotels_data_json.filter(hotel => hotel.hotel_id !== 1);
    }



    filteredhotelData.sort((a, b) => a.hotel_id - b.hotel_id);
    if (filteredhotelData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No employee data available</td></tr>';
        return;
    }


    filteredhotelData.forEach(hotel => {
        const row = document.createElement('tr');
        row.innerHTML = `             
                    <td>${hotel.hotel_id}</td>
                    <td>${hotel.hotel_name}</td>
                    <td>${hotel.hotel_address}</td>
                    <td>${hotel.hotel_mobile}</td>                                
                `;
        tableBody.appendChild(row);
    });
}

function employee_delete_admin(employee_id) {
    var confirmation = confirm('Do You Want to Delete The Employee? All Data will be Deleted from the Database. Hotel details will also be deleted.');
    if (confirmation) {
        // Retrieve employee and hotel data from localStorage
        var employeeData = JSON.parse(localStorage.getItem('employee_login')) || [];
        var hotelsData = JSON.parse(localStorage.getItem('hotels_data')) || [];
        if (employeeData.length > 0) {
            // Find the index of the employee with the given employee_id
            var employeeIndex = employeeData.findIndex(employee => employee.emp_id === employee_id);

            if (employeeIndex !== -1) {
                // Get the hotel_id associated with this employee
                var hotelId = employeeData[employeeIndex].hotel_id;

                // Remove the employee from the array
                employeeData.splice(employeeIndex, 1);

                // Update localStorage with the new employee array
                localStorage.setItem('employee_login', JSON.stringify(employeeData));

                // Find the index of the hotel with the given hotelId
                var hotelIndex = hotelsData.findIndex(hotel => hotel.hotel_id === hotelId);

                if (hotelIndex !== -1) {
                    // Remove the hotel from the array
                    hotelsData.splice(hotelIndex, 1);

                    // Update localStorage with the new hotel array
                    localStorage.setItem('hotels_data', JSON.stringify(hotelsData));
                    alert('Hotel data has been deleted from localStorage.');
                } else {
                    alert('Hotel not found.');
                }

                // Redirect to the employee details page
                window.location = "employee_detail_admin.html";
            } else {
                alert('Employee not found.');
            }
        } else {
            alert('No Employee data found in localStorage.');
        }
    }
    return false;
}





function guest_delete_admin(guest_id) {
    var confirmation = confirm('Do you want to delete the guest details? All details of the guest are deleted from the system.');
    if (confirmation) {
        // Retrieve the guest data from localStorage, with a fallback to an empty array if null
        var guest_data = JSON.parse(localStorage.getItem('guest_data')) || [];

        // Check if the guest data array has any elements
        if (guest_data.length > 0) {
            // Find the index of the guest with the given guest_id
            var guestIndex = guest_data.findIndex(guest => guest.guest_id === guest_id);

            if (guestIndex !== -1) {
                // Remove the guest from the array
                guest_data.splice(guestIndex, 1);

                // Update the localStorage with the new guest array
                localStorage.setItem('guest_data', JSON.stringify(guest_data));
                alert('Guest data has been deleted from localStorage.');

                // Redirect to the "show_Guest.html" page
                window.location = "show_Guest.html";
            } else {
                alert('Guest not found in localStorage.');
            }
        } else {
            alert('No guest data found in localStorage.');
        }
    }
    return false;
}
