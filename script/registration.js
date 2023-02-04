window.addEventListener("load", function () {
   let registerForm = document.getElementById("registerForm");
   let inputFirstName = document.getElementById("firstName");
   let inputLastName = document.getElementById("lastName");
   let inputAddress = document.getElementById("address");
   let inputAge = document.getElementById("age");
   let inputEmail = document.getElementById("email");

   //First name validaition
   checkValid(inputFirstName, "first name", isFirstNameValid);

   //Last name validaition
   checkValid(inputLastName, "last Name", isLastNameValid);

   // Email validaition
   checkValid(inputEmail, "E-mail", isEmailValid);

   //Check registeration form
   registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      fetch(`http://localhost:3000/users?email=${inputEmail.value}`)
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            if (data.length >= 1) {
               $.alert({
                  title: "Alert!",
                  content: "This Email Is Already Exist!",
                  theme: "supervan",
                  backgroundDismissAnimation: "glow",
               });
            } else {
               //Object information
               let newUserData = {
                  id: "",
                  firstName: inputFirstName.value,
                  lastName: inputLastName.value,
                  address: inputAddress.value,
                  age: inputAge.value,
                  email: inputEmail.value,
                  type: "employee",
               };
               //send email
               emailjs
                  .send("service_3v301eb", "template_1fv71te", {
                     sendTouUser: inputEmail.value,
                     fullName: `${inputFirstName.value} ${inputLastName.value}`,
                  })
                  .then(() => {
                     fetch("http://localhost:3000/pending", {
                        method: "POST",
                        body: JSON.stringify(newUserData),
                        headers: { "Content-type": "application/json; charset=UTF-8" },
                     });
                  });
               $.alert({
                  title: "Done",
                  theme: "modern",
                  content: "Check Your Email",
                  backgroundDismissAnimation: "glow",
               });
            }
         });
   });
});

//first name validaition function
function isFirstNameValid(fname) {
   return /^[a-zA-Z]{3,20}$/.test(fname.value);
}

//last name validaition function
function isLastNameValid(lname) {
   return /^[a-zA-Z]{3,20}$/.test(lname.value);
}

//Email validaition function
function isEmailValid(mail) {
   return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail.value);
}

// validation functions
function checkValid(input, text, checkingFunction) {
   input.addEventListener("blur", function () {
      if (!checkingFunction(input)) {
         input.style.border = "2px solid red";
         document.getElementById("notvalid").innerText = text + " is not valid";
         document.getElementById("notvalid").style.color = "red";
      } else {
         document.getElementById("notvalid").innerText = "Looks good";
         document.getElementById("notvalid").style.color = "green";
         input.style.border = "none";
      }
   });
}
