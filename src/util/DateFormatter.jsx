const DateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default DateFormatter;