
import { Cont } from './sortAndFilterStyle'
import { E_SORT_TABLE_BY } from '../enums/tableEnums'
import { useState, useEffect, useRef } from 'react'



const SortAndFilter = ({ props }) => {

    const updateSortBy = (e) => {
        e.preventDefault()
        props.setSortBy(parseInt(e.target.value))
    }


    return (
        <Cont>
            <div>
                <label>Sort by :</label>
                <select onChange={(e) => { updateSortBy(e) }}>
                    <option value={E_SORT_TABLE_BY.TASK_MESSAGE}>Task message</option>
                    <option value={E_SORT_TABLE_BY.DATE}>Date</option>
                    <option value={E_SORT_TABLE_BY.STATUS}>Status</option>
                </select>
            </div>
            <div>
                <label>Filter by tasks:</label>
                <input value={props.filter} onChange={(e) => { props.setFilter(e.target.value) }} />
            </div>
            <div>
                <label>Filter by date:</label>
                <input type="date" value={props.filterByDate} onChange={(e) => { props.setFilterByDate(e.target.value) }} />
            </div>



        </Cont>
    )
}

export default SortAndFilter