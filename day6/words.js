const fs = require('fs');
const http = require('http');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const txt = fs.readFileSync('./en.txt', 'utf-8');


function download(word) {
    return new Promise(function (resolve, reject) {
        http.get(`http://www.iciba.com/${word}`, function (res) {

            let body = Buffer.alloc(0);
            res.on('data', function (chunk) {
                body = Buffer.concat([body, chunk]);

            });

            res.on('end', function () {

                setTimeout(function () {
                    resolve(body.toString())
                }, 100)



            })
        });
    });
}


const words = txt.split(/\s/);


console.log(words);

const ws = {};

for (let w of words) {
    if ((/^[a-z]+$/).test(w)) {
        if (!ws[w]) {
            ws[w] = 1
        } else {
            ws[w] += 1
        }
    }
}

let w_list = [];
for (let w in ws) {
    w_list.push(`${w}`);
}

w_list.sort(function (a, b) {
    return b.length - a.length;
});



async function main() {

    let text = [];

    for (let w of w_list) {

        let html = await download(w);
        const dom = new JSDOM(html);
        let lis = dom.window.document.querySelectorAll('.base-list li.clearfix');

        console.log(w);
        text.push(w);
        for (let i = 0; i < lis.length; i++) {
            console.log(lis[i].textContent.replace(/\s/g, ''))
            text.push(lis[i].textContent.replace(/\s/g, ''))
        }
        console.log('------------------')
        text.push('---------------------');

    }

    fs.writeFileSync('./ws.txt', text.join('\r\n'));

    //const innerHtml = dom.window.document.querySelector('.base-list switch_part').innerHTML;

    //console.log(innerHtml)

}

main();



