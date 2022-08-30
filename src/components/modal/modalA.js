import React, {useState}  from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const ModalA = (props)=>{

    const { onClose, data, swithcModal, modalType, loadingStatus, onPaginate, onSearch} = props;

    const [searchVal, setSerchVal] = useState('');
    const [phone, setPhone] = useState('')


    const onClickAllContact = () => {
        console.log('Modal type A',modalType)
        if(modalType ==='B'){
            swithcModal('A');
        }
    }

    const onClickUsContact = () =>{
        console.log('Modal type B',modalType)
        if(modalType ==='A'){
            swithcModal('B');
        }
    }

    const onClickClose = () =>{

        onClose();
    }

    const onSearchValue = (event, type) =>{
        if(type === 1){
            setSerchVal(event.target.value);  
        }else{
            setPhone(event.target.value);
        }
 
    }

    const onPressEnter = (event) =>{
    

        if(event.key === 'Enter'){
            if(loadingStatus === 0){
                onSearch(searchVal, phone);
            }
        }
 
    }

    const  onScroll = (event) =>{
      
        if(event.top === 1 && loadingStatus === 0){
          
            onPaginate()
        }
    }

    return(
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col pb-4">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={searchVal} onKeyPress={ (event)=>onPressEnter(event)} onChange={(event)=>onSearchValue(event, 1)}/>
                    </div>
                    <div className="col pb-4">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" value={phone} onKeyPress={ (event)=>onPressEnter(event)} onChange={(event)=>onSearchValue(event, 2)}/>
                </div>
                </div>
                <div className="row">
                    <div className="col pb-4">
                   
                        <button className="btn btn-lg btn-a-color" onClick={() =>onClickAllContact()} >All Contact</button>
                        <button className="btn btn-lg btn-b-color" onClick={() =>onClickUsContact()} >US Contact</button>
                        <button className="btn btn-lg btn-c-color" onClick={() =>onClickClose()} >Close</button>
                    </div>
                </div>

                <div className="row"> 
                    <div className="col">

                    { loadingStatus === 1 ? 'Loading' : ''}
                    <Scrollbars 
                    style={{ width: '100%', height: 300 }}
                    onScrollFrame={(event)=>onScroll(event)}
                    >
                        <ul className="list-group">
                            {
                                data.map( (val, index) =>{

                                    return(
                                        <li className="list-item" key={index}> 
                                        <p> <b>Id: </b> {val.id} </p>
                                        <p> <b>First Name: </b> {val.first_name} </p>
                                        <p> <b>Last Name: </b> {val.last_name} </p>
                                        <p> <b>Email: </b> {val.email} </p>
                                        <p> <b>Phone: </b> {val.phone_number} </p>
                                        <p> <b>checked: </b> {val.checked ? 'chekced': 'not checked'} </p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        </Scrollbars>
                    </div>
                 </div>
            </div>
        </div>
    )
}

export default ModalA;