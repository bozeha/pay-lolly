
import { PopupCont } from './popupStyels'
import { useState } from 'react';
import { E_POPUP_BUTTON_STATUS } from '../enums/tableEnums'
import DatePicker from "react-datepicker";
import "../../node_modules/react-datepicker/dist/react-datepicker.css";
const Popup = ({ props }) => {
    let onUpdate = props.popupButtonStatus === E_POPUP_BUTTON_STATUS.SAVE ? false : true
    return (<PopupCont>
        <header>
            <span>Add new task</span>
            <button onClick={() => props.showPopup(false)}>x</button>
        </header>
        <form>
            <label>Enter the message please</label>
            <textarea value={props.message} onChange={(e) => { props.setMessage(e.target.value) }} />
            <div id="selectionDIv">
                <div>
                    <label>Status:</label>
                    <select name="cars" id="cars" value={props.status} onChange={(e) => { props.setStatus(e.target.value) }}>
                        <option value="1">Complited</option>
                        <option value="2">Uncomplited</option>
                    </select>
                </div>
                <div>
                    <label>Task date:</label>
                    <DatePicker selected={props.selectedDate} onChange={(date) => props.updateDate(date)} />
                </div>

            </div>
            <button onClick={(e) => { onUpdate ? props.updateTasks(e) : props.saveANewTask(e) }}>
                {
                    !onUpdate ?
                        <span>Save</span> :
                        <span>Update</span>}
            </button>
        </form>


    </PopupCont>)
}

export default Popup