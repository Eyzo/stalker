import axios from 'axios'

export default {
    getAllPosts: function () {
        var response = axios.get("/api/posts");
        return response;
    },
    findPost: function (id) {
        var response = axios.get(`/api/post/${id}`);
        return response;
    },
    deletingPost: function (id) {
        var response = axios.delete(`/api/post/${id}`);
        return response;
    }
}
