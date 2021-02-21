import axios from 'axios'
import fs from 'fs'
import path from 'path'
import ProgressBar from 'progress'
import { io } from '../server'

const DOWNLOADS = { downloading: [] as string[], downloaded: [] as string[] }
// local error codes
const VARIANT_SIZE_ERROR = 2

export async function download(
    booru: string,
    url: string,
    size: number | string,
    downloadLocation: string,
    fileName: string,
    logPath: string
) {
    let filePath = path.resolve(downloadLocation, fileName)
    // send response when download is already queued
    if (DOWNLOADS.downloading.includes(fileName)) {
        console.log('\n---- File already in queue! ----')
        return { message: fileName + ' is already in queue', type: 'warning' }
    }
    try {
        const stats = fs.statSync(filePath) // check if file exists, if it exists, this won't throw error
        // gelbooru doesn't provide size, so it's always different size
        if (stats.size != size && booru !== 'gelbooru') throw VARIANT_SIZE_ERROR
        console.log('\n---- File already exists! ----')
        return { message: fileName + ' already exists', type: 'warning' } // send response to client
    } catch (err) {
        // if file doesn't exist or different file with same name exists, start download
        if (err === VARIANT_SIZE_ERROR)
            console.log('\n---- Different size variant exists, overwriting... ----')
        const { data, headers } = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        })
        const progressBar = new ProgressBar(`Downloading ${fileName} [:bar] :percent :etas`, {
            width: 40,
            complete: '#',
            incomplete: ' ',
            renderThrottle: 1,
            total: +headers['content-length']
        })
        DOWNLOADS.downloading.unshift(fileName) // push file id into downloads(list)
        // socket emit
        io.sockets.emit('download', DOWNLOADS)
        // log download queue onto a file
        fs.writeFile(logPath, JSON.stringify(DOWNLOADS), (err) => {
            if (err) console.error(err)
        })
        console.log('\n---- Downloads ----\n', DOWNLOADS, '\n')

        const file = fs.createWriteStream(filePath) // create stream
        data.on('data', (chunk: any) => progressBar.tick(chunk.length)) // pipe data to the stream and move progress bar
        data.pipe(file)
        // on finish writing
        file.on('finish', () => {
            file.end()
            console.log('\n---- File saved! ----')
            DOWNLOADS.downloading = DOWNLOADS.downloading.filter((dl) => dl !== fileName)
            DOWNLOADS.downloaded.unshift(fileName) // add file id to downloaded
            console.log('\n---- Downloads ----\n', DOWNLOADS, '\n')
            // socket emit
            io.sockets.emit('download', DOWNLOADS)
            // log download queue onto a file
            fs.writeFile(logPath, JSON.stringify(DOWNLOADS), (err) => {
                if (err) console.error(err)
            })
        })

        // on error
        file.on('error', (err) => {
            file.end()
            console.log('\n---- File not saved! ----')
            DOWNLOADS.downloading = DOWNLOADS.downloading.filter((dl) => dl !== fileName)
            console.log('\n---- Downloads ----\n', DOWNLOADS, '\n')
            // socket emit
            // io.sockets.emit('download', DOWNLOADS)
            // log download queue onto a file
            fs.writeFile(logPath, JSON.stringify(DOWNLOADS), (err) => {
                if (err) console.error(err)
            })
            throw err
        })
        return { message: fileName + ' has started downloading', type: 'alert' }
    }
}
