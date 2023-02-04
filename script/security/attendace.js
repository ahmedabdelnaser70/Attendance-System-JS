import { formatDate } from "../modules/functions.js";
import { absenceState } from "../modules/functions.js";
import { lateState } from "../modules/functions.js";
import { excusedAbsence } from "../modules/functions.js";

window.addEventListener("load", function () {
   let inputUserName = userName;
   let attendBtn = attend;
   let leveBtn = leve;

   //button to make attendance
   attendBtn.addEventListener("click", function (e) {
      fetch(`http://localhost:3000/users?userName=${inputUserName.value}`)
         .then((response) => response.json())
         .then((data) => {
            //check if this employee found in data or not
            if (data.length) {
               //boject
               let userId = data[0].id;
               let userAttendance = {
                  id: "",
                  userId: data[0].id,
                  in: new Date().toLocaleTimeString(),
                  date: formatDate(),
                  state: "",
                  absence: absenceState(),
               };
               //
               if (userAttendance.absence == false) {
                  userAttendance.state = lateState();
                  userAttendance.absence = "";
               }

               fetch(`http://localhost:3000/attendence?userId=${userId}&date=${formatDate()}`)
                  .then((response) => response.json())
                  .then((data) => {
                     //check if user attended today or not
                     if (data.length == 0) {
                        //post data in attendance
                        fetch("http://localhost:3000/attendence", {
                           method: "POST",
                           headers: { "Content-type": "application/json; charset=UTF-8" },
                           body: JSON.stringify(userAttendance),
                        });
                     } else if (data.length >= 1) {
                        alert("This user attended once today");
                     }
                  });
            } else {
               alert("username is not found");
            }
         });
   });

   //button to make leave
   leveBtn.addEventListener("click", function () {
      fetch(`http://localhost:3000/users?userName=${inputUserName.value}`)
         .then((response) => response.json())
         .then((data) => {
            if (data.length) {
               let userId = data[0].id;

               fetch(`http://localhost:3000/attendence?userId=${userId}&date=${formatDate()}`)
                  .then((response) => response.json())
                  .then((data) => {
                     let userAttendance = {
                        out: new Date().toLocaleTimeString(),
                        excuse: "",
                     };

                     if (data[0].absence == false) {
                        userAttendance.excuse = excusedAbsence();
                     }

                     let id = data[0].id;
                     fetch(`http://localhost:3000/attendence/${id}`, {
                        method: "PATCH",
                        headers: { "Content-type": "application/json; charset=UTF-8" },
                        body: JSON.stringify(userAttendance),
                     });
                  });
            } else {
               alert("this employee did not attend today");
            }
         });
   });
});
