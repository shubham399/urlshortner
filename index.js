const express = require('express')
const helmet = require("helmet")
const morgan = require("morgan")
const yup = require("yup");
const monk = require("monk")
const db = require('monk')('localhost/urlshortner')
const app = express()
const port = process.env.PORT || 1337
const {
    nanoid
} = require('nanoid')


const schema = yup.object().shape({
    url: yup.string().trim().url().required()
})

/* Function to get the Slug
 */
const getSlug = () => nanoid(6).toLowerCase()

app.use(helmet())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('public'))
app.get('/hello', (req, res) => {
    let id = getSlug()
    res.send(id)
})

app.post('/url', async (req, res,next) => {
    try {
        let body = req.body;
        await schema.validate(body)
        body['slug'] = getSlug(); // Add slug in the object
        res.json(body)
    }
    catch(e){
      next(e)
    }
});

app.get('/:id', (req, res) => {
    // TODO: redirect to the correct URL based on the id
    res.redirect("https://shubhkumar.in")
});

app.use((e,req,res,next) =>{
  res.json({
    message:e.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : e.stack
  })
})

app.listen(port, () => {
    console.log(`URL Shortner app listening at http://localhost:${port}`)
})
