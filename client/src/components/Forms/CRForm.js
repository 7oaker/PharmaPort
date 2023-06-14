import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Store } from 'react-notifications-component'

const CRForm = ({ stakeholder, provider, account, pharmaport, showComplianceReportFormPop }) => {
  
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
  
  const [complianceReport, setComplianceReport] = useState({
    sId: stakeholder.id,
    cId: '',
    content: '',
    complianceType: '',
    compliance: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplianceReport({ ...complianceReport, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signer = provider.getSigner();
      let transaction = await pharmaport.connect(signer).addComplianceReport(
        complianceReport.sId,
        complianceReport.cId,
        complianceReport.content,
        complianceReport.complianceType,
        complianceReport.compliance
      );
      await transaction.wait();
      myNotification(`Compliance Report for: ${complianceReport.complianceType} added to stakeholder: ${complianceReport.sId}`,'Notification','success',);

      // Clear form fields after successful submission
      setComplianceReport({
        sId: stakeholder.id,
        cId: '',
        content: '',
        complianceType: '',
        compliance: false,
      });
      console.log(stakeholder.id.toString());
      showComplianceReportFormPop();
      // Show success message or trigger any other actions
    } catch (error) {
      console.error(error);
      // Show error message or trigger any other actions
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <br />
      <h3>Add Compliance Report</h3>
      <Form.Group className="mb-3" controlId="formGridCID">
        <Form.Label>Competent Authority ID</Form.Label>
        <Form.Control
          type="text"
          name="cId"
          value={complianceReport.cId}
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
          value={complianceReport.content}
          onChange={handleInputChange}
          placeholder="Enter content"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridComplianceType">
        <Form.Label>Type</Form.Label>
        <Form.Select
          name="complianceType"
          value={complianceReport.complianceType}
          onChange={handleInputChange}
          placeholder="Choose type"
        >
          <option value="">Choose Type</option>
          <option value="GMP">GMP</option>
          <option value="GDP">GDP</option>
          <option value="NonComplianceStatement">Non-Compliance Statement</option>
          <option value="Incident">Incident</option>
          <option value="Inspection">Inspection</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridCompliance">
        <Form.Label>Compliance</Form.Label>
        <Form.Select
          name="compliance"
          value={complianceReport.compliance.toString()}
          onChange={handleInputChange}
        >
          <option value="true">True</option>
          <option value="false">False</option>
          </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Compliance Report
      </Button>
    </Form>
  );
};

export default CRForm;