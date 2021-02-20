import express from 'express'
import ip from 'ip'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import errorHandler from './middlewares/error-handler'
import test from './routes/test'
import posts from './routes/api/posts'
import tags from './routes/api/tags'
import file from './routes/api/file'
import media from './routes/api/media'
import bookmarks from './routes/api/bookmarks'
import { Server, Socket } from 'socket.io'

dotenv.config()
const port = process.env.PORT || 4000
const app = express()
app.use(cors())
app.use(express.json())

// routes
app.use(test)
// api routes
app.use('/api', posts)
app.use('/api', tags)
app.use('/api', bookmarks)
app.use('/api/file', file)
app.use('/api/media', media)

// serve react app
app.use(express.static(path.join(__dirname, 'app', 'build')))
app.get('/*', function (_, res) {
    res.sendFile(path.join(__dirname, 'app', 'build', 'index.html'))
})

// handle error
app.use(errorHandler)

const server = app.listen(port, () => {
    console.log(`\n port: ${port} \n network ip: ${ip.address()}`)
})

// socket setup
export const io = new Server(server, {
    cors: {
        origin: '*'
    }
})
