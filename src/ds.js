/* eslint-disable class-methods-use-this */
const fs = require('mz/fs');

class Ds {
    constructor() {
        this.bufer = [];
        this.buferForRemove = [];
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

    read(fileName, id) {
        if (!fileName) {
            console.log('Not fileName for read');
        }
        let objContent;
        fs.readFile(fileName, 'utf8').then((data) => {
            objContent = JSON.parse(data);
            if (Array.isArray(id)) {
                id.forEach((element) => {
                    console.log(objContent[element]);
                });
            } else if (id) {
                console.log(objContent[id]);
            } else {
                console.log(objContent);
            }
        }).catch(err => console.log(err));
    }

    remove(fileName, id) {
        if (!id) {
            console.log('Not id for delete');
            return false;
        }
        let objContent;
        fs.readFile(fileName, 'utf8').then((data) => {
            objContent = JSON.parse(data);
            if (Array.isArray(id)) {
                id.forEach((element) => {
                    if (objContent[element]) {
                        delete objContent[element];
                        console.log(`Animal ${element} dedeted`);
                    } else {
                        console.log(`${element} is not defined`);
                    }
                });
            } else if (objContent[id]) {
                console.log(`Animal ${id} dedeted`);
                delete objContent[id];
            } else {
                console.log(`${id} is not defined`);
                return false;
            }

            const rewriteFile = (filePath, removedObj) => {
                fs.writeFile(filePath, JSON.stringify(removedObj), 'utf8', (error) => {
                    if (error) throw error;
                    this.fileStatus = true;
                    if (this.buferForRemove.length > 0) {
                        const args = this.buferForRemove.shift();
                        this.write(args.fileName, args.content);
                    }
                });
            };

            const checkStatus = () => {
                if (this.fileStatus === true) {
                    this.fileStatus = false;
                    rewriteFile(fileName, objContent);
                } else {
                    this.buferForRemove.push({
                        fileName,
                        objContent,
                    });
                    setTimeout(() => {
                        checkStatus();
                    }, 100);
                }
            };
            checkStatus();
            return true;
        }).catch(err => console.log(err));
        return 'a';
    }
}

module.exports = Ds;
