export default function profile(state = { value: [] }, action) {
  switch (action.type) {
    case 'CREATE_IMAGE_UPLOAD':
      break;
    case 'CREATE_IMAGE_UPLOAD_START':
      return { ...state, value: action.email };

    default:
  }
  return state;
}
