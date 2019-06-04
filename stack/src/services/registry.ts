import request from '@/utils/request';


/**
 * 获取镜像列表
 */

interface getImagesRequest {
  page?: number;     		 // 页
  pageSize?: number;  // 每页条数
  detail?: number;
  q?: string;
  project_id: string;
}


function getImages({ page = 1, pageSize = 10, detail = 1, q = '', project_id = '' }: getImagesRequest) {
  return request(`/service/registry/api/repositories?page=${page}&page_size=${pageSize}&detail=${detail}&q=${q}&project_id=${project_id}`);
}

/**
 * 获取镜像列表
 * @param {string} name 镜像名称 
 */

function getImageTags(imagename: any) {
  return request(`/service/registry/api/repositories/${imagename}/tags`);
}


export {
  getImagesRequest,
}
export default {
  getImages,
  getImageTags,
}
