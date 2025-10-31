import { defineRemixConfig } from "@remix-run/dev";

export default defineRemixConfig({
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true
  },
  serverModuleFormat: "esm",
  tailwind: true
});


