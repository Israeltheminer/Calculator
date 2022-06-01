const express = require("express");
const https = require("https")
const app = express()
const cors = require('cors')
const path = require('path');
const { json } = require("express/lib/response");
const port = process.env.PORT || 3000

const DIST = path.join(__dirname , "./dist")
const homePage = path.join(DIST, "index.html")

app.use(cors())
app.use('/dist', express.static(DIST))


app.get('/', (req, res) => {
	res.sendFile(homePage)
})

app.listen(port, ()=>{
	console.log(`CORS-enabled web server listening on port ${port}`)
})