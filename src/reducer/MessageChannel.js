export default function Dropdown(state = { value: [] }, action) {
  
  switch (action.type) {
    case 'Message':
      break;
      case 'MESSAGE_START':
      // console.log(action.email, '-----reducer')
      return { ...state, value: action.email };

    default:
  }
  return state;
}
