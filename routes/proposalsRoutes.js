const mongoose = require('mongoose');
const Proposal = mongoose.model('proposals');

module.exports = (app) => {
  app.post('/api/proposal/', async (req, res) => {
    const { nickname, address } = req.body;

    const newUserData = await Proposal.findOneAndUpdate(
      { address },
      {
        $set: {
          nickname: nickname.substr(0, 25),
        },
      },
    ).catch(error => {
      res.status(500).send({ message: 'Something went wrong while submiting proposal data.'});
    });

    res.status(200).send({ profile: newUserData, message: 'Proposal data submited.' });
  });
}