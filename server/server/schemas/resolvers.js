const { User, Drug } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if(context.user) {
          const userData = await User.findOne({_id: context.user._id})
          .select('-__v -password')
          .populate('drugs')
          
          return userData
        }
        throw new AuthenticationError('Not logged in')
      },
      // get all drugs
      drugs: async (parent, {username }) => {
        const params = username ? { username } : {}; 
        return Drug.find(params).sort({ createdAt: -1 })
      },
      // get drug by ID
      drug: async (parent, {_id }) => {
        return Drug.findOne({ _id }); 
      },
      // get all users 
      users: async () => {
        return User.find()
        .select('__v -password')
        .populate('drugs');
      },
      // get user by username
      user: async (parent, {username }) => {
        return User.findOne ({ username })
        .select('-__v -password')
        .populate('drugs');
      }
      },
      Mutation: {
          // model creates a new user in the database with whatever is passed in with args 
          // args is username, password, email 
          addUser: async (parents, args) => {
            const user = await User.create(args);
            const token  = signToken(user); 
            return { token, user }
          },
          login: async (parent, {email, password}) => {
              const user = await User.findOne({ email });

              if(!user) {
                  throw new AuthenticationError('Incorrect credentials')
              }
              const correctPw = await user.isCorrectPassword(password); 

              if(!correctPw) {
                  throw new AuthenticationError('Incorrect credentials'); 
              }
              const token = signToken(user)
              return { token, user }; 
          },
            addDrug: async (parent, args, context) => {
            if (context.user) {
            const drug = await Drug.create({ ...args, username: context.user.username });
        
            await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { drugs: drug._id } },
                { new: true }
            );
        
            return drug;
            }
        
            throw new AuthenticationError('You need to be logged in!');
        },

        removeDrug: async (parent, { drugId }) => {
          return Drug.findOneAndDelete({ _id: drugId });
          
        
        }
      }
};

  
module.exports = resolvers;