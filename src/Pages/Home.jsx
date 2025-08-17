 
import Header from '../Components/HeaderComponents/Header'
import Body from '../Components/BodySection/Body'
import { Link } from 'react-router-dom'

function Home()
 {
  return (
    <div>
        <Header />
         <Body />      
         <Link to="/Upload">Upload</Link>
    </div>
  )
}

export default Home
