const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID'});
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a User
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a User
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and thoughts assosicated are deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a User
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeFriend(req, res) {
    const filter = {_id: req.params.userId };
    try {
      const user = await User.findOneAndUpdate(
        filter,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID'});
      }
      res.json({ message: 'User\'s friend successfully deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    const filter = {_id: req.params.userId };
    try {
      const user = await User.findOneAndUpdate(
        filter,
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID'});
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  /*async addFriend(req, res) {
    const filter = {_id: req.params.userId };
    try {
      const user = await User.findOne()
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID'});
      } else {
        const friends = user.friends.push(req.params.friendId)
        const updatedUser = await User.findOneAndUpdate(
          filter,
          { friends: friends },
          { runValidators: true, new: true }
        );
  
        if (!updatedUser) {
          res.status(404).json({ message: 'We ran into issues with adding user\'s new friend' });
        }
        res.json(updatedUser);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }*/
};