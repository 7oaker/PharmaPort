import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import close from '../../assets/close.svg'
import {Store } from 'react-notifications-component'

const StakeholderForm = ({ provider, account, pharmaport , showStakeholderFormPop}) => {
  
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

  const [stakeholder, setStakeholder] = useState({
      gid: '',
      name: '',
      gln: '',
      countryCode: '',
      postCode: '',
      street: '',
      category: '',
      wallet: ''
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setStakeholder({ ...stakeholder, [name]: value });
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const signer = provider.getSigner();
        let transaction = await pharmaport.connect(signer).listStakeholder(
          stakeholder.gid,
          stakeholder.name,
          stakeholder.gln,
          stakeholder.countryCode,
          stakeholder.postCode,
          stakeholder.street,
          stakeholder.category,//ethers.utils.getAddress(walletAddress);
          stakeholder.wallet        );
            await transaction.wait()

        // Show success message or trigger any other actions
        myNotification(`Stakheholder: ${stakeholder.name} added (${stakeholder.wallet}) `,'Notification','success',);
        // Clear form fields after successful submission
        setStakeholder({
          //id: 0,
          gid: '',
          name: '',
          gln: '',
          countryCode: '',
          postCode: '',
          street: '',
          category: '',
          wallet: ''
        });
  
       
      } catch (error) {
        console.error(error);
        // Show error message or trigger any other actions
        myNotification(error,'Notification','failure',);

      }
    };
    return (
      <div className="box">
        <div className="box__details">
          
      <div style={{ margin: '20px' }}>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridGID">
            <Form.Label>GID</Form.Label>
            <Form.Control
              type="text"
              name="gid"
              value={stakeholder.gid}
              onChange={handleInputChange}
              placeholder="Enter GID"
            />
          </Form.Group>
    
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={stakeholder.name}
              onChange={handleInputChange}
              placeholder="Enter name"
            />
          </Form.Group>
        </Row>
    
        <Form.Group className="mb-3" controlId="formGridGLN">
          <Form.Label>GLN</Form.Label>
          <Form.Control
            type="text"
            name="gln"
            value={stakeholder.gln}
            onChange={handleInputChange}
            placeholder="Enter GLN"
          />
        </Form.Group>
    
        <Form.Group className="mb-3" controlId="formGridCountryCode">
          <Form.Label>Country Code</Form.Label>
          <Form.Control
            type="text"
            name="countryCode"
            value={stakeholder.countryCode}
            onChange={handleInputChange}
            placeholder="Enter country code"
          />
        </Form.Group>
    
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPostCode">
            <Form.Label>Post Code</Form.Label>
            <Form.Control
              type="text"
              name="postCode"
              value={stakeholder.postCode}
              onChange={handleInputChange}
              placeholder="Enter post code"
            />
          </Form.Group>
    
          <Form.Group as={Col} controlId="formGridStreet">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={stakeholder.street}
              onChange={handleInputChange}
              placeholder="Enter street"
            />
          </Form.Group>
        </Row>
    
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCategory">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={stakeholder.category}
            onChange={handleInputChange}
            placeholder="Choose category"
          >
            <option value="">Choose Type</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="wholesaler">Wholesaler</option>
            <option value="pharmacy">Pharmacy</option>
          </Form.Select>
        </Form.Group>
            
        <Form.Group as={Col} controlId="formGridWallet">
          <Form.Label>Future Wallet Address</Form.Label>
          <Form.Control
            type="text"
            name="wallet"
            value={stakeholder.wallet}
            onChange={handleInputChange}
            placeholder="Enter wallet address"
          />
        </Form.Group>
        </Row>
    
        <Button variant="primary" type="submit">
          Add Stakeholder
        </Button>
      </Form>
      </div>
      <button onClick={showStakeholderFormPop} className="box__close">
          <img src={close} alt="Close" />
        </button>
      </div></div>
    );

    /*
    
    <form onSubmit={handleSubmit}>
             
          <label htmlFor="gid">GID:</label>
          <input type="text" id="gid" name="gid" value={stakeholder.gid} onChange={handleInputChange} />
    
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={stakeholder.name} onChange={handleInputChange} />
    
          <label htmlFor="gln">GLN:</label>
          <input type="text" id="gln" name="gln" value={stakeholder.gln} onChange={handleInputChange} />
    
          <label htmlFor="countryCode">Country Code:</label>
          <input type="text" id="countryCode" name="countryCode" value={stakeholder.countryCode} onChange={handleInputChange} />
    
          <label htmlFor="postCode">Post Code:</label>
          <input type="text" id="postCode" name="postCode" value={stakeholder.postCode} onChange={handleInputChange} />
    
          <label htmlFor="street">Street:</label>
          <input type="text" id="street" name="street" value={stakeholder.street} onChange={handleInputChange} />
    
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" name="category" value={stakeholder.category} onChange={handleInputChange} />
    
          
          <button type="submit">Add Stakeholder</button>
        </form>
    */
    
    };
    
    export default StakeholderForm;