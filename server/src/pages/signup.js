document.addEventListener("DOMContentLoaded", function () {
  function handleFormSubmit(event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const messageAlert = document.getElementsByName("messageAlert")[0].checked;
    const termAndCondition =
      document.getElementsByName("termAndCondition")[0].checked;

    const data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
      messageAlert,
      termAndCondition,
    };

    fetch("http://localhost:4000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);
});
