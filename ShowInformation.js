let fetchData = async () => {
  let url = `http://localhost:3000/Booking`;

  let res = await fetch(url, { method: "GET" });

  let data = await res.json();
  console.log(data);

  let show = document.querySelector("#showData");
  // data.map((e) => {
  // show.innerHTML += `
  //           <div style="border: 1px solid black; padding: 10px; margin: 10px;">
  //               <h2>Name: ${e.Name}</h2>
  //               <p>Age: ${e.Age}</p>
  //               <p>Checking In: ${e["Cheaking In"]}</p>
  //               <p>Check Out: ${e["Cheak Out"]}</p>
  //               <p>Phone Number: ${e["Phone Number"]}</p>
  //               <p>Members: ${e.Member}</p>
  //           </div>
  //       `;
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
        <td onclick="del(${e.id})">Del</td>
         <td onclick="updatee(${e.id})">Update</td>
        </tr>
        `;
  });
};

// Delete data function
let del =(id)=> {
  let url = `http://localhost:3000/Booking/${id}`;

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(url, {
        method: "DELETE",
      }).then(response => {
        if (response.ok) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          }).then(() => {
            location.reload(); // Reload the page after deletion
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "There was an issue deleting the data.",
            icon: "error"
          });
        }
      });
    }
  });
};

//Update data function


let updatee=async(id)=>{
  let url = `http://localhost:3000/Booking/${id}`;
  let res=await fetch(url);
  let data=await res.json();
  let formdata = `
     <form id="js"  class=" update_booking-form" action="/index.html">
      <div class="row">
        <div class="input-group">
          <label for="first-name">First Name</label>
          <input type="text" id="upfirst-name" value="${data.Name}" name="first-name" placeholder="First Name" required>
        </div>
        <div class="input-group">
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" value="${data.Name}" name="last-name" placeholder="Last Name" required>
        </div>
      </div>
      <div class="row">
        <div class="input-group">
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" value="${data.email}" placeholder="ex: myname@example.com" required>
        </div>
        <div class="input-group">
          <label for="guests">Number of Guests</label>
          <input type="number" id="guests" value="${data.Member}" name="guests" placeholder="e.g., 2" required>
        </div>
      </div>

      <!-- Phone Number Field -->
      <div class="row">
        <div class="input-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" value="${data.Phone_Number}" placeholder="e.g., 1234567890" required>
        </div>
      </div>

      <!-- Room Type and Price -->
      <div class="row">
        <div class="input-group">
          <label for="room-type">Room Type</label>
          <select id="room-type" name="room-type" required>
            <option value="" disabled selected>Please Select</option>
            <option value="single" ${data.Room_type==="single"?"selected":""}">Single - $100</option>
            <option value="double" ${data.Room_type==="double"?"selected":""}">Double - $150</option>
            <option value="suite" ${data.Room_type==="suite"?"selected":""}">Suite - $250</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="input-group">
          <label for="arrival">Arrival Date & Time</label>
          <input type="datetime-local"value="${data.Cheaking_In}" id="arrival" name="arrival" required>
        </div>
      </div>
      <div class="row">
        <div class="input-group">
          <label for="departure">Departure Date</label>
          <input type="date" id="departure" value="${data.Cheak_Out}" name="departure" required>
        </div>
        <div class="input-group">
          <label for="pickup">Free Pickup?</label>
          <div>
            <label><input type="radio" name="pickup" value="yes" required> Yes, please!</label>
            <label><input type="radio" name="pickup" value="no" required> No, thanks!</label>
          </div>
        </div>
      </div>
      
      <button type="submit" class="submit-btn" onclick="insertt()">Submit</button> 
    </form>
  `;

  document.querySelector("#updateform").innerHTML = formdata;
};
// close form
function closeform(){
  const form =document.querySelector("#js");
  form.classList.add("hidden");
}


// Insert data function

let insertt=()=>{
  let inpfirstname = document.querySelector("#first-name").value;
  // console.log(inpname);
 let inpsecondname = document.querySelector("#last-name").value;
 let inpemail=document.querySelector("#email").value;
 let inpguest=document.querySelector("#guests").value;
 let inpnumber=document.querySelector("#phone").value;
 let inproomType = document.querySelector("#room-type").value;
 let inpcheakin = document.querySelector("#arrival").value;
 let inpcheakout = document.querySelector("#departure").value;

  //vaildate input
  if(inpfirstname ==="" || inpsecondname ==="" ||inpemail==="" || inpcheakin===""  || inpcheakout===" " ||
    inpguest==="" || inpnumber==="" || inproomType===""
  )
  {
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
       Name: inpfirstname + inpsecondname,
       Cheaking_In: inpcheakin,
       Cheak_Out: inpcheakout,
       Phone_Number: inpnumber,
       email: inpemail,
       Member: inpguest,
       Room_type: inproomType,
     }),
   }).then(() => {
     location.href = "ShowInformation.html";
   });
   return false;

};
