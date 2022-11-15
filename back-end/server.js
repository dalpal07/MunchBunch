const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/journal', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const postSchema = new mongoose.Schema({
  date: String,
  title: String,
  entry: String,
});

postSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  
postSchema.set('toJSON', {
  virtuals: true
});

const Post = mongoose.model('Post', postSchema);

app.get('/cp4-api/posts', async (req, res) => {
  try {
    let posts = await Post.find();
    res.send({posts: posts});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/cp4-api/posts', async (req, res) => {
    const post = new Post({
      date: req.body.date,
      title: req.body.title,
      entry: req.body.entry
  });
  try {
    await post.save();
    res.send({post:post});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.patch('/cp4-api/posts/:id', async (req, res) => {
  try {  
    let post = new Post({
      date: req.body.date,
      title: req.body.title,
      entry: req.body.entry
    })
    await Post.deleteOne({
      _id: req.params.id
    })
    await post.save()
    res.send({post:post});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.delete('/cp4-api/posts/:id', async (req, res) => {
  try {
    await Post.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3002, () => console.log('Server listening on port 3002!'));