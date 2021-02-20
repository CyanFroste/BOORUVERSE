import { Router } from 'express'
import { preview } from '../../services/media'
const router = Router()

router.post('/preview', (req, res, next) => {
    const url = req.body.url,
        type = req.body.type,
        ext = req.body.ext

    preview(url, type, ext)
        .then((data) => res.json(data))
        .catch((err) => next(err))
})

export default router
