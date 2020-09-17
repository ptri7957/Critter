import {
  CREATE_POST,
  CREATE_POST_FAILED,
  GET_MY_POSTS,
  POST_ERROR,
  DELETE_POST,
  GET_POST_BY_ID,
  LIKE_POST,
  LIKE_POST_ERROR,
  DISLIKE_POST,
  DELETE_ERROR,
  GET_POSTS,
  POST_COMMENT,
  COMMENT_ERROR,
  GET_ALL_POST_BY_USER,
  DELETE_COMMENT,
  CLEAR_PSOTS,
} from "../actions/types";

const initialState = {
  post: null,
  posts: [],
  myPosts: [],
  userPosts: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POST_BY_ID:
    case POST_COMMENT:
    case DELETE_COMMENT:
    case CREATE_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case COMMENT_ERROR:
    case LIKE_POST_ERROR:
    case POST_ERROR:
    case DELETE_ERROR:
    case CLEAR_PSOTS:
    case CREATE_POST_FAILED:
      return {
        ...state,
        post: null,
        posts: [],
        userPosts: [],
        loading: false,
      };
    case GET_POSTS:
      return {
        ...state,
        post: null,
        posts: action.payload,
        userPosts: [],
        myPosts: [],
        loading: false,
      };
      case GET_MY_POSTS:
        return {
          ...state,
          post: null,
          posts: [],
          myPosts: action.payload,
          userPosts: [],
          loading: false,
        };
      case GET_ALL_POST_BY_USER:
          return {
            ...state,
            post: null,
            posts: [],
            userPosts: action.payload,
            loading: false,
          };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((userPost) => {
          return userPost._id !== action.payload;
        }),
        userPosts: state.userPosts.filter((userPost) => {
          return userPost._id !== action.payload;
        }),
        loading: false,
      };
    case DISLIKE_POST:
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? (post.likes = action.payload.likes)
            : post
        ),
        userPosts: state.userPosts.map((post) =>
          post._id === action.payload.id
            ? (post.likes = action.payload.likes)
            : post
        ),
        loading: false,
      };
    default:
      return state;
  }
}
