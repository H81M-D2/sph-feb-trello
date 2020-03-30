import { CONSTANTS } from "../actions";

let listID = 2;
let cardID = 3;

const initialState = [
  {
    title: "To Do",
    id: `list-${0}`,
    cards: [
      {
        id: `card-${0}`,
        text: "Setup Project"
      },
      {
        id: `card-${1}`,
        text: "Install necessary Packages"
      }
    ]
  },
  {
    title: "In Progress",
    id: `list-${1}`,
    cards: [
      {
        id: `card-${2}`,
        text: "ERD Design"
      }
    ]
  }
]

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload.title,
        cards: [],
        id: `listID-${listID}`
      }
      listID++;
      return [...state, newList]

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text:action.payload.text,
        id:`listID-${cardID}`
      }
      cardID++;

      const newState = state.map(list => {
        if(list.id === action.payload.listId){
          return { 
            ...list, 
            cards: [...list.cards, newCard]
          };
        } else {
          return list;
        }
      })

      return newState;
    }

    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
      } = action.payload;

      const newState = [...state];

      if(droppableIdStart === droppableIdEnd) {
        const list = state.find(list => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newState;

    default: 
      return state;
  }
}


export default listsReducer;