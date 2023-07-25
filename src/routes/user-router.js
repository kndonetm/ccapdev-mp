import { ObjectId } from 'mongodb';
import { Router } from 'express';
import { getDb } from '../model/conn.js';
import fs from 'fs';
import { dirname } from "path";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url)); // directory URL
import jwt from 'jsonwebtoken'
const userRouter = Router();
const db = getDb();
const user_db = db.collection("users");
const establishments_db = db.collection("establishments");
const reviews_db = db.collection("reviews");

import multer from 'multer';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets/user_pfp/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname)
  },
})
const upload = multer({ storage: storage })

userRouter.patch("/user/changePfp", upload.single('media'), async function (req, res) { 
  let img = "static/assets/user_pfp/"  + req.file.filename;

  let userID
  let token = req.cookies.jwt
  if (token) {
    try {
      const decodedToken = await jwt.verify(token, "secret");
      userID = decodedToken._id
    } catch (err) {
      console.log("Error occurred:", err);
    }
  }
  console.log(userID)

  let userr = await user_db.findOne({_id: new ObjectId(userID) });
  if (userr != null && userr.profilePicture !=null)
  fs.unlink(__dirname + "../../../public/assets/user_pfp/" + userr.profilePicture.substring(24), (err) => {
    if (err)  console.error('Error deleting file:', err);})

  user_db.updateOne({_id: new ObjectId(userID)},
  {$set:{profilePicture: img}})
  res.status(200)
  res.send("done edit pic")
})

userRouter.patch("/user/changeDesc", async function (req, res) { 
  let userID
  let token = req.cookies.jwt
  if (token) {
    try {
      const decodedToken = await jwt.verify(token, "secret");
      userID = decodedToken._id
    } catch (err) {
      console.log("Error occurred:", err);
    }
  }
  console.log(userID)

    try {
      let {userDesc} = req.body;
  
      // Perform the update operation only if 'user' is not null
      await user_db.updateOne({ _id: new ObjectId(userID) }, { $set: { description: userDesc } });
  
      res.status(200).send("done edit desc");
    } catch (err) {
      console.log("Error updating user description:", err);
      res.status(500).send("Internal server error");
    }
})


userRouter.get("/users/:username", async (req, res, next) => {
    try {
        let user = await user_db.findOne({ username: req.params.username });
        if(user == null) next();
        const oid = new ObjectId(user._id);
        const reviews = await reviews_db.aggregate([
            {
              '$match': {
                'userId': oid
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
                'from': 'establishments', 
                'localField': 'establishmentId', 
                'foreignField': '_id', 
                'as': 'establishment'
              }
            }, {
              '$unwind': {
                'path': '$establishment', 
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
                    'edited': '$comments.edited', 
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
                    'edited': '$comments.edited', 
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
            }, {
              '$sort': {
                'datePosted': -1, 
                '_id': 1
              }
            }
          ]).toArray();

    // edit review object to be compatible with review partial
    // (review partial is made assuming it will only be used in establishment page)
    reviews.forEach(async (review) => {
        // assign establishment as "user"
        const establishment = await establishments_db.findOne({ '_id': review.establishmentId });
        review.user = {
            username: establishment.displayedName,
            profilePicture: establishment.profilePicture,
            link: "/" + establishment.username
        }
    })

    const topReviews = reviews.slice(0, 5);
    const truncatedReviews = reviews.slice(5);
    let userID
    let token = req.cookies.jwt
    if (token) {
      try {
        const decodedToken = await jwt.verify(token, "secret");
        userID = decodedToken._id
      } catch (err) {
        console.log("Error occurred:", err);
      }
    }
    console.log(userID)

    if(oid.toString() !== userID) {
    res.render("user", {
        title: user.username + " - Profile",
        css:'<link href="/static/css/user-profile.css" rel="stylesheet">',
        js: '<script defer src="/static/js/user-profile.js"></script>',
        profilePicture: user.profilePicture,
        username: user.username,
        description: user.description,
        topReviews: topReviews,
        truncatedReviews: truncatedReviews,
    })} else {
      res.render("theUser", {
        title: user.username + " - Profile",
        css:'<link href="/static/css/user-profile.css" rel="stylesheet">',
        js: '<script defer src="/static/js/user-profile.js"></script>',
        profilePicture: user.profilePicture,
        username: user.username,
        THEEEUSERR: true,
        description: user.description,
        topReviews: topReviews,
        truncatedReviews: truncatedReviews,
    })
    }
} catch (err) {
    console.log(err)
}
})

export default userRouter;