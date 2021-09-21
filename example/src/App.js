import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MediaLibraryPage from './pages/MediaLibraryPage'
import CM from './CM'
import SettingsPage from './pages/SettingsPage'
import RelationsComboboxPage from './pages/RelationsComboboxPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/cm" exact>
          <CM />
        </Route>

        <Route path="/settings/:settingType">
          <SettingsPage />
        </Route>

        <Route path="/relations-combobox">
          <RelationsComboboxPage />
        </Route>

        <Route path="/upload">
          <MediaLibraryPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
