/* @refresh reload */
import './index.scss'
import { render } from 'solid-js/web'
import { Route, Router } from '@solidjs/router'
import DanceChars01 from './pages/dance-chars-01'
import Archery01 from './pages/archery-01'
import Home from './pages'
import EmojiConfirm01 from './pages/emoji-confirm-01'
import Bezier01 from './pages/bezier-01'

const root = document.getElementById('root')

render(
  () => (
    <Router>
      <Route path="/" component={Home}></Route>
      <Route path="/dance-chars-01" component={DanceChars01}></Route>
      <Route path="/archery-01" component={Archery01}></Route>
      <Route path="/bezier-01" component={Bezier01}></Route>
      <Route path="/emoji-confirm-01" component={EmojiConfirm01}></Route>
    </Router>
  ),
  root!
)
