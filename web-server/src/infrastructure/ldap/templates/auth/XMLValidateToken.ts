export const XMLValidateToken = (token:string) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ApiService">
   <soapenv:Header>
      <urn:AuthToken>${token}</urn:AuthToken>
   </soapenv:Header>
   <soapenv:Body>
      <urn:validateToken/>
   </soapenv:Body>
</soapenv:Envelope>
   `
}