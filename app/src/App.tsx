import * as React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CommonContextProvider } from './contexts/CommonContext'
import Posts from './screens/Posts'
import Home from './screens/Home'
import Post from './screens/Post'
import Bookmarks from './screens/Bookmarks'

export const App = () => {
    return (
        <CommonContextProvider>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/:booru/posts">
                        <Posts />
                    </Route>
                    <Route exact path="/:booru/post/:id">
                        <Post />
                    </Route>
                    <Route exact path="/bookmarks">
                        <Bookmarks />
                    </Route>
                </Switch>
            </Router>
        </CommonContextProvider>
    )
}
