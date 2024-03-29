// import { kafka } from "./client";
const kafka = require('./client')
async function init() {
  const admin = kafka.admin();
  console.log("admin connecting");
  await admin.connect();
  console.log("admin connection success");

  console.log("Creating topic");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });
  console.log("Creating topic success");

  console.log("Disconecting Admin");
  await admin.disconnect();
}

init();
