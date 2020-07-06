const express = require('express')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const aboutRoutes = require('./routes/about')
const addRoutes = require('./routes/add')
const addCourse = require('./routes/course')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(express.static('public/img'))
app.use(express.static('public/js'))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/about', aboutRoutes)
app.use('/add', addRoutes)
app.use('/courses', addCourse)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})