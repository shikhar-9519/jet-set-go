export const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleString("en-IN", options);
};

export const formatDuration = (durationString) => {
  const matches = durationString.match(/(\d+) hours?(?: (\d+) minutes?)?/);

  if (!matches) return "";

  const hours = matches[1] ? parseInt(matches[1]) : 0;
  const minutes = matches[2] ? parseInt(matches[2]) : 0;

  const totalMinutes = hours * 60 + minutes;

  const formattedHours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const formattedMinutes = String(totalMinutes % 60).padStart(2, "0");

  return `${formattedHours}h ${formattedMinutes}m`;
};
