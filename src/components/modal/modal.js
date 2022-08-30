import React, {useState, useRef, useEffect} from 'react';
import $ from 'jquery';
import { getContactList } from "../../services/api";
import  ModalA  from './modalA';


const Modal = (props) =>{

    const { modalType, isShow, onClose , switchMode} = props;

    const  modalRef  = useRef();


    const [contactList, setContactList] = useState([]);
    const [ checkStatus, setCheckStatus] = useState(false);
    const [ loadingStatus, setLoadingStatus] = useState(0);
    const [ page, setPage] = useState(0);

    const onSearch = (name, phone) =>{
        loadData(name, phone);
    }


    const loadData = (name= null, number=null)=>{

        setPage( page+1);

        let countryId = null;
        let param = {};

        if(modalType === 'B'){
            countryId = 226;
        }

        if(name !== null || number !== null){
            param['name'] = name;
            param['number'] = number;
        }
        
        setLoadingStatus(1);

        getContactList(param, page, countryId)
        .then( response=>{
            console.log(response)
            let arr = [...contactList];
            for(let i in response.data.contacts){
           
                let obj = { ...response.data.contacts[i] , checked: false};

                arr.push( obj);
            }
            setContactList(arr);
            setLoadingStatus(0);
        }).catch( error=>{
            console.error(error);
            setLoadingStatus(-1);
        });
    }

    useEffect( () => {
        $( modalRef.current).on('hidden.bs.modal', function (event) {
            onClose();
          });

          return ()=>false;
    }, []);

    useEffect( () =>{
        console.log(modalRef.current);
       
             
        if(isShow){
            loadData();
            $( modalRef.current).modal('show');
        }else{
            setPage(0);
            setContactList([]);
            $( modalRef.current).modal('hide');
        }

    }, [isShow]);

    useEffect( () =>{
        console.log("swithc modal")
        setPage(0);
        setContactList([]);
        setCheckStatus(false)
        loadData();

    }, [modalType]);

    const checkAll = () =>{
        let _contactList = [...contactList]
        for(let i=1; i < _contactList.length; i +=2){
            _contactList[i].checked = !checkStatus;
        }
        setContactList(_contactList);
        setCheckStatus(!checkStatus);
    }

    return(
        <div className='modal' ref={modalRef}>
            <div className='modal-dialog'></div>
            <div className='modal-content'>
                <div className='modal-header'>
                    { modalType === 'A' ? 'Modal A' : 'Modal B'}
                </div>
                <div className='modal-body'>
                    <ModalA 
                    onSearch={onSearch} 
                    modalType={modalType}
                    loadingStatus={loadingStatus} 
                    data={ contactList} 
                    onPaginate={ loadData} onClose={onClose} swithcModal={switchMode}/>
                </div>
                <div className='modal-footer'>
                    <input type="checkbox" className="form-controll" checked={checkStatus} onChange={()=>checkAll()}/>Check Even
                </div>
            </div>
        </div>
    )
}

export default Modal;