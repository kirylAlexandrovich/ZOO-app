const fs = require('mz/fs');

class Ds {
    constructor() {
        this.bufer = [];
        this.fileStatus = true;
    }

    write(fileName, content) {
        const writer = (obj) => {
            const animalObj = obj;
            animalObj[new Date().getTime()] = content;

            fs.writeFile(fileName, JSON.stringify(animalObj), 'utf8', (error) => {
                if (error) throw error;
                this.fileStatus = true;

                if (this.bufer.length > 0) {
                    const args = this.bufer.shift();

                    this.write(args.fileName, args.content);
                }
            });
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

    // read(fileName, id) {
    //     if (!fileName) {
    //         console.log('Not fileName for read');
    //         return null;
    //     }

    //     if (this.fileStatus === true) {
    //         const ffff = fs.createReadStream(fileName);
    //         console.log(ffff.read());
    //         const objContent = JSON.parse(fs.createReadStream(fileName));
    //         if (id) {
    //             console.log(objContent[id]);
    //             return objContent[id];
    //         }
    //         console.log(objContent);
    //         return objContent;
    //     }
    //     return null;
    // }
}

module.exports = Ds;

const ds = new Ds();
// ds.write('animals.json', 'lion', 5, 'predator');

// ds.write('animals.json', 'monkey', 2, 'omnivorous');

ds.read('animals.json');
