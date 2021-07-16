import * as React from 'react'
import { FiArrowRight, FiHeart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useDisplaySize } from '../hooks/display'
import Screen from '../layouts/Screen'

const Home = () => {
    // get display size
    const displaySize = useDisplaySize()

    return (
        <Screen title="booruverse | home" navbar={false} size={displaySize}>
            <main className="home">
                <section>
                    <div className="home__intro">
                        <div className="home__name">BOORUVERSE</div>
                        <div className="home__ver">
                            4<span>.0.0</span>
                        </div>
                        <div className="home__warn">
                            <span>NSFW</span> 18+
                        </div>
                        <div className="home__author">
                            <div className="author__name">Cyan Froste</div>
                            <div className="copyright">Copyright © 2021</div>
                        </div>
                    </div>

                    <div className="home__booru-list">
                        <Link className="booru-list__item" to="/bookmarks">
                            Bookmarks <FiHeart />
                        </Link>
                        <Link className="booru-list__item" to="/gelbooru/posts">
                            Gelbooru <FiArrowRight />
                        </Link>
                        <Link className="booru-list__item" to="/yandere/posts">
                            Yandere <FiArrowRight />
                        </Link>
                        <Link className="booru-list__item" to="/danbooru/posts">
                            Danbooru <FiArrowRight />
                        </Link>
                    </div>
                </section>
            </main>
        </Screen>
    )
}

export default Home
