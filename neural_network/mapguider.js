const NeuralNetwork = require('./nn.js');
const fs = require('fs');

class MapGuider {
  constructor(categories) {
    const inputs_nodes = 4;
    const hidden_nodes = 4;
    const outputs_nodes = 1;

    this.nn = new NeuralNetwork(
      inputs_nodes,
      hidden_nodes,
      outputs_nodes,
    );
  }

  normalize(matrix) {
    const exclude_target = matrix.slice(0, matrix.length-1);
    const min_val = this.min(exclude_target);
    const max_val = this.max(exclude_target);

    exclude_target.forEach((element) => {
        element[0] = (element[0] - min_val)/(max_val - min_val);
        element[1] = (element[1] - min_val)/(max_val - min_val);
        element[2] = (element[2] - min_val)/(max_val - min_val);
        element[3] = (element[3] - min_val)/(max_val - min_val)
    });
    return matrix;
  }

  min(matrix) {
    let min = 10000;
    matrix.forEach((row) => {
      row.forEach((element) => {
        if(element < min)
          min = element;
      });
    });
    return min;
  }

  max(matrix) {
    let max = -1;
    matrix.forEach((row) => {
      row.forEach((element) => {
        if(element > max)
          max = element;
      });
    });
    return max;
  }

  train(inputs) {
    // console.log(inputs.slice(0, inputs.length-1));
    // console.log(inputs[inputs.length-1]);
    this.nn.train(
      inputs.slice(0, inputs.length-1),
      [inputs[inputs.length-1]]
    );
  }

  predict(inputs) {
    console.log(inputs.slice(0, inputs.length-1));
    const response = this.nn.predict(inputs.slice(0, inputs.length-1));

    if(response[0] > 0.50)
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
