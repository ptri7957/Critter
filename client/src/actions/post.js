import { CREATE_POST, CREATE_POST_FAILED, GET_MY_POSTS, POST_ERROR, DELETE_POST, GET_POST_BY_ID, LIKE_POST, LIKE_POST_ERROR, DISLIKE_POST, DELETE_ERROR, GET_POSTS, POST_COMMENT, COMMENT_ERROR, GET_ALL_POST_BY_USER, DELETE_COMMENT, CLEAR_PROFILE } from './types';
import axios from 'axios';

export const getUserPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/post/me/posts');
        dispatch({
            type: GET_MY_POSTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR
        })
    }
}

export const getAllPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/post');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
        dispatch({
            type: CLEAR_PROFILE
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR
        })
    }
}

export const createPost = (title, content, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const postData = {
        title: title,
        content: content
    }
    
    const body = JSON.stringify(postData);

    try {
        const res = await axios.post('/api/post', body, config);
        dispatch({
            type: CREATE_POST,
            payload: res.data
        });
        history.push('/dashboard');
    } catch (error) {
        dispatch({
            type: CREATE_POST_FAILED
        });
    }
}

export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/api/post/posts/${id}`);
        dispatch({
            type: DELETE_POST,
            payload: id
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_ERROR
        })
    }
}

export const getPostById = id => async dispatch => {
    try {
        const res = await axios.get(`/api/post/posts/${id}`);
        dispatch({
            type: GET_POST_BY_ID,
            payload: res.data
        })
        dispatch({
            type: CLEAR_PROFILE
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR
        });
    }
}

export const likePost = id => async dispatch => {
    try {
        const res = await axios.put(`/api/post/posts/${id}/likes`);
        dispatch({
            type: LIKE_POST,
            payload: {
                id: id,
                likes: res.data
            }
        })
    } catch (error) {
        dispatch({
            type: LIKE_POST_ERROR
        })
    }
}

export const dislikePost = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/post/posts/${id}/likes`);
        dispatch({
            type: DISLIKE_POST,
            payload: {
                id: id,
                likes: res.data
            }
        })
    } catch (error) {
        dispatch({
            type: LIKE_POST_ERROR
        })
    }
}

export const postComment = (text, id) => async dispatch => {
    const formData = { text };

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(formData);
    try {
        const res = await axios.put(`/api/post/posts/${id}/comments`, body, config);
        dispatch({
            type: POST_COMMENT,
            payload: res.data
        })        
    } catch (error) {
        dispatch({
            type: COMMENT_ERROR
        })
    }
}

export const getPostByUserId = id => async dispatch => {
    try {
        const res = await axios.get(`/api/post/posts/user/${id}`);
        dispatch({
            type: GET_ALL_POST_BY_USER,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR
        })
    }
}

export const deleteComment = (id, comment_id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/post/posts/${id}/comments/${comment_id}`);
        dispatch({
            type: DELETE_COMMENT,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: COMMENT_ERROR
        })
    }
}