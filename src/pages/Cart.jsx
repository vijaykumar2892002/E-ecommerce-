import { Add, Remove } from '@material-ui/icons'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive'
import { userRequest } from "../requestMethods";
import { useNavigate } from 'react-router-dom';
import { removeProduct } from '../redux/cartRedux'; // Import the action creator
const KEY = "pk_test_51OtYyoSHPUeXQNN9NhoCrE7mW8SQDzuVr5MnhxGA2Ixn2Ij2e2Ouh8ms1ESjmZUc0IGrOdkUC1sZbEiEqLf5DrPy006tSALV9g";
const Container = styled.div`

`
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`
const Title = styled.div`
    font-weight: 300;
    text-align: center;
    font-size: 20px;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === 'filled' && 'none'};
    background-color: ${props => props.type === 'filled' ? 'black' : 'transparent'};
    color: ${props => props.type === 'filled' && 'white'};
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`
const Info = styled.div`
    flex:3;
`
const Summary = styled.div`
    flex: 1;
    border: 0cap.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`
const TopTexts = styled.div`
     ${mobile({ display: "none" })}
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`
const ProductDetail = styled.div`
    flex:2;
    display: flex;
`
const Image = styled.img`
    width: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span`
    
`
const ProductId = styled.span`
    
`
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`
const ProductSize = styled.span`
    
`
const PriceDetail = styled.span`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`

const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === 'total' && '500'};
    font-size: ${props => props.type === 'total' && '24px'};
`
const SummaryItemText = styled.span`
    
`
const SummaryItemPrice = styled.span`
    
`
const SummaryButton = styled.button`
    
`
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
`

const StyledLink = styled(Link)`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;


const Cart = () => {
    const [cart, setCart] = useState(useSelector(state => state.cart));
    const currentUser = useSelector(state => state.user.currentUser);
    const [stripetoken, setStripetoken] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!currentUser) {
            navigate('/login'); // Redirect to login if user is not logged in
        }
    }, [currentUser, navigate]);

    const onToken = (token) => {
        setStripetoken(token);
    }
    console.log(stripetoken);
    useEffect(() => {
        // Calculate subtotal and total price whenever cart changes
        let totalPrice = 0;
        let subtotal = 0;
        cart.products.forEach(product => {
            subtotal += product.price * product.quantity;
            totalPrice += product.price * product.quantity;
        });
        setSubtotal(subtotal);
        setTotalPrice(totalPrice);
    }, [cart]);

    const handleAddQuantity = (productId) => {
        const updatedCart = cart.products.map(product => {
            if (product._id === productId) {
                return { ...product, quantity: product.quantity + 1 };
            }
            return product;
        });
        setCart({ ...cart, products: updatedCart });
    };

    const handleRemoveQuantity = (productId) => {
        const updatedCart = cart.products.map(product => {
            if (product._id === productId) {
                // Decrease the quantity by 1
                const newQuantity = Math.max(product.quantity - 1, 0); // Ensure new quantity is not less than zero
                if (newQuantity === 0) {
                    // If the new quantity becomes zero, dispatch the removeProduct action
                    console.log("Dispatching removeProduct action");
                    dispatch(removeProduct(productId));
                }
                // Return the updated product object with the new quantity
                return { ...product, quantity: newQuantity };
            }
            return product;
        });
    
        // Update the cart state with the updated products
        setCart({ ...cart, products: updatedCart });
    };

    useEffect(() => {
        // This effect will be triggered whenever the cart state changes
        // Check if any product quantity has become 0 and dispatch removeProduct action
        cart.products.forEach(product => {
            if (product.quantity === 0) {
                dispatch(removeProduct(product._id));
            }
        });
    }, [cart, dispatch]);
    

    useEffect(() => {
        const makeRequest = async () => {
            try {
                console.log("data upper")
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripetoken.id,
                    amount: 500,
                });
                console.log("data")
                navigate("/success", {
                    stripeData: res.data,
                    products: cart,
                });
            } catch (error) {
                console.error("Error occurred during payment:", error);
            }
        };
        stripetoken && makeRequest();
    }, [stripetoken, cart.total, navigate]);
    

    return (
        <Container>
           
            <Announcement />
            <Wrapper>
                <Title style={{textShadow:"1px 1px 1px #000000",fontWeight:"bold",fontSize:"35px"}}>YOUR CART</Title>
                <Top>
                    <Link to="/">
                        <TopButton>CONTINUE SHOPPING</TopButton>
                    </Link>
                    
                    {/* <TopTexts>
                        <TopText>Shopping Bag(2)</TopText>
                        <TopText>Your Wishlist</TopText>
                    </TopTexts> */}
                    {/* <Link to="/" style={{ textDecoration: "none" }}>
                        <TopButton type='filled'>CHECKOUT NOW</TopButton>
                    </Link> */}
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map(product => (
                            <Product>
                                <ProductDetail>
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName><b>Product:</b> {product.title}</ProductName>
                                        <ProductId><b>ID:</b> {product._id}</ProductId>
                                        <ProductColor color={product.color} />
                                        <ProductSize><b>Size:</b>{product.size}</ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <Add onClick={() => handleAddQuantity(product._id)} />
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <Remove onClick={() => handleRemoveQuantity(product._id)} />
                                    </ProductAmountContainer>
                                    <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                                </PriceDetail>
                            </Product>
                        ))}
                        <Hr />

                    </Info>
                    <Summary>
                        <SummaryTitle>
                            ORDER SUMMARY
                        </SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {subtotal}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 3.57</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.80</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type='total'>
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name="Elegance Edge"
                            image="https://raw.githubusercontent.com/Nahush18/iCoder/main/latestlogo.png"
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart
