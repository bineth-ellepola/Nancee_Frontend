 
import Header from '../Components/HeaderComponents/Header'
import Body from '../Components/BodySection/Body'
import { Link } from 'react-router-dom'
import Product from '../Components/ProductSection/Product'

function Home()
 {
  return (
    <div>
        <Header />
         <Body />      
         <Product />
         <Link to="/Upload">Upload</Link>
    </div>
  )
}

export default Home
