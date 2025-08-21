export const initialState = {
  user: null,
  contacts: [],
  conversations: [],
  groups: [],
  filteredConversations: [],
  activeFilter: 'all',
}

export const ACTIONS = {
  SET_INITIAL_DATA: 'SET_INITIAL_DATA',
  FILTER_CONTACTS_BY_TYPE: 'FILTER_CONTACTS_BY_TYPE',
  RESET_FILTERS: 'RESET_FILTERS',
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_INITIAL_DATA:
      return {
        ...state,
        user: action.payload.user,
        contacts: action.payload.contacts,
        conversations: action.payload.conversations,
        groups: action.payload.groups,
        filteredConversations: action.payload.conversations,
      }

    case ACTIONS.FILTER_CONTACTS_BY_TYPE:
      return {
        ...state,
        filteredConversations: state.conversations.filter(
          (c) => c.type === action.payload
        ),
        activeFilter: action.payload,
      }

    case ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filteredConversations: state.conversations,
        activeFilter: 'all',
      }

    default:
      return state
  }
}
