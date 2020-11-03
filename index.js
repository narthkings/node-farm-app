const fs = require('fs')

// const hello = 'hello world'
// console.log(hello)

const myText = fs.readFileSync(__dirname + '/txt/input.txt', 'utf-8')
// console.log(myText)

const text = `this is a text from my memory ${myText}`

fs.writeFileSync(__dirname + '/text.txt', text)
// console.log('file written')

// Async i/o

fs.readFile(__dirname + '/text.txt', (err, data) => {
  if (err) throw new Error('something went wrong')

  fs.writeFile(__dirname + '/new.txt', data, (err, data2) => {
    if (err) throw new Error('something went wrong')
    // console.log(data2)
  })
})

// another example

fs.readFile(__dirname + '/txt/start.txt', 'utf-8', (err, data) => {
  fs.readFile(__dirname + `/txt/${data}.txt`, 'utf-8', (err, data2) => {
    fs.readFile(__dirname + '/txt/final.txt', 'utf-8', (err, data3) => {
      fs.writeFile(
        __dirname + '/finalAsync.txt',
        `${data2} \n ${data3}`,
        (err, data) => {
          if (err) throw new Error('not working')
        }
      )
    })
  })
})
