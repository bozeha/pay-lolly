
import { useEffect } from 'react'
import axios from 'axios'
import { StyledTable, TableContaner } from './tableStyles'
import { E_TASKS_STATUS_STR, E_POPUP_BUTTON_STATUS, E_SORT_TABLE_BY } from '../enums/tableEnums'
import { v4 as uuid } from 'uuid'

const MainTable = ({ props }) => {


    const url = "http://127.0.0.5:3002";

    const removeTask = async (id) => {
        props.loaderFunc(true);
        const res = await axios.post(`${url}/remove`, { id: id })
        console.log(`res:${res}`);
        props.loaderFunc(false);
        props.getDataForTable()
    }

    const canTaskBeDeleted = (taskDate) => {
        const currentDate = Date.now()
        const minDays = 6
        let daysToTask = Math.floor((parseInt(taskDate) - currentDate) / (1000) / 60 / 60 / 24)
        return daysToTask > minDays ? true : false
    }

    useEffect(() => {
        props.loaderFunc(true);
        props.getDataForTable()

    }, [])


    const getDateFromTimestamp = (tStamp) => {
        let date = new Date(parseInt(tStamp));

        let retunsDate = (date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear()
            // + " " + date.getHours() +
            // ":" + date.getMinutes() +
            // ":" + date.getSeconds()
        );
        return retunsDate;
    }
    return (
        <TableContaner>


            <StyledTable>
                <tbody>
                    <tr>
                        <th>
                            id
                        </th>
                        <th onClick={() => props.setSortBy(E_SORT_TABLE_BY.DATE)}>
                            Date
                        </th>
                        <th onClick={() => props.setSortBy(E_SORT_TABLE_BY.TASK_MESSAGE)}>
                            Task message
                        </th>
                        <th onClick={() => props.setSortBy(E_SORT_TABLE_BY.STATUS)}>Status</th>
                        <th>
                            <button onClick={() => { props.clearNewTask(); props.setPopupButtonStatus(E_POPUP_BUTTON_STATUS.SAVE); props.showPopup(true) }}>Add new task +</button>
                        </th>
                    </tr>
                    {props?.tableData &&
                        props?.tableData?.map((current) => (
                            <tr key={uuid()}>
                                <td>
                                    {current.id}
                                </td>
                                <td>
                                    {getDateFromTimestamp(current.date)}
                                </td>
                                <td>
                                    {current.message}
                                </td>
                                <td>
                                    {E_TASKS_STATUS_STR[current.status]}
                                </td>
                                <td className="options">
                                    <span onClick={() => props.editTask(current.id)} className="lnr lnr-pencil"></span>
                                    {canTaskBeDeleted(current.date) ? <span onClick={() => { removeTask(current.id) }} className="lnr lnr-trash"></span>
                                        :
                                        <span className="lnr lnr-trash cantDelete"></span>
                                    }
                                </td>
                            </tr>

                        ))
                    }
                </tbody>
            </StyledTable>
        </TableContaner>
    )



}

export default MainTable