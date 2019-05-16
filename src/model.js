const Ds = require('./ds');

class Model extends Ds {
    constructor() {
        super();
        this.a = 0;
    }

    addAnimal(name, size, type) {
        this.write('animals.json', { name, size, type });
    }

    addRoom(name, size, type) {
        this.write('rooms.txt', { name, size, type });
    }
}

const model = new Model();
model.addAnimal('elephant', 20, 'herbivore');
model.addAnimal('lion', 5, 'predator');
model.addAnimal('monkey', 2, 'omnivorous');
model.addAnimal('cow', 10, 'herbivore');

model.read('animals.json', ['1557993011425', '1557993042948']);
// model.remove('animals.json', ['1557995581955', '1557995581956']);
// module.exports = Model;
