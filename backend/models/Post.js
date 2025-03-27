const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add text index for search functionality
postSchema.index({ title: 'text', content: 'text', tags: 'text' });

// Virtual for post URL
postSchema.virtual('url').get(function() {
  return `/posts/${this._id}`;
});

// Method to check if user is the author
postSchema.methods.isAuthor = function(userId) {
  return this.author.toString() === userId.toString();
};

// Static method to get posts by tag
postSchema.statics.findByTag = function(tag) {
  return this.find({ tags: tag, status: 'published' })
    .populate('author', 'username')
    .sort({ createdAt: -1 });
};

// Static method to get posts by author
postSchema.statics.findByAuthor = function(authorId) {
  return this.find({ author: authorId })
    .sort({ createdAt: -1 });
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post; 