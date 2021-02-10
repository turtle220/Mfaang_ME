export default function Post(state = { value: [] }, action) {
  switch (action.type) {
    case 'Post':
      break;
    case 'POST_START':
      console.log('-00000action:', action);
      return { ...state, value: action.post };

    default:
  }
  return state;
}
