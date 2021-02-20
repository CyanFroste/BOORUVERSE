import { Router } from 'express'
import { getTags } from '../../api'
const router = Router()

router.get('/:booru/tags', (req, res, next) => {
    const page = req.query.page as string,
        query = req.query.query as string,
        booru = req.params.booru

    getTags(booru, page, query)
        .then((data) => res.json(data))
        .catch((err) => next(err))
})

export default router
