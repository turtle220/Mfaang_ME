export default function Dropdown(state = { value: [] }, action) {
  switch (action.type) {
    case 'DROPDOWN':
      break;
    case 'DROPDOWN_START':
      return { ...state, value: action.email };

    default:
  }
  return state;
}
