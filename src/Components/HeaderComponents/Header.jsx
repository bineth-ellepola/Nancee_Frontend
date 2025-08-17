 import { Link } from "react-router-dom";
 import img1 from '../../assets/dog.png'
  import img2 from '../../assets/b1.png'
 import img3 from '../../assets/hand.png'
   import img4 from '../../assets/nebulizer.png'
  import img5 from '../../assets/personal-hygiene.png'
  import img6 from '../../assets/herbal-treatment.png'
   import img7 from '../../assets/walker.png'
    import img8 from '../../assets/stethoscope.png'
import "../HeaderComponents/Header.css";
import { IoCartOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6"; // or "react-icons/fa"
import { TbMessageCircle } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
 

export default function Header() {
  return (
    
<> 

    <div className="main-nav">

        <div className="nav-content">

            <div className="nav-logo">
               <Link  to="/"  className="loglink"> <h3> <span className='log'>N</span>ancee </h3> <p>medicine partner</p></Link>  
                
            </div>


 


                   <div className="center"> 

                     
             
             <div className="d">
               <Link  to="/Innovations" className="d-btn Link">All categories <IoIosArrowDown className="icom"/></Link>

              <div className="d-content">

                <div className="row">

                  <div className="colu">
                      <img src={img1} className="img"></img>
                    <Link  to="/Innovations" className="Link title">Veterinary</Link>

                 

                  </div>

                  <div className="colu">
                      <img src={img2} className="img"></img>
                    <Link  to="/Innovations" className="Link title">First aid items</Link>

                 

                  </div>

                  <div className="colu">
                      <img src={img3} className="img"></img>
                    <Link  to="/Innovations" className="Link title">Baby Care</Link>

                 

                  </div>
                    <div className="colu">
                      <img src={img4} className="img"></img>
                    <Link  to="/Innovations" className="Link title">Nebulizers</Link>

                 

                  </div>

                    <div className="colu">
                      <img src={img5} className="img"></img>
                    <Link  to="/Innovations" className="Link title">Personal Care</Link>

                 

                  </div>
                    <div className="colu">
                      <img src={img6} className="img"></img>
                    <Link  to="/Innovations" className="Link title">Ayurvedic Care</Link>

                 

                  </div>
                   <div className="colu">
                      <img src={img7} className="img"></img>
                    <Link  to="/Innovations" className="Link title">Medical Mobility</Link>

                 

                  </div>
                   <div className="colu">
                      <img src={img8} className="img"></img>
                    <Link  to="/Innovations" className="Link title">Doctors Equipment</Link>

                 

                  </div>

                  
                </div>

              </div>
            </div>
            <Link  to="/Products" className="Link">Products</Link>
                     <Link  to="/Explore" className="Link" >Explore</Link>
            <Link  to="/Innovations" className="Link">Inovations</Link>
            <Link  to="/Innovations" className="Link">Stores</Link>
             

                   </div>
 

            <div className="icons">

                <div className="cart">
                    <IoCartOutline className='ic'/>
                    <p className='count'>0</p>
                </div>
                <FaRegCircleUser className='ic'/>
               <TbMessageCircle className='ic'/>

            </div>


        </div>
    </div>

</>
          
  );
}
