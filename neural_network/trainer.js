class Trainer {
  constructor(nn) {
    this.nn = nn;
  }



  intenseTrain(testing) {
    let correct = 0;
    for(let i = 0; i < testing.length; i++) {
      let data = testing[i];
      let inputs = Array.from(data).map(x => x / 5);
      let label = testing[i].label;
      let guess = this.nn.predict(inputs);

      let m = Math.max.apply(null, guess);
      let classification = guess.indexOf(m);

      if(classification === label)
        correct++;
    }

    let percent = 100 * correct / testing.length;
    return percent;
  }
}

module.exports = Trainer;
