import http from 'node:http';
import fs from 'node:fs';

const enum URLENUM {
    HOME = '/',
    ABOUT = '/about',
    CONTACT = '/contact'
}

const server = http.createServer((req, res) => {
    const urlPath = req.url;

    if (urlPath === URLENUM.HOME || urlPath === '/home') {
        const homePageContent = fs.readFileSync('../html/home.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(homePageContent);
    } else if (urlPath === URLENUM.ABOUT) {
        const aboutPageContent = fs.readFileSync('../html/about.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(aboutPageContent);
    } else if (urlPath === URLENUM.CONTACT) {
        const contactPageContent = fs.readFileSync('../html/contact.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(contactPageContent);
    } else {
        const pageNotFoundContent = fs.readFileSync('../html/page-not-found.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(pageNotFoundContent);
    }

});

server.listen(54321, '127.0.0.1', () => {
    console.log('server is started');
});