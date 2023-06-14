import React from 'react';
import noncomp from '../assets/complianceIcons/noncompliant.png';
import gdp from '../assets/complianceIcons/gdp.png';
import gmp from '../assets/complianceIcons/gmp.png';

const ComplianceDisplay = ({ value, type }) => {
  return (
    <div className='complianceDisplay'>
      {value === false ? (
        <img src={noncomp} width='60px' height='60px' alt='Noncompliant' />
      ) : (
        <img
        src={type === 'GDP' ? gdp : type === 'GMP' ? gmp : noncomp}
        width='60px'
        height='60px'
        alt='Star'
      />
      )}
     
    </div>
  );
};

export default ComplianceDisplay;