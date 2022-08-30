import React, {useState} from 'react';
import Modal from '../components/modal/modal';

const Center = () =>{

    const [modalType, setModalType ] = useState('A');
    const [isShow, setToggleShow ] = useState(false);

    const openModal = (type) =>{
       
        if(type === 'A'){
            setModalType('A');
            setToggleShow(true);
        }else{
            setModalType('B');
            setToggleShow(true);
        }
    }

    const closeModal = () =>{

        if(isShow){
            setToggleShow(false);
        }

    }

    return(
        <React.Fragment>
        <Modal modalType={modalType} onClose={closeModal} isShow={isShow } switchMode={openModal}/>
        <div className="container center-container">
         <div className="row">
            <div className="col">
              <button className="btn btn-lg btn-a-color" onClick={ ()=>openModal('A')} >A</button>
            </div>
            <div className="col">
                <button className="btn btn-lg btn-b-color" onClick={ ()=>openModal('B')} >B</button>
            </div>
         </div>
        </div>
        </React.Fragment>
    )
}

export default Center;