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

// module.exports = Model;
