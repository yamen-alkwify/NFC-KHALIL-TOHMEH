import { defineConfig } from "vite";

const vcardFileName = "Khalil-Tohmeh.vcf";
const vcardContent = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "N:Tohmeh;Khalil;;;",
  "FN:Khalil Tohmeh",
  "ORG:CHAM HOLDING",
  "TEL;TYPE=CELL:0933443446",
  "EMAIL;TYPE=WORK:Khaleel.Tohmeh@chamholding.sy",
  "URL;TYPE=WORK:https://damacham.sy/",
  "ADR;TYPE=WORK:;;The Eight Gate;Yafour;Damascus;;Syria",
  "END:VCARD",
  "",
].join("\r\n");

function vcardPlugin() {
  const serveVcard = (request, response, next) => {
    const pathname = new URL(request.url, "http://localhost").pathname;
    if (pathname !== `/${vcardFileName}`) {
      next();
      return;
    }

    response.statusCode = 200;
    response.setHeader("Content-Type", "text/vcard; charset=utf-8");
    response.setHeader("Content-Disposition", `inline; filename="${vcardFileName}"`);
    response.setHeader("Cache-Control", "no-store");
    response.end(vcardContent);
  };

  return {
    name: "obayda-vcard",
    configureServer(server) {
      server.middlewares.use(serveVcard);
    },
    configurePreviewServer(server) {
      server.middlewares.use(serveVcard);
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: vcardFileName, source: vcardContent });
    },
  };
}

export default defineConfig({
  plugins: [vcardPlugin()],
  server: {
    host: "0.0.0.0",
    allowedHosts: [".trycloudflare.com"],
  },
});
