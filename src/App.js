import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

import Carousel from './Carousel';
import validator from 'validator';

function App() {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const [orderMade, setOrderMade] = useState(false);

    const [activeTitle, setActiveTitle] = useState("Products");
    const [currentSection, setCurrentSection] = useState("products");
    const [activeProducts, setActiveProducts] = useState("notSelected");

    const [isValidEmail, setIsValidEmail] = useState(true);
    const [gatheredInfoAccepted, setGatheredInfoAccepted] = useState(true);

    let [bundles, setBundles] = useState([
        {
            id: 0,
            name: "Studio Bundle",
            imageUrl: "Bundle.jpeg",
            description:"The basic bundle includes a single bed, small table and chair.",
            cost: 299,
            type:'bundle',
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/email/Bundle.jpeg?raw=true',
        },
    ])
    let [addOns] = useState([
        {
            id: 101,
            name: "Upgrade to large single bed",
            imageUrl: "large_single_bed.png",
            description:"Make the upgrade on the studio bundle by choosing a larger single bed",
            size:"105cm x 200cm",
            cost: 50,
            type:'bundle',
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/large_single_bed.png?raw=true',
        },
        {
            id: 102,
            name: "Upgrade to small double bed",
            imageUrl: "small_double_bed.png",
            description:"Make the upgrade on the studio bundle by choosing a small double bed (140x200)",
            size:"120cm x 200cm",
            cost: 150,
            type:'bundle',
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/small_double_bed.png?raw=true'
        },
        {
            id: 103,
            name: "Upgrade to Standard double bed",
            imageUrl: "double_bed.png",
            description:"Make the upgrade on the studio bundle by choosing a standard double bed (160x200)",
            size:"140cm x 200cm",
            cost: 150,
            type:'bundle',
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/double_bed.png?raw=true'
        },
        {
            id: 104,
            name: "Upgrade to Two chairs",
            imageUrl: "chair.jpg",
            description:"Make the upgrade on the studio bundle by choosing two chairs",
            cost: 50,
            type:'bundle',
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/double_bed.jpg?raw=true'
        },
        {
            id: 105,
            name: "Upgrade to 4 chairs",
            imageUrl: "chair.jpg",
            description:"Make the upgrade on the studio bundle by choosing four chairs",
            cost: 100,
            type:'bundle',
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/chair.jpg?raw=true',
        },
        {
            id: 106,
            name: "Upgrade to larger dining table",
            imageUrl: "large_table.jpg",
            description:"Make the upgrade on the studio bundle to a large dining table",
            cost: 100,
            type:'bundle',
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/chair.jpg?raw=true',
        },
        {
            id: 107,
            name: "Add on: Storage / Shelves",
            imageUrl: "storage_medium.png",
            description:"Add additional storage to your studio bundle",
            cost: 100,
            type:'bundle',
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/storage_medium.png?raw=true',
        },
        {
            id: 108,
            name: "Add on: Rug",
            imageUrl: "large_table.jpg",
            description:"Add an additional rug to your studio bundle",
            cost: 100,
            type:'bundle',
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/chair.jpg?raw=true',
        },
        {
            id: 109,
            name: "Add on: 2 Seater Sofa",
            imageUrl: "large_table.jpg",
            description:"Add an additional Sofa (two seater) to your studio bundle",
            cost: 150,
            type:'bundle',
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/chair.jpg?raw=true',
        },
        {
            id: 110,
            name: "Add on: 3 Seater Sofa",
            imageUrl: "large_table.jpg",
            description:"Add an additional Sofa (Three seater) to your studio bundle",
            cost: 200,
            type:'bundle',
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/chair.jpg?raw=true',
        },
    ])
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Single Bed",
            description: "80/90cm x 200cm",
            imageUrl: "single_bed.png",
            cost: 199,
            type:'singleItem',
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/single_bed.png?raw=true',
        },
        {
            id: 12,
            name: "Large Single Bed",
            description: "105cm x 200cm",
            imageUrl: "large_single_bed.png",
            cost: 199,
            type:'singleItem',
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/large_single_bed.png?raw=true',
        },
        {
            id: 2,
            name: "Small Double Bed",
            description: "120cm x 200cm",
            imageUrl: "small_double_bed.png",
            cost: 299,
            type:'singleItem',
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/small_double_bed.png?raw=true'
        },
        {
            id: 3,
            name: "Double Bed",
            description: "140cm x 200cm",
            imageUrl: "double_bed.png",
            type:'singleItem',
            cost: 399,
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/double_bed.png?raw=true'
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
            imageUrl: "bedside_storage.png",
            type:'singleItem',
            cost: 50,
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/bedside_storage.png?raw=true'
        },
        {
            id: 9,
            name: "Shelf/Storage (Medium)",
            imageUrl: "storage_medium.png",
            type:'singleItem',
            cost: 100,
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/storage_medium.png?raw=true'
        },
        {
            id: 10,
            name: "Shelf/Storage (Large)",
            imageUrl: "storage_large.png",
            type:'singleItem',
            cost: 150,
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/storage_large.png?raw=true'
        },
        {
            id: 11,
            name: "Lights",
            imageUrl: "lights.png",
            type:'singleItem',
            cost: 50,
            quantity:1,
            githubIMGURL:'https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/furnitures/lights.png?raw=true'
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
        if(state.name !== "" && validator.isEmail(state.email) && state.address !== "" && state.userConsent !== false && state.phonenumber !== 0 && state.total > 0) {
            setLoading(true);
            setActiveProducts("notSelected");
            setResponse("");
            let fetchURL = 'https://cohabit-backend-mehmet.onrender.com/sendEmails';
            // let fetchURL = 'sendEmails';
            
            axios.post(fetchURL, state)
                .then((res)=>{
                    // console.log(res);
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
                    setCurrentSection("products");
                    setLoading(false);
                });
        }else{
            setGatheredInfoAccepted(false);
            setTimeout(() => {
                setGatheredInfoAccepted(true);
            }, 3000);
        }
    }

    const checkInputs = (field) => {
        // case 'customerInfo':
        //     if (state.name !== "" && state.emailWithoutDomain !== "" && state.address !== "" && state.phonenumber !== 0 && state.period !== "") {
        //         setCurrentSection("products");
        //         setActiveTitle("Products");
        //     }else{
        //         setResponse("Please fill all the required fields!");
        //         setTimeout(() => {
        //             setResponse("");
        //         }, 3000);
        //     }
        //     break;

        switch(field){
            case 'products':
                if (state.total > 0) {
                    setCurrentSection("customerInfo");
                    setActiveTitle("Customer Information");
                }else{
                    setResponse("Please pick the furniture you want!");
                    setTimeout(() => {
                        setResponse("");
                    }, 3000);
                }
                break;
            case 'customerInfo':
                if (state.name !== "" && state.email !== "" && state.address !== "" && state.phonenumber !== 0 && state.period !== "" && state.deliveryDate !== "" && state.timePreference !== "") {
                    if(validator.isEmail(state.email)){
                        setIsValidEmail(true);
                        setCurrentSection("summary");
                        setActiveTitle("Order Summary");
                    }else{
                        setIsValidEmail(false);
                    }
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

            if(product.type === "bundle"){
                setActiveProducts("notSelected");
                newOrderlist.unshift(product);
            }
            else{
                newOrderlist.push(product);
            }
            
            let currentPrice = parseFloat(state.total);
            currentPrice += (product.cost * product.quantity);

            setState(prevState => ({
                ...prevState,
                orderList: newOrderlist,
                total: currentPrice,
                totalCost:currentPrice+state.deliveryCharge,
            }));          
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

            if(addOn.id === 101 || addOn.id === 102 || addOn.id === 103){
                let updatedStats = uncheckedOtherAddOns([101,102,103]);
                newAddOnList = updatedStats.addonlist;
                currentPrice -= updatedStats.priceToReduce;
            }
            else if(addOn.id === 104 || addOn.id === 105){
                let updatedStats = uncheckedOtherAddOns([104,105]);
                newAddOnList = updatedStats.addonlist;
                currentPrice -= updatedStats.priceToReduce;

            }else if(addOn.id === 109 || addOn.id === 110){
                let updatedStats = uncheckedOtherAddOns([109,110]);
                newAddOnList = updatedStats.addonlist;
                currentPrice -= updatedStats.priceToReduce;
            }

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

    const uncheckedOtherAddOns = (ids) => {
        let addonlist = state.addOnsList.filter(item => !ids.includes(item.id));
        let itemsToReduce = state.addOnsList.filter(item => ids.includes(item.id));
        let priceToReduce = 0;

        if(itemsToReduce.length > 0 && itemsToReduce[0] !== undefined){
            priceToReduce = itemsToReduce[0].cost;
        }

        return {addonlist,priceToReduce};
    }

    const getCurrentDate = () => {
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Add leading zero if month < 10
        var day = ('0' + currentDate.getDate()).slice(-2); // Add leading zero if day < 10
        return year + '-' + month + '-' + day;
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
                                currentSection === "products" ?
                                <>
                                    <p className='raleway-normal' style={{marginTop: '0', fontSize: '16px'}}>The images you see are indicative of the type of furniture offered.</p>
                                    <div className="inputsBox productsBox">
                                        {activeProducts === "notSelected" ? 
                                        <div className="activeProductsBtns">
                                            <div className="productSelectionDiv carouselBox">
                                                <Carousel images={images} />
                                            </div>
                                            {state.orderList.length !== 0 ?
                                            <>
                                                {state.orderList.filter(order => order.type === "bundle").length !== 0 ? 
                                                    <div className="productSelectionDiv">
                                                        <h3>Bundles</h3>
                                                        <div className='orderlistBox'>
                                                            <div className={state.orderList.some(item => item.type === "bundle") ? 'activeProductsBtn removeOnMobileV' : 'activeProductsBtn'} onClick={()=> setActiveProducts("bundles")}>+</div>
                                                            {state.orderList.filter(order => order.type === "bundle").map(order => {
                                                                return (
                                                                    <div key={order.id} className="orderlistItem">
                                                                        <img className='orderImg bundleImg' src={require(`./assets/email/${order.imageUrl}`)} alt={order.name} />
                                                                        <div className="orderlistItemTextBox">
                                                                            <h4>{order.name}</h4>
                                                                            <p className='orderlistItemText'>{order.description}</p>
                                                                        </div>
                                                                        <button className='removeOrder' onClick={()=> removeFromOrderlist(order)}>X</button>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                :
                                                    <div className="productSelectionDiv">
                                                        <h3>Single Items</h3>
                                                        <div className='orderlistBox'>
                                                            <div className='activeProductsBtn' onClick={()=> { window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveProducts("others")}}>+</div>
                                                            {state.orderList.filter(order => order.type === "singleItem").map(order => {
                                                                return (
                                                                    <div key={order.id} className="orderlistItem orderlistSingleItem">
                                                                        <img className='orderImg' src={require(`./assets/furnitures/${order.imageUrl}`)} alt={order.name} />
                                                                        <div className="orderlistItemTextBox">
                                                                            <h4>{order.name}</h4>
                                                                            <p className='orderlistItemText'>{order.description}</p>
                                                                        </div>
                                                                        <button className='removeOrder' onClick={()=> removeFromOrderlist(order)}>X</button>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                            :
                                            <>
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
                                                                <div key={order.id} className="orderlistItem orderlistSingleItem">
                                                                    <img className='orderImg' src={require(`./assets/furnitures/${order.imageUrl}`)} alt={order.name} />
                                                                    <button className='removeOrder' onClick={()=> removeFromOrderlist(order)}>X</button>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </>
                                            }
                                          
                                            {state.orderList.length > 0 && 
                                                <div className="productSelectionDiv orderListReviewBox">
                                                    <div className='orderlistTitle'>
                                                        <h3>Orderlist</h3>
                                                        <h3>{state.total}.00 SEK / Month</h3>
                                                    </div>
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
                                                                                    <div className="costPart costPartMobile">
                                                                                        <input type="checkbox" id="checkbox" name="checkbox" checked={state.addOnsList.includes(addOn)} onChange={() => handleAddOn(addOn)}/>
                                                                                        <p>{addOn.name}{addOn.size && ` - ${addOn.size}`}</p>
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
                                    </div>

                                    <div className="navigateBtns">
                                        <button className="btn backBtn" style={{opacity:0, pointerEvents:"none"}} disabled onClick={()=> {setCurrentSection("customerInfo"); setActiveTitle("Customer Information")}}>Back</button>
                                        <button className="btn nextBtn" onClick={()=> checkInputs("products")}>Next</button>
                                    </div>
                                </>
                                :

                                currentSection === "customerInfo" ?
                                <>
                                 <div className="inputsBox">
                                        <div className="input-wrapper">
                                            <label htmlFor="name">Full Name <span style={{color:'red'}}>*</span></label>
                                            <input id="name" type="text" name='name' onChange={handleChange} value={state.name}/>
                                        </div>
                                        <div className="input-wrapper">
                                            <label htmlFor="phonenumber">Phone Number <span style={{color:'red'}}>*</span></label>
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
                                        <div className="input-wrapper">
                                            <label htmlFor="email">Email <span style={{color:'red'}}>*</span></label>
                                            
                                            <div className='emailInputBox'>
                                                <input id="email" type="text" name='email' placeholder=''
                                                    onChange={handleChange}
                                                    value={state.email}/>
                                            </div>
                                        </div>
                                        {!isValidEmail && 
                                            <p className='notValidEmail' style={{color: 'red', width: '50%', marginTop: '-10px', fontSize: '14px', textAlign: 'right'}}>
                                                Please enter a valid email address
                                            </p>
                                        }
                                        <div className="input-wrapper">
                                            <label htmlFor="address">Address <span style={{color:'red'}}>*</span></label>
                                            <input id="address" type="text" name='address' onChange={handleChange} value={state.address}/>
                                        </div>
                                        <div className="input-wrapper">
                                            <label style={{lineHeight:'1.5', width:'70%'}} htmlFor="period">How long do you want to rent the furniture? <span style={{color:'red'}}>*</span></label>
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
                                    <div className="inputsBox">
                                        <div className="input-wrapper">
                                            <label htmlFor="deliveryDate">Preferred Delivery Date <span style={{color:'red'}}>*</span></label>
                                            <input id="deliveryDate" className='emailEndPoint dateAndTimePick' type="date" name='deliveryDate' min={getCurrentDate()} style={{width:"auto", minWidth: "auto", paddingRight:'0', fontWeight:'bold', borderBottom:'1px solid'}} onChange={handleChange} value={state.deliveryDate}/>
                                        </div>
                                        <div className="input-wrapper" style={{marginBottom:'3px'}}>
                                            <label htmlFor="timePreference">Preferred Delivery Hour <span style={{color:'red'}}>*</span></label>
                                            <select id="timePreference" className='emailEndPoint deliveryHourPick' name="timePreference" onChange={handleChange} value={state.timePreference} style={{ width: "auto"}}>
                                                <option value="">--:--</option>
                                                <option value="09:00-12:00">09:00-12:00</option>
                                                <option value="13:00-15:00">13:00-15:00</option>
                                                <option value="15:00-17:00">15:00-17:00</option>
                                                <option value="Later than 17:00">After 17:00</option>
                                            </select>
                                        </div>
                                                    
                                        <div className='notice'>
                                           <p className='deliveryInfoP' style={{marginBottom:'0px'}}>The standard delivery fee is 400 SEK.</p>
                                           <p className='deliveryInfoP' style={{marginTop:'5px'}}>Deliveries on weekends, special holidays, and after 17.00 will incur a special delivery fee of 600 SEK.</p>
                                        </div>
                                        <div className="input-wrapper">
                                            <label htmlFor="anythingElse">Is there anything else you want us to know about your order?</label>
                                            <textarea id="anythingElse" type="text" name='anythingElse' onChange={handleChange} value={state.anythingElse}/>
                                        </div>
                                    </div>
                                    <div className="navigateBtns">
                                        <button className="btn backBtn" onClick={()=> {setCurrentSection("products"); setActiveTitle("Products")}}>Back</button>
                                        <button className="btn nextBtn" onClick={()=> checkInputs("customerInfo")}>Next</button>
                                    </div>
                                </>
                                :
                                
                                currentSection === "summary" ?
                                <>
                                    <div className="summaryBoxes">      
                                        <h3 className='subTitle'>Order Details <span onClick={() => {setActiveProducts("notSelected"); setCurrentSection("products"); setActiveTitle("Products")}}>&#x270E;</span></h3>
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

                                            <div className="summary-wrapper">
                                                <p>Order Total</p>
                                                <p>{state.total}.00 SEK / Month</p>
                                            </div>
                                            <div className="summary-wrapper" style={{borderBottom: '1px solid black', paddingBottom: '15px'}}>
                                                <p>Delivery Fee</p>
                                                <p>{state.deliveryCharge}.00 SEK</p>
                                            </div>
                                            <div className="summary-wrapper" style={{fontWeight:'bold', fontSize:'18px'}}>
                                                <p>Total</p>
                                                <p>{state.totalCost}.00 SEK</p>
                                            </div>
                                        </div>

                                        <h3 className='subTitle'>Customer Information <span onClick={() => {setActiveProducts("notSelected"); setCurrentSection("customerInfo"); setActiveTitle("Customer Information")}}>&#x270E;</span></h3>
                                        <div className="summaryBox">
                                            <div className="summary-wrapper">
                                                <p>Full Name</p>
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
                                        
                                        <div className="summary-wrapper" style={{ justifyContent:"center", flexDirection:'row', gap:'10px', alignItems:'center', fontWeight:'bold', marginTop:'20px',marginBottom:'25px'}}>
                                            <input type="checkbox" id="userConsent" name="userConsent" onChange={handleCheckBoxChange} checked={state.userConsent}/>
                                            <label htmlFor="userConsent" className='userContentLabel'>I agree that the gathered information can be used for further communication with Cohabit *</label>
                                        </div>
                                        {!gatheredInfoAccepted && 
                                            <p className='gatheredInfoNotAccepted'>
                                                Please confirm that given information are correct!
                                            </p>
                                        }
                                    </div>
                                    <div className="navigateBtns">
                                        <button className="btn backBtn" onClick={()=> {setCurrentSection("customerInfo"); setActiveTitle("Customer Information")}}>Back</button>
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
                                    If you have further questions, contact us at <a className='link' href="mailto:hello@cohabit.se">hello@cohabit.se</a>, WhatsApp <a className='link' href="tel:+46709526846">+46 709 52 68 46</a> or book a call with us <a className='link' rel={"noreferrer"} target='_blank' href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2cEEdCFOzTPUR_eIxwtrtMJ-CiFl_XHn6mexmLRyY6gwwqd1IoKt6xiAO1ljzynh763vT1fCq4">here</a>.</p>
                                
                                <div className='portraitBox'>
                                    <img className='portrait' loading='lazy' src={require("./assets/portrait.jpg")} alt='cohabitTeamPortrait'/>
                                </div>
                                <div className='thanksBox'>
                                    <div className="thanksText">
                                        <p>Kind regards,</p>
                                        <p>Cohabit Team!</p>
                                    </div>
                                    <button className='btn newOrderBtn' onClick={()=> {setOrderMade(""); setActiveTitle("Products"); setState(initialState)}}>New Order</button>
                                </div>
                                <p className='attention'>If you did not receive an email, kindly check your spam folder or reach out to us through <a className='link' href="mailto:hello@cohabit.se">hello@cohabit.se</a></p>
                            </div>
                        </div>
                    }
            </div>   
        </div>
        <p className='copyRight raleway-normal'>© 2024 Cohabit . All Rights Reserved - Developed by <a className='developer' href="https://mehmetkaantaspunar.se" rel='noreferrer' target='_blank'>Mehmet Kaan Taspunar</a></p>
        <div className="backgroundCircle blueBackgroundBottom" />
    </div>
  );
}

export default App;