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

   let attedBton = document.getElementById("attendBtn");
   let reportBton = document.getElementById("reportBtn");

   $("#securityAttend").show();
   $("#securityReport").hide();

   attedBton.addEventListener("click", function () {
      $("#securityAttend").show();
      $("#securityReport").hide();
   });

   reportBton.addEventListener("click", function () {
      $("#securityAttend").hide();
      $("#securityReport").show();
   });
});
