import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mobile } from '../responsive';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgSFBUVGRIYDxwSGRgYGhgYGBwVGRgZGh4cHBgcIS4lHB4rHx0ZJjgmKy8xNTU1Gic7QDs0Py40NTEBDAwMEA8QGBISHjElISQ0NDYxMTQxNDQ0MTE0NDQ0NDQ0NDQ0MTQ0MTQ0NDE0MTQ0NDQ0MTQ0MT8/ND8xNDQ0NP/AABEIAKYBMAMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAADAgABBAUHBv/EAEYQAAIBAgMEBQkEBwYHAQAAAAECAAMRBBIhMUFRYQUTIlJxMkJTgZGSodHSBmKTwRQjM3KCsfAWQ1RjsuFVc6KzwuLxFf/EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMFBP/EACERAQEBAAIDAQACAwAAAAAAAAABEQIhEjFRQQOhEyJx/9oADAMBAAIRAxEAPwD6O0FozQWn0vmE0JorQmhmieE0V4TQyNoLRmgtBRtBeM0F4c6JobRGhtCIaEYrQjLAbQmitCaSudQ0MxGhmEGZJlGSYRMgy5BhEmamzNQiTJlGTAkyTKMkyokyZRkwiZMqTKiTJlGTA0fzmhNn85oQgzNTZmoR94aC0ZoLTL1hNCaK0JoZonhNFeE0MjaC0ZoLQUbQXjNBeHOiaG0RobQiGhGK0IyohoTCI0s0lAGdmBIvZVDabr3Ybf5WkYzXIYZnYyU++/uL9cIpS79T3F+uNMchkmdOIpZQGUko17EixuNoIubH5zmaEsTIMuQYZSZqbMSjSDZmYkIouSACbk2AAJFyfHceEGAMmdRSl36n4afXJKUu/V/DT640xymTOv8AR0YNkdywXNlZFW6jbYqx1G23C847xqWNGTKMmVlMmVN06Zdgii7MwUDiSbQDMidrJRBI6yodbXWmmU8xd9kjJR79X8NPrjTHIZoTsyUL61KoF9SaaEAcSA97DlOatSZGKMLMpsd49R3jnzl1LAGamzNQy+8NBaM0Fpl6wmhNFaE0M0TwmivCaGRtBaM0FoKNoLxmgvDnRNDaI0NoRDQjFaE0I3RQEkt5CjM3MbhyJNhAquWJZtpNz48uXDlOnEdkCmNo7T834eoG3jecbQzbiDDMVoRhkuGOa9M7G1BOxXGw+B8k+N905WBBsdCDYjnKMeuhdRUAJbyXABPaGxtNzDbzBhfccZkGMaTd1vdb5SDSbuv7rfKOmMowP5xsWQoFMeabvzc6HX7ui+3jLoKUBqMCGBy07i3bt5Vj3Rr4kQsGgaoit5JqKDfgWG2Fw+G6PU26xygyhyALkKbWJ4Friy7TcbpWK6MUfsnL6suVlysWQnMotcZrWNt42b52HEEpf9Je5xOvZfbYdnboNTy05TeIr5FqO9esVauURUujh0OYkM5It2gL23iTXTx44/P06hVg67Qbj/cb/lLxlMAh10puMyjblN+0hP3Tp4WnR0kikiql+rqFiAQAystsymxttINxpYiDhTmBpHzjmQnYHts8GHZ5Gxlcs7xymRFai/cf3W+Uk0X7j+63ylYwU6afYQv57gonJNjt/NQf3uEnD4VmaxDKtizMVICoouSTbTT42G+Riq2d8wFltlUcEXQCCdTXOZMoyZUaP5zqc50zDy6YCtzp3srfwk5T+8s5TLw1YowYC42Fe8pFiD4iRZfxzmanTjKORrA3RgHRu8jbD47QRxBnNLGbMr7w0FozQWmXqiaE0VoTQzRPCaK8JoZG0FozQWgo2gvGaC8OdE0NojQ2hENCaK0IwhMT2gKm/wAl/wB7cf4gPaDxnE06qNQAkN5BGVvDj6jrArIVJU7Qbf7jlbX1iTWeX0LQzEaQ0rIzOvEuaaikpIfy6hBscxGiXG5QfeJ4TWDULeqw0Q9gbmqHyR4Dyj4Ab4VKnnLM7hVHaZjqxJOxV85jr/OSrOg/pL99/ff5yTin77++3znpUkLC9HDqUGmerZr+tiqDwAPjJrK6jNUw9M09helZbfx02K+pgRGp41y4dzUBpMxZicyFiSc4Hk3O5hp42nB8D7LH/wCidOIVAQabkqe0Lizqb7DbaeYlY3tgVh5xyvyqAXPhmHa9spe3bhsdTbRxTQsQzkoSC41z3W5uTe4I84m8vH4rDFSh7Y61qgakGQhnsG8sbMoXdqReeETJMmHn1j26AoYhFw63pVFYtTZ2ujs9rq5t2WJAsdmgE4KVJqReo4s6OaaqbH9cNCTxCanmcs5aVIuwRdWY2HzPLjynoYdUqV0o6mkMyL2smZsjHOWAPlPbYDoRHo3c67eacU/pH99/nNHFP6Sp77/Oe3hMBhndU7Gt/IxWospPkvT5QafRlNyAiMSSAMmKw7ankVBk8i/x364MHiKwYP8ArHTzlJdlZCLMpGoIIJ8PETnx+HCPZTdGUPTPFG2HxGoPNTOzpPHOKj06buKSHqkAYjsIMgJsbEmxJO+8LDDrENHz0zVKfMWu6DxAzW4g8Ze/bNz088yJRMmbc2jEw1DO2W9hqzN3UUXLeof1rDJnXU/VoE89wHflTGqLyue0fBZKsc+LrZ3JAsoARF7qLoB+ZO8knfOaXIlZr7w0FozQWmXqiaE0VoTQzRPCaK8JoZG0FozQWgo2gvGaC8OdE0NojQ2hENCMVoRhBtOiqyKEV0LOEsbMVsNoU2B2CaogC9QjsrbQ73Pkj4XPhMbo6s1nyOc3aBNhe+t9TJSToLVafoz+I30w2q0/RH8Q/TGPRlb0Z9qfVIPRdb0be1PqlZy/P6axrBkRkGWmLqVvch73NzvuLW8J5x23sD/WzwnoLTam5pVlKB1AYNa67cr6cD8CROKtTKsVYWYGx8R/QiJy+uumevYZw9RycqU0AUAW42IUcgPEyMSvUv2Fq0awNmRiGBQ/esLjkQRE6D6TOHqisFDaFSuy4PA7jM+0HSxxNXrMuUBAoG024k8ZnLq7x8d3t5LH+c7sAoCVKjgmnlCZQbF6hN1AO7L2mJ3DxnJSps7KiC7MwUDiTsnT0i6llo0+0idhbbGdiM7+sgAclEt+M8fW0Jq0vRP+KfomjVpeib8U/RP0H2b+zgqsRUFiBmNwGsMxUALexJIa5Oy2zXQvtJ9nTSfLTW91DAL2bgkr5N9CDbZob6bDHlNxu8OXj5Y8nDuhDrTQrUNM5SXL3HnKBlFmK3+I3zm6Nz9YjUxd0brNTYAKb3LaWFt994go5UhlJDA5gd9wbg+0TterkbrVRTTqIUdDfKDcF0uNQAwVl9XAysS7m/j006XCVR13WoQDcEU66WZCAQxAcLZgbhmvCwyooNfLhnSmhYOgdGD2soyHfc8J4mLxBds1goCBFUXsqKLAC+p2TtodJKqKpD5kpvTCgjq2z3uXXedfXYcJPFZz23fTyDEwwfOmQkVM65CNz3Fj6tsOdVPsIXPluCicQmx29eqjwaarlPZMXXw5ditFyCxN1qZVJ3lVyHKt72F9kDrqHoH/ABv/AEm+ilQ1kDrnp57sp0zKNbaeE/QDp7o7/hq+0TN2OnGTlNtkfnlr4cEE4dyAQbdcdbbvIg9IqQ7EnMH/AFitsujajTdYaW3Wnt9LY/CVqL9Rg1oujI2YEG4LWK6Tx6PbQ0/PS7pzXa6ePnDwbjLGeXH83XnzUoyZpxfeGgtGaC0y9YTQmitCaGaJ4TRXhNDI2gtGaC0FG0F4zQXhzomhtEaG0IhoRH5fGK0JoReLNrUxsX4udp+FvACNicQLrTcZqZoU9NMynIvaQ7jyOhhVO2mfzksrc181vVqp/hnY+FUhKhKOepRQmdV1VADnJIIF/NGp5SVZL28uvgWBXKM6u2VGVfKbu23PyOyUwWgcoCmvexa2icl4v97du4zqcVzm7agMuQqtRFULuAUNYD+t8xaDOAtUpporh0LqNwPaGdRw2jdIf8ef0kb9Xfb+ioePemxh3rIHRSaiWptqBmW3Za584AEHkAZfSdKzpTBV2WiiXQ5gWBOw+z2znx5AtRFiqXLHvVD5R5geSOQPGX4xfd1h6Lrdw+8n1ST0VW7h95PqnGUHAewSCg4D2CVnp6a0Ww6NUcZaj3ppsJVbdt9DtsQo8TB6IsKi6sDnW2VkUWzC9y4Nx4ayMEQQaJsA5uh2AVR5PqPknxHCBSOR1JBGWoCRbXssNLcYXfT2KHTb4eq5Ut5Rsew2h1swHZZdhFiCDv2iS/S74nE0s5OuJpgk2vo4sAo0VRckDU3JJJ0A5Hw1Iqz9ZtLNmtsObRDT8okgk35Q8B1aVadQ1bhKyVCBTe9lcE252mci3nyvW9LqdGplYIzGoqhsjMrHKdmgUEG2u8bt4nJge3+pOxz2fu1B5J8COyeTX3T0+uUBWNd+rDq3lEhhmLFOrHaW2mp0+E4KZ6tDV/vHzU6fJdjv42JQcLngJZWeUm7Ano2r3V/Ep/XNHo2r3V/Ep/VOQgcBJKia7Y2O2n0W5YZgAmpYh0JCAEsQFYkmwOzfOXFVs75rWFgqjggFlHs+JMmk5Rg66MrBgef9fzi46mtxUQWpuM4+617OniD8CIifnTfRf7VPE/6WnCJ3dF/tU8T/AKTOEQn46sN+yreCf9wTkpuysGU2YMCDzE68N+yrfup/rEDC0M7Zb2WxZm7qKLsfZ+XGD43jkF1dRZKi5wO6bkMvgGBseFpyToxdbO5YCygBUXuoNFX2fEmc8sTl7feGgtGaC0y9QTQmitCaGaJ4TRXhNDI2gtGaC0FG0F4zQXhzomhtEaG0IhoRitCMqMpVMrXtcWykcVO0Q8TTym17gjMp4qdQf633ExpQxJAAyowF7ZlBtc30vIm/XI4kETsbFHuU/cWQ2KPcp+4sI1huwhqnyrlKf71u0/goNvEjhDwVNe2zqGyUi4UlgL5lXWxB3nfFxlQuqPYAAdWVUWAa5bQcxr4gzOjkL9aiAs5oGygXJs6HQDlf2SfhNtwJxSf4el7av1yf0tP8PR9tX65Z6KxHoK34b/KT/wDk4j0Fb8N/lGz6n+3wWPpqMjKoUPQWoVBYgEs66ZiSB2RvmYrtqKvnXCP+/bstp3gD61MTpRGQ0kZSrrhUupFmBLudQeRHtmsI2RHqMAwcdUqNqrG4LMRwXs+thzjej9seeZBnacaPQ0PcP1TRxo9DQ9w/VKxk+gwuHzuFvlG1m7qDVm9Q+Np24Oj+lYhaSghCrIiAgEIiOyrc6XNtSd5JmYbEZw9EJTRnUKrIpUllIYIbk3VrW8bQug6zJWDqbOlKsyngwo1LHWZrczr4/QD7FVfQ1PxaPymj9iavoan4tL5TzP7Z430//Snymv7ZY70591PlJnJ1vL+Ge5Xpj7E1POpVFXe3W0jYcbAaz8rgznBom3bN0PCqNB4Zh2fWOE9/o77V4x6tNHrEo1RUYZU1Umx2CfmaNEu+QEAEm5OxVF7seQAvLx39cud4dXirBYjq6iVGTNle5Q6XtoQeG+e9X+0GDbLlwCLlqBzlFPtKNqtdfJM8fE9IBnZuqpm52upLnQC7EMBmNrnnA/TB6Gh7jfVNZrE5Xj1Hq9M9O4epSalQwaUWLKS65b2U3toLzyqoyJk897O/JBqies9o+CzDix6Gh7jfVOatUZ2Z2N2Ykk8zw5cuUeLPLlvdCZMoyZpzfeGgtGaC0y9YTQmitCaGaJ4TRXhNDI2gtGaC0FG0F4zQXhzomhtEaG0IhoRitCMsBtCaK0JpK51DQzEaGYReHqAEq3kMMreG5vEGxHgeM7sD01VwuamiUgwNmYrdjs8697WNxPKMc2dRdlV1GW7XGZNSNQDqLkeFuElizlZ69vaP23xX+X7h+ck/bjFf5Xun5zxDhh6Sl7zfTIOFHpaXvN9Mnjxb/wAnP69DHdMVcYVpulIsTYOFyso3nNfRQLk+E4K5611p0x2R+rpg6aa9onYLm5PjFKinSYqyu7t1d1JIVAASNQNW0HgDObAVAlVGOwVFJPLMAfgZZGOVts2+1no1hq7oib2Lq1x91UJLHkPbKqNRqgImWmydlCxsHT77ea97m+yxsbWEXovowvieoyBirvdSQA2TNoeRYD1T1a/QeLanVNcU2VEZwVZLo62YqAo7Klb3XhbxkvJZw2dR+eqdGVFVnIUBQGJDoTbMBcAMSdSJ0pigrpi8ubNnp1FFh+sZGViLggZgc1iLXDCc2G0o1m4hKQPNnNQ/BPjJ6ON3NJv2dQFW5ZQWDjgVIv4ZhvhiXMeq/wBokNr020NxZMONRx/V7OXKeZiMThnYuyV7sbnK9NRu2KEsBB/RV9NT9lT6ZJwi+mp+yp9MuQvLlfeOjD4rDo61FSvmRg4u6WuNdbJsnK5yJb+8qDMeIp30H8R1t3QOMpMOgILVEZRqVUPmYd0XW2uz1zlr1S7F22k3PDkByAsJZGbcg4coyZphhkzZ/OaEIMzU2ZqEfeGgtGaC0y9YTQmitCaGaJ4TRXhNDI2gtGaC0FG0F4zQXhzomhtEaG0IhoRitCMsBtCaK0JpK51DQzEaGYQZkmUZJhEmQZcgwhcM41RjZHGUnut5reo/AmBVQqWVhYglSOeyYZ0VTnQP56AK/Ndiv8Mp9XGFev0V0ktGsmNYMylTSqhbXFTLlzWOnaADbdTmnqYn7WYfqsQiLVLVyzDMqgBnprTtodR2bz8dhsUyE5cpDDKytqjC97ML8dQdo3GKOkFXWnTRH7+ZnK80DGynntEzeMrpx/l5cZkZjxkRKHnKTUf/AJjADL4qoA8SYPkU/v1F9lO//kfgOcnC0w7EsTkUZ3O/Lf8AmTYeJhYiqXYsdp4bABoAOQFh6pY52/ojJlGTNOaTJlSZRJkyjJhGj+c0Js/nNCEGZqbM1CPvDQWjNBaZesJoTRWhNDNE8JorwmhkbQWjNBaCjaC8ZoLw50TQ2iNDaEQ0IxWhGWA2hNFaE0lc6hoZiNDMIMyTKMkwiZBlyDCJMqnVZDmUkG1tOEkzUqOg9I1e+fYvyknpGr3z7F+U5zJhdpa+LdxlZyVve2lrjZsnNKMkwlupMmUZMMpkypMqJMmUZMDR/OaE2fzmhCDM1NmahH3hoLTJky9YTQmmTIZonhNMmQyNoLTJkFG0F5uZDnQtDaZMhENCMyZLAbQmmTJK51DQzMmQgzJMyZCJkGZMhEmamTIRJkzJkCTJMyZKiTJmTIRMmZMlRJkzJkDR/OaEyZCDM1MmQj//2Q==)
      center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
  ${mobile({ width: '75%' })}
  display: flex;
  flex-direction: column; /* Ensure child elements stack vertically */
  align-items: center; /* Center child elements horizontally */
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  margin: 0 auto; /* Center-align the button */
`;

const AlreadyHaveAccount = styled.div`
  margin-top: 20px;
  text-align: center;
`;
const ErrorMessage = styled.span`
  color: red;
`;
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      toast.success('Account created successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      console.log(response.data);
      // Optionally, you can redirect the user to another page after successful registration
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
          <Agreement>
            By creating account, I consent to the processing of my personal data in accordance with the{' '}
            <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE ACCOUNT</Button>
        </Form>
        <AlreadyHaveAccount>
          Already have an account? <Link to="/login">Login</Link>
        </AlreadyHaveAccount>
        <AlreadyHaveAccount>
          <Link to="/">Back to Home</Link>
        </AlreadyHaveAccount>
      </Wrapper>
    </Container>
  );
};

export default Register;