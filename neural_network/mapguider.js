const NeuralNetwork = require('./nn.js');
const fs = require('fs');

class MapGuider {
  constructor(categories) {
    const inputs_nodes = categories.length;
    const hidden_nodes = 6;
    const outputs_nodes = categories.length;

    this.nn = new NeuralNetwork(
      inputs_nodes,
      hidden_nodes,
      outputs_nodes,
    );
  }

  train(inputs, type) {
    let target = 0;
    if(type == 0)
      target = [1,1,0,0];
    else if(type == 1)
      target = [0, 0, 1, 1];

    this.nn.train(inputs, target);
  }

  predict(inputs) {
    const response = this.nn.predict(inputs);
    let m = Math.max.apply(null, response);

    if(response.indexOf(m) == 0 || response.indexOf(m) == 1)
      console.log('Important', response);
    else
      console.log('No important', response);
    return response;
  }

  export() {
    fs.writeFile('brain.json', this.nn.serialize(), err => {
      if(err) console.error(err);
    });
  }

  import(size) {
    if(fs.existsSync('brain.json')) {
      const brain = fs.readFileSync('brain.json', 'utf-8');
      this.nn = new NeuralNetwork(NeuralNetwork.deserialize(brain), 0, 0);
    }
  }
}

module.exports = MapGuider;
