import request from '../utils/request';

// 查询当前项目下面的角色分组
export function groups(requestData) {
    const { project_id } = requestData;
    return request(`/service/auth/api/groups?project_id=${project_id}`);
}

// 查询角色详情
export function group(group_id) {
    return request(`/service/auth/api/groups/${group_id}/detail`);
}

export function updateGroup(requestData) {
    const { group_id, privileges, remove_privileges } = requestData;
    return request(`/service/auth/api/groups`, {
        method: 'put',
        body: { group_id, privileges, remove_privileges },
    });
}

export function createGroup(requestData) {
    return request(`/service/auth/api/groups`, {
        method: 'post',
        body: requestData,
    });
}

export function deleteGroup(group_id) {
    return request(`/service/auth/api/groups/${group_id}`, {
        method: 'delete',
    });
}

export function addUser(requestData) {
    const { user_id, group_id } = requestData;
    return request(`/service/auth/api/groups/${group_id}/users`, {
        method: "post",
        body: { user_id }
    });
}

// 查询角色-所有角色下面的所有用户
export function users(requestData) {
    const { admin, project_id, username = '', page = 1, page_size = 10 } = requestData;
    return request(admin ?
        `/service/auth/api/users?username=${username}&page=${page}&page_size=${page_size}` :
        `/service/auth/api/projects/${project_id}/members?username=${username}`);
}

export function emailIsExist(requestData) {
    return request(`/service/auth/api/users/exist-reviews`, {
        method: 'post',
        body: requestData,
    });
}

export function createUser(requestData) {
    const { type, namespace, project_id, ...data } = requestData;
    if (type === 1) {
        return request(`/service/auth/api/users`, {
            method: 'post',
            body: {
                ...data,
                type: Number(type),
            }
        })
    } else {
        return request(`/service/auth/api/users?project=${namespace}`, {
            method: 'post',
            body: {
                ...data,
                type: Number(type),
            }
        }).then(response => {
            return !!response.err ? response :
                request(`/service/auth/api/projects/${project_id}/members`, {
                    method: 'post',
                    body: { user_ids: [response.data.user_id] }
                })
        });
    }
}

export function deleteUser(requestData) {
    const { admin, project_id, user_id, group_id } = requestData;
    const url = !!group_id ? `/service/auth/api/groups/${group_id}/users/${user_id}` :
        admin ? `/service/auth/api/users/${user_id}` :
            `/service/auth/api/projects/${project_id}/members/${user_id}`;
    return request(url, { method: 'delete' });
}

export function editUser(requestData) {
    const { admin, email, realname, username, project_name, user_id, comment } = requestData;
    return request(`/service/auth/api/users/${user_id}${admin ? '' : `?project=${project_name}`}`, {
        method: 'put',
        body: { email, realname, username, comment }
    });
}
//权限
export function privileges(requestData) {
    const { admin, project_id } = requestData;
    return request(admin ? `/service/auth/api/joint-privileges` : `/service/auth/api/joint-privileges?project_id=${project_id}`);
}

export function config() {
    return request(`/service/auth/api/configurations`);
}

export function testSmtp(requestData) {
    return request(`/service/auth/api/configurations/sendEmail`, {
        method: 'post',
        body: requestData,
    });
}

export async function setSmtp(requestData) {
    try {
        let response = await request(`/service/auth/api/email/ping`, {
            method: 'post',
            body: requestData
        });
        if (!!response.err) {
            return response;
        } else {
            return request(`/service/auth/api/configurations`, {
                method: 'put',
                body: requestData
            });
        }
    } catch (error) {
        return {
            err: error
        }
    }
}

export function setSmtpStatus(email_enable) {
    return request(`/service/auth/api/configurations`, {
        method: 'put',
        body: { email_enable }
    });
}

export async function setLdap(requestData) {
    try {
        let response = await request(`/service/auth/api/ldap/ping`, {
            method: 'post',
            body: requestData
        });
        if (!!response.err) {
            return response;
        } else {
            return request(`/service/auth/api/configurations`, {
                method: 'put',
                body: requestData
            });
        }
    } catch (error) {
        return {
            err: error
        }
    }
}

export function setLdapStatus(ldap_enable) {
    return request(`/service/auth/api/configurations`, {
        method: 'put',
        body: { ldap_enable }
    });
}

export function audit(requestData) {
    const { page = 1, itemsPerPage = 10, query = "ftQuery=" } = requestData;
    return request(`/service/auth/api/logs/audit?page=${page}&itemsPerPage=${itemsPerPage}&${query}`);
}