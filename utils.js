const fs = require("fs");

const read = (table) =>
    JSON.parse(
        fs.readFileSync(`./${table}.json`, {
        encoding: "utf-8",
        })
    );

const write = (table, data) =>
    fs.writeFileSync(`./${table}.json`, JSON.stringify(data));

module.exports = {
    read,
    write,
};