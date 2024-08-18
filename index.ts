console.log("working");

import connectDB from "./database";

async function main() {
  await connectDB();
}

main();
