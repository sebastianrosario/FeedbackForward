const bcrypt = require('bcrypt');


hashPass = async () => {
    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
}
