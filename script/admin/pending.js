$(function () {
   fetch("http://localhost:3000/pending")
      .then((respone) => respone.json())
      .then((data) => {
         {
            if (data != 0) {
               data.forEach((element) => {
                  let tr = document.createElement("tr");
                  tr.appendChild((td0 = document.createElement("td")));
                  tr.appendChild((td1 = document.createElement("td")));
                  tr.appendChild((td2 = document.createElement("td")));
                  tr.appendChild((td3 = document.createElement("td")));
                  tr.appendChild((td4 = document.createElement("td")));
                  tr.appendChild((td5 = document.createElement("td")));
                  tr.appendChild((td6 = document.createElement("td")));
                  td0.innerText = element["id"];
                  td1.innerText = element["firstName"];
                  td2.innerText = element["lastName"];
                  td3.innerText = element["age"];
                  td4.innerText = element["email"];
                  td5.innerText = element["address"];
                  td6.innerHTML = '<i class="bi bi-check-square-fill text-dark fs-5"></i> <i class="bi bi-x-square-fill text-dark fs-5"></i>';
                  //event if click confirm
                  td6.children[0].addEventListener("click", function (caller) {
                     let inputFirstName = caller.target.parentElement.parentElement.children[1].innerText;
                     let inputLastName = caller.target.parentElement.parentElement.children[2].innerText;
                     let inputAddress = caller.target.parentElement.parentElement.children[5].innerText;
                     let inputAge = caller.target.parentElement.parentElement.children[3].innerText;
                     let inputEmail = caller.target.parentElement.parentElement.children[4].innerText;

                     if (confirm(`Are you sure you want to accept`)) {
                        //object
                        let objSent = {
                           id: "",
                           firstName: inputFirstName,
                           lastName: inputLastName,
                           address: inputAddress,
                           age: inputAge,
                           email: inputEmail,
                           userName: generateUsername(inputFirstName),
                           password: generatePassword(),
                           type: "employee",
                        };
                        //send email with username and password
                        emailjs
                           .send("service_3v301eb", "template_1yomfge", {
                              sendTouUser: inputEmail,
                              fullName: `${inputFirstName} ${inputLastName}`, //object.fname  object.lname
                              userName: generateUsername(inputFirstName),
                              userPass: generatePassword(),
                           })
                           .then(() => {
                              //push data in user db server
                              fetch("http://localhost:3000/users", {
                                 method: "POST",
                                 headers: { "Content-type": "application/json; charset=UTF-8" },
                                 body: JSON.stringify(objSent),
                              }).then(() => {
                                 fetch(`http://localhost:3000/pending/${caller.target.parentElement.parentElement.children[0].innerText}`, {
                                    method: "DELETE",
                                 });
                              });
                           });
                     }
                  });
                  //event if click refuse
                  td6.children[1].addEventListener("click", function (caller) {
                     if (confirm(`Are you sure you want to delete `)) {
                        fetch(`http://localhost:3000/pending/${caller.target.parentElement.parentElement.children[0].innerText}`, {
                           method: "DELETE",
                        });
                     }
                  });
                  if ($("tbody").hasClass("emptyFlag")) {
                     $("tbody").removeClass("emptyFlag");
                     $("tbody").html("");
                  }
                  document.getElementsByTagName("tbody")[0].appendChild(tr);
               });
               const pindingTable = document.getElementById("pendingTable");
               if (pindingTable) {
                  new simpleDatatables.DataTable(pindingTable);
               }
            }
         }
      });
});

//generate random username
function generateUsername(firstName) {
   var randomNum = Math.floor(Math.random() * 9000) + 1000;
   var specialChar = ["@", "_"];
   var randomChar = specialChar[Math.floor(Math.random() * specialChar.length)];
   return firstName + randomNum + randomChar;
}

//generate random password
function generatePassword() {
   var possibleChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@&*";
   var password = "";
   for (var i = 0; i < 10; i++) {
      var randomNum = Math.floor(Math.random() * possibleChars.length);
      var randomChar = possibleChars.charAt(randomNum);
      password += randomChar;
   }
   return password;
}
