<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
            name="description"
            content="A simple book collection app"
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>A simple book collection app</title>
    </head>
    <body>
        <div id="root"></div>
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </body>
</html>
