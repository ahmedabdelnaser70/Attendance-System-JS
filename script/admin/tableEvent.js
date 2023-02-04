window.addEventListener("DOMContentLoaded", (event) => {
   // Toggle the side navigation
   const sidebarToggle = document.body.querySelector("#sidebarToggle");
   if (sidebarToggle) {
      // Uncomment Below to persist sidebar toggle between refreshes
      // if (localStorage.getItem("sb|sidebar-toggle") === "true") {
      //    document.body.classList.toggle("sb-sidenav-toggled");
      // }
      sidebarToggle.addEventListener("click", (event) => {
         event.preventDefault();
         document.body.classList.toggle("sb-sidenav-toggled");
         localStorage.setItem("sb|sidebar-toggle", document.body.classList.contains("sb-sidenav-toggled"));
      });
   }

   //to make logout **********************
   let logoutBtn = document.getElementById("logout");

   logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.clear();
      location.href = "../../pages/login.html";
   });

   // for admin page *********************************************
   let pendingBton = document.getElementById("pendingBtn");
   let dailyBton = document.getElementById("dailyBtn");
   let rangeBton = document.getElementById("rangeBtn");
   $("#pending").show();
   $("#daily").hide();
   $("#range").hide();

   pendingBton.addEventListener("click", function () {
      $("#pending").show();
      $("#daily").hide();
      $("#range").hide();
   });

   dailyBton.addEventListener("click", function () {
      $("#pending").hide();
      $("#daily").show();
      $("#range").hide();
   });

   rangeBton.addEventListener("click", function () {
      $("#pending").hide();
      $("#daily").hide();
      $("#range").show();
   });
});
