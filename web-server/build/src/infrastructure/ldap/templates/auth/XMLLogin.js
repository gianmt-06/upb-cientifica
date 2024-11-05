"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLLoginRequest = void 0;
const XMLLoginRequest = (username, password) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
		<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ApiService">
		<soapenv:Header/>
		<soapenv:Body>
			<urn:authenticate>
				<uid>${username}</uid>
				<psswd>${password}</psswd>
			</urn:authenticate>
		</soapenv:Body>
	</soapenv:Envelope>`;
};
exports.XMLLoginRequest = XMLLoginRequest;
//# sourceMappingURL=XMLLogin.js.map