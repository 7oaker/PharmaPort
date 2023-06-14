const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
};

const ID = 1;
const GID = "ORG-100011548";
const NAME = "Lonza AG";
const GLN = "0614141000005";
const COUNTRY_CODE = "AT";
const POST_CODE = "3930";
const STREET = "Rottenstrasse 6";
const CATEGORY = "manufacturer";
const WALLET = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";

describe("Pharmaport", () => {
  let pharmaport;
  let deployer, user;

  beforeEach(async () => {
    // Setup Accounts
    [deployer, user] = await ethers.getSigners();
    console.log(deployer.address, user.address); // Get testing accounts
    console.log("---------------",deployer.address); // Get testing accounts

    // Deploy contract
    const Pharmaport = await ethers.getContractFactory("Pharmaport");
    pharmaport = await Pharmaport.deploy();
  });

  describe("Deployment", () => {
    it('Sets the owner', async () => {
      expect(await pharmaport.owner()).to.equal(deployer.address);
    });
  });

  describe("Test adding a stakeholder", () => {
    let transaction;

    beforeEach(async () => {
      transaction = await pharmaport.connect(deployer).listStakeholder(
       
        GID,
        NAME,
        GLN,
        COUNTRY_CODE,
        POST_CODE,
        STREET,
        CATEGORY,
        WALLET
      );

      await transaction.wait();
    });

    it('Returns stakeholder attributes', async () => {
      const stakeholder = await pharmaport.stakeholder(ID);

      expect(stakeholder.id).to.equal(ID);
      expect(stakeholder.GID).to.equal(GID);
      expect(stakeholder.name).to.equal(NAME);
      expect(stakeholder.GLN).to.equal(GLN);
      expect(stakeholder.countryCode).to.equal(COUNTRY_CODE);
      expect(stakeholder.postCode).to.equal(POST_CODE);
      expect(stakeholder.street).to.equal(STREET);
      expect(stakeholder.category).to.equal(CATEGORY);
      expect(stakeholder.wallet).to.equal(WALLET);
    });

    it("Emits LoadStakeholder event", () => {
      expect(transaction).to.emit(pharmaport, "ListStakeholder");
    });
  });
});
