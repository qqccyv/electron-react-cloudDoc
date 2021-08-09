
import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import {
  FileMarkdownFilled,
  EditFilled,
  DeleteFilled
} from '@ant-design/icons';
import Styles from './FileList.module.css';
import PropTypes from 'prop-types';
import useKeyPress from '../hookes/useKeyPress';

const FileList = ({ Files, onFileTitleClick, onFileEdit, onFileDelete }) => {
  const [editFileId, setEditFileId] = useState(null);
  const [value, setValue] = useState('');
  const enterPressed = useKeyPress(['Enter', 'NumpadEnter']);
  const escPressed = useKeyPress(['Escape']);
  const closeFileEdit = () => {
    setEditFileId(null)
    setValue('')
  }
  useEffect(() => {
    // const keyBoardEventHandle = (e) => {
    //   const { code } = e;
    //   if ((code === 'Enter' || code === 'NumpadEnter') && editFileId) {
    //     onFileEdit(editFileId, value)
    //     closeFileEdit(e)
    //   } else if (code === 'Escape' && editFileId) {
    //     closeFileEdit(e)
    //   }
    // }
    // document.addEventListener('keyup', keyBoardEventHandle)
    // return () => {
    //   document.removeEventListener('keyup', keyBoardEventHandle)
    // }
    if (enterPressed && editFileId) {
      onFileEdit(editFileId, value)
      closeFileEdit()
    } else if (escPressed && editFileId) {
      closeFileEdit()
    }
  })
  return (
    <>
      <List
        dataSource={Files}
        renderItem={item => (
          (item.id !== editFileId) ? <List.Item key={item.id} actions={[<EditFilled onClick={() => { setEditFileId(item.id); setValue(item.title) }} className={Styles.pointer} />, <DeleteFilled onClick={() => onFileDelete(item.id)} className={Styles.pointer} />]}>
            <List.Item.Meta
              avatar={
                <FileMarkdownFilled style={{ fontSize: '18px' }} />
              }
              title={<span onClick={() => onFileTitleClick(item.id)} className={Styles.pointer} >{item.title}</span>}
              description={item.body}
            />
          </List.Item> : <div className={[Styles.listInput].join(' ')}>
            <input value={value} onChange={(e) => setValue(e.target.value)} className={['col-7', 'form-control', Styles.searchInput].join(' ')} type="text" />
            <button onClick={closeFileEdit} className={['btn', 'btn-primary', Styles.listBtn].join(' ')}>关闭</button>
          </div>
        )}
      >

      </List>
    </>
  )
}

FileList.propTypes = {
  Files: PropTypes.array.isRequired,
  onFileTitleClick: PropTypes.func,
  onFileEdit: PropTypes.func,
  onFileDelete: PropTypes.func,
}
export default FileList

