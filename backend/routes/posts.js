const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Get all published posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({ status: 'published' })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Only allow viewing published posts or drafts by the author
    if (post.status === 'draft' && (!req.user || post.author._id.toString() !== req.user._id.toString())) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's posts (including drafts)
router.get('/user/me', auth, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new post
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;
    
    const post = new Post({
      title,
      content,
      tags,
      status: status || 'draft',
      author: req.user._id
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update post
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this post' });
    }

    const { title, content, tags, status } = req.body;

    post.title = title;
    post.content = content;
    post.tags = tags;
    post.status = status;
    post.updatedAt = Date.now();

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ 
      _id: req.params.id, 
      author: req.user._id 
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 