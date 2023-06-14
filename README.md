# PhramaPort
PharmaPort is blockchain based decentralised app (DApp) which should act as a unified interface to current track & trace solutions and provide additional functionalities. Centralised registries, which are currently maintained by central organisations like EMA (European Medicine Agency), such as verified stakeholders, managing marketing authorization holders, certifications such as Good Manufacturing Practice (GMP)/Good Distribution Practice (GDP), or a list of verified wholesale distributors, will be stored in a decentralised manner and made available for further usage in current track & trace solutions. 
This data should be able to be easily accessed and processed by authorised entities, thus creating a decentralised system for the European market. 

### Backend Functionalities:

- Information Handling: The smart contract is capable of handling and storing information such as Competent Authorities and Verified Products, Stakeholders and wallet addresses, Authorisations for stakeholders, and Inspections/Compliance Reports. The smart contract also provides the functionality to mark stored records as inactive.

- Notification/Events: Specific events are emitted when new data is added or updated in the smart contract, providing additional information about new transactions to the network. This information is logged on the blockchain and visible to all participants.

- Controlled Upload: The backend provides a simple but effective access control mechanism to manage access rights and protect the system from unauthorized function calls. The smart contract offers different permission levels based on user responsibilities, allowing read and write access to the appropriate users.

- Batch Load (Data): The backend is capable of batch loading data from structured JSON files during the deployment phase and passing this data as blockchain transactions to the smart contract. This enables testing the smart contract's functionalities using a realistic amount of data.

### Frontend Functionalities:

- Display Smart Contract Data: The user interface allows users to retrieve and display all stored data from the smart contract, including Competent Authorities, Products, Stakeholders, Authorisations, and the results of the last inspection and compliance reports.

- Integration with MetaMask: It is possible to connect the Ethereum wallet from MetaMask to securely interact with the smart contract. The interface displays the currently connected wallet.

- Data Input Forms: Users can input new data into the frontend through interfaces and forms.

- Notification/Events: Users are informed through the web interface with notifications after performing specific actions. Successful and failed transactions are visually differentiated using different colors.


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
### 3. Run tests (optional)
`cd .\contract\`
`$ npx hardhat test`

### 4. Start Hardhat node
`cd .\contract\`
`$ npx hardhat node`

### 5. Run deployment script
In a separate terminal execute:
`cd .\contract\`
`$ npx hardhat run ./scripts/deploy.js --network localhost`
### 6. Start frontend
`cd .\client\`
`$ npm run start`

### 6. Connect Metamask 
##### 6.1 Install wallet extension like MetaMask in Browser
- Instead of connecting to the Mainnet, we it is needed to connect to the RPC connection to the WebSocket (http://localhost:8545)
##### 6.2 Connect MetaMask to Hardhat Network
- MetaMask Extention -> Network -> add Network
    1. Network Name: Localhost 8545
    2. RPC-URL: http://localhost:8545
    3. Chain-ID: 31337
    
### License
Released under the MIT License. Feel free to use, modify, and distribute this implementation in accordance with the terms of the license.
