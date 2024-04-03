import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
// import {saveAs} from 'file-saver';

import Carousel from './Carousel';

function App() {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const [orderMade, setOrderMade] = useState(false);

    const [activeTitle, setActiveTitle] = useState("Customer Information");

    const [currentSection, setCurrentSection] = useState("customerInfo");
    const [activeProducts, setActiveProducts] = useState("notSelected");

    let [bundles, setBundles] = useState([
        {
            id: 0,
            name: "Studio Bundle",
            imageUrl: "Bundle.jpeg",
            description:"Basic studio bundle of a single bed with a table and chair.",
            cost: 299,
            type:'bundle',
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/email/Bundle.jpeg?raw=true',
        },
    ])
    let [addOns] = useState([
        {
            id: 101,
            name: "Add on 1",
            imageUrl: "Bundle.jpeg",
            description:"Simple add on.",
            cost: 50,
            type:'bundle',
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/email/Bundle.jpeg?raw=true',
        },
        {
            id: 102,
            name: "Add on 2",
            imageUrl: "Bundle.jpeg",
            description:"Simple add on.",
            cost: 100,
            type:'bundle',
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/email/Bundle.jpeg?raw=true',
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
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/single_bed.jpg?raw=true',
        },
        {
            id: 2,
            name: "Small Double Bed",
            description: "105cm x 120cm",
            imageUrl: "small_double_bed.jpg",
            cost: 299,
            type:'singleItem',
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/small_double_bed.jpg?raw=true'
        },
        {
            id: 3,
            name: "Double Bed",
            description: "140cm x 160cm",
            imageUrl: "double_bed.jpg",
            type:'singleItem',
            cost: 399,
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/double_bed.jpg?raw=true'
        },
        {
            id: 4,
            name: "Table (Small)",
            imageUrl: "small_table.jpg",
            type:'singleItem',
            cost: 99,
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/small_table.jpg?raw=true'
        },
        {
            id: 5,
            name: "Table (Large)",
            imageUrl: "large_table.jpg",
            type:'singleItem',
            cost: 149,
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/large_table.jpg?raw=true'
        },
        {
            id: 6,
            name: "Chair",
            imageUrl: "chair.jpg",
            type:'singleItem',
            cost: 50,
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/chair.jpg?raw=true',
        },
        {
            id: 7,
            name: "Professional/Working Chair",
            type:'singleItem',
            imageUrl: "work_chair.jpg",
            cost: 100,
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/work_chair.jpg?raw=true'
        },
        {
            id: 8,
            name: "Bedside Storage (Small)",
            imageUrl: "storage_small.jpg",
            type:'singleItem',
            cost: 50,
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/storage_small.jpg?raw=true'
        },
        {
            id: 9,
            name: "Shelf/Storage (Medium)",
            imageUrl: "storage_medium.jpg",
            type:'singleItem',
            cost: 100,
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/storage_medium.jpg?raw=true'
        },
        {
            id: 10,
            name: "Shelf/Storage (Large)",
            imageUrl: "storage_large.jpg",
            type:'singleItem',
            cost: 150,
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/storage_large.jpg?raw=true'
        },
        {
            id: 11,
            name: "Lights",
            imageUrl: "lights.jpg",
            type:'singleItem',
            cost: 50,
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/lights.jpg?raw=true'
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
        product:"product name",
        orderList:[],
        addOnsList:[],
        deliveryDate:"",
        timePreference:"",
        anythingElse:"",
        userConsent:false,
        total:0,
        totalCost:0,
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
        addOnsList:[],
        deliveryDate:"",
        timePreference:"",
        anythingElse:"",
        userConsent:false,
        total:0,
        totalCost:0,
        SNO:1,
        description:"",
        dimensions:"",
        quantity:1,
        furnitureImgUrl:"",
    }

    const images = [
        'https://cohabit.se/wp-content/uploads/2023/07/1-300x300.png',
        'https://cohabit.se/wp-content/uploads/2023/07/2-300x300.png',
        'https://cohabit.se/wp-content/uploads/2023/07/3-300x300.png',
        'https://cohabit.se/wp-content/uploads/2023/07/4-300x300.png',
        'https://cohabit.se/wp-content/uploads/2023/07/5-300x300.png',
        'https://cohabit.se/wp-content/uploads/2023/07/6-300x300.png',
        'https://cohabit.se/wp-content/uploads/2023/07/Cohabit-Gallery-300x300.png',

    ];

    const handleChange = ({ target: { value, name } }) => {
        
        if(name === "deliveryDate" || name === "timePreference"){
            let chargeOfDelivery = 400;
            let selectedDate = new Date(value);
            let timePreference = state.timePreference;
            
            if(name === "timePreference"){
                selectedDate = new Date(state.deliveryDate);
                timePreference = value;
            }

            let dayOfWeek = selectedDate.getDay();

            if (dayOfWeek === 0 || dayOfWeek === 6) {
                chargeOfDelivery = 600;
            }else{
                if (timePreference === "Later than 17:00") {
                    chargeOfDelivery = 600;
                }
            }

            setState(prevState => ({
                ...prevState,
                deliveryCharge:chargeOfDelivery,
                totalCost:parseInt(state.total)+chargeOfDelivery,
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
            setActiveProducts("notSelected");
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
                if (state.deliveryDate !== "" && state.timePreference !== "") {
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

    const addToOrderlist = (product) => {
        let newOrderlist = state.orderList;

        if(!newOrderlist.includes(product)){
            newOrderlist.push(product);
            let currentPrice = parseFloat(state.total);
            currentPrice += (product.cost * product.quantity);

            setState(prevState => ({
                ...prevState,
                orderList: newOrderlist,
                total: currentPrice,
                totalCost:currentPrice+state.deliveryCharge,
            }));

            if(product.type === "bundle"){
                setActiveProducts("notSelected");
            }
        }
    }

    const removeFromOrderlist = (product) => {
        let newOrderlist = state.orderList;

        if(newOrderlist.includes(product)){
            newOrderlist.splice(newOrderlist.indexOf(product), 1);
            let currentPrice = parseFloat(state.total);

            currentPrice -= (product.cost * product.quantity);

            let costOfAddOns = 0;
            let newAddOnsList = state.addOnsList;

            if(product.type === "bundle" && state.addOnsList.length > 0){
                state.addOnsList.forEach(addOn => {
                    costOfAddOns += addOn.cost;
                });

                newAddOnsList = [];
            }

            currentPrice -= costOfAddOns;
            
            setState(prevState => ({
                ...prevState,
                orderList: newOrderlist,
                addOnsList: newAddOnsList,
                total: currentPrice,
                totalCost:currentPrice+state.deliveryCharge,
            }));
        }
    }

    const updateOrderItem = (product, updatedProduct) => {
        const newOrderlist = state.orderList.map(item => {
            if (item.id === product.id) {
                return updatedProduct; // Update the product
            } else {
                return item;
            }
        });
    
        let currentPrice = 0;
        newOrderlist.forEach(item => {
            currentPrice += item.cost * item.quantity; // Calculate total price
        });

        if (state.addOnsList.length > 0) {
            state.addOnsList.forEach(addOn => currentPrice += addOn.cost);
        }
    
        setState(prevState => ({
            ...prevState,
            orderList: newOrderlist, // Update the orderList
            total: currentPrice, // Update the total price
            totalCost: currentPrice + state.deliveryCharge
        }));
    };
    
    const handleProductsQuantity = (product, e) => {

        const quantity = parseInt(e.target.value);

        let updatedProduct = product;
        updatedProduct.quantity = quantity;

        if (product.type === "bundle") {
            const updatedBundles = bundles.map(bundle => {
                if (bundle.id === product.id) {
                    return { ...bundle, quantity: quantity };
                } else {
                    return bundle;
                }
            });

            setBundles(updatedBundles);

        } else {
            const updatedProducts = products.map(item => {
                if (item.id === product.id) {
                    return { ...item, quantity: quantity };
                } else {
                    return item;
                }
            });
    
            setProducts(updatedProducts);
        }
        
        if(state.orderList.includes(product)){
            updateOrderItem(product,updatedProduct);
        }
    };

    const handleAddOn = (addOn) => {
        let newAddOnList = state.addOnsList;
        let currentPrice = parseFloat(state.total);

        if(!newAddOnList.includes(addOn)){
            newAddOnList.push(addOn);
            currentPrice += addOn.cost;
        }else{
            newAddOnList.splice(newAddOnList.indexOf(addOn), 1);
            currentPrice -= addOn.cost;
        }

        setState(prevState => ({
            ...prevState,
            addOnsList: newAddOnList,
            total: currentPrice,
            totalCost:currentPrice+state.deliveryCharge,
        }));
    }

  return (
    <div className="App">
            <div className="backgroundCircle blueBackgroundTop" />
      <div className="content">    
            
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
                                            <label style={{lineHeight:'1.5', width:'70%'}} htmlFor="period">How long do you want to rent the furniture? *</label>
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
                                    <p className='raleway-normal' style={{marginTop: '0', fontSize: '16px'}}>The images that you see are indicative of the type of product offered.</p>
                                    <div className="inputsBox productsBox">
                                        {activeProducts === "notSelected" ? 
                                        <div className="activeProductsBtns">
                                            <div className="productSelectionDiv carouselBox">
                                                <Carousel images={images} />
                                            </div>
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
                                                    <div className='activeProductsBtn' onClick={()=> { window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveProducts("others")}}>+</div>
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

                                            {state.orderList.length > 0 && 
                                                <div className="productSelectionDiv orderListReviewBox">
                                                    <h3 style={{marginBottom:'0'}}>Order list</h3>
                                                    {state.orderList.map(order =>{
                                                        return (
                                                            <div key={order.id} className='orderListReview'> 
                                                                <div className='orderListReviewDetails'>
                                                                    <div className='costPart'>
                                                                        <select className='emailEndPoint' onChange={(e) => handleProductsQuantity(order, e)} value={order.quantity}>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                            <option value="5">5</option>
                                                                            <option value="6">6</option>
                                                                            <option value="7">7</option>
                                                                            <option value="8">8</option>
                                                                            <option value="9">9</option>
                                                                        </select>
                                                                        <p>{order.name}</p>
                                                                    </div>

                                                                    <p style={{fontWeight:'bold'}}>{order.cost} SEK</p>
                                                                </div>

                                                                {order.type === 'bundle' &&
                                                                    <div className='addOnsBox'>
                                                                        {addOns.map(addOn => {
                                                                            return (
                                                                                <div key={addOn.id} className='addOn'>
                                                                                    <div className="costPart">
                                                                                        <input type="checkbox" id="checkbox" name="checkbox" checked={state.addOnsList.includes(addOn)} onChange={() => handleAddOn(addOn)}/>
                                                                                        <p>{addOn.name}</p>
                                                                                    </div>
                                                                                    <p style={{fontWeight:'bold'}}>{addOn.cost} SEK</p>
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                }
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            }
                                        </div>
                                        :
                                        <>
                                        <button className='btn backToProductTypeSelection' onClick={()=>setActiveProducts("notSelected")}>&#x25C0;</button>
                                            {activeProducts === "bundles" &&
                                                <>
                                                    {bundles.map(bundle => {
                                                        return (
                                                            <div key={bundle.id} className="productBox">
                                                                <img className='productImg' src={require(`./assets/email/${bundle.imageUrl}`)} alt={bundle.name} />
                                                                <div className="productInfoB">
                                                                    <h3 className='productText'>{bundle.name}</h3>
                                                                    <p className='productDesc'>{bundle.description}</p>
                                                                    <h5 className='productText'>{bundle.cost} SEK <span style={{fontWeight:'400'}}>/ st</span></h5>
                                                                </div>
                                                                
                                                                {state.orderList.includes(bundle) ? 
                                                                    <>
                                                                        <div className='productText selectProductBtn' style={{background:'black', cursor:'default'}}>&#x2713;</div>
                                                                    </>
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
                                                                        <h5 className='productText'>{product.cost} SEK <span style={{fontWeight:'400'}}>/ st</span></h5>
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
                                        <div className="input-wrapper" style={{marginBottom:'3px'}}>
                                            <label htmlFor="timePreference">Preferred Delivery Hour *</label>
                                            <select id="timePreference" className='emailEndPoint deliveryHourPick' name="timePreference" onChange={handleChange} value={state.timePreference} style={{ width: "auto"}}>
                                                <option value="">--:--</option>
                                                <option value="09:00-12:00">09:00-12:00</option>
                                                <option value="13:00-15:00">13:00-15:00</option>
                                                <option value="15:00-17:00">15:00-17:00</option>
                                                <option value="Later than 17:00">After 17:00</option>
                                            </select>
                                        </div>
                                        {/* {state.deliveryCharge === 600 && 
                                            <p className='notice'>Delivery on weekends or late hours may incur additional charges.</p>
                                        } */}
                                        <p className='notice'>The standard delivery charge is 400 SEK. <br />Deliveries on weekends, special holidays, and after 17.00 will incur a special delivery charge of 600 SEK.</p>
                                        <div className="input-wrapper">
                                            <label htmlFor="anythingElse">Is there anything else you want us to know about your order?</label>
                                            <textarea id="anythingElse" type="text" name='anythingElse' onChange={handleChange} value={state.anythingElse}/>
                                        </div>
                                        {/* <div className="input-wrapper" style={{ justifyContent:"center", flexDirection:'row'}}>
                                            <input type="checkbox" id="userConsent" name="userConsent" onChange={handleCheckBoxChange} checked={state.userConsent} style={{ width:"auto", minWidth:"auto", marginLeft:'15px' }}/>
                                            <label htmlFor="userConsent" className='userContentLabel' style={{ width:"unset"}}>I agree that the gathered information can be used for further communication with Cohabit *</label>
                                        </div> */}
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
                                        <h3 className='subTitle'>Customer Information <span onClick={() => {setActiveProducts("notSelected"); setCurrentSection("customerInfo")}}>&#x270E;</span></h3>
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

                                        <h3 className='subTitle'>Order Details <span onClick={() => {setActiveProducts("notSelected"); setCurrentSection("products")}}>&#x270E;</span></h3>
                                        <div className="summaryBox">
                                            {state.orderList.map(order=>{
                                                return (
                                                    <div key={order.id} className="summary-wrapper order-wrapper">
                                                        <div className='orderTitleAndCost'>
                                                            <h4>{order.name}</h4>
                                                            <h5>{order.cost} SEK</h5>
                                                        </div>
                                                        {order.description &&
                                                            <p style={{fontWeight:'normal'}}>{order.description}</p>
                                                        }
                                                        {(order.type === "bundle" && state.addOnsList.length > 0) && 
                                                            <div className='orderSummaryAddOnsPart'>
                                                                {state.addOnsList.map(addOn => {
                                                                    return (
                                                                        <div key={addOn.id} className='orderTitleAndCost'>
                                                                            <h5>{addOn.name}</h5>
                                                                            <h5>{addOn.cost} SEK</h5>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
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
                                                <p>{state.totalCost}.00 SEK</p>
                                            </div>
                                        </div>

                                        <h3 className='subTitle'>Further Information <span onClick={() => {setActiveProducts("notSelected"); setCurrentSection("furtherInfo")}}>&#x270E;</span></h3>
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
                                                    <p style={{padding: '20px',marginTop: '10px', fontWeight:'bold'}}>{state.anythingElse}</p>
                                                </div>
                                            }  
                                        </div>
                                        
                                        <div className="summary-wrapper" style={{ justifyContent:"center", flexDirection:'row', gap:'10px', alignItems:'center', fontWeight:'bold', marginTop:'20px',marginBottom:'40px'}}>
                                            <input type="checkbox" id="userConsent" name="userConsent" onChange={handleCheckBoxChange} checked={state.userConsent}/>
                                            <label htmlFor="userConsent" className='userContentLabel'>I agree that the gathered information can be used for further communication with Cohabit *</label>
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
                            <img className='logo' style={{marginTop:'20px'}} loading='lazy' src={require("./assets/COHABIT-horizontal.png")} alt='cohabitLogo'/>
                            <div className="orderMadeInformationContent">
                                <h3>Thank you for choosing circularity with Cohabit, <span className='name-span'>{state.name}!</span></h3>
                                <h2>{state.name}!</h2>

                                <p>Cohabit has received your order, and you will receive a confirmation email shortly. 
                                    If you have further questions, contact us at <a className='link' href="mailto:hello@cohabit.se">hello@cohabit.se</a> or WhatsApp <a className='link' href="tel:+46709526846">+46 709 52 68 46</a>.</p>
                                
                                <div className='portraitBox'>
                                    <img className='portrait' loading='lazy' src={require("./assets/portrait.jpg")} alt='cohabitTeamPortrait'/>
                                </div>
                                <div className='thanksBox'>
                                    <div className="thanksText">
                                        <p>Kind regards,</p>
                                        <p>Cohabit Team!</p>
                                    </div>
                                    <button className='btn newOrderBtn' onClick={()=> {setOrderMade(""); setState(initialState)}}>New Order</button>
                                </div>
                                <p className='attention'>If you did not receive an email, kindly check your spam folder or reach out to us through <a className='link' href="mailto:hello@cohabit.se">hello@cohabit.se</a></p>
                            </div>
                        </div>
                    }
            </div>
            
      </div>
            <p className='copyRight raleway-normal'>© 2024 Cohabit . All Rights Reserved - Developed by <a className='developer' href="https://mehmetkaantaspunar.se">Mehmet Kaan Taspunar</a></p>
      <div className="backgroundCircle blueBackgroundBottom" />
    </div>
  );
}

export default App;
