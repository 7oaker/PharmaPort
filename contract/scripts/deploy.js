// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { stakeholder } = require("../src/stakeholder.json")
const { competentAuthorities } = require("../src/authorities.json")
const { pharmaceuticalProducts } = require("../src/products.json")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}
async function main() {

// Setup accounts
  const [deployer] = await ethers.getSigners()

// We get the contract to deploy
// Deploy Pharmaport
const Pharmaport = await hre.ethers.getContractFactory("Pharmaport")
const pharmaport = await Pharmaport.deploy()
await pharmaport.deployed()

console.log(`Deployed Pharmaport Contract at: ${pharmaport.address}\n`)
console.log(`Deployer: ${deployer.address}\n`)


//BATCHLOAD JSon files into the smart contract
//--------------------------------------------------------------------
for (let i = 0; i < competentAuthorities.length; i++) {
  const transaction = await pharmaport.connect(deployer).listCompetentAuthority(
    competentAuthorities[i].wallet,
    competentAuthorities[i].countryCode,
    competentAuthorities[i].name,
    competentAuthorities[i].contactDetails
  );
  await transaction.wait();

  console.log(`Listed Competent Authority: ${competentAuthorities[i].wallet}: ${competentAuthorities[i].name}: ${competentAuthorities[i].countryCode}`);
}

for (let i = 0; i < stakeholder.length; i++) {
  const transaction = await pharmaport.connect(deployer).listStakeholder(
    stakeholder[i].GID,
    stakeholder[i].name,
    stakeholder[i].GLN,
    stakeholder[i].countryCode,
    stakeholder[i].postCode,
    stakeholder[i].street,
    stakeholder[i].category,
    stakeholder[i].wallet
  );
  await transaction.wait();

  console.log(`Listed Stakeholder: ${stakeholder[i].GID}: ${stakeholder[i].name} : ${stakeholder[i].category}`);

  }

for (let i = 0; i < pharmaceuticalProducts.length; i++) {
  const transaction = await pharmaport.connect(deployer).addProduct(
    pharmaceuticalProducts[i].name,
    pharmaceuticalProducts[i].EMEA,
    pharmaceuticalProducts[i].NRM,
    pharmaceuticalProducts[i].description

  );
  await transaction.wait();

  console.log(`Listed Pharmaceutical Product: ${pharmaceuticalProducts[i].name}: ${pharmaceuticalProducts[i].EMEA}`);
}
  

  const transaction = await pharmaport.connect(deployer).addAuthorisation(
    1,
    1,
    1,
    "Content of Marketing Authorisation",
    "MA"

  );
  await transaction.wait();

  console.log(`Added 1st Test Marketing Authorisation`);

  const transaction2 = await pharmaport.connect(deployer).addAuthorisation(
    3, 
    2,
    2,
    "Content of Manufacturing Authorisation",
    "ManA"

  );
  await transaction2.wait();

  const transaction3 = await pharmaport.connect(deployer).addAuthorisation(
    1, 
    2,
    3,
    "Content of Marketing Authorisation",
    "MA"
  );
  await transaction3.wait();

  console.log(`Added 3nd Test Marketing Authorisation`);

  const transaction4 = await pharmaport.connect(deployer).addComplianceReport(
    1, 
    1,
    "Content of Compliance Report",
    "GDP",
    true
  );
  await transaction4.wait();

  console.log(`Added 3rd Test Marketing Authorisation`);
}

//--------------------------------------------------------------------
// This pattern will enable to use async/await to properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });