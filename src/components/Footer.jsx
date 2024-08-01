import React from 'react';
import styled from 'styled-components';
import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from '@material-ui/icons';
import { mobile } from '../responsive';
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    padding: 20px;
    ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Logo = styled.img`
    height: 50px;
    ${mobile({ height: "40px" })};
    marginLeft: 500px;
`;

const Desc = styled.p`
    margin: 20px 0px;
`;

const SocialContainer = styled.div`
    display: flex;
`;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none" })}
`;

const Right = styled.div`
    flex: 1;
    padding: 20px;
`;

const Title = styled.h3`
    margin-bottom: 30px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

const Footer = () => {
    return (
        <Container>
            <Left>
            <Link to="/">
                <Logo src="https://raw.githubusercontent.com/Nahush18/iCoder/main/latestlogo.png" alt="Logo" />
            </Link>
                <Desc>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem placeat aut doloremque sunt voluptate fuga, obcaecati quas amet voluptatum perferendis, harum facilis sapiente nihil laborum, quibusdam aspernatur doloribus sed. Veniam.</Desc>
                <SocialContainer>
                    <SocialIcon color='385999'>
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color='E4405F'>
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon color='55ACEE'>
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon color='E60023'>
                        <Pinterest />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem >
                    <Link to="/" style={{color:"black",textDecoration:"none"}}>
                        <span>Home</span>
                    </Link>
                    </ListItem>
                    <ListItem>
                    <Link to="/products/men" style={{color:"black",textDecoration:"none"}}>
                        <span>Men</span>
                    </Link>
                    </ListItem>
                    <ListItem>
                    <Link to="/cart" style={{color:"black",textDecoration:"none"}}> 
                        <span>Cart</span>
                    </Link>
                    </ListItem>
                    <ListItem>
                    <Link to="/products/women" style={{color:"black",textDecoration:"none"}}>
                        <span>Women</span>
                    </Link>
                    </ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{ marginRight: "10px" }} />SCTR's Pune Institute of Computer Technology
                </ContactItem>
                <ContactItem>
                    <Phone style={{ marginRight: "10px" }} />+91 8686869109
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{ marginRight: "10px" }} />myemail@gmail.com
                </ContactItem>
            </Right>
        </Container>
    );
};

export default Footer;
