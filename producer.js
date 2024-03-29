const kafka = require("./client");
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
async function init() {
  const producer = kafka.producer();
  console.log("producer connecting");
  await producer.connect();
  console.log("producer connection success");

  rl.setPrompt('Write Line>>>>');
  rl.prompt();

  rl.on('line', async (line) => {
    const [riderName, location] = line.split(' ')    ;
    await producer.send({
        topic: "rider-updates",
        messages: [
          {
            partition: location.toLowerCase() === 'north' ? 1 : 0,
            key: "location-update",
            value: JSON.stringify({ name: riderName, location: location }),
          },
        ],
      });
  }).on('close', async () => {
    await producer.disconnect()
  })
}

init();
