import ngrok from "@ngrok/ngrok";
import dotenv from "dotenv";

dotenv.config();

const port = 8080;

if (!process.env.NGROK_AUTHTOKEN) {
  console.error("Missing NGROK_AUTHTOKEN in .env");
  process.exit(1);
}

ngrok
  .connect({
    addr: port,
    authtoken_from_env: true,
    authtoken: process.env.NGROK_AUTHTOKEN,
  })
  .then((listener) => {
    console.log("--------------------");
    console.log(`✅ Local server: http://localhost:${port}`);
    console.log(`🌍 Ngrok tunnel: ${listener.url()}`);
    console.log("--------------------");
    setInterval(() => {}, 1 << 30);
  })
  .catch((err) => {
    console.error("Ngrok error:", err.message);
  });
