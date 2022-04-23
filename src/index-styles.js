
import styled from 'styled-components'

export const StyledButton = styled.button` 
  color:red
`
export const MainCont = styled.div` 
width:80%;
margin:0 auto;
height:100%;
p{
    color:blue;
}
`
export const ButtonsDIv = styled.div` 
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  padding:20px 0px;




  button{
    &:nth-of-type(4){
      display:none;
    }
    &:nth-of-type(1){
      span:nth-of-type(2){
        color:#2C5762;
      }
    }
    &:nth-of-type(2){
      span:nth-of-type(2){
        color:#2B6246;
      }
    }
    &:nth-of-type(3){
      span:nth-of-type(2){
        color:#7E2F32;
      }
    }
    width:20%;
    height:30px;
    border-radius:4px;
    display:flex;
    flex-direction:row;
    border:none;
    span{
      height:100%;
    }
    span:first-child{
      border-radius:4px 0px 0px 4px;
      width:70%;
      display:block;
      padding:0px;
      line-height:29px;
    }
    > span:last-child{
      border-radius:0px 4px 4px 0px;
      width:30%;
      display:block;
      background-color:black;
      padding:0px;
      line-height:29px;
      position:relative;
      span{
        display: block;
        position: absolute;
        top: 50%;
        height: 10px;
        width: 10px;
        padding: 0px;
        margin: 0px;
        left: 50%;
        transform: translate(-50%,-50%);
        line-height: 15px;
      }
    }
    padding:0px;
    
  }
  @media only screen and (max-width: 992px) {
    
    button{
      height:auto;


    }
  }
  @media only screen and (max-width: 768px) {
    flex-direction:column;
    jestefy-content:center;
    button{
      width:80%;
      margin:0 auto;
      margin-bottom:5px;
      >span{
        min-height:29px;
      }
      &:nth-of-type(4){
        display:block;
        background-color:blue;
        min-height:29px;
        color:white;
        text-align:center;
        justify-content:center;
        align-items:center;
      }
    }
  }

`
export const StyledImage = styled.img`
width:50px;
position:absolute;
top:30%;
left:50%;
transform:translate(-50%,-50%)


`