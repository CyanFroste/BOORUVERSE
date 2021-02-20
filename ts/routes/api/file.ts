import { Router } from 'express'
import { downloadFile } from '../../api'
const router = Router()


router.post('/download', (req, res, next) => {
    const booru = req.body.booru,
        url = req.body.url,
        fileName = req.body.fileName,
        size = req.body.size

    downloadFile(booru, url, size, fileName)
        .then((data) => res.json(data))
        .catch((err) => next(err))
})

export default router
