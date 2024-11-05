"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLGetGroups = void 0;
const XMLGetGroups = (token) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ApiService">
   <soapenv:Header>
      <urn:AuthToken>${token}</urn:AuthToken>
   </soapenv:Header>
   <soapenv:Body>
      <urn:getGroupsFromUser>
      </urn:getGroupsFromUser>
   </soapenv:Body>
</soapenv:Envelope>`;
};
exports.XMLGetGroups = XMLGetGroups;
//# sourceMappingURL=XMLGroups.js.map