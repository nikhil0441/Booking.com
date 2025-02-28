function validateForm(event) {
  // Prevent form submission until validation is done
  event.preventDefault();

  // Get form elements
  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const guests = document.getElementById("guests").value.trim();
  const roomType = document.getElementById("room-type").value;
  const arrivalDate = document.getElementById("arrival").value;
  const departureDate = document.getElementById("departure").value;
  const pickup = document.querySelector('input[name="pickup"]:checked');
  const phone = document.getElementById("phone").value.trim();

  // Regular expression for email validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phonePattern = /^[0-9]{10}$/; // Simple phone number validation (10 digits)

  // Validation for empty fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !guests ||
    !roomType ||
    !arrivalDate ||
    !departureDate ||
    !pickup ||
    !phone
  ) {
    alert("All fields are required!");
    return false;
  }

  // Email format validation
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address!");
    return false;
  }

  // Guests field should be a valid number
  if (isNaN(guests) || guests <= 0) {
    alert("Please enter a valid number for guests!");
    return false;
  }

  // Phone number validation (ensure it's exactly 10 digits)
  if (!phonePattern.test(phone)) {
    alert("Please enter a valid 10-digit phone number!");
    return false;
  }

  // Ensure arrival date is before departure date
  if (new Date(arrivalDate) >= new Date(departureDate)) {
    alert("Arrival date must be before departure date!");
    return false;
  }

  // Calculate the total price
  const arrival = new Date(arrivalDate);
  const departure = new Date(departureDate);
  const numberOfNights = (departure - arrival) / (1000 * 3600 * 24); // Calculate days difference
  const roomPrices = {
    single: 100, // Price per night for single room
    double: 150, // Price per night for double room
    suite: 250, // Price per night for suite
  };

  let roomPrice = roomPrices[roomType]; // Get the price for the selected room type
  let totalPrice = roomPrice * numberOfNights * guests; // Calculate total price based on nights and guests

  alert(`Total Price: $${totalPrice}`);

  // If all validations pass, redirect to confirmation page
  alert("Form submitted successfully!");
  // window.location.replace("confirmationPage.html"); // Adjust this URL as needed
}
function add(){

};