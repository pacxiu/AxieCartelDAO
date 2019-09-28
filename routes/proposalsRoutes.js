const mongoose = require('mongoose');
const Proposal = mongoose.model('proposals');

module.exports = (app) => {
  // Saving Proposal Data
  app.post('/api/proposal/', async (req, res) => {
    const { link, description, issuer, txHash, totalProposals } = req.body;
    
    const totalProposalsDB = await Proposal.countDocuments();
    
    const newProposalData = await Proposal.findOne(
      { id: totalProposals - 1 },
    );

    if (!newProposalData) {
      try {
        const createdProposal = await new Proposal({
          id: totalProposals - 1,
          description: description.toString(),
          link,
          issuer,
          txHash,
        }).save();

        res.status(200).send({ proposal: createdProposal, message: 'Proposal data submited.' });
      } catch(error) {
         res.status(500).send({ message: 'Something went wrong while submiting proposal data.'});
       };
    } else {
      res.status(500).send({ message: 'Proposal data already exists '});
    }
  });

  // Get Proposal data
  app.get('/api/proposal/:id', async (req, res) => {
    const { id } = req.params;

    const proposal = await Proposal.findOne({
      id,
    });

    if (proposal) {
      return res.status(200).send({ proposal });
    }

    return res.status(404).send({ message: 'Not found proposal with provided id '});
  });
}