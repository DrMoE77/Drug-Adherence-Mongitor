const { Drug } = require('../models');

const resolvers = {
  Query: {
    drugs: async () => {
      return Drug.find().sort({ createdAt: -1 });
    },

    drug: async (parent, { drugId }) => {
      return Drug.findOne({ _id: drugId });
    },
  },

  Mutation: {
    addDrug: async (parent, { name, drug_name, dosage, frequency }) => {
      return Drug.create({ name, drug_name, dosage, frequency });
    },

    addDrug: async (parent, { drugId, name, drug_name, dosage, frequency }) => {
      return Drug.findOneAndUpdate(
        { _id: drugId },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    
    removeDrug: async (parent, { drugId }) => {
      return Drug.findOneAndDelete({ _id: drugId });
    },
  
  },
};

module.exports = resolvers;