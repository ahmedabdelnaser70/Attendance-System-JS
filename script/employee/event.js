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

   //for security page

   let dailydBton = document.getElementById("dailytBtn");
   let rangetBton = document.getElementById("rangetBtn");

   $("#emDailyReport").show();
   $("#emRangeReport").hide();

   dailydBton.addEventListener("click", function () {
      $("#emDailyReport").show();
      $("#emRangeReport").hide();
   });

   rangetBton.addEventListener("click", function () {
      $("#emDailyReport").hide();
      $("#emRangeReport").show();
   });
});
