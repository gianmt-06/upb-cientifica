"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLAddToGroup = void 0;
const XMLAddToGroup = (token, group, username) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ApiService">
   <soapenv:Header>
      <urn:AuthToken>${token}</urn:AuthToken>
   </soapenv:Header>
   <soapenv:Body>
      <urn:addUserToFileGroup>
         <uid>${username}</uid>
         <groupName>${group}</groupName>
      </urn:addUserToFileGroup>
   </soapenv:Body>
</soapenv:Envelope>`;
};
exports.XMLAddToGroup = XMLAddToGroup;
//# sourceMappingURL=XMLAddToGroup.js.map