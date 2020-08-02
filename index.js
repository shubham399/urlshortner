const express = require('express')
const helmet = require("helmet")
const morgan = require("morgan")
const yup = require("yup");
const monk = require("monk")
const db = require('monk')(process.env.MONGODB_URI || 'localhost/urlshortner')
const app = express()
const port = process.env.PORT || 1337
const {
    nanoid
} = require('nanoid')

const urls = db.get("urls");
urls.createIndex({
    slug: 1
}, {
    unique: true
})

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

app.post('/url', async (req, res, next) => {
    try {
        let body = req.body;
        await schema.validate(body)
        body['slug'] = getSlug(); // Add slug in the object
        let response = await urls.insert(body)
        res.json(response)
    } catch (e) {
        next(e)
    }
});

app.get('/:slug', async (req, res, next) => {
    try {
      let slug = req.params.slug
        let urlObj = await urls.findOne({
            slug: slug
        })
        res.redirect(urlObj.url)
    } catch (e) {
        next(e)
    }
});

app.use((e, req, res, next) => {
    res.json({
        message: e.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : e.stack
    })
})

app.listen(port, () => {
    console.log(`URL Shortner app listening at http://localhost:${port}`)
})
