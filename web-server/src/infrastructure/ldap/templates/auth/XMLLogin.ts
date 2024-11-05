export const XMLLoginRequest = (username: string, password:string) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
		<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ApiService">
		<soapenv:Header/>
		<soapenv:Body>
			<urn:authenticate>
				<uid>${username}</uid>
				<psswd>${password}</psswd>
			</urn:authenticate>
		</soapenv:Body>
	</soapenv:Envelope>`
}