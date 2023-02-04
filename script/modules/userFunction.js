//function to calculate employee status in user page
export async function getUserReportData(fromDate, toDate) {
   const usersMap = new Map();

   let id = JSON.parse(localStorage.getItem("user")).id;

   let data = await fetch(`http://localhost:3000/users/${id}/attendence?date_gte=${fromDate}&date_lte=${toDate}&_expand=user`);
   data = await data.json();
   // console.log(data);
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
