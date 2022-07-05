const app = require('./index.js');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;

//const port =  3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
