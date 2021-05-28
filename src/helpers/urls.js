const API_ROOT = 'http://localhost:800/api/v1';


export const APIURLS = {

    login: () => `${API_ROOT}/users/create-session`,
    signup: () => `${API_ROOT}/users/signup`,
    fetchPosts: (page=1, limit=5) => `${API_ROOT}/posts?page=${page}&limit=${limit}`,
    editProfile : () => `${API_ROOT}/users/edit`,
    userProfile: (userId) => `${API_ROOT}/users/${userId}`
}