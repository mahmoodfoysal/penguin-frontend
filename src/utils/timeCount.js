export const timeCount = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diff = now - createdDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  return `${days} days ago`;
};

// import { useEffect, useState } from "react";

// const TimeAgo =({ createdAt })=> {
//   const [time, setTime] = useState("");

//   useEffect(() => {
//     const update = () => {
//       const now = new Date();
//       const createdDate = new Date(createdAt);
//       const diff = now - createdDate;

//       const minutes = Math.floor(diff / (1000 * 60));
//       const hours = Math.floor(diff / (1000 * 60 * 60));
//       const days = Math.floor(diff / (1000 * 60 * 60 * 24));

//       if (minutes < 1) setTime("Just now");
//       else if (minutes < 60) setTime(`${minutes} min ago`);
//       else if (hours < 24) setTime(`${hours} hr ago`);
//       else setTime(`${days} days ago`);
//     };

//     update(); // initial
//     const interval = setInterval(update, 60000); // update every 1 min

//     return () => clearInterval(interval);
//   }, [createdAt]);

//   return <span>{time}</span>;
// }

// use it (it give real time)
// <TimeAgo createdAt={item.createdAt} />
