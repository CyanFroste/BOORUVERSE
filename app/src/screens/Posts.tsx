import * as React from 'react'
import Screen from '../layouts/Screen'
import { useParams } from 'react-router-dom'
import { useQueryParams } from '../hooks/query'
import { useQuery } from 'react-query'
import { getPosts } from '../services/data'
import RightSidebar, { PreviewData } from '../components/posts/RightSidebar'
import Card from '../components/posts/Card'
import LeftSidebar from '../components/posts/LeftSidebar'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { useDisplaySize } from '../hooks/display'
import { SM, XL } from '../globals'
import Bottombar from '../components/posts/Bottombar'
import MasonryGrid from '../components/posts/MasonryGrid'

const Posts = () => {
    // react router
    const { booru } = useParams<{ booru: string }>()
    // query params
    const [page, filters] = useQueryParams('page', 'filters')

    // react query: get list of posts
    const { data: posts, status } = useQuery(['posts', booru, page, filters], () =>
        getPosts(booru, page, filters)
    )

    // get display size
    const displaySize = useDisplaySize()

    // states
    const [previewData, setPreviewData] = React.useState<PreviewData | undefined>()

    return (
        <Screen title={`booruverse | ${booru}`} size={displaySize}>
            {status === 'loading' && <Loading full={true} />}
            {status === 'error' && <Error full={true} />}
            {status === 'success' && posts && (
                <main className="posts">
                    {displaySize === XL && (
                        <>
                            {/* left sidebar */}
                            <LeftSidebar {...{ booru, filters, size: displaySize }} />
                            {/* posts view */}
                            <section className="posts__view-default">
                                <div className="posts__view__grid-default">
                                    {(posts as any[]).map((item, i) => (
                                        <Card
                                            key={i}
                                            item={item}
                                            index={i + 1}
                                            setPreviewData={setPreviewData}
                                            size={displaySize}
                                        />
                                    ))}
                                </div>
                            </section>
                            {/* right sidebar */}
                            <RightSidebar {...previewData} {...{ page, filters }} />
                        </>
                    )}

                    {displaySize === SM && (
                        <>
                            {/* posts view */}
                            <section className="posts__view__grid-masonry">
                                <MasonryGrid items={posts} />
                            </section>

                            {/* bottom bar */}
                            <Bottombar {...{ booru, page, filters, size: displaySize }} />
                        </>
                    )}
                </main>
            )}
        </Screen>
    )
}

export default Posts
