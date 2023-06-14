import { ethers } from 'ethers'


const CAList = ({title, competentAuthorities }) => {


    return (
       

<div className="list__container">
            {competentAuthorities.map((CA, index) => (

          <div className="list__element" key={index}>
    <p><b>ID: {CA.cid.toString()} | Name: {CA.name.toString()} <br></br> wallet: {CA.wallet.toString()} </b><br></br>
    Country Code: {CA.countryCode.toString()} <br></br>
    Contact Details: {CA.contactDetails.toString()}
    </p>
    </div>))}</div>
    



  
    );
}

export default CAList;