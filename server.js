// core Modules
const fs = require('fs')
const http = require('http')
const URL = require('url')

// third party modules
const slugify = require('slugify')

// our own module
const replaceTemplate = require('./modules/replace-template')

// this would be read once and be used anytime

const dataObj = fs.readFileSync(__dirname + '/dev-data/data.json', 'utf-8')
const parsedData = JSON.parse(dataObj)
// console.log(parsedData)
const slugs = parsedData.map((el) => slugify(el.productName, { lower: true }))
// console.log(slugs)

const tempCard = fs.readFileSync(
  __dirname + '/templates/template-card.html',
  'utf-8'
)
const tempOverview = fs.readFileSync(
  __dirname + '/templates/template-overview.html',
  'utf-8'
)
const tempProduct = fs.readFileSync(
  __dirname + '/templates/template-product.html',
  'utf-8'
)

// create server
const server = http.createServer((req, res) => {
  // query and pathname are propertries of the url module which helps us get the
  //pathname('url route')  and query (dynamic id) which is been gotten from request made from our server
  const { query, pathname } = URL.parse(req.url, true)
  console.log(URL.parse(req.url, true))

  switch (pathname) {
    case '/':
      res.writeHead(200, { 'Content-type': 'text/html' }) //tells the header to accept html
      const cardHtml = parsedData
        .map((el) => replaceTemplate(tempCard, el))
        .join('')

      const output = tempOverview.replace('{%product_card%}', cardHtml)

      res.end(output)
      break

    case '/product':
      res.writeHead(200, { 'Content-type': 'text/html' })

      console.log(parsedData, query, 'hello')
      const product = parsedData.find(({ slug }) => slug === query.slug)

      const singleDetail = replaceTemplate(tempProduct, product)

      res.end(singleDetail)
      break

    case '/api':
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(dataObj)
      break

    default:
      res.writeHead(404, {
        'content-type': 'text/html',
      })
      res.end('<h1>Invalid Url</h1>')
      break
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('server started running on port 8080')
})

// routing
