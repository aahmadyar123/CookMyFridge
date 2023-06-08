import React from 'react';
import styled from 'styled-components';

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: ${props => props.fontSize}em;
  text-align: center;
  color: black;
  padding-bottom: 0.1em;
  font-weight: bold;
`;

const Body = styled.p`
  padding-top: ${props => props.paddingTop}em;
  padding-right: ${props => props.paddingRight}em;
  padding-left: ${props => props.paddingLeft}em;
  font-size: 1.25em;
  text-align: ${props => props.textAlign};
  color: black;
  padding-bottom: 0.5em;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const BigWrapper = styled.section`
  padding: 0;
  background: white;
  width: 100%;
  height: ${props => props.height};
`;


const TAC = () => {
  return (
    <>  
      <BigWrapper height ="50px"></BigWrapper>

      <Title fontSize = "2.5"> 
      Terms & Conditions
      </Title>

      <Body 
      textAlign = "center" 
      paddingLeft = "5"
      paddingRight = "5"
      paddingTop = "0.5"> 
      Terms and Conditions: Welcome to our website! These Terms and Conditions govern your use of our website and services related to finding and accessing recipes. By accessing or using our website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.
      </Body>

    <Body 
      textAlign = "center" 
      paddingLeft = "5"
      paddingRight = "5"
      paddingTop = "0.5"> 
        Use of Content:
    a. The content on our website is provided for general information and recipe inspiration purposes only. We strive to provide accurate and up-to-date information, but we cannot guarantee the completeness, accuracy, or reliability of the content.
    b. You acknowledge that any reliance you place on the content is at your own risk. We shall not be held responsible for any loss or damage resulting from your use of or reliance on the content provided on our website.
      </Body>

      <Body 
      textAlign = "center" 
      paddingLeft = "5"
      paddingRight = "5"
      paddingTop = "0.5"> 
    Intellectual Property:
    a. Our website and its original content, including but not limited to text, images, graphics, logos, and software, are the intellectual property of the website owner and are protected by applicable copyright, trademark, and other intellectual property laws.
    b. You are granted a limited, non-exclusive, non-transferable license to access and use the content for personal, non-commercial purposes. You may not modify, distribute, transmit, reproduce, publish, license, or create derivative works from the content without our prior written consent.
    </Body>
    <Body 
      textAlign = "center" 
      paddingLeft = "5"
      paddingRight = "5"
      paddingTop = "0.5"> 
    User Conduct:
    a. By using our website, you agree to comply with all applicable laws and regulations. You shall not use our website for any unlawful or unauthorized purpose.
    b. You are solely responsible for the content you submit or post on our website, including any recipes, comments, or reviews. You warrant that you have all necessary rights to the content and that it does not violate any third-party rights or applicable laws.
      </Body>
      <Body 
      textAlign = "center" 
      paddingLeft = "5"
      paddingRight = "5"
      paddingTop = "0.5"> 
    Links to Third-Party Websites:
    a. Our website may contain links to third-party websites that are not owned or controlled by us. We do not endorse or assume any responsibility for the content, privacy policies, or practices of these third-party websites.
    b. You acknowledge and agree that we shall not be liable for any loss or damage incurred by your use of any third-party websites linked to our website.
    </Body>
    <Body 
      textAlign = "center" 
      paddingLeft = "5"
      paddingRight = "5"
      paddingTop = "0.5"> 
    Limitation of Liability:
    a. To the fullest extent permitted by law, we shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses, resulting from your use of our website or any content provided therein.
    b. We make no warranties or representations about the accuracy, reliability, or availability of our website or the content provided therein. We reserve the right to modify, suspend, or discontinue the website at any time without prior notice.
    </Body>
    <Body 
      textAlign = "center" 
      paddingLeft = "5"
      paddingRight = "5"
      paddingTop = "0.5"> 
    Indemnification:
    You agree to indemnify and hold us harmless from any claims, losses, liabilities, damages, costs, or expenses arising out of or related to your use of our website or any violation of these Terms and Conditions.
    </Body>
    <Body 
      textAlign = "center" 
      paddingLeft = "5"
      paddingRight = "5"
      paddingTop = "0.5"> 
    Governing Law and Jurisdiction:
    These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Country/State]. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in [Your Country/State].
    </Body>
    <Body 
      textAlign = "center" 
      paddingLeft = "5"
      paddingRight = "5"
      paddingTop = "0.5"> 
Privacy Policy:

We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose your personal information when you use our website. By using our website, you consent to the collection, use, and disclosure of your personal information as described in this Privacy Policy.
</Body>
<Body 
      textAlign = "center" 
      paddingLeft = "5"
      paddingRight = "5"
      paddingTop = "0.5"> 
    Information We Collect:
    a. We may collect personal information, such as your name, email address, and location, when you voluntarily provide it to us through our website, such as when you sign up for an account or subscribe to our newsletter.
    b. We may also collect non-personal information, such as your IP address, browser type, and device information, through the use of cookies or similar technologies. This information is used to analyze trends, administer the website, and gather demographic information.
    </Body>
    <Body 
      textAlign = "center" 
      paddingLeft = "5"
      paddingRight = "5"
      paddingTop = "0.5"> 
    Use of Information:
    a. We may use the personal information we collect to provide and improve our services, respond to your inquiries, send you newsletters or promotional materials, and personalize your experience on our website.
    b. We may also use non-personal information for various purposes, such as analyzing website usage patterns, improving our website and services, and for marketing and advertising purposes.
    </Body>
    <Body 
      textAlign = "center" 
      paddingLeft = "5"
      paddingRight = "5"
      paddingTop = "0.5"> 
    Disclosure of Information:
    a. We may disclose your personal information to trusted third-party service providers who assist us in operating our website, conducting our business, or providing services to you. These third parties have agreed to keep your information confidential and use it only for the purposes for which we disclose it to them.
    b. We may also disclose your personal information if required by law or if we believe that such disclosure is necessary to protect our rights, comply with a judicial proceeding, court order, or legal process, or to prevent fraud or illegal activities.
    </Body>
    <Body 
      textAlign = "center" 
      paddingLeft = "5"
      paddingRight = "5"
      paddingTop = "0.5"> 
    Security:
    We implement reasonable security measures to protect your personal information from unauthorized access, loss, or disclosure. However, please be aware that no data transmission over the internet or storage system can be guaranteed to be 100% secure.
    </Body>
    <Body 
      textAlign = "center" 
      paddingLeft = "5"
      paddingRight = "5"
      paddingTop = "0.5"> 
    Children's Privacy:
    Our website is not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will take steps to delete such information.
    </Body>
    <Body 
      textAlign = "center" 
      paddingLeft = "5"
      paddingRight = "5"
      paddingTop = "0.5"> 
    Changes to the Privacy Policy:
    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
    </Body>
    <Body 
      textAlign = "center" 
      paddingLeft = "5"
      paddingRight = "5"
      paddingTop = "0.5"> 
    Contact Us:
    If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at [CMF@gmail.com].
    </Body>

      <BigWrapper height="100px"></BigWrapper>

    </>
  );
};

export default TAC;