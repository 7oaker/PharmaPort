# PhramaPort
PharmaPort is blockchain based decentralised app (DApp) which should act as a unified interface to current track & trace solutions and provide additional functionalities. Centralised registries, which are currently maintained by central organisations like EMA (European Medicine Agency), such as verified stakeholders, managing marketing authorization holders, certifications such as Good Manufacturing Practice (GMP)/Good Distribution Practice (GDP), or a list of verified wholesale distributors, will be stored in a decentralised manner and made available for further usage in current track & trace solutions. 
This data should be able to be easily accessed and processed by authorised entities, thus creating a decentralised system for the European market. 

## Functionality
- **Add Data:** 1.	Competent Authorities: The current active national competent authorities. Products: Verified products by the EMA for the European market 
2.	Stakeholders: Different types of stakeholders (Manufacturer, Wholesaler or Pharmacy) and wallet addresses. 
3.	Authorisations: The following authorisations for stakeholders: Marketing Authorisations, Wholesaler Distributor Authorisation and Manufacturing authorisation containing the information about the product and authority which signed the transaction. 
4.	Inspections/Compliance Reports: Inspection details resulting in a Compliance Report for the Good Manufacturing Practice, Good Distribution Practice or Good Pharmacy Practice must also contain the final decision and date of inspection. 
The smart contract must provide the functionality to mark the stored records as inactive.


## Technology Stack & Tools

- Solidity (Writing Smart Contracts & Tests)
- Javascript (React & Testing)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [React.js](https://reactjs.org/) (Frontend Framework)

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/)

## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies:
Fronted:
`cd .\client\`
`$ npm install`
Backend:
`cd .\contract\`
`$ npm install`
### 3. Run tests
`$ npx hardhat test`

### 4. Start Hardhat node
`$ npx hardhat node`

### 5. Run deployment script
In a separate terminal execute:
`$ npx hardhat run ./scripts/deploy.js --network localhost`

### 6. Start frontend
`$ npm run start`