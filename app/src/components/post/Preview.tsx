import * as React from 'react'
import { useQuery } from 'react-query'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { getPreview } from '../../services/media'
import Error from '../Error'
import Loading from '../Loading'

interface PreviewProps {
    url: string
    ext: string
    fallbackUrl: string
}

const Preview: React.FC<PreviewProps> = ({ url, ext, fallbackUrl }) => {
    // * React Query: get base64 from provided url and extension to bypass CORS
    // ? Refactor if to support more extensions?
    const { data, status } = useQuery(['preview', url, ext], () => getPreview(url, ext))

    return (
        <section className="post__preview">
            {status === 'loading' && <Loading />}
            {status === 'error' && <Error />}
            {status === 'success' &&
                // * If no url or ext is provided data will be false
                (data ? (
                    <TransformWrapper>
                        <TransformComponent>
                            <img src={data.src} alt="Original" />
                        </TransformComponent>
                    </TransformWrapper>
                ) : (
                    <img src={fallbackUrl} alt="Fallback" />
                ))}
        </section>
    )
}
export default Preview
