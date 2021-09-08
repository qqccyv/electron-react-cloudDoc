
import React, { useState, useEffect, useRef } from 'react';
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
  const closeFileEdit = (currentItem) => {
    setEditFileId(null)
    setValue('')
    if (currentItem && currentItem.isNew) {
      onFileDelete(currentItem.id)
    }
  }
  useEffect(() => {
    const currentItem = Files.find(item => item.id === editFileId);

    if (enterPressed && editFileId && value.trim() !== '') {
      onFileEdit(editFileId, value, currentItem.isNew)
      closeFileEdit(currentItem)
    } else if (escPressed && editFileId) {
      closeFileEdit(currentItem)
    }
  })
  useEffect(() => {
    const newFile = Files.find(item => item.isNew)
    if (newFile) {
      setEditFileId(newFile.id)
      setValue(newFile.title)
    }
  }, [Files])

  return (
    <>
      <List
        dataSource={Files}
        renderItem={item => (
          (item.id === editFileId || item.isNew) ? <div className={[Styles.listInput].join(' ')}>
            <input placeholder="请输入新增文档名字" value={value} onChange={(e) => setValue(e.target.value)} className={['col-7', 'form-control', Styles.searchInput].join(' ')} type="text" />
            <button onClick={closeFileEdit} className={['btn', 'btn-primary', Styles.listBtn].join(' ')}>关闭</button>
          </div> : <List.Item key={item.id} actions={[<EditFilled onClick={() => { setEditFileId(item.id); setValue(item.title) }} className={Styles.pointer} />, <DeleteFilled onClick={() => onFileDelete(item.id)} className={Styles.pointer} />]}>
            <List.Item.Meta
              avatar={
                <FileMarkdownFilled style={{ fontSize: '18px' }} />
              }
              title={<span onClick={() => onFileTitleClick(item.id)} className={Styles.pointer} >{item.title}</span>}
            // description={item.body}
            />
          </List.Item>
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

