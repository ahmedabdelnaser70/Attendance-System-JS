$(function () {
   let calender = document.getElementById("inputDate");

   calender.addEventListener("change", function (event) {
      $("#dailyTable tbody").html("");

      let id = JSON.parse(localStorage.getItem("user")).id;
      let firstName = JSON.parse(localStorage.getItem("user")).firstName;
      let lastName = JSON.parse(localStorage.getItem("user")).lastName;

      fetch(`http://localhost:3000/users/${id}/attendence?_expand=user&date=${calender.value}`)
         .then((respone) => respone.json())
         .then((data) => {
            if (data.length) {
               //create row
               let tr = document.createElement("tr");
               tr.innerHTML = `
                        <td>${firstName} ${lastName}</td>
                        <td>${data[0].date}</td>
                        <td>${data[0].in}</td>
                        <td>${data[0].out}</td>
                        <td>${data[0].state}</td>
                        <td>${data[0].absence}</td>`;
               if ($("#dailyTable tbody").hasClass("emptyFlag")) {
                  $("#dailyTable tbody").html("");
               }
               document.getElementsByTagName("tbody")[0].appendChild(tr);
            }
            const dailyTable = document.getElementById("dailyTable");
            if (dailyTable) {
               new simpleDatatables.DataTable(dailyTable);
            }
         });
   });
});
