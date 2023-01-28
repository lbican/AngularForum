module.exports=function(express, pool){


  const apiRouter = express.Router();

  apiRouter.get('/', function(req, res) {
    res.json({ message: 'Welcome to our API!' });
  });

  //USERS ==========================================================
  apiRouter.route('/users')
    .get(async function(req,res){
      pool.query('SELECT * FROM users').then(([users]) => {
        res.json(users);
      }).catch((e) => {
        console.log(e)
        res.json({ code: 500, status: "Server error, couldn't get users." })
      })
    })

    .post(async function(req,res){

      const user = {
        username : req.body.username,
        password : req.body.password,
        name: req.body.name,
        email : req.body.email
    };
      console.log(user)

      pool.query('INSERT INTO users (username, password, name, email) VALUES (?, ?, ?, ?)',
        [user.username, user.password, user.name, user.email]
      )
        .then(([user]) => {
          res.json({id: user.insertId});
      }).catch((e) => {
          console.log(e);
          res.json({ code: 500, status: "Server error, couldn't add user!" })
      })
    })

    .put(async function(req,res){
      const user = {
        username : req.body.username,
        password : req.body.password,
        name: req.body.name,
        email : req.body.email
      };

      pool.query('UPDATE users SET ? WHERE id = ?', [user,req.body.id])
        .then(([user]) => {
          res.json({rowsAffected: user.affectedRows})
        }).catch((e) => {
          console.log(e);
          res.json({ code: 500, status: "Server error, couldn't update user!" })
      })
    })

    .delete(async function(req,res){
    res.json({"code" : 404, "status" : "This method has not been found on the server"});
    });

  //SPECIFIC USER =======================================================
  apiRouter.route('/users/:id')
    .get(async function(req,res){

      pool.query('SELECT * FROM users WHERE id=?',req.params.id)
        .then(([user]) => {
          const foundUser = user.length > 0 ? user[0] : {code: 200, status: 'User not found!'}

          res.json(foundUser);
        }).catch((e) => {
        console.log(e);
        res.json({ code: 500, status: "Server error, couldn't get user!" })
      })
    })
    .delete(async function(req,res){
      pool.query('DELETE FROM users WHERE id = ?', req.params.id)
        .then(([user]) => {
          res.json({rowsAffected: user.affectedRows});
        }).catch((e) => {
        console.log(e);
        res.json({ code: 500, status: "Server error, couldn't delete user!" })
      })
    });
  //CHECK FOR LOGIN
  apiRouter.route('/login').post(async function(req,res){
    pool.query('SELECT * FROM users WHERE username=? AND password=?', [req.body.username, btoa(req.body.password)])
      .then(([user]) => {
        res.json(user.length > 0 ? { isAuthenticated: true, user: user[0] } : {isAuthenticated: false});
      }).catch((e) => {
      console.log(e);
      res.json({ code: 500, status: "Server error, couldn't authenticate user!" })
    })
  })

  //USER POSTS
  apiRouter.route('/users/:id/posts')
    .get(async function(req,res){

      pool.query('SELECT * FROM posts WHERE userId=?',req.params.id)
        .then(([posts]) => {
          res.json(posts);
        }).catch((e) => {
        console.log(e);
        res.json({ code: 500, status: "Server error, couldn't get user!" })
      })
    })


  //POSTS ==========================================================
  apiRouter.route('/posts')
    .get(async function(req,res){
      pool.query('SELECT u.username, posts.* FROM POSTS INNER JOIN users u ON u.id = posts.userId').then(([posts]) => {
        res.json(posts);
      }).catch((e) => {
        console.log(e);
        res.json({ code: 500, status: "Server error, couldn't get posts." })
      })
    })

    .post(async function(req,res){
      const post = {
        userId: Number(req.body.userId),
        timestamp: req.body.timestamp,
        comment: req.body.comment,
      }

      console.log(post);
      pool.query('INSERT INTO posts (userId, timestamp, comment) VALUES (?, ?, ?)',
        [post.userId, post.timestamp, post.comment]
      )
        .then(([post]) => {
          res.json({id: post.insertId});
        }).catch((e) => {
          console.log(e);
          res.json({ code: 500, status: "Server error, couldn't add post!" })
      })
    })

  apiRouter.route('/posts/:id')
    .delete(async function(req,res){
      pool.query('DELETE FROM posts WHERE id = ?', req.params.id)
        .then(([post]) => {
          res.json({rowsAffected: post.affectedRows});
        }).catch((e) => {
        console.log(e);
        res.json({ code: 500, status: "Server error, couldn't delete post!" })
      })
  })
    .patch(async function(req,res){
      const post = {
        comment: req.body.comment,
      }

      pool.query('UPDATE posts SET ? WHERE id = ?', [post, req.params.id])
        .then(([post]) => {
          res.json({rowsAffected: post.affectedRows})
        }).catch((e) => {
        console.log(e);
        res.json({ code: 500, status: "Server error, couldn't update user!" })
      })
    })
  ;

  return apiRouter;
};
