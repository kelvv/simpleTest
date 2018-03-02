const express = require('express')
const router = express.Router()

let fs = require('fs')
let path = require('path')

let root = path.join(__dirname)
readDirSync(root)
function readDirSync (filePath) {
  let pa = fs.readdirSync(filePath)
  pa.forEach(function (ele, index) {
    let info = fs.statSync(filePath + '/' + ele)
    if (info.isDirectory()) {
      readDirSync(filePath + '/' + ele)
    } else {
      if (ele === 'router.js') {
        let routerPath = path.join(filePath, ele)
        require(routerPath)(router)
      }
    }
  })
}

module.exports = router
