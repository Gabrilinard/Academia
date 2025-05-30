import React from 'react';
import { FooterContainer, LeftSection, PrimaryInfo, RightSection, ContactInfo, LocationInfo } from './style';

const Footer = () => {
  return (
    <FooterContainer>
      <LeftSection>
        <PrimaryInfo>
            <h1 className="BrandName">Lg_Suplementos</h1>
            <p className="Slogan">Seu Treino é nossa obrigação!</p>
        </PrimaryInfo>
      </LeftSection>

      <RightSection>
        <LocationInfo>
          <h2 className="SectionTitle">Localização</h2>
          <p className="Text">Rua Walfrido Salmito, 115</p>
          <p className="Text">Teresina, PI</p>
        </LocationInfo>

        <ContactInfo>
          <h2 className="SectionTitle">Contato</h2>
          <p className="Text">Lg_suplementos@gmail.com</p>
          <p className="Text">(98) 98202-1516</p>
        </ContactInfo>
      </RightSection>
    </FooterContainer>
  );
};

export default Footer;
