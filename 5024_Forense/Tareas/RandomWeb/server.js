const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const hostname = "127.0.0.1";
const port = 3000;

// Routes: URL path -> HTML file next to this script
const pages = {
    "/": "index.html",
    "/about": "about.html",
    "/contact": "contact.html",
    "/guestbook": "guestbook.html",
};

const contentTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
};

// Shared navigation so you can travel between all pages
const nav = `
<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
    <a href="/guestbook">Guestbook</a>
</nav>`;

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

function sendHtml(res, html, statusCode = 200) {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(html);
}

function sendFile(res, file) {
    fs.readFile(path.join(__dirname, file), (err, data) => {
        if (err) {
            sendHtml(res, `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Not found</title><link rel="stylesheet" href="/style.css"></head>
<body>${nav}<main><h1>404 - Page not found</h1><p>Sorry, that page does not exist.</p></main></body>
</html>`, 404);
            return;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", contentTypes[path.extname(file)] || "application/octet-stream");
        res.end(data);
    });
}

// Page shown after a form is submitted; echoes the values back (HTML-escaped)
function confirmationPage(title, lines) {
    const items = lines
        .map(([label, value]) =>
            `<li><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value) || "(empty)"}</li>`)
        .join("\n            ");
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>${escapeHtml(title)}</title><link rel="stylesheet" href="/style.css"></head>
<body>${nav}
<main>
    <h1>${escapeHtml(title)}</h1>
    <ul>
            ${items}
    </ul>
    <p>Thanks for submitting! Use the links above to keep browsing.</p>
</main>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const route = pages[url.pathname];

    if (req.method === "GET") {
        if (url.pathname === "/style.css") return sendFile(res, "style.css");
        if (route) return sendFile(res, route);
        return sendFile(res, "does-not-exist.html"); // renders the 404 page
    }

    if (req.method === "POST" && (url.pathname === "/contact" || url.pathname === "/guestbook")) {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
            const params = new URLSearchParams(body);
            if (url.pathname === "/contact") {
                sendHtml(res, confirmationPage("Message sent", [
                    ["Name", params.get("name")],
                    ["Email", params.get("email")],
                    ["Message", params.get("message")],
                ]));
            } else {
                sendHtml(res, confirmationPage("Guestbook entry saved", [
                    ["Name", params.get("name")],
                    ["Comment", params.get("comment")],
                ]));
            }
        });
        return;
    }

    sendHtml(res, "<!DOCTYPE html><html><body><h1>405 - Method not allowed</h1></body></html>", 405);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
