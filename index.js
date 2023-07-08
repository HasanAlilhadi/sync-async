const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find the file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write file');
      resolve('Success');
    });
  });
};

// readFilePro(`${__dirname}/text.txt`)
//   .then(data => {
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then(res => {
//     console.log(res.body.message);
//     return writeFilePro('dog-image.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved to file!');
//   })
//   .catch(err => {
//     console.log(err.message);
//   });

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/text.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    console.log(res.body.message);

    await writeFilePro('dog-image.txt', res.body.message);
    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log('ERROR');
    throw err;
  }

  return '2: Ready ';
};

// console.log('1: Will get dog pics!');
// getDogPic()
//   .then(x => {
//     console.log(x);
//     console.log('3: Done getting dog pics!');
//   })
//   .catch(err => {
//     console.log(err);
//   });

(async () => {
  try {
    console.log('1: Will get dog pics!');
    console.log(await getDogPic());
    console.log('3: Done getting dog pics!');
  } catch (err) {
    console.log('ERROR');
  }
})();
