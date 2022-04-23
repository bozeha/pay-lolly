import { MainCont, ButtonsDIv, StyledImage } from './index-styles'
import MainTable from './components/Table'
import { useState, useRef } from 'react'
import loaderSrc from './images/loader.gif'
import Popup from './components/Popup'

import SortAndFilter from './components/SortAndFilter'
import axios from 'axios'
import { E_TASKS_STATUS, E_POPUP_BUTTON_STATUS, E_SORT_TABLE_BY } from './enums/tableEnums'
import { useEffect } from 'react'
function App() {
  const url = "http://127.0.0.5:3002";
  const [loaderStatus, setLoaderStatus] = useState(false)
  const [numberOfTasks, setNumberOfTasks] = useState(0)
  const [numberOfComplitedTasks, setNumberOfComplitedTasks] = useState(0)
  const [numberOfUnComplitedTasks, setNumberOfUnComplitedTasks] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [popupId, setPopupId] = useState("")
  const [popupMessage, setPopupMessage] = useState("")
  const [popupStatus, setPopupStatus] = useState(E_TASKS_STATUS.UNCOMPLITED)
  const [tableData, setTableData] = useState(null)
  const [popupButtonStatus, setPopupButtonStatus] = useState(E_POPUP_BUTTON_STATUS.SAVE)
  const [selectedDate, setSelectedDate] = useState(Date.now())
  const [sortBy, setSortBy] = useState(E_SORT_TABLE_BY.TASK_MESSAGE)
  const [filter, setFilter] = useState('')
  const [filterByDate, setFilterByDate] = useState('')
  const firstUpdate = useRef(true)
  const getTimeStamp = () => {
    let timestampe = new Date()
    return timestampe.getTime()
  }
  useEffect(() => {
    if (firstUpdate.current === true) {
      firstUpdate.current = false
    } else {
      getDataForTable()
    }
  }, [filter, filterByDate])
  useEffect(() => {
    if (firstUpdate.current === true) {
      firstUpdate.current = false
    } else {
      getDataForTable()
    }
  }, [sortBy])
  useEffect(() => {
    if (tableData !== null) updateTasksStatus()
  }, [tableData])
  const updateTasksStatus = () => {
    let complited = 0;
    let tasks = tableData.length;
    setNumberOfTasks(tasks)
    complited = tableData.filter((current) => {
      return parseInt(current.status) === E_TASKS_STATUS.COMPLITED;
    })
    setNumberOfComplitedTasks(complited.length);
    setNumberOfUnComplitedTasks(tasks - complited.length)
  }
  const filterData = (sortedData) => {
    if (sortedData) {
      const filterdData = sortedData.filter((current) => current.message.includes(filter))
      return filterdData
    }
  }
  const filterTimestampToDate = (timeStamp) => {
    const today = new Date(timeStamp);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return yyyy + '-' + mm + '-' + dd;

  }
  const filterDataByDate = (sortedData) => {
    if (sortedData) {
      const filterdDataByDate = sortedData.filter((current) => filterTimestampToDate(current.date) === filterByDate)
      return filterdDataByDate
    }
  }
  const getDataForTable = async () => {
    try {
      const res = await axios.post(`${url}/data`)
      let sortedData = sortData(res.data)
      if (filter !== "") {
        sortedData = filterData(sortedData)
      }
      if (filterByDate !== "") {
        sortedData = filterDataByDate(sortedData)
      }
      setTableData(sortedData)
      setLoaderStatus(false);
    } catch (error) {
      console.log(error);
      setTableData([])
      setLoaderStatus(false);
    }

  }
  const editTask = async (id) => {
    const currentTask = tableData.filter(current => current.id === id)[0]
    setPopupMessage(currentTask.message)
    setPopupStatus(currentTask.status)
    setSelectedDate(currentTask.date)
    setPopupButtonStatus(E_POPUP_BUTTON_STATUS.UPDATE)
    setPopupId(currentTask.id)
    setShowPopup(true)

  }
  const updateTasks = async (e) => {
    e?.preventDefault()
    const newTaskObj = {
      "id": popupId,
      "date": selectedDate,
      "message": popupMessage,
      "status": popupStatus
    }
    let newTasksArray = tableData.map((current) => {
      if (current.id === popupId) {
        return newTaskObj
      } else {
        return current;
      }
    })
    const res = await axios.post(`${url}/update`, { obj: newTasksArray })
    console.log(`res:${res}`);
    setShowPopup(false)
    getDataForTable()

  }
  const sortData = (data) => {
    let sortedData = []
    switch (sortBy) {
      case E_SORT_TABLE_BY.TASK_MESSAGE:
        return sortedData = data.sort((a, b) => {
          return a.message.toLowerCase() === b.message.toLowerCase() ? 0 : a.message.toLowerCase() > b.message.toLowerCase() ? 1 : -1
        })


      case E_SORT_TABLE_BY.DATE:
        return sortedData = data.sort((a, b) => {
          return a.date === b.date ? 0 : a.date > b.date ? 1 : -1
        })


      case E_SORT_TABLE_BY.STATUS:
        return sortedData = data.sort((a, b) => {
          return a.status === b.status ? 0 : a.status > b.status ? 1 : -1
        })
      default:
        return data;



    }
    return sortedData
  }
  const addANewTask = async (e, edit = false) => {
    e?.preventDefault()
    const newTaskObj = {
      "id": getTimeStamp() + 'id',
      "date": selectedDate,
      "message": popupMessage,
      "status": popupStatus
    }
    const res = await axios.post(`${url}/add`, { obj: newTaskObj })
    console.log(`res:${res}`);
    setShowPopup(false)
    setLoaderStatus(false);
    getDataForTable()
    clearNewTask()
  }
  const clearNewTask = () => {
    setPopupMessage("");
    setPopupStatus(E_TASKS_STATUS.UNCOMPLITED)
    setPopupButtonStatus(E_POPUP_BUTTON_STATUS.SAVE)
    setSelectedDate(Date.now())

  }
  const updateDate = (date) => {
    console.log(date)
    setSelectedDate(date.getTime())
  }
  const props = {
    showPopup: setShowPopup,
    message: popupMessage,
    setMessage: setPopupMessage,
    status: popupStatus,
    setStatus: setPopupStatus,
    saveANewTask: addANewTask,
    popupButtonStatus, popupButtonStatus,
    updateTasks: updateTasks,
    selectedDate: selectedDate,
    updateDate: updateDate,
    clearNewTask: clearNewTask
  }
  const propsForTable = {
    loaderFunc: setLoaderStatus,
    showPopup: setShowPopup,
    getDataForTable: getDataForTable,
    tableData: tableData,
    editTask: editTask,
    setPopupButtonStatus: setPopupButtonStatus,
    clearNewTask: clearNewTask,
    setSortBy: setSortBy


  }
  const propsForSortAndFilter = {
    setSortBy: setSortBy,
    setFilter: setFilter,
    filter: filter,
    filterByDate: filterByDate,
    setFilterByDate: setFilterByDate
  }
  return (
    <div className="App">
      <MainCont>
        <SortAndFilter props={propsForSortAndFilter} />
        <ButtonsDIv>
          <button><span>Total Tasks</span><span><span>{numberOfTasks}</span></span></button>
          <button><span>Tasks Completed</span><span><span>{numberOfComplitedTasks}</span></span></button>
          <button><span>Tasks  Remaining</span><span><span>{numberOfUnComplitedTasks}</span></span></button>
          <button onClick={() => {
            setPopupButtonStatus(E_POPUP_BUTTON_STATUS.SAVE);
            setShowPopup(true)
          }}>
            New Task +</button>
          {loaderStatus && <StyledImage src={loaderSrc} />}
        </ButtonsDIv>
        <MainTable props={propsForTable} />
        {showPopup && <Popup props={props} />}
      </MainCont>
    </div>
  );
}

export default App;
