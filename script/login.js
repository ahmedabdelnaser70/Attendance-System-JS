window.addEventListener("load", function () {
   let loginForm = document.getElementById("loginForm");
   let inputUserName = document.getElementById("userName");
   let inputPassword = document.getElementById("password");

   //user name validaition
   inputUserName.addEventListener("blur", function () {
      if (!isValid(inputUserName)) {
         document.getElementById("notvalid").innerText = "not valid User Name";
         document.getElementById("notvalid").style.color = "red";
      } else {
         document.getElementById("notvalid").innerText = "Looks good";
         document.getElementById("notvalid").style.color = "green";
         inputUserName.style.border = "none";
      }
   });

   //check on login form
   loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      //check data from db server
      fetch(`http://localhost:3000/users?username=${inputUserName.value}&password=${inputPassword.value}`)
         .then((response) => response.json())
         .then((data) => {
            //if find user name in data server
            if (data.length == 1) {
               //create object to put it in local storage
               let userData = {
                  id: data[0].id,
                  firstName: data[0].firstName,
                  lastName: data[0].lastName,
                  userName: data[0].userName,
                  type: data[0].type,
               };

               localStorage.setItem("user", JSON.stringify(userData));

               if (data[0].type == "admin") {
                  //if type of user is Admin
                  location.href = "../pages/admin/admin.html"; //for admin <-------------------------
               } else if (data[0].type == "security") {
                  location.href = "../pages/security/security.html"; //for security  <-------------------------
               } else {
                  location.href = "../pages/employee/employee.html"; //for any employee  <-------------------------
               }
            } else {
               //if data is not found
               alert("Please Enter Right Username & Password");
            }
         });
   });
});

// validaition function
function isValid(name) {
   return /^(?=.*[a-zA-Z]).{4,}$/.test(name.value);
}
