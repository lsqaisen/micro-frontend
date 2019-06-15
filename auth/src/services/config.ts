import request from '@/utils/request';

function getConfig() {
	return request(`/service/auth/api/configurations`);
}

interface setSmtpRequest {
	email_enable: boolean;
	email_from: string;
	email_host: string;
	email_identity: string;
	email_port: number;
	email_ssl: boolean;
	email_username: string;
	email_password?: string;
}

async function setSmtp(data: setSmtpRequest) {
	try {
		const response: any = await request(`/service/auth/api/email/ping`, {
			method: 'post',
			body: data
		});
		if (!!response.err) {
			return response;
		} else {
			return request(`/service/auth/api/configurations`, {
				method: 'put',
				body: data
			});
		}
	} catch (error) {
		return {
			err: error
		}
	}
}


function testSmtp(data: setSmtpRequest) {
	return request(`/service/auth/api/configurations/sendEmail`, {
		method: 'post',
		body: data,
	});
}


function setSmtpStatus(email_enable: boolean) {
	return request(`/service/auth/api/configurations`, {
		method: 'put',
		body: { email_enable }
	});
}

interface setLdapRequest {
	ldap_base_dn: string;
	ldap_enable: boolean;
	ldap_filter: string;
	ldap_scope: number;
	ldap_search_dn: string;
	ldap_timeout: number;
	ldap_uid: string;
	ldap_url: string;
}

async function setLdap(data: setLdapRequest) {
	try {
		let response: any = await request(`/service/auth/api/ldap/ping`, {
			method: 'post',
			body: data
		});
		if (!!response.err) {
			return response;
		} else {
			return request(`/service/auth/api/configurations`, {
				method: 'put',
				body: data
			});
		}
	} catch (error) {
		return {
			err: error
		}
	}
}

function setLdapStatus(ldap_enable: boolean) {
	return request(`/service/auth/api/configurations`, {
		method: 'put',
		body: { ldap_enable }
	});
}

interface getAuditsRequest {
	page: number;
	itemsPerPage: number;
	query: string;
}

function getAudits({ page = 1, itemsPerPage = 10, query = "" }: getAuditsRequest) {
	return request(`/service/auth/api/logs/audit?page=${page}&itemsPerPage=${itemsPerPage}&ftQuery=${query}`);
}

export {
	setSmtpRequest,
	setLdapRequest,
}

export default {
	getConfig,
	setSmtp,
	testSmtp,
	setSmtpStatus,
	setLdap,
	setLdapStatus,
	getAudits,
}
