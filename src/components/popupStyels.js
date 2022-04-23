import styled from 'styled-components'

import arrow from '../images/arrow.png'

export const PopupCont = styled.div`
    
    position:absolute;
    width:400px;
    height:300px;
    background-color:lightblue;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    border-radius:4px;
    header{
        text-align:center;
        background-color:darkblue;
        color:white;
        height:30px;
        line-height:30px;  
        direction:rtl;
        position:relative;
        button{
            position:absolute;
            right:0px;
            height:100%;
            width:30px;
            font-size:20px;
            color:white;
            background-color:transparent;
            box-shadow:none;
            border:none;
            cursor:pointer;
        }
    }
    textarea{
        width:300px;
        height:130px;
        
        display:block;
    }
    #selectionDIv{
        width:100%;
        display:flex;
        flex-direction:row;
        >div{
            margin-right:20px;
        }
        .react-datepicker__navigation--next{
            span{
                display:block;
                &::before{
                    left:-15px;
                }
            }
          }
        .react-datepicker__navigation--previous{
            span{
                display:block;
                &::before{
                    right:85px;
                }
            }
          }
    }
    form{
        padding:20px;
        label{
            display:block;
            padding-bottom:10px;
        }
        button{
            margin-top:10px;
            direction:rtl;
            display:block;
            width:100px;    
            
        }
    }
`