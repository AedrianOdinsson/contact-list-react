export const initialStore = () => {
  return {
    agenda: "adrian_ss_agenda",
    contacts: [],
    loading: false,
    error: null
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case "setAgenda":
      return { ...store, agenda: action.payload };


    case "setLoading":
      return { ...store, loading: action.payload };

    case "setError":
      return { ...store, error: action.payload };

    case "setContacts":
      return { ...store, contacts: action.payload };

    case "addContact":
      return { ...store, contacts: [...store.contacts, action.payload] };

    case "editContact":
      return {
        ...store,
        contacts: store.contacts.map(c =>
          c.id === action.payload.id ? action.payload : c
        )
      };

    case "deleteContact":
      return {
        ...store,
        contacts: store.contacts.filter(c => c.id !== action.payload)
      };

    default:
      throw Error("Unknown action.");
  }
}
