export const XMLReadPermissionsRequest = (token: string, fingerprint: string) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ApiService">
   <soapenv:Header>
      <urn:AuthToken>${token}</urn:AuthToken>
   </soapenv:Header>
   <soapenv:Body>
      <urn:validateRead>
         <fingerprint>${fingerprint}</fingerprint>
      </urn:validateRead>
   </soapenv:Body>
</soapenv:Envelope>`
}