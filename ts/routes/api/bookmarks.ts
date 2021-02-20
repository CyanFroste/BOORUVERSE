import { Router } from 'express'
import { bookmark } from '../../api'
const router = Router()

router.get('/bookmarks', (_, res, next) => {
    bookmark
        .index()
        .then((data) => res.json(data))
        .catch((err) => next(err))
})

router.post('/bookmark/create', (req, res, next) => {
    const booru = req.body.booru,
        type = req.body.type,
        id = req.body.id,
        name = req.body.name

    bookmark
        .create({
            booru,
            type,
            booruId: id,
            name
        })
        .then((data) => res.json(data))
        .catch((err) => next(err))
})

router.delete('/bookmark/remove', (req, res, next) => {
    const booru = req.body.booru,
        type = req.body.type,
        id = req.body.id,
        name = req.body.name

    bookmark
        .remove({
            booru,
            type,
            booruId: id,
            name
        })
        .then((data) => res.json(data))
        .catch((err) => next(err))
})

export default router
