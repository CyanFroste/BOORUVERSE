import { connect } from 'mongoose'
import BookmarkModel, { Bookmark } from './models/bookmark'

connect(process.env.DB_URL || 'mongodb://localhost:27017/booruverse', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).catch(() => console.log('Database connection failed!'))

export { BookmarkModel, Bookmark }
