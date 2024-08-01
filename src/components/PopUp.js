    // PopUp.js
    import React from 'react';
    import styled, { keyframes } from 'styled-components';
    import { CSSTransition } from 'react-transition-group';
    import { mobile } from "../responsive";

    const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    `;

    const Content = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    animation: fadeIn 0.8s ease-in-out;
    position: relative;

    @keyframes fadeIn {
        from {
        opacity: 0;
        transform: translateY(-20px);
        }
        to {
        opacity: 1;
        transform: translateY(0);
        }
    }
    `;

    const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
    `;

    const SaleText = styled.h2`
    margin-bottom: 20px;
    color: #ff4500; /* Orange color for sale announcement */
    `;

    const CrackerEffect = keyframes`
    0% {
        transform: translateY(-100vh) rotate(45deg) scale(0);
        opacity: 0;
    }
    20% {
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(45deg) scale(3);
        opacity: 0;
    }
    `;

    const Button = styled.button`
    border: none;
    height: 40px;
    padding: 10px 20px;
    margin-right: 20px;
    background-color: teal;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
    font-size: 18px;
    &:hover {
        background-color: #0c312d;
    }

    ${mobile({ padding: "8px 16px" })}
    `;

    const Cracker = styled.div`
    position: absolute;
    background: ${(props) => props.color || '#f00'};
    width: 50px;
    height: 50px;
    border-radius: 50%;
    animation: ${CrackerEffect} 1s linear infinite;
    `;
    

    const CrackerContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    `;

    // const getRandomPosition = () => `${Math.random() * 100}vh`;
    const getRandomColor = () => `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

    const PopUp = ({ isOpen, onClose, children }) => {
        const handleClose = () => {
            onClose(); // Call the onClose function passed from parent to close the popup
          };
          const getRandomPositionInSection = (section) => {
            const sectionWidth = window.innerWidth / 3;
            const sectionHeight = window.innerHeight / 3;
            const offsetX = section % 3 * sectionWidth;
            const offsetY = Math.floor(section / 3) * sectionHeight;
            const x = offsetX + Math.random() * sectionWidth;
            const y = offsetY + Math.random() * sectionHeight;
            return { x, y };
          };
    return (
        <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="popup"
      unmountOnExit
    >
      <Overlay>
        <Content>
          <CloseButton onClick={handleClose}>X</CloseButton>
          <SaleText>Special Offer!</SaleText>
          <p>Get up to 50% off on selected items. Hurry, limited time offer!</p>
          {children}
          <Button onClick={handleClose}>Continue shopping</Button> {/* Close popup on button click */}
        </Content>
        <CrackerContainer>
          {[...Array(3)].map((_, index) => {
            const { x, y } = getRandomPositionInSection(index);
            return (
              <Cracker
                key={index}
                style={{ left: `${x}px`, top: `${y}px` }}
                color={getRandomColor()}
              />
            );
          })}
        </CrackerContainer>
      </Overlay>
    </CSSTransition>
    );
    };

    export default PopUp;
