import { getReportData } from "../modules/functions.js";

$(function () {
   let fromDate = document.getElementById("fromDate");
   let toDate = document.getElementById("toDate");

   toDate.addEventListener("change", function (event) {
      if (fromDate.value != "" && toDate.value != "") {
         let end = event.target.value;
         let start = fromDate.value;
         $("tbody").html("");
         getReportData(start, end).then((data) => {
            range(data);
         });
      }
   });

   fromDate.addEventListener("change", function (event) {
      if (fromDate.value != "" && toDate.value != "") {
         let start = event.target.value;
         let end = toDate.value;
         $("tbody").html("");
         getReportData(start, end).then((data) => {
            range(data);
         });
      }
   });
});

//
function range(data) {
   data.forEach((element) => {
      //create row
      let tr = document.createElement("tr");
      tr.innerHTML = `
            <td>${element.name}</td>
            <td>${element.attend}</td>
            <td>${element.late}</td>
            <td>${element.excuse}</td>
            <td>${element.absence}</td>`;

      if ($("#rangeTable tbody").hasClass("emptyFlag")) {
         $("#rangeTable tbody").html("");
      }
      document.getElementsByTagName("tbody")[2].appendChild(tr);
   });
   const rangeTable = document.getElementById("rangeTable");
   if (rangeTable) {
      new simpleDatatables.DataTable(rangeTable);
   }
}
