/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import { Route, Router } from '@solidjs/router'
import DanceChars from './pages/dance-chars'

const root = document.getElementById('root')

render(
  () => (
    <Router>
      <Route path="/" component={DanceChars}></Route>
    </Router>
  ),
  root!
)
