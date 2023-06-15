import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
//got from artefacts js abi
import Pharmaport from './abis/Pharmaport.json'
// Config
import config from './config.json'
// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import StakholderCard from './components/StakholderCard'
import StakeholderForm from './components/Forms/StakeholderForm'
import ProductList from './components/ProductList'
import CAList from './components/CAList'
import 'react-notifications-component/dist/theme.css'
import { ReactNotifications, Store } from 'react-notifications-component'


function App() {

  const [provider, setProvider] = useState(null)
  const [pharmaport, setPharmaport] = useState(null)
  const [account, setAccount] = useState(null)
  const [manufacturer, setManufacturer] = useState(null)
  const [wholesaler, setWholesaler] = useState(null)
  const [pharmacy, setPharmacy] = useState(null)
  const [stakeholder, setStakeholder] = useState({})
  const [toggle, setToggle] = useState(false)
  const [showStakeholderForm, setShowStakeholderForm] = useState(false)
  const [MAs, setMAs] = useState([])
  const [products, setProducts] = useState([])
  const [CAs, setCAs] = useState([])
  const [CRs, setCRs] = useState([])

  const togglePop = (stakeholder) => {
    setStakeholder(stakeholder)
    toggle ? setToggle(false) : setToggle(true)
  };


  const myNotification = (message, title, type) => {
    Store.addNotification({
      title: title,
      type: type,
      container: 'top-right',
      message: message,
      dismiss: {
        duration: 10000,
        pauseOnHover: true,
        onScreen: true,
      },
    });
  };


  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork()

    const pharmaport = new ethers.Contract(config[network.chainId].pharmaport.address, Pharmaport, provider)
    setPharmaport(pharmaport)

    //-----------------------------------------------------
    //load stakeholders 
    const stakeholders = await pharmaport.getAllStakeholders();
    console.log(stakeholders);

    //load Authorisations
    const MAs = await pharmaport.getAllAuthorisations();
    setMAs(MAs);

    //load Compliance Reports
    const CRs = await pharmaport.getAllComplianceReports();
    setCRs(CRs);

    //Load medical products
    const products = await pharmaport.getAllProducts();
    setProducts(products);

    //Load competent authorities
    const CAs = await pharmaport.getAllCompetentAuthorities();
    setCAs(CAs);
    //------------------------------------------------------


    const manufacturer = stakeholders.filter((stakeholder) => stakeholder.category === 'manufacturer')
    const wholesaler = stakeholders.filter((stakeholder) => stakeholder.category === 'wholesaler')
    const pharmacy = stakeholders.filter((stakeholder) => stakeholder.category === 'pharmacy')

    setManufacturer(manufacturer)
    setWholesaler(wholesaler)
    setPharmacy(pharmacy)


    pharmaport.on("Success", (actionType, message, sender) => {
      let transferEvent = {
        actionType: actionType,
        message: message,
        sender: sender,

      }
      console.log(JSON.stringify(transferEvent, null, 4))

    })
  }
  useEffect(() => {
    loadBlockchainData()

  }, [showStakeholderForm])

  const showStakeholderFormPop = () => {
    showStakeholderForm ? setShowStakeholderForm(false) : setShowStakeholderForm(true)

  }

  async function getTransfer() {
  }
  return (
    <div>

      <ReactNotifications />

      <Navigation account={account} setAccount={setAccount} />

      <button className='button__globe' onClick={showStakeholderFormPop}>
        Add Stakeholder
      </button>

      <h2>Stakeholder List</h2>

      {manufacturer && wholesaler && pharmacy && ( //waits till the data from blockchain is loaded
        <>
          <Section title={"Manufacturer"} stakeholders={manufacturer} togglePop={togglePop} />
          <Section title={"Wholesaler"} stakeholders={wholesaler} togglePop={togglePop} />
          <Section title={"Pharmacies"} stakeholders={pharmacy} togglePop={togglePop} />
        </>
      )}

      {showStakeholderForm && (
        <>
        <StakeholderForm provider={provider} account={account} pharmaport={pharmaport} showStakeholderFormPop={showStakeholderFormPop} />
        </>
      )}
      {toggle && (
         <>
        <StakholderCard stakeholder={stakeholder} marketingAuthorisations={MAs} complianceReports={CRs} competentAuthorities={CAs} myProducts={products} provider={provider} account={account} pharmaport={pharmaport} togglePop={togglePop} />
        </>     
      )}

      
      {products &&(
        <>
        <ProductList title={"ProductList"} myProducts={products} />
        </>
      )}
     
      {CAs &&(
        <>
        <CAList title={"CompetentAuthorities"} competentAuthorities={CAs} />
        </>
      )}

    </div>

  );
}

export default App;