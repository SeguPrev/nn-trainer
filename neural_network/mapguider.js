const NeuralNetwork = require('./nn.js');
const fs = require('fs');

const CATEGORIES = {
  "asesinato": 0,
  "violaciones": 1,
  "balaceras": 2,
  "robos": 3
};

const inputs_nodes = 4;
const hidden_nodes = 4;
const outputs_nodes = 1;

class MapGuider {
  constructor() {
    this.import();
  }

  static parse(array) {
    let parsed = {};
    array.forEach(event => {
      if (parsed[event.zone]) {
        let key = CATEGORIES[event.type.toLowerCase()];
        parsed[event.zone].cases[key] = parsed[event.zone].cases[key]+1;
      } else {
        parsed[event.zone] = {
          zone: '',
          lat: event.latitude,
          lng: event.longitude,
          cases: [0, 0, 0, 0, 0]
        };
      }
    });
    return parsed;
  }

  train(inputs) {
    this.nn.train(
      inputs.slice(0, inputs.length - 1),
      [inputs[inputs.length - 1]]
    );
  }

  predict(inputs) {
    const response = this.nn.predict(inputs.slice(0, inputs.length - 1));
    return response;
  }

  export () {
    fs.writeFile('brain.json', this.nn.serialize(), err => {
      if (err) console.error(err);
    });
  }

  import(size) {
    if (fs.existsSync('brain.json')) {
      const brain = fs.readFileSync('brain.json', 'utf-8');
      this.nn = new NeuralNetwork(NeuralNetwork.deserialize(brain), 0, 0);
    } else {
      this.nn = new NeuralNetwork(
        inputs_nodes,
        hidden_nodes,
        outputs_nodes,
      );
    }
  }
}

module.exports = MapGuider;