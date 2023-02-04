//function to calculate late state of employee
export function lateState() {
   let currentTime = new Date();
   let workTime = new Date("2022-09-20T09:00:00.000");
   if (currentTime.getHours() - workTime.getHours() > 0) {
      return "Late";
   } else if (currentTime.getHours() == workTime.getHours()) {
      if (currentTime.getMinutes() - workTime.getMinutes() > 15) {
         return "Late";
      }
   } else {
      return "On Time";
   }
}

//function to calculate absence of employee
export function absenceState() {
   let currentTime = new Date();
   let workTime = new Date("2022-09-20T09:00:00.000");
   if (currentTime.getHours() - workTime.getHours() > 1) {
      return true;
   } else {
      return false;
   }
}

//function to calculate if employee excused absence or not
export function excusedAbsence() {
   let currentTime = new Date();
   let workTime = new Date("2022-09-20T16:00:00.000");
   if (currentTime.getHours() - workTime.getHours() < 0) {
      return true;
   } else {
      return false;
   }
}

//function to format date
export function formatDate(date) {
   let d = null;

   if (arguments.length) d = new Date(date);
   else d = new Date();
   let month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

   if (month.length < 2) month = "0" + month;
   if (day.length < 2) day = "0" + day;

   return [year, month, day].join("-");
}

//to calculate employee status in admin page
export async function getReportData(fromDate, toDate) {
   const usersMap = new Map();
   let data = await fetch(`http://localhost:3000/attendence?date_gte=${fromDate}&date_lte=${toDate}&_expand=user`);
   data = await data.json();

   data.forEach((item) => {
      if (usersMap.has(item.userId)) {
         let userAttend = usersMap.get(item.userId);

         if (item.absence == true) userAttend.absence++;
         else {
            userAttend.attend++;
            if (item.state == "Late") userAttend.late++;
            if (item.excuse == true) userAttend.excuse++;
         }
      } else {
         let newRow = {
            late: 0,
            absence: 0,
            attend: 0,
            excuse: 0,
            name: `${item.user.firstName} ${item.user.lastName}`,
         };

         if (item.absence == true) newRow.absence++;
         else {
            newRow.attend++;
            if (item.state == "Late") newRow.late++;
            if (item.excuse == true) newRow.excuse++;
         }
         usersMap.set(item.userId, newRow);
      }
   });
   return usersMap;
}
