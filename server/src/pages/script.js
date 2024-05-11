document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); 
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const data = {
    email: email,
    password: password,
  };

  console.log("Data to be sent:", data);
  if (!email || !password) {
    alert("Email and password are required.");
    return; 
  }

//   const fetchUrl = async function () {
//     const response = await fetch("http://localhost:4000/users/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//       const dataaa = await response.json()
//     console.log(response);
//     console.log(dataaa);
   
//   };

//   fetchUrl();

  fetch("http://localhost:4000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        alert("Network response was not ok");
        // throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); 
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});

