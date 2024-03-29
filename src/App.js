import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
// import {saveAs} from 'file-saver';

function App() {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const [orderMade, setOrderMade] = useState(false);

    const [activeTitle, setActiveTitle] = useState("Customer Information");

    const [currentSection, setCurrentSection] = useState("customerInfo");
    const [activeProducts, setActiveProducts] = useState("notSelected");

    const [bundles, setBundles] = useState([
        {
            id: 0,
            name: "Studio Bundle",
            imageUrl: "Bundle.jpeg",
            description:"Basic studio bundle of a single bed with a table and chair.",
            cost: 299,
            type:'bundle',
        },
    ])
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Single Bed",
            description: "80cm x 90cm",
            imageUrl: "single_bed.jpg",
            cost: 199,
            type:'singleItem',
        },
        {
            id: 2,
            name: "Small Double Bed",
            description: "105cm x 120cm",
            imageUrl: "small_double_bed.jpg",
            cost: 299,
            type:'singleItem',
        },
        {
            id: 3,
            name: "Double Bed",
            description: "140cm x 160cm",
            imageUrl: "double_bed.jpg",
            type:'singleItem',
            cost: 399
        },
        {
            id: 4,
            name: "Table (Small)",
            imageUrl: "small_table.jpg",
            type:'singleItem',
            cost: 99
        },
        {
            id: 5,
            name: "Table (Large)",
            imageUrl: "large_table.jpg",
            type:'singleItem',
            cost: 149
        },
        {
            id: 6,
            name: "Chair",
            imageUrl: "chair.jpg",
            type:'singleItem',
            cost: 50
        },
        {
            id: 7,
            name: "Professional/Working Chair",
            type:'singleItem',
            imageUrl: "work_chair.jpg",
            cost: 100
        },
        {
            id: 8,
            name: "Bedside Storage (Small)",
            imageUrl: "chair.jpg",
            type:'singleItem',
            cost: 50
        },
        {
            id: 9,
            name: "Shelf/Storage (Medium)",
            imageUrl: "chair.jpg",
            type:'singleItem',
            cost: 100
        },
        {
            id: 10,
            name: "Shelf/Storage (Large)",
            imageUrl: "chair.jpg",
            type:'singleItem',
            cost: 150
        },
        {
            id: 11,
            name: "Lights",
            imageUrl: "chair.jpg",
            type:'singleItem',
            cost: 50
        }
    ]);

    const [state, setState] = useState({
        name:"",
        email:"",
        emailWithoutDomain:"",
        domain:"@hotmail.com",
        wpnumber:false,
        phonenumber:0,
        period:"",
        address:"",
        price:299,
        deliveryCharge:400,
        productPrice:299,
        shippingPrice:400,
        product:"prudktn name",
        orderList:[],
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
        price:299,
        productPrice:299,
        shippingPrice:400,
        product:"prudktn name",
        orderList:[],
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
        
        if(name === "deliveryDate" || name === "timePreference"){
            let chargeOfDelivery = 400;
            let selectedDate = new Date(value);
            let dayOfWeek = selectedDate.getDay();
            let timePreference = state.timePreference;

            if (name === "timePreference") timePreference = value;

            if(name === "timePreference"){
                selectedDate = new Date(state.deliveryDate);
                dayOfWeek = selectedDate.getDay();
            }

            if (dayOfWeek === 0 || dayOfWeek === 6) {
                chargeOfDelivery = 600;
            }else{
                if (timePreference === "Later than 17:00") {
                    chargeOfDelivery = 600;
                }
            }

            setState(prevState => ({
                ...prevState,
                deliveryCharge:chargeOfDelivery
            }));
        }

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
    if(state.name !== "" && state.emailWithoutDomain !== "" && state.address !== "" && state.userConsent !== false && state.phonenumber !== 0 && state.total > 0) {
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
            if (state.name !== "" && state.emailWithoutDomain !== "" && state.address !== "" && state.phonenumber !== 0 && state.period !== "") {
                setCurrentSection("products");
                setActiveTitle("Products");
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
                setActiveTitle("Further Information");
            }else{
                setResponse("Please pick the furniture you want!");
                setTimeout(() => {
                    setResponse("");
                }, 3000);
            }
            break;
        case 'furtherInfo':
            if (state.deliveryDate !== "" && state.timePreference !== "" && state.userConsent !== false) {
                setCurrentSection("summary");
                setActiveTitle("Order Summary");
            }else{
                setResponse("Please fill all the required fields!");
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

  const addToOrderlist = (bundle) => {
    let newOrderlist = state.orderList;

    if(!newOrderlist.includes(bundle)){
        newOrderlist.push(bundle);
        let currentPrice = parseFloat(state.total);
        currentPrice += bundle.cost;

        setState(prevState => ({
            ...prevState,
            orderList: newOrderlist,
            total: currentPrice
        }));

        setActiveProducts("notSelected");
    }
  }

  const removeFromOrderlist = (bundle) => {
    let newOrderlist = state.orderList;

    if(newOrderlist.includes(bundle)){
        newOrderlist.splice(newOrderlist.indexOf(bundle), 1);
        let currentPrice = parseFloat(state.total);
        currentPrice -= bundle.cost;

        setState(prevState => ({
            ...prevState,
            orderList: newOrderlist,
            total: currentPrice
        }));
    }
  }

  return (
    <div className="App">
      <div className="content">    
            <div className="backgroundCircle blueBackgroundTop" />
            <div className="backgroundCircle blueBackgroundBottom" />
            <div className="ordermade">
                    
                    {!orderMade ?
                    
                    <div className='ordermakingBox'>
                        <img className='logo' loading='lazy' src={require("./assets/COHABIT-horizontal.png")} alt='cohabitLogo'/>
                        <div className="container">
                            <h2 className='title'>{activeTitle}</h2>
                            {
                            currentSection === "customerInfo" ? 
                            <>
                                <div className="inputsBox">
                                    <div className="input-wrapper">
                                        <label htmlFor="name">Name *</label>
                                        <input id="name" type="text" name='name' onChange={handleChange} value={state.name}/>
                                    </div>
                                    <div className="input-wrapper">
                                        <label htmlFor="phonenumber">Phone Number *</label>
                                        <input 
                                            id="phonenumber" 
                                            type="text" 
                                            onKeyPress={(e) => {
                                                if (!(e.charCode >= 48 && e.charCode <= 57)) {
                                                e.preventDefault();
                                                }
                                            }}
                                            onPaste={(e) => e.preventDefault()} 
                                            onDrop={(e) => e.preventDefault()} 
                                            name="phonenumber" 
                                            onChange={handleChange} 
                                            value={state.phonenumber}
                                            />
                                    </div>
                                    {/* <div className="input-wrapper" style={{ justifyContent:"center", background: 'none' }}>
                                        <input type="checkbox" id="wpnumber" name="wpnumber" onChange={handleCheckBoxChange} checked={state.wpnumber} style={{ width:"auto", minWidth:"auto" }}/>
                                        <label htmlFor="wpnumber" style={{ fontWeight: 'normal', margin: 0, marginLeft:"10px", width:"unset", color:'black'}}>This is also the whatsapp number that Cohabit team can reach me on</label>
                                    </div> */}
                                    <div className="input-wrapper">
                                        <label htmlFor="emailWithoutDomain">Email *</label>
                                        
                                        <div className='emailInputBox'>
                                            <input id="emailWithoutDomain" type="text" name='emailWithoutDomain' placeholder='example' style={{minWidth: 'unset', width: '55%'}} 
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
                                                className='emailEndPoint'
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
                                    </div>
                                    <div className="input-wrapper">
                                        <label htmlFor="address">Address *</label>
                                        <input id="address" type="text" placeholder='' name='address' onChange={handleChange} value={state.address}/>
                                    </div>
                                    <div className="input-wrapper">
                                        <label htmlFor="period">Rental Period *</label>
                                        <select id="period" className='emailEndPoint rentalSelect' name="period" onChange={handleChange} value={state.period} style={{ width: "90px" }}>
                                            <option value="">- Months</option>
                                            <option value="Below 3 Months">Below 3 Months</option>
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
                                            <option value="Above 18 Months">Above 18 Months</option>
                                        </select>
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
                                <div className="inputsBox productsBox">
                                    {activeProducts === "notSelected" ? 
                                    <div className="activeProductsBtns">
                                        <div className="productSelectionDiv">
                                            <h3>Bundles</h3>
                                            <div className='orderlistBox'>
                                                <div className='activeProductsBtn' onClick={()=> setActiveProducts("bundles")}>+</div>
                                                {state.orderList.filter(order => order.type === "bundle").map(order => {
                                                    return (
                                                        <div key={order.id} className="orderlistItem">
                                                            <img className='orderImg' src={require(`./assets/email/${order.imageUrl}`)} alt={order.name} />
                                                            <button className='removeOrder' onClick={()=> removeFromOrderlist(order)}>X</button>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className="productSelectionDiv">
                                            <h3>Single Items</h3>
                                            <div className='orderlistBox'>
                                                <div className='activeProductsBtn' onClick={()=> setActiveProducts("others")}>+</div>
                                                {state.orderList.filter(order => order.type === "singleItem").map(order => {
                                                    return (
                                                        <div key={order.id} className="orderlistItem">
                                                            <img className='orderImg' src={require(`./assets/furnitures/${order.imageUrl}`)} alt={order.name} />
                                                            <button className='removeOrder' onClick={()=> removeFromOrderlist(order)}>X</button>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <>
                                    
                                        {activeProducts === "bundles" &&
                                            <>
                                                    {bundles.map(bundle => {
                                                        return (
                                                            <div key={bundle.id} className="productBox">
                                                                <img className='productImg' src={require(`./assets/email/${bundle.imageUrl}`)} alt={bundle.name} />
                                                                <div className="productInfoB">
                                                                    <h3 className='productText'>{bundle.name}</h3>
                                                                    <p className='productDesc'>{bundle.description}</p>
                                                                    <h5 className='productText'>{bundle.cost} SEK</h5>
                                                                </div>
                                                                {state.orderList.includes(bundle) ? 
                                                                    <div className='productText selectProductBtn' style={{background:'black', cursor:'default'}}>&#x2713;</div>
                                                                    :

                                                                    <button className='productText selectProductBtn' onClick={() => addToOrderlist(bundle)}>+</button>
                                                                }
                                                            </div>
                                                        )
                                                    })}
                                            </>
                                        }           
                                        {activeProducts === "others" &&
                                            <>
                                                {products.map(product => {
                                                    return (        
                                                        <div key={product.id} className="productBox" style={{ justifyContent: "unset" }}>
                                                            <img className='productImg' src={require(`./assets/furnitures/${product.imageUrl}`)} alt={product.name} />
                                                            <div className="productInfoB">
                                                                    <h3 className='productText'>{product.name}</h3>
                                                                    {product.description && 
                                                                        <p className='productDesc'>{product.description}</p>
                                                                    }
                                                                    <h5 className='productText'>{product.cost} SEK</h5>
                                                                </div>
                                                                {state.orderList.includes(product) ? 
                                                                    <div className='productText selectProductBtn' style={{background:'black', cursor:'default'}}>&#x2713;</div>
                                                                    :

                                                                    <button className='productText selectProductBtn' onClick={() => addToOrderlist(product)}>+</button>
                                                                }
                                                        </div>
                                                    )
                                                })}
                                            </>
                                        }  

                                    </>
                                    }
                                    <div className="totalPrice">
                                        <div style={{display:'none'}}>Total</div>
                                        <div>{state.total}.00 SEK</div>
                                    </div> 
                                </div>

                                <div className="navigateBtns">
                                    <button className="btn backBtn" onClick={()=> {setCurrentSection("customerInfo"); setActiveTitle("Customer Information")}}>Back</button>
                                    <button className="btn nextBtn" onClick={()=> checkInputs("products")}>Next</button>
                                </div>
                            </>
                            :

                            currentSection === "furtherInfo" ?
                            <>
                                <div className="inputsBox">
                                    <div className="input-wrapper">
                                        <label htmlFor="deliveryDate">Preferred Delivery Date *</label>
                                        <input id="deliveryDate" className='emailEndPoint dateAndTimePick' type="date" name='deliveryDate' style={{width:"auto", minWidth: "auto", paddingRight:'0', fontWeight:'bold'}} onChange={handleChange} value={state.deliveryDate}/>
                                    </div>
                                    <div className="input-wrapper">
                                        <label htmlFor="timePreference">Preferred Delivery Hour *</label>
                                        <select id="timePreference" className='emailEndPoint deliveryHourPick' name="timePreference" onChange={handleChange} value={state.timePreference} style={{ width: "auto"}}>
                                            <option value="">--:--</option>
                                            <option value="09:00-12:00">09:00-12:00</option>
                                            <option value="13:00-15:00">13:00-15:00</option>
                                            <option value="15:00-17:00">15:00-17:00</option>
                                            <option value="Later than 17:00">After 17:00</option>
                                        </select>
                                    </div>

                                    <div className="input-wrapper">
                                        <label htmlFor="anythingElse">Is there anything else you want us to know about your order?</label>
                                        <textarea id="anythingElse" type="text" name='anythingElse' onChange={handleChange} value={state.anythingElse}/>
                                    </div>
                                    <div className="input-wrapper" style={{ justifyContent:"center", flexDirection:'row'}}>
                                        <input type="checkbox" id="userConsent" name="userConsent" onChange={handleCheckBoxChange} checked={state.userConsent} style={{ width:"auto", minWidth:"auto", marginLeft:'15px' }}/>
                                        <label htmlFor="userConsent" className='userContentLabel' style={{ width:"unset"}}>I agree that the gathered information can be used for further communication with Cohabit *</label>
                                    </div>
                                </div>
                                <div className="navigateBtns">
                                    <button className="btn backBtn" onClick={()=> {setCurrentSection("products"); setActiveTitle("Products")}}>Back</button>
                                    <button className="btn nextBtn" onClick={()=> checkInputs("furtherInfo")}>Next</button>
                                </div>
                            </>
                            :
                            
                            currentSection === "summary" ?
                            <>
                                <div className="summaryBoxes">      
                                    <h3 className='subTitle'>Customer Information</h3>
                                    <div className="summaryBox">
                                        <div className="summary-wrapper">
                                            <p>Name</p>
                                            <p>{state.name}</p>
                                        </div>
                                        <div className="summary-wrapper">
                                            <p>Phone Number</p>
                                            <p>{state.phonenumber}</p>
                                        </div>
                                        <div className="summary-wrapper">
                                            <p>Email</p>
                                            <p>{state.email}</p>
                                        </div>
                                        <div className="summary-wrapper">
                                            <p>Rental Period</p>
                                            <p>{state.period}</p>
                                        </div>
                                        <div className="summary-wrapper">
                                            <p>Address</p>
                                            <p>{state.address}</p>
                                        </div>
                                
                                    </div>

                                    <h3 className='subTitle'>Order Details</h3>
                                    <div className="summaryBox">
                                        {state.orderList.map(order=>{
                                            return (
                                                <div key={order.id} className="summary-wrapper order-wrapper">
                                                    <div className='orderTitleAndCost'>
                                                        <h4>{order.name}</h4>
                                                        <h5>{order.cost} SEK</h5>
                                                    </div>
                                                    {order.description &&
                                                        <p>{order.description}</p>
                                                    }
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <h3 className='subTitle'>Costs</h3>
                                    <div className="summaryBox">
                                        <div className="summary-wrapper">
                                            <p>Items Cost</p>
                                            <p>{state.total}.00 SEK</p>
                                        </div>
                                        <div className="summary-wrapper" style={{borderBottom: '1px solid black', paddingBottom: '15px'}}>
                                            <p>Delivery Charge</p>
                                            <p>{state.deliveryCharge}.00 SEK</p>
                                        </div>
                                        <div className="summary-wrapper" style={{fontWeight:'bold', fontSize:'18px'}}>
                                            <p>Total Cost</p>
                                            <p>{state.total}.00 SEK</p>
                                        </div>
                                    </div>

                                    <h3 className='subTitle'>Further Information</h3>
                                    <div className="summaryBox">
                                        <div className="summary-wrapper">
                                            <p>Preferred Delivery Date</p>
                                            <p>{state.deliveryDate}</p>
                                        </div>
                                        <div className="summary-wrapper">
                                            <p>Preferred Delivery Hour</p>
                                            <p>{state.timePreference}</p>
                                        </div>

                                        {state.anythingElse !== "" &&
                                            <div className="summary-wrapper" style={{flexDirection:'column'}}>
                                                <p>Is there anything else you want us to know about your order?</p>
                                                <p style={{padding: '20px',marginTop: '10px'}}>{state.anythingElse}</p>
                                            </div>
                                        }
                                        <div className="summary-wrapper">
                                            <p>I agree that the gathered information can be used for further communication with Cohabit</p>
                                            <p>Checked</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="navigateBtns">
                                    <button className="btn backBtn" onClick={()=> {setCurrentSection("furtherInfo"); setActiveTitle("Further Information")}}>Back</button>
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
                        {response && <div className='responseBox'>{response}</div>}
                    </div>
                    :
                    <div className='ordermadeInformation'>
                        <img className='logo' loading='lazy' src={require("./assets/COHABIT-horizontal.png")} alt='cohabitLogo'/>
                        {/* <h1>Thanks {state.name}!</h1> */}
                        <h3>Thank you for Choosing Circularity, {state.name}!</h3>

                        <p>Cohabit has received your order, and you will receive a confirmation email shortly. 
                            If you have further questions, contact us at <a className='link' href="mailto:hello@cohabit.se">Customer Service</a> or WhatsApp <a className='link' href="tel:+46709526846">+46 709 52 68 46</a>.</p>
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
                    </div>
                    }
            </div>
      </div>
    </div>
  );
}

export default App;
