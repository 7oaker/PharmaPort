# Sample Hardhat Project
0x5FbDB2315678afecb367f032d93F642f64180aa3

how i set up project: 

mkdir contract
cd .\contract\
npm init -y                    | that npm can be used, initialisation
npm install --save-dev hardhat
npm install --save-dev @nomicfoundation/hardhat-toolbox
npx hardhat compile
npx hardhat test
npx hardhat node

stop node: CTRL + C

deploy contract: 
--> new terminal
cd .\contract\
npx hardhat run scripts/deploy.js --network localhost

frontend:
cd ..



This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
