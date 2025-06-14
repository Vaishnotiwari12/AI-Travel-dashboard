// import type { Config } from "@react-router/dev/config";

// export default {
//   // Config options...
//   // Server-side render by default, to enable SPA mode set this to `false`
import type { Config } from "@react-router/dev/config";
import routes from "./app/routes";

export default {
  ssr: true
} satisfies Config;