<?php
// The Cloudways web server hands any address that doesn't match a real file to this script.
// It answers with the site's "Page Not Found" page (404.html) and the correct 404 status.
//
// If the server ever routes the home page through here as well, it gets the normal home page.
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

header('Content-Type: text/html; charset=utf-8');

if ($path === '/' || $path === '/index.php' || $path === '/index.html') {
    readfile(__DIR__ . '/index.html');
    exit;
}

http_response_code(404);
readfile(__DIR__ . '/404.html');
