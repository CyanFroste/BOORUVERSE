import * as React from 'react'
import { useQuery } from 'react-query'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { getPreview } from '../../services/media'
import Error from '../Error'
import Loading from '../Loading'

export interface PreviewProps {
    url: string
    ext: string
    id: number | string
    booru: string
}

const Preview = ({ url, ext, booru, id }: PreviewProps) => {
    // * React Query: get base64 from provided url and extension to bypass CORS
    // ? Refactor if to support more extensions?
    const { data, status } = useQuery(['preview_quick', url, ext], () => getPreview(url, ext))

    return (
        <section className="sidebar-right__preview">
            {status === 'loading' && <Loading message={`[ ${booru} ${id}.${ext} ]`} />}
            {status === 'error' && <Error message="Something went wrong!" />}
            {status === 'success' &&
                // * If no url or ext is provided data will be false
                (data ? (
                    <TransformWrapper>
                        <TransformComponent>
                            <img src={data.src} alt="Original" />
                        </TransformComponent>
                    </TransformWrapper>
                ) : (
                    <Error message={`${ext} not supported`} />
                ))}
        </section>
    )
}

export default Preview
