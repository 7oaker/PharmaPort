// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
//pragma solidity ^0.8.0;
// Uncomment this line to use console.log
import "hardhat/console.sol";


contract Pharmaport {
    

//state variable -> written to blockchain, can be referenced throughout whole smart contract
    address public owner;
 //-------------- COUNTERS ----------------------------------


    uint256 public stakeholderCount = 0;
    uint256 public competentAuthorityCount = 0;
    uint256 public complianceReportCount = 0;
    uint256 public productCount = 0;
    uint256 public authorisationCount = 0;

 //-------------- MAPS ----------------------------------
   
    mapping(uint256 => CompetentAuthority) public competentAuthorities;
    mapping(uint256 => Stakeholder) public stakeholder; //key valuepair, value corresponds to only one key
    mapping(uint256 => Product) public products;
    mapping(uint256 => Authorisation) public authorisations;
    mapping(uint256 => ComplianceReport) public complianceReports;

   
//-------------- EVENTS ----------------------------------

    event ListStakeholder(string name, string GID, string category);
    event ListCompetentAuthority(string countryCode, string name);
    event AddedProduct(string name, string EMEA);
    event NewAuthorisation(uint S_id, address authoriser, string authorisationType, string content);
    event ComplianceReportAdded(uint256 cid, address inspector, uint256 S_id, uint256 C_id, string content, string complianceType, bool compliance);
    event InactiveItem(string structType, uint256 id);
    event Success(string actionType, string message, address sender);
    event Failure(string actionType, string message, address sender);

//-------------- MODIFIER ----------------------------------
    modifier onlyEMA() { //
        require(msg.sender == owner); 
        _;
    }

    modifier onlyCompetentAuthorities {
        bool isAllowed = false;
        for (uint i = 0; i <= competentAuthorityCount; i++) {
            if (msg.sender == competentAuthorities[i].wallet) {
                isAllowed = true;
                break;
            }
        }
        
        require(isAllowed, "No authorized Competent Authority");
        _;
    }

     modifier onlyStakeholders {
        bool isAllowed = false;
        for (uint i = 0; i <= stakeholderCount; i++) {
            if (msg.sender == stakeholder[i].wallet) {
                isAllowed = true;
                break;
            }
        }
        
        require(isAllowed, "No authorized Stakeholder");
        _;
    }
    constructor() {
        owner = msg.sender; //deployer of smart contract
    }

//-------------- STRUCTS ----------------------------------

     struct Stakeholder {
        uint256 id; //starting by 1 and increasing 
		string GID; //like ORG-100011548
        string name; //like Lonza AG
        string GLN; //Global Location Number like 0614141000005 first few digits represent the GS1 Company Prefix, followed by the location reference and a check digit at the end
        string countryCode; //like AT or CH or any other country shorting
        string postCode; //like 3930
        string street; //like Rottenstrasse 6
        string category; //manufacturer, wholesaler, pharmacy
		uint256 regTime; //block.timestamp
        address wallet; 
        bool isActive;
    }

    struct CompetentAuthority{ //struct for competentAthorities in the European Economic Area - EEA
        uint cid;
        address wallet;
        string countryCode;
        string name;
        string contactDetails;
        bool isActive;

    }

    struct Product { //authorised products by EMA
        uint256 pid; 
        string name;
        string EMEA; //EMEA Product Number example: EMEA/H/C/1234567
        string NRM; //12345678A
        string description;
        bool isActive;
              
    }

    struct Authorisation { //authorisation for stakeholder by competent authoritiy
        uint256 maid; 
        address authoriser; //Wallet address of the authoriser (competent authority)
        uint256 S_id;  
		uint256 P_id;
        uint256 C_id;
        uint256 inspectionGrantDate; //block.timestamp 
        string content; 
        string authorisationType; //MA, ManA, WDA
        bool isActive;

    }

    struct ComplianceReport { //complinace report for Good Manufacturing Practice, Good Distribution Practice or Good Pharmaceoepidemiology Practice
        uint256 cid;
        address inspector;
        uint256 S_id;
        uint256 C_id;
        uint256 dateOfInspection;
        string content;
        string ComplianceType; //GMP, GDP, GPP 
        bool compliance; 
        bool isActive;

    }

   
//-------------- FUNCTIONS ----------------------------------

    //List stakeholder
    function listStakeholder( //named function, public means this fuction can be called outside the smart contract
        string memory _GID, 
        string memory _name,
        string memory _GLN,
        string memory _countryCode,
        string memory _postCode,
        string memory _street,
        string memory _category, 
        address _wallet
    
    ) public onlyCompetentAuthorities{ 
        stakeholderCount++;
        // Create Item struct (inmemory)
        Stakeholder memory newStakeholder = Stakeholder(stakeholderCount, _GID, _name, _GLN, _countryCode, _postCode, _street, _category, block.timestamp, _wallet, true);

        // Save Item struct to blockchain
        stakeholder[stakeholderCount] = newStakeholder;

        // Emit an event, everyone can subscibe to an event with etherjs and can make popups, emails within etherjs
        emit ListStakeholder(_name, _GID, _category);
        emit Success("Stakeholder added",string(abi.encodePacked("Stakeholder ", _name, " has been added ")), msg.sender);
    }

    //Competent Authorities
    function listCompetentAuthority(
        address _wallet,
        string memory _countryCode,
        string memory _name,
        string memory _contactDetails
    ) public onlyEMA {
        competentAuthorityCount++;

        CompetentAuthority memory newCompetentAuthority = CompetentAuthority(competentAuthorityCount, _wallet,_countryCode,_name,_contactDetails, true);

        competentAuthorities[competentAuthorityCount] = newCompetentAuthority;

        emit ListCompetentAuthority(_countryCode, _name);
    }

    // Function to add a product
    function addProduct(
        string memory _name,
        string memory _EMEA,
        string memory _NRM,
        string memory _description
    ) public onlyEMA {
        productCount++;
        Product memory newProduct = Product(productCount, _name, _EMEA, _NRM, _description, true);
        products[productCount] = newProduct;
        
        emit AddedProduct(_name, _EMEA);

    } 


     // Function to add a certificate for a product
    function addAuthorisation(
        uint256 _S_id,        //id of Marketing Authorisation Holder (Stakeholder)
		uint256 _P_id,          //Product ID for the Marketing Authorisation
        uint256 _C_id,          //ID of the Competent Authority who grantet the Marketing Authorisation
        string memory _content, 
        string memory _authorisationType

    ) public onlyCompetentAuthorities {

        if (keccak256(abi.encodePacked(_authorisationType)) == keccak256(abi.encodePacked("MA"))) {
        require(_P_id > 0 && _P_id <= productCount, "Product ID is required for MA");
    }
        authorisationCount++;
        Authorisation memory newAuthorisation = Authorisation(authorisationCount, msg.sender, _S_id, _P_id, _C_id, block.timestamp, _content, _authorisationType, true);
        authorisations[authorisationCount] = newAuthorisation;
        
        emit NewAuthorisation(_S_id, msg.sender, _authorisationType, _content);

    }
     // Function to add a compliance report

    function addComplianceReport(
        uint256 _S_id,          // ID of the Stakeholder 
        uint256 _C_id,          // ID of the Competent Authority
        string memory _content,  // content of the compliance report
        string memory _complianceType,  // type of compliance report
        bool _compliance        
    ) public onlyCompetentAuthorities {

            complianceReportCount++;
            ComplianceReport memory newComplianceReport = ComplianceReport(complianceReportCount, msg.sender, _S_id, _C_id, block.timestamp, _content, _complianceType, _compliance, true);
            complianceReports[complianceReportCount] = newComplianceReport;
            emit ComplianceReportAdded(complianceReportCount, msg.sender, _S_id, _C_id, _content, _complianceType, _compliance);

    }
        
    function setInactive(uint256 id, string memory structType) public onlyCompetentAuthorities {
        if (keccak256(abi.encodePacked(structType)) == keccak256(abi.encodePacked("Stakeholder"))) {
            require(id > 0 && id <= stakeholderCount, "Invalid stakeholder id");
            stakeholder[id].isActive = false;
        } else if (keccak256(abi.encodePacked(structType)) == keccak256(abi.encodePacked("CompetentAuthority"))) {
            require(id > 0 && id <= competentAuthorityCount, "Invalid competent authority id");
            competentAuthorities[id].isActive = false;
        } else if (keccak256(abi.encodePacked(structType)) == keccak256(abi.encodePacked("Product"))) {
            require(id > 0 && id <= productCount, "Invalid product id");
            products[id].isActive = false;
        } else if (keccak256(abi.encodePacked(structType)) == keccak256(abi.encodePacked("Authorisation"))) {
            require(id > 0 && id <= authorisationCount, "Invalid  authorisation id");
            authorisations[id].isActive = false;
        } else if (keccak256(abi.encodePacked(structType)) == keccak256(abi.encodePacked("ComplianceReport"))) {
            require(id > 0 && id <= complianceReportCount, "Invalid compliance report id");
            complianceReports[id].isActive = false;
        } else {
            revert("Invalid struct type");
        }
        emit InactiveItem(structType, id);

    }


    function getAllAuthorisations() public view returns (Authorisation[] memory) {
        Authorisation[] memory allAuthorisations = new Authorisation[](authorisationCount);
        for (uint256 i = 0; i < authorisationCount; i++) {
            allAuthorisations[i] = authorisations[i + 1];
        }
        return allAuthorisations;
    }

    function getAllStakeholders() public view returns (Stakeholder[] memory) {
        Stakeholder[] memory allStakeholders = new Stakeholder[](stakeholderCount);
        for (uint256 i = 0; i < stakeholderCount; i++) {
            allStakeholders[i] = stakeholder[i + 1];
        }
        return allStakeholders;
    }

    function getAllCompetentAuthorities() public view returns (CompetentAuthority[] memory) {
        CompetentAuthority[] memory allCompetentAuthorities = new CompetentAuthority[](competentAuthorityCount);
        for (uint256 i = 0; i < competentAuthorityCount; i++) {
            allCompetentAuthorities[i] = competentAuthorities[i + 1];
        }
        return allCompetentAuthorities;
    }

    function getAllProducts() public view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](productCount);
        for (uint256 i = 0; i < productCount; i++) {
            allProducts[i] = products[i + 1];
        }
        return allProducts;
    }

    function getAllComplianceReports() public view returns (ComplianceReport[] memory) {
        ComplianceReport[] memory allComplianceReports = new ComplianceReport[](complianceReportCount);
        for (uint256 i = 0; i < complianceReportCount; i++) {
            allComplianceReports[i] = complianceReports[i + 1];
        }
        return allComplianceReports;
    }

    
}


