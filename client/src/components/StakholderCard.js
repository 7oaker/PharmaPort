import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import MAForm from './Forms/MAForm'
import CRForm from './Forms/CRForm'

// Components
import Rating from './Rating'
import ComplianceDisplay from './ComplianceDisplay'

import close from '../assets/close.svg'

const StakholderCard = ({ stakeholder, marketingAuthorisations, complianceReports, competentAuthorities, myProducts, provider, account, pharmaport, togglePop }) => {
  //const [order, setOrder] = useState(null)

  const getLastAddedComplianceReport = (stakeholderCRs) => {
    let maxDate = 0;
    let lastReport = null;
  
    stakeholderCRs.forEach((CR) => {
      if (CR.dateOfInspection.toNumber() > maxDate) {
        maxDate = CR.dateOfInspection.toNumber();
        lastReport = CR;
      }
    });
  
    return lastReport;
  };



  console.log(myProducts)
  console.log("test2",marketingAuthorisations)

  const stakeholderMAs = marketingAuthorisations.filter((MA) => MA.S_id.toNumber() === stakeholder.id.toNumber()) //item.id)
  const stakeholderCRs = complianceReports.filter((CR) => CR.S_id.toNumber() === stakeholder.id.toNumber()) //item.id)

  const lastStakeholderCR = getLastAddedComplianceReport(stakeholderCRs)
  console.log("lastone: ", lastStakeholderCR)
  console.log("test CRs",stakeholderCRs)

  console.log(stakeholder.id.toString())
  console.log("test",stakeholderMAs)
  //const [hasBought, setHasBought] = useState(false)
  const [showMAForm, setShowMAForm] = useState(false)
  const [showCRForm, setShowCRForm] = useState(false)

  const showCRFormPop = () => {
    showCRForm ? setShowCRForm(false) : setShowCRForm(true)
    
  }
  const showMAFormPop = () => {
    showMAForm ? setShowMAForm(false) : setShowMAForm(true)
    
  }

  
  //rewrite
  const setInactive = async (e) => {
    e.preventDefault();
    try {
      const signer = provider.getSigner();
      let transaction = await pharmaport.connect(signer).setInactive(
        stakeholder.id,
        "Stakeholder"
      );
      await transaction.wait();
      
    } catch (error) {
      console.error(error);
     
    }
  };

 
  /*const fetchDetails = async () => {
    const events = await pharmaport.queryFilter("Buy")
    const orders = events.filter(
      (event) => event.args.buyer === account && event.args.itemId.toString() === stakeholder.id.toString()
    )

    if (orders.length === 0) return

    const order = await pharmaport.orders(account, orders[0].args.orderId)
    setOrder(order)
  }

  const buyHandler = async () => {
    const signer = await provider.getSigner()

    // Buy item...
    let transaction = await pharmaport.connect(signer).buy(stakeholder.id, { value: stakeholder.cost })
    await transaction.wait()

    setHasBought(true)
  }

  useEffect(() => {
    fetchDetails()
  }, [hasBought])
*/

          //<Rating value={stakeholder.rating} />

  return (
    <div className="box">
      <div className="box__details">
        
        <div className="box__overview">
          <h1>{stakeholder.name}</h1>

          

          {lastStakeholderCR ? (
      <>
            <ComplianceDisplay value={lastStakeholderCR.compliance} type={lastStakeholderCR.ComplianceType} />    
                  </>
    ) : (
      <p>Incpection pending</p>
    )}
          <hr />
          <h4>{stakeholder.category}</h4>
          <p>
            <b>Information</b><br></br>
            Internal ID:{stakeholder.id.toString()}
            Organization ID: {stakeholder.GID}<br></br>
            TYPE: {stakeholder.category}<br></br>
            Global Location Number: {stakeholder.GLN}<br></br></p>
            <hr /><p>
            <b>Address</b><br></br>
            Country: {stakeholder.countryCode}<br></br>
            Post Code: {stakeholder.postCode}<br></br>
            Street: {stakeholder.street}<br></br></p>
            <hr /><p>
            <b>Added on</b><br></br>
            {new Date(Number(stakeholder.regTime.toString() + '000')).toLocaleDateString(
                  undefined,
                  {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                  })}<br></br></p>
         <hr /><p>
         {lastStakeholderCR ? (
      <>
            <b>Last Compliance Report</b><br></br>
            Compliance: {lastStakeholderCR.compliance.toString()}<br></br>
            Type: {lastStakeholderCR.ComplianceType}<br></br>
            Date of Inspection: {new Date(Number(lastStakeholderCR.dateOfInspection.toString() + '000')).toLocaleDateString(
                  undefined,
                  {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                  })}<br></br>
                  
                  </>
    ) : (
      <p>No compliance report available.</p>
    )}</p>
            <hr />
        </div>

        <div className="box__ma__container">
          <h4>Authorisations & Licenses</h4>
          <hr />
          {stakeholderMAs.map((MA, index) => (
            
  <div className="box__ma__container__item" key={index}>
    <p>ID: {MA.maid.toString()}| | Type: {MA.authorisationType === 'MA' ? 'Marketing Authorisation' : MA.authorisationType === 'ManA' ? 'Manufacturer Authorisation' : MA.authorisationType === 'WDA' ? 'Wholesale Distributor Authorisation' : 'Unknown Authorization Type'} | 
    Inspection Grant Date: {new Date(Number(MA.inspectionGrantDate.toString() + '000')).toLocaleDateString(
                  undefined,
                  {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                  })}</p>
    <p>Description: {MA.content}<br></br>
    </p>
    <b>Product Information</b>
    <p>ID: {MA.P_id.toString()} | {myProducts[MA.P_id-1].name}<br></br>EMEA: {myProducts[MA.P_id-1].EMEA} <br></br>NRM: {myProducts[MA.P_id-1].NRM}<br></br>Description: {myProducts[MA.P_id-1].description} </p>
    <b>Authorizing Competent Authority ({MA.authoriser})</b>
    <p>ID: {MA.C_id.toString()} | {competentAuthorities[MA.C_id-1].name}<br></br>Country Code: {competentAuthorities[MA.C_id-1].countryCode}<br></br>Contact Details: {competentAuthorities[MA.C_id-1].contactDetails}<br></br></p>
    <p>Status: {MA.isActive ? 'Active' : 'Inactive'}</p>  

    
  </div>
))}

{showMAForm && (
  <MAForm stakeholder= {stakeholder} provider={provider} account={account} pharmaport={pharmaport} showMAFormPop={showMAFormPop}/>
)}
{!showMAForm && (
<button className='button__globe' onClick={showMAFormPop}>
           + Add Authorisation 
          </button>
)}

{showCRForm && (
  <CRForm stakeholder= {stakeholder} provider={provider} account={account} pharmaport={pharmaport} showMAFormPop={showCRFormPop}/>
)}
{!showCRForm && (
<button className='button__globe' onClick={showCRFormPop}>
           + Add Compliance Record
          </button>
)}

<button className='button__globe' onClick={setInactive}>
           + Set Inactive
          </button>
          
       



          
        </div>


        <button onClick={togglePop} className="box__close">
          <img src={close} alt="Close" />
        </button>
      </div>
    </div >
  );
}

export default StakholderCard;

/*

<button className='product__buy' onClick={buyHandler}>
           + Add 
          </button>

<p>
            FREE delivery <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </strong>
          </p>

          {item.stock > 0 ? (
            <p>In Stock.</p>
          ) : (
            <p>Out of Stock.</p>
          )}

          <button className='product__buy' onClick={buyHandler}>
            Buy Now
          </button>

         

          {order && (
            <div className='product__bought'>
              Item bought on <br />
              <strong>
                {new Date(Number(order.time.toString() + '000')).toLocaleDateString(
                  undefined,
                  {
                    weekday: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                  })}
              </strong>
            </div>
          )}*/