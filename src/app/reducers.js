

const initialState = {
    input: '0',
    result: '',
    history: []
  };
  
  const calculatorReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_DIGIT':
        case 'ADD_DIGIT':
            let newInput;
            if(state.input.length>=36){       //chech karne ke lea ki enteries 36 ke upar na jae
              return {
                ...state
              }
            }
            else if(state.input==='0'){
              newInput=action.payload;
            }
            
            else if(action.payload==='.'){       //to check weather the decimal point is not repeating one after the other 
              let  cnt=0;
           
              for(let i=0;i<state.input.length;i++){
                if(state.input.charAt(i)==='.'){
                  cnt++;
                }
                else if(state.input.charAt(i)==='+'||state.input.charAt(i)==='-'||state.input.charAt(i)==='*'||state.input.charAt(i)==='/'||state.input.charAt(i)==='('){
                    cnt=0;
                }                                   //this loop is to aloow to put decimal point after the character is placed
              }
              console.log(cnt);
              if(cnt){
                return {
                  ...state
                  
                }
              }
              
              else{
                newInput=state.input+action.payload;
                console.log(newInput);
      
                return {
                  ...state,
                  input: newInput
                }
                  }
            }
                  

            else{
              if((state.input.charAt(state.input.length-1)==='+'|| (state.input.charAt(state.input.length-1))==='-'||(state.input.charAt(state.input.length-1))==='*' ||(state.input.charAt(state.input.length-1))==='/' )&& (action.payload==='+'||action.payload==='-'||action.payload==='/'||action.payload==='*')){
                newInput= state.input.slice(0,-1)+action.payload;
                
              }
               
               else{
                newInput = state.input+action.payload;
                
            
              }
              
            }
        
            return {
              ...state,
              input: newInput
            };
      case 'CLEAR_INPUT':
        return {
          ...state,
          input: '0',
          result: ''
        };
      case 'CALCULATE_RESULT':
        try {
          const result = eval(state.input); 
          const expression = state.input + ' = ' + result.toString();
  
          if(state.input=== result.toString()){
            return{
                ...state,
                result:result.toString(),
                input:result.toString(),
                history: [...state.history]
            }
          }
          if(state.history.length){
            
            
            if(state.history[state.history.length-1].expression!=expression){
              return{
                ...state,
                result: result.toString(),
                input:result.toString(),
                history: [...state.history, { expression, result: result.toString() }] 
              }
  
            }
            else{
              return {
                ...state,
                result:result.toString(),
                input:result.toString(),
                history: [...state.history]
              }
            }
            
          }
          else{
            return {
              ...state,
              result: result.toString(),
              input: result.toString(),
              history: [...state.history, { expression, result: result.toString() }]
            };
  
          }
          
        } catch (error) {
          return {
            ...state,
            result: 'Error'
          };
        };
     
      case 'CLEAR_HISTORY':
        return {
          ...state,
          history: []
        };
      default:
        return state;
    }
  };
  
  export default calculatorReducer;