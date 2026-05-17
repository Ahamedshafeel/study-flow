export const getReminderTime = (preferredTime, reminderBefore) => {
  const [hour, minute] = preferredTime.split(":").map(Number);

  let date = new Date();
  date.setHours(hour);
  date.setMinutes(minute - reminderBefore);

  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");

  return `${h}:${m}`;
};