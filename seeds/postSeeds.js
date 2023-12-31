const { Post } = require('../models');

const postData = [
   {
      "title": "JavaScript Error a life story",
      "post_text": "I get more errors than I get likes on my posts",
      "user_id": 1
   },
   {
      "title": "I love Learning JavaScript",
      "post_text": "I love learning JavaScript, it's so much fun!",
      "user_id": 2
   },
   {
      "title": "I Hate Learning JavaScript",
      "post_text": "I hate learning JavaScript, it makes me cry!",
      "user_id": 3
   },
   {
      "title": "I'm a JavaScript Wizard",
      "post_text": "I'm a JavaScript Wizard, I can do anything!",
      "user_id": 4
   },
   {
      "title": "I'm a JavaScript Ninja",
      "post_text": "I'm a JavaScript Ninja, I can do anything!",
      "user_id": 5
   },
   {
      "title": "I'm a JavaScript Guru",
      "post_text": "I'm a JavaScript Guru, I can do anything!",
      "user_id": 6
   }
]

const seedPosts = () => Post.bulkCreate(postData);
module.exports = seedPosts;