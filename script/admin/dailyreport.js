$(function () {
   let calender = document.getElementById("inputDate");

   calender.addEventListener("change", function (event) {
      $("#dailyTable tbody").html("");

      fetch("http://localhost:3000/users?_embed=attendence")
         .then((respone) => respone.json())
         .then((data) => {
            if (data.length) {
               data.forEach((user) => {
                  let dailyAttend = user.attendence.find((attend) => {
                     return attend.date == event.target.value; //event.target.value------------------------------
                  });
                  if (dailyAttend) {
                     //create row
                     let tr = document.createElement("tr");
                     if (dailyAttend) {
                        tr.innerHTML = `
                        <td>${user.firstName} ${user.lastName}</td>
                        <td>${dailyAttend.date}</td>
                        <td>${dailyAttend.in}</td>
                        <td>${dailyAttend.out}</td>
                        <td>${dailyAttend.state}</td>
                        <td>${dailyAttend.absence}</td>`;
                     }
                     if ($("#dailyTable tbody").hasClass("emptyFlag")) {
                        $("#dailyTable tbody").html("");
                     }
                     document.getElementsByTagName("tbody")[1].appendChild(tr);
                  }
               });
               const dailyTable = document.getElementById("dailyTable");
               if (dailyTable) {
                  new simpleDatatables.DataTable(dailyTable);
               }
            }
         });
   });
});
