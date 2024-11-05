"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLWritePermissionsRequest = void 0;
const XMLWritePermissionsRequest = (token, fingerprint) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ApiService">
   <soapenv:Header>
      <urn:AuthToken>${token}</urn:AuthToken>
   </soapenv:Header>
   <soapenv:Body>
      <urn:validateWrite>
         <fingerprint>${fingerprint}</fingerprint>
      </urn:validateWrite>
   </soapenv:Body>
</soapenv:Envelope>`;
};
exports.XMLWritePermissionsRequest = XMLWritePermissionsRequest;
//# sourceMappingURL=XMLWritePermissions.js.map