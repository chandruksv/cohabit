import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
// import {saveAs} from 'file-saver';

function App() {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const [orderMade, setOrderMade] = useState(false);

    const [currentSection, setCurrentSection] = useState("customerInfo");
    const [activeProducts, setActiveProducts] = useState("bundles");

    const [state, setState] = useState({
        name:"",
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
        deliveryDate:"",
        timePreference:"",
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
        deliveryDate:"",
        timePreference:"",
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

  const sendOrder = () => {
    if(state.name !== "" && state.emailWithoutDomain !== "" && state.address !== "" && state.userConsent !== false && state.phonenumber !== 0 && state.total > 0 && state.deliveryDate !== "" && state.timePreference !== "") {
        setLoading(true);
        setResponse("");

        axios.post('sendEmails', state)
            .then((res)=>{
                console.log(res);
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
                setCurrentSection("customerInfo");
                setLoading(false);
            });
    }else{
        setResponse("Fill all the required areas please!");
    }

  }

//   const createAndDownloadPdf = () => {
//     if(state.name !== "" && state.emailWithoutDomain !== "" && state.address !== "" && state.userConsent !== false && state.phonenumber !== 0 && state.total > 0 && state.deliveryDate !== "" && state.timePreference !== "") {
//         setLoading(true);
//         setResponse("");

//         axios.post('create-pdf', state)
//             .then(()=> axios.get('get-pdf', {responseType:"blob"}))
//             .then((res)=>{
//                 const pdfBlob = new Blob([res.data], {type: "application/pdf"});
//                 saveAs(pdfBlob, "order_conformation_Cohabit.pdf");
//             })
//             .catch((error) => {
//                 // setResponse(error.response.data);
//                 setResponse("Something went wrong! Please call us to complete your order!");
//             })
//             .finally(() => {
//                 setTimeout(() => {
//                     setResponse("");
//                 }, 2000);

//                 // setState(initialState);
//                 setOrderMade(true);
//                 setCurrentSection("customerInfo");
//                 setLoading(false);
//             });
//     }else{
//         setResponse("Fill all the required areas please!");
//     }

//   }

//   const createAndDownloadCV = () => {
//     axios.post('create-cv')
//         .then(()=> axios.get('get-cv', {responseType:"blob"}))
//         .then((res)=>{
//             const pdfBlob = new Blob([res.data], {type: "application/pdf"});
//             saveAs(pdfBlob, "Resume_Mehmet_Kaan_Taspunar.pdf");
//         })
//         .catch((error) => {
//             console.log(error);
//         })
//   }

  const checkInputs = (field) => {

    switch(field){
        case 'customerInfo':
            if (state.name !== "" && state.emailWithoutDomain !== "" && state.address !== "" && state.phonenumber !== 0 ) {
                setCurrentSection("products");
            }else{
                setResponse("Please fill all the required fields!");
                setTimeout(() => {
                    setResponse("");
                }, 3000);
            }
            break;
        case 'products':
            if (state.total > 0) {
                setCurrentSection("furtherInfo");
            }else{
                setResponse("Please pick the furniture you want!");
                setTimeout(() => {
                    setResponse("");
                }, 3000);
            }
            break;
        default:
            console.log("hiii");
            break;
    }
  }

  return (
    <div className="App">
      <div className="content">    
            <div className="backgroundCircle blueBackgroundTop" />
            <div className="backgroundCircle blueBackgroundBottom" />
            <div className="ordermade">
                <div className='ordermadeInformation'>
                    
                    <img className='logo' loading='lazy' src={require("./assets/COHABIT-horizontal.png")} alt='cohabitLogo'/>
                    <img className='logo' loading='lazy' src={require("./assets/email/fb.png")} alt='facebookLogo'/>
                    
                    {!orderMade ?
                    
                    <>
                        <div className="container">
                            <h1 className='title'>New Order</h1>
                            {currentSection === "customerInfo" ? 
                            <>
                                <h2 className='subTitle'>Customer Information</h2>
                                <div className="inputsBox">
                                    <div className="input-wrapper">
                                        <label htmlFor="name">Name *</label>
                                        <input id="name" type="text" name='name' onChange={handleChange} value={state.name}/>
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
                                <div className="navigateBtns">
                                    <button className="btn backBtn" style={{opacity:0, pointerEvents:"none"}} disabled onClick={()=> setCurrentSection("customerInfo")}>Back</button>
                                    <button className="btn nextBtn" onClick={()=> checkInputs("customerInfo")}>Next</button>
                                </div>
                            </>
                            :
                            currentSection === "products" ?
                            <>
                                <h2 className='subTitle'>Products</h2>
                                <div className="activeProductsBtns">
                                    <button className={activeProducts === "bundles" ? 'activeProductsBtn selected' : 'activeProductsBtn'} onClick={()=> setActiveProducts("bundles")}>Bundles</button>
                                    <button className={activeProducts === "others" ? 'activeProductsBtn selected' : 'activeProductsBtn'} onClick={()=> setActiveProducts("others")}>Add-ons</button>
                                </div>
                                <div className="inputsBox productsBox">
                                    {activeProducts === "bundles" ? 
                                        <>
                                            <div className="productBox" style={{ justifyContent: "unset" }}>
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
                                                style={{ fontWeight: 'normal', margin: "0px 5px 0px 10px", width: "30%" }}
                                            >
                                                Studio bundle 299.00SEK
                                            </label>
                                            <p>Basic studio bundle of a single bed with a table and chair</p>
                                            </div>


                                            <div className="productBox" style={{ justifyContent: "unset" }}>
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
                                                    style={{ fontWeight: 'normal', margin: "0px 5px 0px 10px", width: "30%" }}
                                                >
                                                    Add on: 2 Seater Sofa 150.00SEK
                                                </label>
                                                <p>Add an additional Sofa (two seater) to your studio bundle</p>
                                            </div>

                                            <div className="productBox" style={{ justifyContent: "unset" }}>
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
                                                    style={{ fontWeight: 'normal', margin: "0px 5px 0px 10px", width: "30%" }}
                                                >
                                                    Add on: 3 Seater Sofa 200.00SEK
                                                </label>
                                                <p>Add an additional Sofa (Three seater) to your studio bundle</p>
                                            </div>
                                        </>
                                    :
                                        <>
                                        
                                            <div className="productBox" style={{ justifyContent: "unset" }}>
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
                                                    style={{ fontWeight: 'normal', margin: "0px 5px 0px 10px", width: "30%" }}
                                                >
                                                    Upgrade to larger single bed 50.00SEK
                                                </label>
                                                <p>Make the upgrade on the studio bundle by choosing a larger single bed</p>
                                            </div>

                                            <div className="productBox" style={{ justifyContent: "unset" }}>
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
                                                    style={{ fontWeight: 'normal', margin: "0px 5px 0px 10px", width: "30%" }}
                                                >
                                                    Upgrade to small double bed 100.00SEK
                                                </label>
                                                <p>Make the upgrade on the studio bundle by choosing a small double bed (140x200)</p>
                                            </div>

                                            <div className="productBox" style={{ justifyContent: "unset" }}>
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
                                                    style={{ fontWeight: 'normal', margin: "0px 5px 0px 10px", width: "30%" }}
                                                >
                                                    Upgrade to Standard double bed 150.00SEK
                                                </label>
                                                <p>Make the upgrade on the studio bundle by choosing a standard double bed (160x200)</p>
                                            </div>

                                          

                                            <div className="productBox" style={{ justifyContent: "unset" }}>
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
                                                    style={{ fontWeight: 'normal', margin: "0px 5px 0px 10px", width: "30%" }}
                                                >
                                                    Upgrade to Two chairs 50.00SEK
                                                </label>
                                                <p>Make the upgrade on the studio bundle by choosing two chairs</p>
                                            </div>

                                            <div className="productBox" style={{ justifyContent: "unset" }}>
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
                                                    style={{ fontWeight: 'normal', margin: "0px 5px 0px 10px", width: "30%" }}
                                                >
                                                    Upgrade to 4 chairs 100.00SEK
                                                </label>
                                                <p>Make the upgrade on the studio bundle by choosing four chairs</p>
                                            </div>

                                            <div className="productBox" style={{ justifyContent: "unset" }}>
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
                                                    style={{ fontWeight: 'normal', margin: "0px 5px 0px 10px", width: "30%" }}
                                                >
                                                    Upgrade to larger dining table 100.00SEK
                                                </label>
                                                <p>Make the upgrade on the studio bundle to a large dining table</p>
                                            </div>

                                            <div className="productBox" style={{ justifyContent: "unset" }}>
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
                                                    style={{ fontWeight: 'normal', margin: "0px 5px 0px 10px", width: "30%" }}
                                                >
                                                    Add on: Storage / Shelves 100.00SEK
                                                </label>
                                                <p>Add additional storage to your studio bundle</p>
                                            </div>

                                            <div className="productBox" style={{ justifyContent: "unset" }}>
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
                                                    style={{ fontWeight: 'normal', margin: "0px 5px 0px 10px", width: "30%" }}
                                                >
                                                    Add on: Rug 100.00SEK
                                                </label>
                                                <p>Add an additional rug to your studio bundle</p>
                                            </div>
                                        </>
                                    }
                                   
                                </div>
                                <div className="totalPrice">
                                    <div>Total</div>
                                    <div>{state.total}.00 SEK</div>
                                </div>
                                <div className="navigateBtns">
                                    <button className="btn backBtn" onClick={()=> setCurrentSection("customerInfo")}>Back</button>
                                    <button className="btn nextBtn" onClick={()=> checkInputs("products")}>Next</button>
                                </div>
                            </>
                            :

                            currentSection === "furtherInfo" ?
                            <>
                                <h2 className='subTitle'>Further Information</h2>
                                <div className="inputsBox">
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
                                        <label htmlFor="anythingElse">Is there anything else you want us to know about your order?</label>
                                        <textarea id="anythingElse" type="text" name='anythingElse' onChange={handleChange} value={state.anythingElse}/>
                                    </div>
                                    <div className="input-wrapper" style={{ justifyContent:"unset" }}>
                                        <input type="checkbox" id="userConsent" name="userConsent" onChange={handleCheckBoxChange} checked={state.userConsent} style={{ width:"auto", minWidth:"auto" }}/>
                                        <label htmlFor="userConsent" style={{ fontWeight: 'normal', margin: 0, marginLeft:"10px", width:"unset"}}>I agree that the gathered information can be used for further communication with Cohabit *</label>
                                    </div>
                                </div>
                                <div className="navigateBtns">
                                    <button className="btn backBtn" onClick={()=> setCurrentSection("products")}>Back</button>
                                    <button className='btn submitBtn' onClick={sendOrder} disabled={loading}>
                                        {!loading ? "Submit" : 
                                            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                        }
                                    </button>
                                </div>
                            </>
                            :
                            <>

                            </>
                            }
                        </div>
                    </>
                    :
                    <>          
                        <h1>Thanks {state.name}!</h1>
                        <h3>Your order has been recieved by Cohabit Team!</h3>

                        <p>You will soon recieve an email to confirm your order. 
                            Please follow the email for next step! 
                            If you have further questions you can contact us through (email and phone) or you can also book a call with us here.</p>
                        <p>Not recieved an email, please send a reminder to our <a className='link' href="mailto:hello@cohabit.se">Customer Service</a> or Call us at <a className='link' href="tel:+46723171061">0-721 111 161</a>.</p>
                        <button className='btn newOrderBtn' onClick={()=> {setOrderMade(""); setState(initialState)}}>New Order</button>
                        <div className='portraitBox'>
                            <img className='portrait' loading='lazy' src={require("./assets/portrait.jpg")} alt='cohabitTeamPortrait'/>
                        </div>
                        <div className='thanksBox'>
                            <div className="thanksText">
                                <p>Kind regards,</p>
                                <p>Cohabit Team!</p>
                            </div>
                        </div>
                    </>

                    }

                    {response && <div className='responseBox'>{response}</div>}
                </div>
            </div>
      </div>
    </div>
  );
}

export default App;
