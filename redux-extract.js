console.clear();

const createPolicy = (name, amount) => {
  return {
    type: "CREATE_POLICY",
    payload: {
      name: name,
      amount: amount
    }
  };
};

const deletePolicy = () => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name
    }
  };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  };
};

//reducers
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === "CREATE_CLAIM") {
    //we care about this action
    return [...oldListOfClaims, action.payload];
  }
  //we don't care about the action
  return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === "CREATE_CLAIM") {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === "CREATE_POLICY") {
    return bagOfMoney + action.payload.amount;
  }
  return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === "DELETE_POLICY") {
    return listOfPolicies.filter(name => name !== action.payload.name);
  }
  return listOfPolicies;
};

const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(ourDepartments);

store.dispatch(createPolicy("Alex", 20));
store.dispatch(createPolicy("Ryan", 200));
store.dispatch(createPolicy("Matt", 400));

store.dispatch(createClaim("Alex", 120));
store.dispatch(createClaim("Matt", 5));

store.dispatch(deletePolicy("Matt"));
console.log(store.getState());
