import React from "react";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";

const SocialProof = () => {
  return (
    <section
      className='lp-social-proof container'
      aria-label='Trusted by companies'
    >
      <div className='logos' role='list'>
        <img src={logo1} alt='Acme Corp' role='listitem' />
        <img src={logo2} alt='Northwind' role='listitem' />
        <img src={logo3} alt='Northwind' role='listitem' />
        <img src={logo4} alt='Northwind' role='listitem' />
      </div>
    </section>
  );
};

export default SocialProof;
