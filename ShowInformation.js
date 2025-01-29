let fetchData = async () => {
  let url = `http://localhost:3000/Booking`;

  let res = await fetch(url, { method: "GET" });

  let data = await res.json();
  console.log(data); // Check if data is correctly fetched
  Pagination(data);
}
  // Display data in table
  let DataShow = (data) => {
    let show = document.querySelector("#showData");

    data.map((e) => {
      show.innerHTML += `
        <tr>
        <td>${e.Name}</td>
        <td>${e.email}</td>
        <td>${e.Cheaking_In}</td>
        <td>${e.Cheak_Out}</td>
        <td>${e.Phone_Number}</td>
        <td>${e.Member}</td>
        <td>${e.Room_type}</td>
        <td onclick="dell(${e.id})">Del</td>
        <td onclick="updatee(${e.id})">Update</td>
        </tr>
        `;
    });
  };

  // Insert data function
  let insertt = () => {
    let inpfirstname = document.querySelector("#first-name").value;
    // console.log(inpname);
    let inpsecondname = document.querySelector("#last-name").value;
    let inpemail = document.querySelector("#email").value;
    let inpguest = document.querySelector("#guests").value;
    let inpnumber = document.querySelector("#phone").value;
    let inproomType = document.querySelector("#room-type").value;
    let inpcheakin = document.querySelector("#arrival").value;
    let inpcheakout = document.querySelector("#departure").value;

    //vaildate input
    if (
      inpfirstname === "" ||
      inpsecondname === "" ||
      inpemail === "" ||
      inpcheakin === "" ||
      inpcheakout === " " ||
      inpguest === "" ||
      inpnumber === "" ||
      inproomType === ""
    ) {
      alert("Please enter vaild Data to Proceed");
      return false;
    }

    let url = "http://localhost:3000/Booking";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: inpfirstname + "" + inpsecondname,
        Cheaking_In: inpcheakin,
        Cheak_Out: inpcheakout,
        Phone_Number: inpnumber,
        email: inpemail,
        Member: inpguest,
        Room_type: inproomType,
      }),
    }).then(() => {
      location.href = "index.html";
    });
    return false;
  };

  // Delete data function
  let dell = (id) => {
    let url = `http://localhost:3000/Booking/${id}`;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(url, {
          method: "DELETE",
        }).then((response) => {
          if (response.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            }).then(() => {
              location.reload(); // Reload the page after deletion
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the data.",
              icon: "error",
            });
          }
        });
      }
    });
  };


// // Update data function (for now, it can be a placeholder)
// let updatees = (id) => {
//   // This function is a placeholder for the update functionality
//   alert(`Update functionality for ID: ${id} will be implemented.`);
// };

//Update data function

// Function to update the booking information form
let updatee = async (id) => {
  let url = `http://localhost:3000/Booking/${id}`;
  let res = await fetch(url);
  let data = await res.json();

  let formdata = `
    <form id="jss">
      <div class="row">
        <div class="input-group">
          <label for="first-name">First Name</label>
          <input type="text" id="upfirst-name" value="${data.Name}" name="first-name" placeholder="First Name" required>
        </div>
        <div class="input-group">
          <label for="last-name">Last Name</label>
          <input type="text" id="uplast-name" value="${data.Name}" name="last-name" placeholder="Last Name" required>
        </div>
      </div>
      <div class="row">
        <div class="input-group">
          <label for="email">E-mail</label>
          <input type="email" id="upemail" name="email" value="${data.email}" placeholder="ex: myname@example.com" required>
        </div>
        <div class="input-group">
          <label for="guests">Number of Guests</label>
          <input type="number" id="upguests" value="${data.Member}" name="guests" placeholder="e.g., 2" required>
        </div>
      </div>
      <div class="row">
        <div class="input-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="upphone" name="phone" value="${data.Phone_Number}" placeholder="e.g., 1234567890" required>
        </div>
      </div>
      <div class="row">
        <div class="input-group">
          <label for="room-type">Room Type</label>
          <select id="uproom-type" name="room-type" required>
            <option value="" disabled selected>Please Select</option>
            <option value="single" ${data.Room_type === "single" ? "selected" : ""}>Single - $100</option>
            <option value="double" ${data.Room_type === "double" ? "selected" : ""}>Double - $150</option>
            <option value="suite" ${data.Room_type === "suite" ? "selected" : ""}>Suite - $250</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="input-group">
          <label for="arrival">Arrival Date & Time</label>
          <input type="datetime-local" value="${data.Cheaking_In}" id="uparrival" name="arrival" required>
        </div>
      </div>
      <div class="row">
        <div class="input-group">
          <label for="departure">Departure Date</label>
          <input type="date" id="updeparture" value="${data.Cheak_Out}" name="departure" required>
        </div>
        <div class="input-group">
          <label for="pickup">Free Pickup?</label>
          <div>
            <label><input type="radio" name="pickup" value="yes" required> Yes, please!</label>
            <label><input type="radio" name="pickup" value="no" required> No, thanks!</label>
          </div>
        </div>
      </div>
      <button type="submit" class="submit-btn" onclick="finalupdate(${data.id})">Submit</button>
    </form>
  `;

  document.querySelector("#updateForm").innerHTML = formdata;
};

// Close the update form
function closeform() {
  const form = document.querySelector("#jss");
  form.classList.add("hidden");
}

// Final update function
let finalupdate = (id) => {
  let inp_first_name = document.querySelector("#upfirst-name").value;
  let inp_last_name = document.querySelector("#uplast-name").value;
  let inpemail = document.querySelector("#upemail").value;
  let inpguest = document.querySelector("#upguests").value;
  let inpphone = document.querySelector("#upphone").value;
  let inproomType = document.querySelector("#uproom-type").value;
  let inpcheakin = document.querySelector("#uparrival").value;
  let inpcheakout = document.querySelector("#updeparture").value;

  // Show confirmation popup before updating data
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: "Don't save"
  }).then((result) => {
    if (result.isConfirmed) {
      let url = `http://localhost:3000/Booking/${id}`;

      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: inp_first_name , // Corrected field name and space
          Phone_Number: inpphone,
          Cheaking_In: inpcheakin,
          Cheak_Out: inpcheakout,
          email: inpemail,
          Member: inpguest,
          Room_type: inproomType,
        })
      })
        .then((response) => {
          if (response.ok) {
            Swal.fire("Saved!", "Your changes have been saved.", "success");
            location.href="Updateform.html"; // Reload the page after update
          } else {
            Swal.fire("Error!", "There was an issue saving the data.", "error");
          }
        })
        .catch((error) => {
          Swal.fire(
            "Network Error!",
            "Failed to update the data. Please try again.",
            "error"
          );
        });
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });

  return false;
};





// Pagination Function

let Pagination=(data)=>{
  $('#paging').pagination({
    dataSource: data,
    pageSize:5,
    
    callback: function(data, pagination) {
        // template method of yourself
        DataShow(data);
        var html = template(data);
        dataContainer.html(html);
    }
});
};


// Search functionality
let searchData = () => {
  let searchQuery = document.querySelector("#searchInput").value.toLowerCase();

  // rows of the table
  let tableRows = document.querySelectorAll("#show tr");

  // Loop through each row and filter based on name, id, or mobile
  tableRows.forEach(row => {
    let name = row.cells[0].textContent.toLowerCase();
    let id = row.getAttribute('data-id').toLowerCase();
    let mobile = row.cells[2].textContent.toLowerCase();

    if (name.includes(searchQuery) || id.includes(searchQuery) || mobile.includes(searchQuery)) {
      row.style.display = ''; // Show the row
    } else {
      row.style.display = 'none'; // Hide the row
    }
  });
};

// Load data and pagination on page load

window.onload = () => {
  fetchData(); // Fetch data and initialize pagination
};