export const XMLAddToGroup = (token: string, group: string, username: string) => {
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
</soapenv:Envelope>`
}