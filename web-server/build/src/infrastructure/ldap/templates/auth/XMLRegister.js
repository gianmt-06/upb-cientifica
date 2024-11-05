"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLRegisterRequest = void 0;
const XMLRegisterRequest = (token, data) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ApiService">
   <soapenv:Header>
      <urn:AuthToken>${token}</urn:AuthToken>
   </soapenv:Header>
   <soapenv:Body>
      <urn:createEntry>
          <uid>${data.username}</uid>
         <cn>${data.name}</cn>
         <sn>${data.lastname}</sn>
         <mail>${data.email}</mail>
         <psswd>${data.password}</psswd>
         <maxStorage>1000</maxStorage>
      </urn:createEntry>
   </soapenv:Body>
</soapenv:Envelope>
   `;
};
exports.XMLRegisterRequest = XMLRegisterRequest;
//# sourceMappingURL=XMLRegister.js.map