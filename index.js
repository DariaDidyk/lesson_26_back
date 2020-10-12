// const { request } = require("http");
// console.log('Hello world');

const http = require("http");
const url = require("url");
const queryString = require("querystring");
const { read, write } = require("./utils");
const { filter, defaultTo, last, eq } = require("lodash");

const hostname = "localhost";
const port = 3000;

    const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url);
    const { id } = queryString.parse(parsedUrl.query);  // деструкторизация сразу достали id

    response.setHeader("Access-Control-Allow-Origin", "*");

    const messages = read("messages");
    switch (parsedUrl.pathname) {
        case "/add":
        write("messages", [
            ...messages,
            {
            id: messages[messages.length - 1].id + 1,
            name: "No-name",
            },
        ]);
        break;
        case "/delete":
        // const newArray = [...messages];
        // if (id) {
        //     const nA = filter(newArray, (massage) => massage.id !== Number(defaultTo(id, last(massage).id)));

        //     // if (elementIndex !== -1) {
        //     // newArray.splice(elementIndex, 1);
        //     // }
        // } else {
        //     newArray.splice(newArray.length - 1, 1);
        // }

        write(
            "messages", 
                filter(
                    messages,
                    (massage) => !eq(massage.id,  Number(defaultTo(id, last(messages).id)))
                )
            );
    }

    response.end(JSON.stringify(read("messages")));
    });

    server.listen(port, hostname, () => {
    console.log(`Server is listening ${hostname}:${port}`);
    });


// const db = JSON.parse(
//     fs.readFileSync("./massages.json", {
//         encoding: "utf-8",
//     })
// );  
// fs.writeFileSync('./massages.json', JSON.stringify(newData));