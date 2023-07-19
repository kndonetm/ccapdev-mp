import { ObjectId } from "mongodb"

import { Router } from 'express'
import searchRouter from './search-router.js';
import userRouter from './user-router.js';

import { getDb } from '../model/conn.js';

const router = Router();
const db = getDb();
const establishments_db = db.collection("establishments");
const users_db = db.collection("users");
const reviews_db = db.collection("reviews");

router.get("/", async function (req, res) {
    const establishments = await establishments_db.find({}).toArray();

    res.render("index", {
        title: "Home",
        establishments: establishments
    });
})

router.use(userRouter);
router.use(searchRouter);

router.get("/:establishmentid", async function (req, res) {
    const oid = new ObjectId(req.params.establishmentid);

    const establishments = await establishments_db.find({}).toArray();
    const selectedEstab = await establishments_db.find({ _id: oid }).toArray();
    const reviews = await reviews_db.aggregate([
      {
        '$match': {
          'establishmentId': new ObjectId('64ad74f29c3a43fc64bb44d5')
        }
      }, {
        '$lookup': {
          'from': 'comments', 
          'localField': '_id', 
          'foreignField': 'reviewId', 
          'as': 'comments'
        }
      }, {
        '$unwind': {
          'path': '$comments', 
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$lookup': {
          'from': 'users', 
          'localField': 'userId', 
          'foreignField': '_id', 
          'as': 'user'
        }
      }, {
        '$unwind': {
          'path': '$user', 
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$lookup': {
          'from': 'users', 
          'localField': 'comments.userId', 
          'foreignField': '_id', 
          'as': 'comments.user'
        }
      }, {
        '$unwind': {
          'path': '$comments.user', 
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$match': {
          'comments.parent': null
        }
      }, {
        '$graphLookup': {
          'from': 'comments', 
          'startWith': '$comments._id', 
          'connectFromField': '_id', 
          'connectToField': 'parent', 
          'as': 'comments.children', 
          'depthField': 'level'
        }
      }, {
        '$unwind': {
          'path': '$comments.children', 
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$lookup': {
          'from': 'users', 
          'localField': 'comments.children.userId', 
          'foreignField': '_id', 
          'as': 'comments.children.user'
        }
      }, {
        '$unwind': {
          'path': '$comments.children.user', 
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$sort': {
          '_id': 1, 
          'comments.children.level': -1
        }
      }, {
        '$group': {
          '_id': {
            'reviewid': '$_id', 
            'commentid': '$comments._id'
          }, 
          'id': {
            '$first': '$_id'
          }, 
          'title': {
            '$first': '$title'
          }, 
          'content': {
            '$first': '$content'
          }, 
          'rating': {
            '$first': '$rating'
          }, 
          'likes': {
            '$first': '$likes'
          }, 
          'dislikes': {
            '$first': '$dislikes'
          }, 
          'edited': {
            '$first': '$edited'
          }, 
          'images': {
            '$first': '$images'
          }, 
          'videos': {
            '$first': '$videos'
          }, 
          'datePosted': {
            '$first': '$datePosted'
          }, 
          'estabResponse': {
            '$first': '$estabResponse'
          }, 
          'establishmentId': {
            '$first': '$establishmentId'
          }, 
          'userId': {
            '$first': '$userId'
          }, 
          'user': {
            '$first': '$user'
          }, 
          'comments': {
            '$first': {
              '_id': '$comments._id', 
              'content': '$comments.content', 
              'likes': '$comments.likes', 
              'dislikes': '$comments.dislikes', 
              'datePosted': '$comments.datePosted', 
              'userId': '$comments.userId', 
              'parent': '$comments.parent', 
              'user': '$comments.user'
            }
          }, 
          'children': {
            '$push': '$comments.children'
          }
        }
      }, {
        '$replaceWith': {
          '$arrayToObject': {
            '$map': {
              'input': {
                '$objectToArray': '$$ROOT'
              }, 
              'as': 'item', 
              'in': {
                '$cond': {
                  'if': {
                    '$ne': [
                      '$$item.v', [
                        {}
                      ]
                    ]
                  }, 
                  'then': '$$item', 
                  'else': {
                    'k': '$$item.k', 
                    'v': []
                  }
                }
              }
            }
          }
        }
      }, {
        '$addFields': {
          'children': {
            '$reduce': {
              'input': '$children', 
              'initialValue': {
                'level': -1, 
                'presentChild': [], 
                'prevChild': []
              }, 
              'in': {
                '$let': {
                  'vars': {
                    'prev': {
                      '$cond': [
                        {
                          '$eq': [
                            '$$value.level', '$$this.level'
                          ]
                        }, '$$value.prevChild', '$$value.presentChild'
                      ]
                    }, 
                    'current': {
                      '$cond': [
                        {
                          '$eq': [
                            '$$value.level', '$$this.level'
                          ]
                        }, '$$value.presentChild', []
                      ]
                    }
                  }, 
                  'in': {
                    'level': '$$this.level', 
                    'prevChild': '$$prev', 
                    'presentChild': {
                      '$concatArrays': [
                        '$$current', [
                          {
                            '$mergeObjects': [
                              '$$this', {
                                'children': {
                                  '$filter': {
                                    'input': '$$prev', 
                                    'as': 'e', 
                                    'cond': {
                                      '$eq': [
                                        '$$e.parent', '$$this._id'
                                      ]
                                    }
                                  }
                                }
                              }
                            ]
                          }
                        ]
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      }, {
        '$addFields': {
          'children': '$children.presentChild'
        }
      }, {
        '$group': {
          '_id': '$id', 
          'title': {
            '$first': '$title'
          }, 
          'content': {
            '$first': '$content'
          }, 
          'rating': {
            '$first': '$rating'
          }, 
          'likes': {
            '$first': '$likes'
          }, 
          'dislikes': {
            '$first': '$dislikes'
          }, 
          'edited': {
            '$first': '$edited'
          }, 
          'images': {
            '$first': '$images'
          }, 
          'videos': {
            '$first': '$videos'
          }, 
          'datePosted': {
            '$first': '$datePosted'
          }, 
          'estabResponse': {
            '$first': '$estabResponse'
          }, 
          'establishmentId': {
            '$first': '$establishmentId'
          }, 
          'userId': {
            '$first': '$userId'
          }, 
          'user': {
            '$first': '$user'
          }, 
          'children': {
            '$push': {
              '_id': '$comments._id', 
              'content': '$comments.content', 
              'likes': '$comments.likes', 
              'dislikes': '$comments.dislikes', 
              'datePosted': '$comments.datePosted', 
              'userId': '$comments.userId', 
              'parent': '$comments.parent', 
              'user': '$comments.user', 
              'children': '$children'
            }
          }
        }
      }, {
        '$replaceWith': {
          '$arrayToObject': {
            '$map': {
              'input': {
                '$objectToArray': '$$ROOT'
              }, 
              'as': 'item', 
              'in': {
                '$cond': {
                  'if': {
                    '$ne': [
                      '$$item.v', [
                        {
                          'children': []
                        }
                      ]
                    ]
                  }, 
                  'then': '$$item', 
                  'else': {
                    'k': '$$item.k', 
                    'v': []
                  }
                }
              }
            }
          }
        }
      },
      {
        $sort: {
          datePosted: -1,
          _id: 1
        }
      }
    ]).toArray();

    for (let review of reviews) {
        // prioritize showing videos over images
        const nTopVideos = Math.min(review.videos.length, 3);
        review.topVideos = review.videos.slice(0, nTopVideos);
        review.truncatedVideos = review.videos.slice(nTopVideos);
        const nTopImages = Math.min(review.images.length, 3 - nTopVideos);
        review.topImages = review.images.slice(0, nTopImages);
        review.truncatedImages = review.images.slice(nTopImages);
        review.nTruncatedMedia = review.truncatedVideos.length + review.truncatedImages.length;
        review.nMedia = review.videos.length + review.images.length;
    }

    const topReviews = reviews.slice(0, 2);
    const truncatedReviews = reviews.slice(2);

    console.log("Top reviews\n", topReviews, "Truncated Reviews\n", truncatedReviews)

    res.render("establishment-view", {
        title: `${selectedEstab[0].displayedName}`,
        establishments: establishments,
        selectedEstab: selectedEstab[0],
        topReviews: topReviews,
        truncatedReviews: truncatedReviews,
        css: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">'
    })
})

router.post('/login', function (req, res) {
    res.redirect("/");
})

router.post('/register', function (req, res) {
    res.redirect("/");
})

router.post('/comment', function (req, res) {
    res.redirect("/");
})

router.post('/:establishmentid', function (req, res) {
    console.log(req.params.establishmentid);
    res.redirect("/");
})

export default router;

/*
index
css:'<link rel="stylesheet" href="/static/css/index.css">',
js: '<script src="static/js/card-view.js" defer></script>'

estab
css:'<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">',
js: '<script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>'

user
css:'<link href="/static/css/user-profile.css" rel="stylesheet">',
js: '<script defer src="/static/js/user-profile.js"></script>

search
css:'<link href="/static/css/search-result.css" rel="stylesheet">',
js :'<script defer src="/static/js/search-result.js"></script>'
*/