import app from "./app";
import { env } from "./config/env";

app.listen(env.PORT, () => {
  console.log(`
==================================
🚀 Cacharro Dist API
🌐 http://localhost:${env.PORT}
==================================
`);
});