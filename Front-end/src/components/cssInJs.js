import styled from 'styled-components'

export const LoginLabel = styled.label`
  color: ' #94a3b8';
`

export const showPass = styled.label`
  color: black;
`
export const NavEle = styled.nav`
  background-color: ${prop => (prop.color === 'light' ? 'white' : '#212121')};
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 13px;

  @media only screen and (max-width: 965px) {
    display: none;
  }
`

export const NavEleForSmall = styled.nav`
  background-color: ${prop => (prop.color === 'light' ? 'white' : '#212121')};
  display: none;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 13px;
  @media only screen and (max-width: 965px) {
    display: flex;
  }
`

export const LogoutButton = styled.button`
  border: 2px solid ${prop => (prop.color === 'light' ? '#3b82f6' : 'white')};
  background-color: transparent;
  margin: 0;
  margin-right: 20px;
  margin-left: 25px;
  padding-left: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-right: 10px;
  cursor: pointer;
  color: ${prop => (prop.color === 'light' ? '#3b82f6' : 'white')};
`

export const ExitButton = styled.button`
  font-size: 25px;
  background-color: transparent;
  border: 0;
  margin-top: 5px;
  cursor: pointer;
  margin-right: 10px;
  margin-left: 5px;
  color: ${prop => (prop.color === 'light' ? '#212121' : 'white')};
`

export const LogoutPopupContainer = styled.div`
  background-color: ${props => (props.darkTheme ? '#212121' : '#ffffff')};
  width: 450px;
  border-radius: 8px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 767px) {
    width: 300px;
  }
`
export const LogoutConfirmationMsg = styled.p`
  font-family: 'Roboto';
  font-size: 20px;
  margin: 10px;
  color: ${props => (props.darkTheme ? '#ffffff' : '#000000')};
  text-align: center;
  @media screen and (max-width: 767px) {
    font-size: 15px;
  }
`

export const LogoutButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const LogoutCloseButton = styled.button`
  background-color: transparent;
  border: 1px solid grey;
  padding: 13px;
  padding-right: 20px;
  padding-left: 20px;
  color: grey;
  margin: 12px;
  outline: none;
  cursor: pointer;
  border-radius: 6px;
  font-family: Roboto;
  font-weight: bold;
  font-size: 15px;
  @media screen and (max-width: 767px) {
    font-size: 12px;
    padding: 8px;
    padding-right: 12px;
    padding-left: 12px;
  }
`

export const LogoutConfirmButton = styled.button`
  align-self: flex-end;
  background-color: #3b82f6;
  color: white;
  border: 1px solid #3b82f6;
  margin: 12px;
  outline: none;
  cursor: pointer;
  border-radius: 6px;
  font-family: Roboto;
  font-weight: bold;
  font-size: 15px;
  padding: 13px;
  padding-right: 20px;
  padding-left: 20px;
  @media screen and (max-width: 767px) {
    font-size: 12px;
    padding: 8px;
    padding-right: 12px;
    padding-left: 12px;
  }
`
export const HameBurgerButton = styled.button`
  border: 0;
  cursor: pointer;
  outline: none;
  font-size: 23px;
  margin-top: 5px;
  background-color: transparent;
  color: ${props => (props.color !== 'light' ? '#ffffff' : '#000000')};
`

export const HomePageContainer = styled.div`
  background-color: ${props => (props.color === 'light' ? 'white' : '#212121')};
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 13px;
  color: ${props => (props.color !== 'light' ? 'white' : 'black')} ;
  height: 100vh;
  padding: 10%;
`;
export const ShopKnow = styled.button`
   border: 2px solid ${prop => (prop.color === 'light' ? '#3b82f6' : 'white')};
  background-color: transparent;
  margin: 0;
  margin-right: 20px;
  margin-left: 25px;
  padding-left: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-right: 10px;
  cursor: pointer;
  width:16vh;
  color: ${prop => (prop.color === 'light' ? '#3b82f6' : 'white')};`
