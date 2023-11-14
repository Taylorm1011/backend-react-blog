const express = require('express')
const mongoose = require('mongoose');
const User = require('./models/Profile');
const Blog = require("./models/blog")
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://tmcelv128:NvgCmtv4lL4Q8p1u@cluster0.phvdytd.mongodb.net/Blog')
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connectiong to MongoDB', err);
    });

// app.set('view engine', 'ejs');
// app.set('views', './views');
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const bcrypt = require("bcrypt")

app.get('/get-blogs', async (req, res) => {
    const blogs = await Blog.find();

    res.json({ blogs })
    // res.render('index', {user});
});

app.get('/blog/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    res.json({ blog })
});

app.post('/signup', async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    try {
        const user = await User.create(req.body);
        console.log(user)
        res.json({ user });
    } catch (err) {
        console.log(err)
    }
    // await user.save();

})

app.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.json({
                message: "Incorrect email or password"
            })
        }

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            // console.log(err)
            // console.log(result)
            if (result) { 
                return res.json({ user }) 
            } else {
                return res.json({ message: "Incorrect email or password" })
            }
        })
        // if (!passwordCorrect) {
        //     return res.status(401).json({
        //         message: "Incorrect email or password"
        //     })
        // }

    } catch (err) {
        console.log(err)
    }
    // await user.save();

})

app.post('/new-blog', async (req, res) => {

    try {
        const blog = await Blog.create(req.body);
        console.log(blog)
        res.json({ blog });
    } catch (err) {
        console.log(err)
    }
    // await user.save();

})


// app.get('/edit/:id', async (req, res) => {
//     const user = await User.findById(req.params.id);
//     res.json({ user });
// })

// app.post('/edit/:id', async (req, res) => {
//     const { title, content } = req.body;
//     let blog = await Blog.findByIdAndUpdate(req.params.id, { title, content });
//     res.json({ blog });
// })


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})