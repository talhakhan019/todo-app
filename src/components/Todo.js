import React, { useEffect } from 'react'
import { useState } from 'react';
import todo from '../images/todo.png';
const getLocalItems = ()=>{
    let list = localStorage.getItem('to-do-lists');
    // console.log(list);
    if(list)
    {
        return JSON.parse(localStorage.getItem('to-do-lists'));
    }
    else
    {
        return [];
    }
}
const Todo = () => {
    const [inputData,setinputData] = useState('');
    const [items,setitems] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);
    const addItem = ()=>{
        if(!inputData)
        {
            alert('Please fill the data');
        }
        else if(inputData && !toggleSubmit){
            setitems(
                items.map((elem)=>{
                    if(elem.id === isEditItem){
                        return  {...elem, name:inputData}
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);
            setinputData('');
            setIsEditItem(null);
        }
        else
        {
            const allInputData = {id: new Date().getTime().toString(), name: inputData};
            setitems([...items, allInputData]);
            setinputData('');
        }
        
    }
    const deleteItem = (id)=>{
        const updatedItems = items.filter((elem)=>{
            return id !== elem.id;
        })
        setitems(updatedItems);
    }
    const removeAll = ()=>{
        setitems([]);
    }
    const editItem = (id)=>{
        let newEditItem = items.find((elem)=>{
            return elem.id === id
        })
        setToggleSubmit(false);
        setinputData(newEditItem.name);
        setIsEditItem(id);
    }
    useEffect(()=>{
        localStorage.setItem('to-do-lists', JSON.stringify(items))
    },[items])
    
  return (
    <>
        <div className="main-div">
            <div className="child-div">
                <div className='todo-icon'>
                    <img  src={todo} alt="todo icon" />
                    <span>Add Your List Here</span>
                </div>
                <div className="addItems">
                    <input type="text" placeholder='✍️ Add your items here' value={inputData} onChange={(e)=>setinputData(e.target.value)} />
                    {
                        toggleSubmit ? <i className='fa fa-plus add-btn' title='Add-Item' onClick={addItem}></i> : <i className='fa fa-edit add-btn' title='Update-Item' onClick={addItem}></i>
                    }
                </div>
                <div className="show-items">
                    {
                        items.map((elem,ind)=>{
                            return (
                                <div className='each-item' key={elem.id}>
                                    <h3>{elem.name}</h3>
                                    <div className="item-btns">
                                        <i className='fa fa-edit edit-Item' title='Edit-item' style={{margin:'0px 10px'}} onClick={()=>{
                                            editItem(elem.id)
                                        }}></i>
                                        <i className='fa fa-trash delete-Item' title='Delete-item' onClick={()=>{
                                            deleteItem(elem.id)
                                        }}></i>
                                    </div>
                                    
                                </div>
                            );
                        })
                    }
                    
                </div>
                <button className="remove-all" title='Remove-All' onClick={removeAll}>Remove All</button>
            </div>
        </div>
    </>
  )
}

export default Todo