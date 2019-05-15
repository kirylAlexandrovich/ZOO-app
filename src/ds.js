/* eslint-disable class-methods-use-this */
const fs = require('mz/fs');

class Ds {
    constructor() {
        this.id = new Date().getMilliseconds();
        this.bufer = [];
        this.fileStatus = true;
    }

    write(fileName, content) {
        const writer = (obj) => {
            // eslint-disable-next-line no-param-reassign
            obj[this.id] = content;

            fs.writeFile(fileName, JSON.stringify(obj), 'utf8', (error) => {
                if (error) throw error;
                this.fileStatus = true;

                if (this.bufer.length > 0) {
                    const args = this.bufer.splice(0, 1);

                    this.write(args[0].fileName, args[0].content);
                }
            });
            this.id += 1;
        };

        if (this.fileStatus === true) {
            this.fileStatus = false;
            let objContent = {};

            if (fs.existsSync(fileName)) {
                fs.readFile(fileName, 'utf8').then((data) => {
                    objContent = JSON.parse(data);
                    writer(objContent);
                }).catch(err => console.error(err));
            } else {
                writer(objContent);
            }
        } else {
            this.bufer.push({
                fileName, content,
            });
        }
    }

    // eslint-disable-next-line class-methods-use-this
    read(fileName, id) {
        if (!id && !fileName) {
            console.log('Not id or fileName on read');
            return null;
        }
        // else if (true) {
        //     fs.open();
        // }

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

// ds.write('animals.json', 'monkey', 2, 'omnivorous');

// ds.read('animals.json');
