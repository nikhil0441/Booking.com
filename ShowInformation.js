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
        <td onclick="deleete(${e.id})">Deletee</td>
         <td onclick="updatee(${e.id})">Update</td>
        </tr>
        `;
  });
};

// Delete data function
let deleete = (id) => {
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

let updatee = async (id) => {
  let url = `http://localhost:3000/Booking/${id}`;

  let res = await fetch(url);
  let data = await res.json();
  console.log(data);
};


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
       Member:inpguest
     })
    
   }).then(()=>{
    location.href="ShowInformation.html";
   });
   return false;

};
