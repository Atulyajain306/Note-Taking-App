export function extractTime(dateString){
    const date=new Date(dateString);
    const hours=padZero(date.getHours())
    const minutes=padZero(date.getMinutes());
return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short", // "Jan", "Feb", etc.
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // 24-hour format
    timeZone: "Asia/Kolkata", // Set your local timezone
});   
}

function padZero(number){
   return number.toString().padStart(2,"0");
}