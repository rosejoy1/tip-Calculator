import React, { useState } from 'react'
import { TextField,FormGroup,FormControlLabel,Checkbox,Button,Stack} from '@mui/material';
import './Calculator.css'
import MenuItem from '@mui/material/MenuItem';

function Calculator() {
  const [billAmount,setBillAmount]=useState("")
  const [tipPercentage,setTipPercentage]=useState("")
  const [customTipPercentage,setCustomTipPercentage]=useState("")
  const [splitCount,setSplitCount]=useState(1)
  const [includeTax,setIncludeTax]=useState(false)
  const [taxPercentage, setTaxPercentage] = useState("");

  const [value, setValue] = useState('');

  const [validation, setValidation] = useState({
    billAmount: true,
    tipPercentage: true,
    customTipPercentage: true,
    splitCount: true,
    includeTax: true,
    taxPercentage: true,
  });

  const handleReset = (e) => {
    setBillAmount('');
    setTipPercentage('');
    setCustomTipPercentage('');
    setSplitCount(1);
    setIncludeTax(false);

   
  
    // Reset validation to true for all fields
    setValidation({
      billAmount: true,
      tipPercentage: true,
      customTipPercentage: true,
      splitCount: true,
      includeTax: true,
      taxPercentage: true,
    });
  
    // Reset the state object
    setState({
      billAmount: '',
      tipPercentage: '',
      customTipPercentage: '',
      totalAmount: 0,
      tipAmount: 0,
      splitCount: 1,
      splitAmount: 0,
      includeTax: false,
      taxPercentage: '',
    });
  };
  


  const handleIncludeTax=(e)=>{
    setIncludeTax(e.target.checked)
  }

  const percentage = [
    {
      value: '5%',
      label: '5%',
    },
    {
      value: '10%',
      label: '10%',
    },
    {
      value: '15%',
      label: '15%',
    },
    {
      value: '20%',
      label: '20%',
    },
    {
      value: '',
      label: 'custom',
    }
  ];

  const [state, setState] = useState({
    billAmount: "",
    tipPercentage: "",
    customTipPercentage: "",
    totalAmount: 0,
    tipAmount: 0,
    splitCount: 1,
    splitAmount: 0,
    includeTax: false,
    taxPercentage: ""
  });

  const handleCalculate=(e)=>{
    e.preventDefault()
    if(!state.billAmount || !state.splitCount ){
      alert("fill the form completely")
    }else{
      
   let bill=parseFloat(state.billAmount)
   let tip=0

   if(state.includeTax && state.taxPercentage){
   const  tax=(bill*parseFloat(state.taxPercentage))/100
    bill+=tax;
   }

   if(state.tipPercentage){
    tip=(bill*parseFloat(state.tipPercentage))/100
   }else if(state.customTipPercentage){
    tip=(bill*parseFloat(state.customTipPercentage))/100
   }

   const total=bill+tip
   const split=total/state.splitCount

   setState({
    ...state,
    totalAmount:total.toFixed(2),
    tipAmount:tip.toFixed(2),
    splitAmount:split.toFixed(2)
   })
  }
    }
   
    const handleChange = (e) => {
      const { value, name, type, checked } = e.target;
      const inputValue = e.target.value;
    
      if (type === 'number') {
        // Check if the input is a positive number
        if (/^\d*\.?\d+$/.test(inputValue) || inputValue === '') {
          const newValue = inputValue;
          setValue(newValue);
    
          // Validate each input field as it changes
          const newValidation = { ...validation };
          newValidation[name] = true;
    
          setState((prevState) => ({
            ...prevState,
            [name]: newValue,
          }));
    
          setValidation(newValidation);
        } else {
          
          const newValidation = { ...validation };
          newValidation[name] = false;
          setValidation(newValidation);
        }
      } else {
        const newValue = type === 'checkbox' ? checked : value;
    
        // Validate each input field as it changes
        const newValidation = { ...validation };
        newValidation[name] = newValue !== '';
    
        setState((prevState) => ({
          ...prevState,
          [name]: newValue,
        }));
    
        setValidation(newValidation);
      }
    };
    

  
  
  return (
  <div style={{height:'100vh'}} className='container-fluid bg-dark w-100 d-flex justify-content-center align-items-center'>
    <div  className='bg-light rounded  p-5'>
        <div className='content'>
            <h1 className='text-center'>Tip Calculator</h1>
            <form onSubmit={handleCalculate} >

                <div className='mt-4'>
                <TextField className='w-100 text-dark' id="filled-basic" type='number' value={state.billAmount || ""} name="billAmount" onChange={handleChange} label="Bill Amount" variant="filled" />
                {!validation.billAmount && (
                <div className="error-message text-danger">Please enter a valid bill amount.</div>
                 )}
                </div>
        

                <div className="mt-4">
                <TextField 
                value={state.tipPercentage || ""}
                onChange={handleChange}
                name="tipPercentage"
                className='w-100'
                id="filled-select-currency"
                select
                label="Tip Percentage"
                defaultValue="EUR"
                variant="filled"
                disabled={!!state.customTipPercentage}
                
              >
              {percentage.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {
                  !tipPercentage&&(
                  <TextField value={state.customTipPercentage || ""} disabled={!!state.tipPercentage} name="customTipPercentage"  onChange={handleChange} className='w-100 mt-2' id="filled-basic" type='number' label="Enter custom tip %" variant="filled" />
                  )
            }

            {!validation.customTipPercentage && (
            <div className="error-message text-danger">Please enter a valid bill amount.</div>
            )}
            </div>
              
          <div className='mt-4'>
           <TextField className='w-100  text-dark' id="filled-basic"  inputProps={{ min: 1 }} name="splitCount" value={state.splitCount || ""} onChange={handleChange}  type='number' label="Split Count" variant="filled" />
          </div>
    
          <div className='mt-4'>
            <FormGroup>
              <FormControlLabel checked={includeTax === true} onChange={handleIncludeTax} control={<Checkbox defaultChecked />} label="Include Tax" />{" "}
            </FormGroup>
            {includeTax && (
              <TextField className='w-100 mt-2 mb-4 text-dark'  id="filled-basic" value={state.taxPercentage || ""}  onChange={handleChange}  type='number' name="taxPercentage" label="Enter Tax %" variant="filled" />    
             )}  
          </div>
     
            <Stack direction="row" spacing={2}>
               <Button className='bg-dark' type='submit' style={{width:'200px',height:'55px'}} variant="contained" >CALCULATE</Button>
               <Button onClick={handleReset} className='bg-warning color-light' style={{width:'200px',height:'55px'}} variant="contained">RESET</Button>
            </Stack>
            </form>

           <div className='mt-4'>
             <h6>Total Amount: {state.totalAmount}</h6>
             {state.includeTax && <h6>Tax Amount: {(state.totalAmount - state.tipAmount).toFixed(2)}</h6>}
             <h6>Tip Amount:{state.tipAmount}</h6>
             <h6>Split Amount:{state.splitAmount}</h6>
           </div>
        </div>
    </div>
  </div>
  )
}

export default Calculator