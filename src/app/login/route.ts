import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "src/app/login/login-static.html"),
    "utf-8"
  );
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
