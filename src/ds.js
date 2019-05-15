/* eslint-disable class-methods-use-this */
const fs = require('mz/fs');

class Ds {
    constructor() {
        this.id = 0;
    }

    write(fileName, name, size, type) {
        const objContent = {};
        objContent[this.id] = { name, size, type };


        const writer = fs.createWriteStream(fileName, {
            flags: 'a+',
            encoding: 'utf8',
        });

        writer.write(JSON.stringify(objContent));

        // if (fs.existsSync(fileName)) {
        //     fs.readFile(fileName, 'utf8').then((data) => {
        //         console.log(data);
        //         objContent = JSON.parse(data);
        //     }).catch(err => console.error(err));
        // }
        // objContent[this.id] = { name, size, type };

        // fs.writeFile(fileName, JSON.stringify(objContent), 'utf8', (error) => {
        //     if (error) throw error;
        // });
        this.id += 1;
    }

    // eslint-disable-next-line class-methods-use-this
    read(fileName, id) {
        if (!id && !fileName) {
            console.log('Not id or fileName on read');
            return null;
        }
        const content = fs.readFile(fileName);
        const objContent = JSON.parse(content);
        if (id) {
            console.log(objContent[id]);
            return objContent[id];
        }
        console.log(objContent);
        return objContent;
    }
}

module.exports = Ds;

// const ds = new Ds();
// ds.write('animals.json', 'lion', 5, 'predator');
// ds.write('animals.json', 'cow', 10, 'herbivore');
// ds.write('animals.json', 'monkey', 2, 'omnivorous');

// ds.read('animals.txt');
