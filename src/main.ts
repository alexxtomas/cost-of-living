import Home from './pages/Home'
import { getCities } from './services/services'
import './style.css'

getCities()

await Home()

