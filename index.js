const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/text.txt`, (err, data) => {
  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
    if (err) console.log(err.message);

    console.log(res.body.message);
    fs.writeFile('dog-image.txt', res.body.message, (err) => {
      if (err) console.log(err.message);

      console.log('Random image saved');
    });
  });
});
