const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

let data = []
if (fs.existsSync('./blogs.json')) {
    data = require('./blogs.json')
}

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.listen(5000, () => {
    console.log('http://localhost:5000');
})
app.use(express.static('public'))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('pages/blogs', { blogs: data })
})

app.get('/blog/:id', (req, res) => {
    console.log(req.params.id)
    let blog = data.find(element => element.id == req.params.id)
    console.log(blog);
    res.render('pages/singleBlog', { blog })
})

app.get('/newPost', (req, res) => {
    res.render('pages/newPost')
})

app.post('/addNewPost', (req, res) => {
    console.log(req.body.todo);
    if (!fs.existsSync('./blogs.json')) {
        let todos = [
            {
                id: uuidv4(),
                url: "/img1.jpg",
                title: "A few words about this blog platform, Ghost, and how this site was made",
                body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae deleniti aspernatur nesciunt saepe at ipsam, voluptatibus sunt. Natus officiis dicta odio magni quasi, corrupti provident voluptatibus temporibus commodi eaque cumque voluptatum explicabo iure, numquam quidem ullam accusantium recusandae qui, veniam illo ea asperiores eligendi magnam beatae? Quisquam molestias dolorem consectetur beatae eaque placeat consequatur obcaecati explicabo iure, officia quae nam odio accusamus fuga facilis praesentium adipisci nostrum unde non dolor. Dignissimos laborum eius voluptates quis autem, accusamus natus numquam quas rem laboriosam consequuntur provident suscipit quidem minima reprehenderit fugit, est labore soluta dolorum delectus dolore praesentium. Ex vitae eaque tempore voluptatem? Sapiente, delectus aspernatur modi hic consequuntur officia obcaecati, perferendis laborum magni consectetur ut dolorem repudiandae fugiat sit. Ullam at, placeat impedit eum tempore molestias totam suscipit quo consectetur quam hic neque debitis, nihil aliquam minima exercitationem quibusdam molestiae quae doloribus excepturi natus. Fugit blanditiis tempora repudiandae illum eum? Quaerat consequatur dolorum facilis quibusdam at nobis blanditiis dolorem ad. Nisi corporis eos deserunt expedita dolor ab sunt architecto, tempore tenetur consectetur odio. Quos quis laborum numquam dicta! Repellendus, quos? Distinctio repellat natus eveniet incidunt voluptatum accusamus corporis quisquam error hic, nobis ullam porro obcaecati ratione optio suscipit? Quo pariatur harum rerum enim veniam animi perspiciatis laudantium vel consectetur. Similique accusamus, corporis reprehenderit architecto aliquid laborum omnis harum temporibus natus sapiente, culpa velit! Architecto commodi veritatis voluptates nisi eos cupiditate aliquid ad excepturi possimus vel dolorem, blanditiis cum quidem corporis debitis ducimus veniam praesentium earum? Dolores cupiditate asperiores nesciunt excepturi aliquam laboriosam a. Nisi, est ipsum. Explicabo pariatur rem dolorum quis odit maxime, incidunt animi asperiores ad quasi tempora laudantium quam voluptates beatae praesentium? Suscipit iste tempora quaerat perferendis maxime asperiores, eaque commodi reprehenderit. Soluta, quaerat quam ex cumque placeat asperiores impedit dolorum! Pariatur eum porro doloribus obcaecati, autem perferendis nisi.",
                published_at: "Apr 15, 2020",
                duration: 4,
                author: "Mika Matikainen",
                author_bild: "https://source.unsplash.com/random/100x100"
            }
        ]

        fs.writeFile('./blogs.json', JSON.stringify(todos), (err) => {
            if (err) throw err
            fs.readFile('./blogs.json', 'utf8', (err, newData) => {
                data = JSON.parse(newData)
                console.log(data);
                res.redirect('/')
            })
        })
    } else {
        let blogs =
        {
            id: uuidv4(),
            url: req.body.blogPictureUrl,
            title: req.body.blogTitle,
            body: req.body.blogBody,
            //published_at: req.body...,
            //duration: req.body....,
            author: req.body.blogAuthor,
            author_bild: req.body.blogAuthorPicture
        }

        let blogsJson = JSON.parse(fs.readFileSync('./blogs.json', 'utf8'))
        console.log(blogsJson)
        blogsJson.push(blogs)
        fs.writeFile('./blogs.json', JSON.stringify(blogsJson), (err) => {
            if (err) throw err
            console.log('updated')
            fs.readFile('./blogs.json', 'utf8', (err, newData) => {
                data = JSON.parse(newData)
                console.log(data);
                res.redirect('/')
            })
        })
    }
})

