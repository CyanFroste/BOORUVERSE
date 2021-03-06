import * as React from 'react'
import Screen from '../layouts/Screen'
import { useParams } from 'react-router-dom'
import { useQueryParams } from '../hooks/query'
import { useQuery } from 'react-query'
import { getPosts } from '../services/data'
import RightSidebar from '../components/posts/RightSidebar'
import Card from '../components/posts/Card'
import LeftSidebar from '../components/posts/LeftSidebar'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { useDisplaySize } from '../hooks/display'
import { SM, XL } from '../globals'
import Bottombar from '../components/posts/Bottombar'
import MasonryGrid from '../components/posts/MasonryGrid'
import { PreviewProps } from '../components/posts/Preview'

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
    const [previewData, setPreviewData] = React.useState<PreviewProps | null>(null)
    const [toast, setToast] = React.useState<any>(null)

    return (
        <Screen
            title={`booruverse | ${booru}`}
            size={displaySize}
            toast={toast}
            setToast={setToast}>
            {status === 'loading' && <Loading full={true} />}
            {status === 'error' && <Error full={true} message="Something went wrong!" />}
            {status === 'success' && posts && (
                <main className="posts">
                    {displaySize === XL && (
                        <>
                            {/* left sidebar */}
                            <LeftSidebar booru={booru} filters={filters} size={displaySize} />

                            {/* posts view */}
                            <section className="posts__view-default">
                                <div className="posts__view__grid-default">
                                    {(posts as any[]).map((item, index) => (
                                        <Card
                                            key={index}
                                            item={item}
                                            index={index + 1}
                                            setPreviewData={setPreviewData}
                                            size={displaySize}
                                            setToast={setToast}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* right sidebar */}
                            <RightSidebar
                                previewData={previewData}
                                setPreviewData={setPreviewData}
                                page={page}
                                filters={filters}
                            />
                        </>
                    )}

                    {displaySize === SM && (
                        <>
                            {/* posts view */}
                            <section className="posts__view__grid-masonry">
                                <MasonryGrid items={posts} setToast={setToast} />
                            </section>

                            {/* bottom bar */}
                            <Bottombar
                                booru={booru}
                                page={page}
                                filters={filters}
                                size={displaySize}
                            />
                        </>
                    )}
                </main>
            )}
        </Screen>
    )
}

export default Posts
