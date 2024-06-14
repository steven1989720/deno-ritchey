// Importing necessary modules from Deno standard library
import { serve } from "https://deno.land/std/http/server.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

// A map to store the text associated with a UUID
const textMap = new Map<string, string>();

// Function to generate HTML form with optional link display
function generateFormPage(link?: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Text Submission</title>
    </head>
    <body>
      <form action="/" method="post">
        <input type="text" name="text" placeholder="Enter your text here" required>
        <button type="submit">Submit</button>
      </form>
      ${link ? `<p>Your link: <a href="${link}" target="_blank">${link}</a></p>` : ""}
    </body>
    </html>
  `;
}

// Function to handle requests
async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);

  // Handling POST request to submit text
  if (request.method === "POST") {
    const formData = await request.formData();
    const text = formData.get("text");
    if (typeof text === "string") {
      const uuid = v4.generate();
      textMap.set(uuid, text);
      const link = `${url.origin}/${uuid}`;
      return new Response(generateFormPage(link), {
        headers: { "Content-Type": "text/html" },
      });
    }
  }

  // Handling GET request to retrieve text
  if (request.method === "GET" && url.pathname !== "/") {
    const uuid = url.pathname.slice(1);
    if (textMap.has(uuid)) {
      const text = textMap.get(uuid) || "";
      return new Response(text, {
        headers: { "Content-Type": "text/plain" },
      });
    }
  }

  // Return the HTML form for any other GET request
  return new Response(generateFormPage(), {
    headers: { "Content-Type": "text/html" },
  });
}

// Start the server
serve(handleRequest);
