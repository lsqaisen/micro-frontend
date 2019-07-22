import request from '../utils/request';

//projects
export async function projects(requestData) {
    const { namespace, page = 1, page_size = 10 } = requestData;
    return request(`/service/registry/api/projects?namespace=${namespace}&page=${page}&page_size=${page_size}`);
}

export async function createProject(requestData) {
    return request(`/service/registry/api/projects`, {
        method: 'post',
        body: {
            ...requestData,
            owner_id: Number(requestData.owner_id || 0),
            public: requestData.public ? 1 : 0,
        },
    });
}

export async function modifyProject(requestData) {
    const { description, project_id } = requestData;
    return request(`/service/auth/api/projects/${project_id}`, {
        method: 'put',
        body: { description }
    });
}

export async function deleteProject(project_id) {
    return request(`/service/registry/api/projects/${project_id}`, {
        method: 'delete',
    });
}

export async function setProjectAdmin(requestData) {
    const { project_id, owner_id } = requestData;
    return request(`/service/auth/api/projects/${project_id}`, {
        method: 'put',
        body: { owner_id }
    });
}


export async function repositories(requestData) {
    const { page = 1, page_size = 10, detail = true, q = '', project_id } = requestData;
    return request(`/service/registry/api/repositories?page=${page}&page_size=${page_size}&detail=${detail}&q=${q}&project_id=${project_id}`);
}

export async function tags(repository_name) {
    return request(`/service/registry/api/repositories/${repository_name}/tags`);
}

export async function lock(requestData) {
    const { resource_name, resource = "repository", tag, lock, } = requestData;
    return request(`/service/registry/api/resource`, {
        method: lock ? 'post' : 'delete',
        body: { resource_name, resource, tag }
    });
}

export async function upload(formData) {
    return request(`/service/ci/upload`, {
        method: 'post',
        body: formData,
    }, true);
}

export async function deleteTag(requestData) {
    const { repository_name, tag } = requestData;
    return request(`/service/registry/api/repositories/${repository_name}/tags/?tag=${tag}`, {
        method: 'delete'
    })
}

export async function logs(requestData) {
    const { page = 1, page_size = 10, project_id } = requestData;
    return request(`/service/auth/api/projects/${project_id}/logs/filter?page=${page}&page_size=${page_size}`, {
        method: 'post',
        body: {},
    });
}
