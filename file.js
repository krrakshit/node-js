 const fs = require("fs")


 // it is a synchronous call
//  fs.writeFileSync('./test.txt' , 'Hey there')
// // async 
//  fs.writeFile('./test.txt' , "Hello world Async", (err) =>{})

   const result =  fs.readFileSync('./contacts.txt',"utf-8",(err, result) =>{
    if (err) {
        console.log("Error", err)
    }
    else{
        console.log(result)
    }
   })
   console.log(result)

   fs.appendFileSync('./test.txt', new Date().getDate().toLocaleString())

   fs.cpSync('./test.txt', './copy.txt')

   fs.unlinkSync('./copy.txt')

   console.log(fs.statSync('./test.txt'))

