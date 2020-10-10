import React, { useState } from 'react';
import './styles.css';
import AllTasks from './AllTasks';
import Incomplete from './Incomplete';
import Complete from './Complete';

function App() {
    const [inputVal, setInputVal] = useState()
    const [task, setTask] = useState([])

    function addTasks(value) {
        if(value){
            setTask([...task,{
                task: value,
                complete:'no'
            }])
            setInputVal('')
        }
    }

    function deleteTasks(index){
        setTask(task.filter((e,i)=>{
            return i !== index
        }))
    }

    function updateTasks(index){
        var result = task.map((e,i)=>{
            if(i == index){
                e.complete = e.complete === "yes" ? "no" : "yes"
            }
            return e;
        })
        setTask(result)
    }

    return (
        <div id="container">
            <h1>Special Todo List</h1>
            <div className="ui action input">
                <input
                    value={inputVal}
                    onChange={(e) => {
                        setInputVal(e.target.value)
                    }}
                    onKeyPress={(e)=>{
                        if(e.key === 'Enter'){
                            addTasks(inputVal)
                        }
                    }}
                    type="text" id="userinput"
                    placeholder="Add task..."
                />
                <button onClick={(e)=>{
                    addTasks(inputVal)
                }} className="ui teal button">ADD</button>
            </div>

            <div className="all">
                <AllTasks>
                    <div className="ui card taskcard">
                        <div className="content">
                            <div className="header">Tasks</div>
                            <div className="description">
                                <div className="ui">
                                    {
                                        task.map((e,i) => (
                                            <div id="loopCard" style={{display:'flex'}}>
                                                <input checked={e.complete ==="yes"? true:false} type="checkbox" onClick={()=>{
                                                    updateTasks(i)
                                                }} name="example" style={{marginTop:'12px', marginRight:'10px'}}/>
                                                <label>{e.task}</label>
                                                <i onClick={()=>{
                                                    deleteTasks(i)
                                                }} className="trash icon"></i>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </AllTasks>

                <Incomplete>
                    <div className="ui card incomplete">
                        <div className="content">
                            <div className="header">Incomplete</div>
                            <div className="description">
                               {
                                   task.map((e)=>{
                                       if(e.complete === 'no'){
                                           return <><label style={{lineHeight:"25px",color:'#eb6383'}}>{e.task}</label><br></br></>
                                       }
                                   })
                               }
                            </div>
                        </div>
                    </div>
                </Incomplete>

                <Complete>
                    <div className="ui card complete">
                        <div className="content">
                            <div className="header">Complete</div>
                            <div className="description">
                               {
                                   task.map((e)=>{
                                       if(e.complete === 'yes'){
                                           return <><label style={{lineHeight:"25px", color:'#00a1ab'}}>{e.task}</label><br/></>
                                       }
                                   })
                               }
                            </div>
                        </div>
                    </div>
                </Complete>
            </div>



        </div>
    )
}

export default App
