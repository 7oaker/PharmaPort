# Sample Hardhat Project
https://github.com/7oaker/PharmaPort

Hardhat - etherjs (newer, mor innovative)
https://www.youtube.com/watch?v=LSL69RGeQL0
https://github.com/rodgtr1/blockchain-tutorial-for-devs
or
Truffl - web3js
https://www.youtube.com/watch?v=3681ZYbDSSk&t=2251s
https://www.dappuniversity.com/articles/the-ultimate-ethereum-dapp-tutorial


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
npm run start


bootstrap (https://getbootstrap.com/docs/5.1/forms/overview/)
npm install bootstrap

ethers (https://docs.ethers.org/v5/)
This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
