// Require necessary NPM Packages
const express = require('express');
// Require Mongoose Model for Comment and Article
const Article = require('../models/article');
const Comments = require('../models/article');
// Instantiate a Router (mini app that only handles routes)
const router = express.Router();


/*****************************************
 * Action:      INDEX                    *
 * Method:      GET                      *
 * URI:         /api/articles            *
 * Description: Get All Articles         *
 *****************************************
 */
router.get('/api/articles/:article_id/comments', (req, res) => {
    const article_id = req.params.article_id
    Article.find(article_id)
  // Return all Articles as an Array
  .then((articles) => {
      if(article){
      res.status(200).json({ comments: articles.comments });
      } else {
        res.status(404).json({
            error:{
                name: 'DocumentNotFoundError',
                message: 'The provided ID doesn\'t match any documents'
            }
        })
      }
    })
  // Catch any errors that might occur
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});


/**********************************************
* Action:       SHOW                          *
* Method:       GET                           *
* URI:          /api/articles/:id             *
* Description:  Get A Comment by Article ID   *
************************************************
*/
router.get('/api/articles/:article_id/comments', (req, res) => {
    Article.findById(req.params.id)
    .then((article) => {
        if(article) {
            // pass the result if Mongoose's `.get` method to the next `.then`
            res.status(200).json(article.comments.id(req.params.comments_id))
        } else {
            // if we couldn't find a document with the mathcing ID
            res.status(404).json({
                error: {
                    name: 'DocumentNotFoundError',
                    message: 'The provided ID doesn\'t match any documents'
                }
            });
        }
    })
    .then(()=>{
        // If the deletion succeeded, return 204 and no JSON
        res.status(204).end();
    })
    // Catch any errors that might occur
    .catch((error) => {
        res.status(500).json({error: error});
    })
});

/**************************************
 * Action:      CREATE                *
 * Method:      POST                  *
 * URI:         /api/articles         *
 * Description: Create comment for an Article  *
***************************************
 */
router.post('/api/articles/:article_id/comments', (req, res) => {
    const createComment = new Comment({ replies: req.body.replies })
    Article.findById(req.params.id)
  // On a successful `create` action, respond with 201
  // HTTP status and the content of the new comment.
  .then((Article) => {
      if(article){
          article.comments.push(createComment)
          article.save()
          console.log(article)
          res.status(201).json({ article});
      } else{
          // if we couldn't find a document with the mathcing ID
          res.status(404).json({
              error: {
                  name: 'DocumentNotFoundError',
                  message: 'The provided ID doesn\'t match any documents'
            }
        });
      }
  })
  // Catch any errors that might occur
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});


/*************************************************
* Action:      UPDATE                            * 
* Method:      PATCH                             *
* URI:          /api/articles/:id                *
* Description:  Update a comment by comment ID   *
**************************************************
 */

router.patch('/api/articles/:article_id/comments/:comment_id', (req, res) => {
    Article.findById(req.params.id)
    .then((article) => {
        if(article) {
            // pass the result if Mongoose's `.patch` method to the next `.then`
            article.comments.id(req.params.comments_id).replies = req.body.replies
        article.save()
        return article
        } else {
            // if we couldn't find a document with the mathcing ID
            res.status(404).json({
                error: {
                    name: 'DocumentNotFoundError',
                    message: 'The provided ID doesn\'t match any documents'
                }
            });
        }
    })
    .then(()=>{
        // If the deletion succeeded, return 204 and no JSON
        res.status(204).end();
    })
    // Catch any errors that might occur
    .catch((error) => {
        res.status(500).json({error: error});
    })
});



/**********************************************************
* Action:      DESTROY                                    *
* Method:      DELETE                                     *
* URI:          /api/articles/:id                         *
* Description: Delete A Comment by comment & Article ID   *
***********************************************************
 */
router.delete('/api/articles/:id', (req, res) => {
    Article.findById(req.params.id)
    .then((article) => {
        if(article) {
            // pass the result if Mongoose's `.delete` method to the next `.then`
            article.comments.id(req.params.id).remove()
            return article.save()
        } else {
            // if we couldn't find a document with the mathcing ID
            res.status(404).json({
                error: {
                    name: 'DocumentNotFoundError',
                    message: 'The provided ID doesn\'t match any documents'
                }
            });
        }
    })
    .then(()=>{
        // If the deletion succeeded, return 204 and no JSON
        res.status(204).end();
    })
    // Catch any errors that might occur
    .catch((error) => {
        res.status(500).json({error: error});
    })
});


// Export the Router so we can use it in the server.js file
module.exports = router;