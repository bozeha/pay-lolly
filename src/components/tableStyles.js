import styled from 'styled-components'

export const StyledTable = styled.table`


border-collapse: collapse;
backgroun-color : #EDEDED;
th:not(:nth-of-type(1)):not(:nth-of-type(5)){
    &:hover{
        background-color:lightgray;
    }
    cursor:pointer;
    width:auto;

    
}
width:100%;
text-align:center;
tbody{

    border-radius:4px 4px 0px 0px;
}
border-radius:4px 4px 0px 0px;
tr:nth-of-type(1){
    background-color :#313131;
    color:white;
    height:50px;
    border-radius:4px 4px 0px 0px;
    th:nth-of-type(1){
        border-top-left-radius:4px;
    }
    th:nth-of-type(5){
        border-top-right-radius:4px;
    }

}
tr{
    border-bottom:2px solid black;
    height:50px;
    height:30px;
}
button{
    background-color:blue;
    color:white;
    border-radius:4px;
    border:none;
    padding:4px;
    cursor:pointer;
}
td.options{
    span{
        padding:3px 15px;
        cursor:pointer;
        
        &:hover{
            border-bottom:2px solid black;

        }
    }
}
td:nth-of-type(3){
    max-width:100px;
}
.cantDelete{
    color:gray;
}
@media only screen and (max-width: 720px){
    
}
@media only screen and (max-width: 768px) {
    th{
        button{
            display:none;
        }
    }
    tr{
        td:nth-of-type(1), td:nth-of-type(4){
            max-width:70px;
            overflow:hidden;
            text-overflow: ellipsis;

        }
        
    }
    
}
`

export const TableContaner = styled.div`
overflow-y: auto;
height:80%;
border-radius:4px;
box-shadow: 2px 2px 2px 2px darkgrey;
border:1px solid black

`