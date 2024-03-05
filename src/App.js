import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import {saveAs} from 'file-saver';

function App() {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const [orderMade, setOrderMade] = useState(true);

    const [state, setState] = useState({
        name:"",
        customerId:0,
        email:"",
        emailWithoutDomain:"",
        domain:"@hotmail.com",
        wpnumber:false,
        phonenumber:0,
        period:"",
        address:"",
        studioBundle:false,
        largerSingleBed:false,
        smallDoubleBed:false,
        standardDoubleBed:false,
        premiumDoubleBed:false,
        twoChairs:false,
        fourChairs:false,
        largerDiningTable:false,
        storageShelves:false,
        rug:false,
        twoSeaterSofa:false,
        threeSeaterSofa:false,
        individualFurniture:"",
        deliveryDate:"",
        timePreference:"",
        preferenceFurniture:"",
        anythingElse:"",
        userConsent:false,
        total:0,
        SNO:1,
        description:"",
        dimensions:"",
        quantity:1,
        furnitureImgUrl:"",
    });

    const initialState = {
        name:"",
        customerId:0,
        email:"",
        emailWithoutDomain:"",
        domain:"@hotmail.com",
        wpnumber:false,
        phonenumber:0,
        period:"",
        address:"",
        studioBundle:false,
        largerSingleBed:false,
        smallDoubleBed:false,
        standardDoubleBed:false,
        premiumDoubleBed:false,
        twoChairs:false,
        fourChairs:false,
        largerDiningTable:false,
        storageShelves:false,
        rug:false,
        twoSeaterSofa:false,
        threeSeaterSofa:false,
        individualFurniture:"",
        deliveryDate:"",
        timePreference:"",
        preferenceFurniture:"",
        anythingElse:"",
        userConsent:false,
        total:0,
        SNO:1,
        description:"",
        dimensions:"",
        quantity:1,
        furnitureImgUrl:"",
    }

    const handleChange = ({ target: { value, name } }) => {
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCheckBoxChange = ({ target: { checked, name, value } }) => {
        let currentPrice = parseFloat(state.total);
        let parsedValue = parseFloat(value);

        if (name !== "userConsent" && name !== "wpnumber") {
            checked ? currentPrice += parsedValue : currentPrice !== 0 ? currentPrice -= parsedValue : console.log("its 0");
        }

        setState(prevState => ({
            ...prevState,
            [name]: checked,
            total:currentPrice,
        }));
    };

  const createAndDownloadPdf = () => {
    if(state.name !== "" && state.emailWithoutDomain !== "" && state.address !== "" && state.userConsent !== false && state.phonenumber !== 0 && state.total > 0) {
        setLoading(true);
        setResponse("");

        axios.post('create-pdf', state)
            .then(()=> axios.get('get-pdf', {responseType:"blob"}))
            .then((res)=>{
                const pdfBlob = new Blob([res.data], {type: "application/pdf"});
                saveAs(pdfBlob, "newPdf.pdf");
            })
            .catch((error) => {
                // setResponse(error.response.data);
                setResponse("Something went wrong! Please call us to complete your order!");
            })
            .finally(() => {
                setTimeout(() => {
                    setResponse("");
                }, 2000);

                // setState(initialState);
                setOrderMade(true);
                setLoading(false);
            });
    }else{
        setResponse("Fill all the required areas please!");
    }

  }

  const createAndDownloadCV = () => {
    axios.post('create-cv')
        .then(()=> axios.get('get-cv', {responseType:"blob"}))
        .then((res)=>{
            const pdfBlob = new Blob([res.data], {type: "application/pdf"});
            saveAs(pdfBlob, "Resume_Mehmet_Kaan_Taspunar.pdf");
        })
        .catch((error) => {
            console.log(error);
        })
  }

  return (
    <div className="App">
      <div className="content">
        <button style={{display:"none"}} onClick={()=> createAndDownloadCV()}>Get CV</button>
        {!orderMade ? 
            <>
                {response && <div className='responseBox'>{response}</div>}
                <img className='logo' src={require("./assets/COHABIT-horizontal.png")} alt='cohabitLogo'/>
                <h1 className='title'>Wishlist for renting furniture with Cohabit</h1>

                <div className="section customerSection">
                <h2 className='subTitle'>Customer Information</h2>
                <div className="inputsBox">
                    <div className="input-wrapper">
                        <label htmlFor="name">Name *</label>
                        <input id="name" type="text" name='name' onChange={handleChange} value={state.name}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="customerId">Customer ID</label>
                        <input id="customerId" type="number" name='customerId' onChange={handleChange} value={state.customerId}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="phonenumber">Phone Number *</label>
                        <input id="phonenumber" type="number" name="phonenumber" onChange={handleChange} value={state.phonenumber}/>
                    </div>
                    <div className="input-wrapper" style={{ justifyContent:"unset" }}>
                        <input type="checkbox" id="wpnumber" name="wpnumber" onChange={handleCheckBoxChange} checked={state.wpnumber} style={{ width:"auto", minWidth:"auto" }}/>
                        <label htmlFor="wpnumber" style={{ fontWeight: 'normal', margin: 0, marginLeft:"10px", width:"unset"}}>This is also the whatsapp number that Cohabit team can reach me on</label>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="emailWithoutDomain">Email *</label>
                        <input id="emailWithoutDomain" type="text" name='emailWithoutDomain' placeholder='example' style={{width: "19%", minWidth: "15%"}} 
                            onChange={(e)=> {
                                const value = e.target.value;
                                setState(prevState => ({
                                    ...prevState,
                                    emailWithoutDomain: value,
                                    email: `${value}${state.domain}`
                                }));
                            }}
                            value={state.emailWithoutDomain}/>
                        <select
                            name="domain"
                            defaultValue="@hotmail.com" 
                            onChange={(e) => {
                                const domain = e.target.value;
                                setState(prevState => ({
                                    ...prevState,
                                    domain:domain,
                                    email: `${state.emailWithoutDomain}${domain}`
                                }));
                            }}
                        >
                            <option value="@hotmail.com">@hotmail.com</option>
                            <option value="@gmail.com">@gmail.com</option>
                        </select>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="period">Use Period</label>
                        <select id="period" name="period" onChange={handleChange} value={state.period} style={{ width: "auto" }}>
                            <option value="">- Months</option>
                            <option value="3 Months">3 Months</option>
                            <option value="4 Months">4 Months</option>
                            <option value="5 Months">5 Months</option>
                            <option value="6 Months">6 Months</option>
                            <option value="7 Months">7 Months</option>
                            <option value="8 Months">8 Months</option>
                            <option value="9 Months">9 Months</option>
                            <option value="10 Months">10 Months</option>
                            <option value="11 Months">11 Months</option>
                            <option value="12 Months">12 Months</option>
                            <option value="13 Months">13 Months</option>
                            <option value="14 Months">14 Months</option>
                            <option value="15 Months">15 Months</option>
                            <option value="16 Months">16 Months</option>
                            <option value="17 Months">17 Months</option>
                            <option value="18 Months">18 Months</option>
                        </select>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="address">Address *</label>
                        <input id="address" type="text" placeholder='' name='address' onChange={handleChange} value={state.address}/>
                    </div>
            
                </div>
                </div>
                <div className="section wishlistSection">
                <h2 className='subTitle'>Wishlist</h2>
                <div className='info'>The images that you see are indicative of the type of product offered.</div>
                <div className='info'>Note: Minimum order period is 3 months and maximum rental period is 18 months. However, 
                    if you have a requirement outside this window, or wish to extend the duration, do tell us 
                    about it and we will make it work. Visit the FAQ section on www.cohabit.se to learn more about 
                    the ordering process. Monthly rent excludes delivery charges.</div>


                <h4 className='subTitle'>My Products</h4>
                <div className="inputsBox">
            
                    {/* Studio bundle */}
                    <div className="input-wrapper" style={{ justifyContent: "unset" }}>
                    <input 
                        type="checkbox" 
                        id="studioBundle" 
                        name="studioBundle" 
                        value={299}
                        checked={state.studioBundle}
                        onChange={handleCheckBoxChange} 
                        style={{ width: "auto", minWidth: "auto" }} 
                    />
                    <label 
                        htmlFor="studioBundle" 
                        style={{ fontWeight: 'normal', margin: 0, marginLeft: "10px", width: "30%", marginRight: "5px" }}
                    >
                        Studio bundle 299.00SEK
                    </label>
                    <p>Basic studio bundle of a single bed with a table and chair</p>
                    </div>

                    {/* Upgrade to larger single bed */}
                    <div className="input-wrapper" style={{ justifyContent: "unset" }}>
                        <input 
                            type="checkbox" 
                            id="largerSingleBed" 
                            name="largerSingleBed" 
                            value={50}
                            onChange={handleCheckBoxChange} 
                            checked= {state.largerSingleBed}
                            style={{ width: "auto", minWidth: "auto" }} 
                        />
                        <label 
                            htmlFor="largerSingleBed" 
                            style={{ fontWeight: 'normal', margin: 0, marginLeft: "10px", width: "30%", marginRight: "5px"  }}
                        >
                            Upgrade to larger single bed 50.00SEK
                        </label>
                        <p>Make the upgrade on the studio bundle by choosing a larger single bed</p>
                    </div>

                    {/* Upgrade to small double bed */}
                    <div className="input-wrapper" style={{ justifyContent: "unset" }}>
                        <input 
                            type="checkbox" 
                            id="smallDoubleBed" 
                            name="smallDoubleBed" 
                            value={100}
                            checked= {state.smallDoubleBed}
                            onChange={handleCheckBoxChange} 
                            style={{ width: "auto", minWidth: "auto" }} 
                        />
                        <label 
                            htmlFor="smallDoubleBed" 
                            style={{ fontWeight: 'normal', margin: 0, marginLeft: "10px", width: "30%", marginRight: "5px"  }}
                        >
                            Upgrade to small double bed 100.00SEK
                        </label>
                        <p>Make the upgrade on the studio bundle by choosing a small double bed (140x200)</p>
                    </div>

                    {/* Upgrade to Standard double bed */}
                    <div className="input-wrapper" style={{ justifyContent: "unset" }}>
                        <input 
                            type="checkbox" 
                            id="standardDoubleBed" 
                            name="standardDoubleBed" 
                            value={150}
                            checked= {state.standardDoubleBed}
                            onChange={handleCheckBoxChange} 
                            style={{ width: "auto", minWidth: "auto" }} 
                        />
                        <label 
                            htmlFor="standardDoubleBed" 
                            style={{ fontWeight: 'normal', margin: 0, marginLeft: "10px", width: "30%", marginRight: "5px"  }}
                        >
                            Upgrade to Standard double bed 150.00SEK
                        </label>
                        <p>Make the upgrade on the studio bundle by choosing a standard double bed (160x200)</p>
                    </div>

                    {/* Upgrade to Premium or Large double bed */}
                    <div className="input-wrapper" style={{ justifyContent: "unset" }}>
                        <input 
                            type="checkbox" 
                            id="premiumDoubleBed" 
                            name="premiumDoubleBed" 
                            value={200}
                            checked= {state.premiumDoubleBed}
                            onChange={handleCheckBoxChange} 
                            style={{ width: "auto", minWidth: "auto" }} 
                        />
                        <label 
                            htmlFor="premiumDoubleBed" 
                            style={{ fontWeight: 'normal', margin: 0, marginLeft: "10px", width: "30%", marginRight: "5px"  }}
                        >
                            Upgrade to Premium or Large double bed 200.00SEK
                        </label>
                        <p>Make the upgrade on the studio bundle by choosing a premium or large double bed (180x200)</p>
                    </div>

                    {/* Upgrade to Two chairs */}
                    <div className="input-wrapper" style={{ justifyContent: "unset" }}>
                        <input 
                            type="checkbox" 
                            id="twoChairs" 
                            name="twoChairs" 
                            value={50}
                            checked= {state.twoChairs}
                            onChange={handleCheckBoxChange} 
                            style={{ width: "auto", minWidth: "auto" }} 
                        />
                        <label 
                            htmlFor="twoChairs" 
                            style={{ fontWeight: 'normal', margin: 0, marginLeft: "10px", width: "30%", marginRight: "5px"  }}
                        >
                            Upgrade to Two chairs 50.00SEK
                        </label>
                        <p>Make the upgrade on the studio bundle by choosing two chairs</p>
                    </div>

                    {/* Upgrade to 4 chairs */}
                    <div className="input-wrapper" style={{ justifyContent: "unset" }}>
                        <input 
                            type="checkbox" 
                            id="fourChairs" 
                            name="fourChairs" 
                            value={100}
                            checked= {state.fourChairs}
                            onChange={handleCheckBoxChange} 
                            style={{ width: "auto", minWidth: "auto" }} 
                        />
                        <label 
                            htmlFor="fourChairs" 
                            style={{ fontWeight: 'normal', margin: 0, marginLeft: "10px", width: "30%", marginRight: "5px"  }}
                        >
                            Upgrade to 4 chairs 100.00SEK
                        </label>
                        <p>Make the upgrade on the studio bundle by choosing four chairs</p>
                    </div>

                    {/* Upgrade to larger dining table */}
                    <div className="input-wrapper" style={{ justifyContent: "unset" }}>
                        <input 
                            type="checkbox" 
                            id="largerDiningTable" 
                            name="largerDiningTable"
                            value={100} 
                            checked= {state.largerDiningTable}
                            onChange={handleCheckBoxChange} 
                            style={{ width: "auto", minWidth: "auto" }} 
                        />
                        <label 
                            htmlFor="largerDiningTable" 
                            style={{ fontWeight: 'normal', margin: 0, marginLeft: "10px", width: "30%", marginRight: "5px"  }}
                        >
                            Upgrade to larger dining table 100.00SEK
                        </label>
                        <p>Make the upgrade on the studio bundle to a large dining table</p>
                    </div>

                    {/* Add on: Storage / Shelves */}
                    <div className="input-wrapper" style={{ justifyContent: "unset" }}>
                        <input 
                            type="checkbox" 
                            id="storageShelves" 
                            name="storageShelves" 
                            value={100}
                            checked= {state.storageShelves}
                            onChange={handleCheckBoxChange} 
                            style={{ width: "auto", minWidth: "auto" }} 
                        />
                        <label 
                            htmlFor="storageShelves" 
                            style={{ fontWeight: 'normal', margin: 0, marginLeft: "10px", width: "30%", marginRight: "5px"  }}
                        >
                            Add on: Storage / Shelves 100.00SEK
                        </label>
                        <p>Add additional storage to your studio bundle</p>
                    </div>

                    {/* Add on: Rug */}
                    <div className="input-wrapper" style={{ justifyContent: "unset" }}>
                        <input 
                            type="checkbox" 
                            id="rug" 
                            name="rug" 
                            value={100}
                            onChange={handleCheckBoxChange} 
                            checked= {state.rug}
                            style={{ width: "auto", minWidth: "auto" }} 
                        />
                        <label 
                            htmlFor="rug" 
                            style={{ fontWeight: 'normal', margin: 0, marginLeft: "10px", width: "30%", marginRight: "5px"  }}
                        >
                            Add on: Rug 100.00SEK
                        </label>
                        <p>Add an additional rug to your studio bundle</p>
                    </div>

                    {/* Add on: 2 Seater Sofa */}
                    <div className="input-wrapper" style={{ justifyContent: "unset" }}>
                        <input 
                            type="checkbox" 
                            id="twoSeaterSofa" 
                            name="twoSeaterSofa" 
                            value={150}
                            checked= {state.twoSeaterSofa}
                            onChange={handleCheckBoxChange} 
                            style={{ width: "auto", minWidth: "auto" }} 
                        />
                        <label 
                            htmlFor="twoSeaterSofa" 
                            style={{ fontWeight: 'normal', margin: 0, marginLeft: "10px", width: "30%", marginRight: "5px"  }}
                        >
                            Add on: 2 Seater Sofa 150.00SEK
                        </label>
                        <p>Add an additional Sofa (two seater) to your studio bundle</p>
                    </div>

                    {/* Add on: 3 Seater Sofa */}
                    <div className="input-wrapper" style={{ justifyContent: "unset" }}>
                        <input 
                            type="checkbox" 
                            id="threeSeaterSofa" 
                            name="threeSeaterSofa" 
                            value={200}
                            checked= {state.threeSeaterSofa}
                            onChange={handleCheckBoxChange} 
                            style={{ width: "auto", minWidth: "auto" }} 
                        />
                        <label 
                            htmlFor="threeSeaterSofa" 
                            style={{ fontWeight: 'normal', margin: 0, marginLeft: "10px", width: "30%", marginRight: "5px"  }}
                        >
                            Add on: 3 Seater Sofa 200.00SEK
                        </label>
                        <p>Add an additional Sofa (Three seater) to your studio bundle</p>
                    </div>
                </div>
                </div>
                <div className="totalPrice">
                <div>Total</div>
                <div>{state.total}.00 SEK</div>
                </div>

                <div className="section">
                <h2 className='subTitle'>Further Information</h2>
                <div className="inputsBox">
                    <div className="input-wrapper">
                        <label htmlFor="individualFurniture">If you need individual furniture on rent and not a bundle, do tell you about your requirement, we will make it work for you!</label>
                        <textarea id="individualFurniture" type="text" name='individualFurniture' onChange={handleChange} value={state.individualFurniture}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="deliveryDate">Preferred Delivery Date</label>
                        <input id="deliveryDate" type="date" name='deliveryDate' style={{width:"auto", minWidth: "auto"}} onChange={handleChange} value={state.deliveryDate}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="timePreference">Preferred Delivery Hour</label>
                        <select id="timePreference" name="timePreference" onChange={handleChange} value={state.timePreference} style={{ width: "auto" }}>
                            <option value="">--:--</option>
                            <option value="09:00-12:00">09:00-12:00</option>
                            <option value="13:00-15:00">13:00-15:00</option>
                            <option value="15:00-18:00">15:00-18:00</option>
                        </select>
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="preferenceFurniture">If you have any preferences with regard to your furniture, do tell us!</label>
                        <textarea id="preferenceFurniture" type="text" name='preferenceFurniture' onChange={handleChange} value={state.preferenceFurniture}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="anythingElse">Is there anything else you want us to know about your order?</label>
                        <textarea id="anythingElse" type="text" name='anythingElse' onChange={handleChange} value={state.anythingElse}/>
                    </div>
                    <div className="input-wrapper" style={{ justifyContent:"unset" }}>
                        <input type="checkbox" id="userConsent" name="userConsent" onChange={handleCheckBoxChange} checked={state.userConsent} style={{ width:"auto", minWidth:"auto" }}/>
                        <label htmlFor="userConsent" style={{ fontWeight: 'normal', margin: 0, marginLeft:"10px", width:"unset"}}>I agree that the gathered information can be used for further communication with Cohabit *</label>
                    </div>
                </div>
                </div>

                <button className='submitBtn' onClick={createAndDownloadPdf} disabled={loading}>
                {!loading ? "Submit" : 
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                }
                </button>
            </>
        :
            <>
                <div className="ordermade">
                    <img className='logo' src={require("./assets/COHABIT-horizontal.png")} alt='cohabitLogo'/>
                    
                    <div className='ordermadeInformation'>
                        <h1>Thanks {state.name}!</h1>
                        <h3>Your order has been recieved by Cohabit Team!</h3>

                        <p>You will soon recieve an email to complete your order. Please follow the email for next step!</p>
                        <button className='newOrderBtn' onClick={()=> {setOrderMade(""); setState(initialState)}}>New Order</button>
                    </div>

                    <div className='thanksBox'>
                        <p>Have a good day!</p>
                        <p>Cohabit Team!</p>
                    </div>
                </div>
            </>
        }
       
      </div>
    </div>
  );
}

export default App;
