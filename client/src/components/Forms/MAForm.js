import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Store } from 'react-notifications-component'


const MAForm = ({ stakeholder, provider, account, pharmaport, showMAFormPop }) => {
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

  const [marketingAuthorisation, setMarketingAuthorisation] = useState({
    sId: stakeholder.id,
    pId: '',
    cId: '',
    content: '',
    authorisationType: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMarketingAuthorisation({ ...marketingAuthorisation, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signer = provider.getSigner(account);
      let transaction = await pharmaport.connect(signer).addAuthorisation(
        marketingAuthorisation.sId,
        marketingAuthorisation.pId,
        marketingAuthorisation.cId,
        marketingAuthorisation.content,
        marketingAuthorisation.authorisationType
      );
      await transaction.wait();
      // Show success message or trigger any other actions
      myNotification(`Authorisation: ${marketingAuthorisation.authorisationType} added to stakeholder: ${marketingAuthorisation.sId}`, 'Notification', 'success',);

      // Clear form fields after successful submission
      setMarketingAuthorisation({
        sId: stakeholder.id,
        pId: '',
        cId: '',
        content: '',
        authorisationType: '',
      });
      console.log(stakeholder.id.toString())
      showMAFormPop();

    } catch (error) {
      console.error(error);
      // Show error message or trigger any other actions
      myNotification("Missing Authorisation for this Action!", 'Notification', 'danger',);

    }
  };

  return (

    <Form onSubmit={handleSubmit}>

      <br></br>
      <h3>Add Authorisation</h3>
      <Form.Group className="mb-3" controlId="formGridPID">
        <Form.Label>Product ID</Form.Label>
        <Form.Control
          type="text"
          name="pId"
          value={marketingAuthorisation.pId}
          onChange={handleInputChange}
          placeholder="Enter Product ID"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridCID">
        <Form.Label>Competent Authority ID</Form.Label>
        <Form.Control
          type="text"
          name="cId"
          value={marketingAuthorisation.cId}
          onChange={handleInputChange}
          placeholder="Enter Competent Authority ID"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridContent">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="content"
          value={marketingAuthorisation.content}
          onChange={handleInputChange}
          placeholder="Enter content"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridauthorisationType">
        <Form.Label>Type</Form.Label>
        <Form.Select
          name="authorisationType"
          value={marketingAuthorisation.authorisationType}
          onChange={handleInputChange}
          placeholder="Choose type"
        >
          <option value="">Choose Type</option>
          <option value="MA">Marketing Authorisation</option>
          <option value="ManA">Manufacturer Authorisation</option>
          <option value="WDA">Wholesale Distributor Authorisation</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit" >
        Add Marketing Authorisation
      </Button>
    </Form>

  );
};

export default MAForm;