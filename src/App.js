import { useState, useMemo } from 'react';
import { Col, Row, Button } from 'antd';
import { PlusSquareFilled, FolderOpenFilled } from '@ant-design/icons';
import SimpleMDE from "react-simplemde-editor";
import './App.css';
import "easymde/dist/easymde.min.css";
import FileList from './components/FileList';
import FileSearch from './components/FileSearch';
import TabList from './components/TabList';

const defaultFiles = [
  {
    id: 1,
    title: '1',
    body: '描述1',
    createdAt: new Date().getTime()
  },
  {
    id: 2,
    title: '2',
    body: '描述2',
    createdAt: new Date().getTime()
  },
  {
    id: 3,
    title: '3',
    body: '描述3',
    createdAt: new Date().getTime()
  },
]
function App() {
  const [files, setFiles] = useState(defaultFiles);
  const [activeFileID, setActiveFileID] = useState('');
  const [openedFiledIDs, setOpenedFiledIDs] = useState([]);
  const [unsaveFileIDs, setUnsaveFileIDs] = useState([]);


  const openedFiles = openedFiledIDs.map(openedID => {
    return files.find(file => file.id === openedID)
  })
  const activeFile = files.find(file => file.id === activeFileID)


  const onFileTitleClick = (fileid) => {
    setActiveFileID(fileid);
    if (!openedFiledIDs.includes(fileid)) {
      setOpenedFiledIDs([...openedFiledIDs, fileid])
    }
  }

  const onTabClick = (fileid) => {
    setActiveFileID(fileid);
  }

  const onCloseTab = (fileid) => {
    const newFiles = openedFiledIDs.filter(openid => openid !== fileid);
    setOpenedFiledIDs(newFiles)
    if (newFiles.length > 0 && fileid === activeFileID) {
      setActiveFileID(newFiles[0])
    } else if (newFiles.length === 0) {
      setActiveFileID('')
    }
  }

  const onChange = (value) => {
    const newFiles = files.map(file => {
      if (file.id === activeFileID) {
        file.body = value
      }
      return file
    })
    // setValue(value);
    setFiles(newFiles);
    if (!unsaveFileIDs.includes(activeFileID)) {
      setUnsaveFileIDs([...unsaveFileIDs, activeFileID])
    }
  };
  // 解决组件每次更新都失去焦点的问题
  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      minHeight: '470px'
    }
  }, []);
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-3 
        left-panel left-nav">
          <FileSearch title="我的云文档" onSearch={(value) => console.log(value)}></FileSearch>
          <FileList Files={files} onFileTitleClick={onFileTitleClick} onFileEdit={(id, value) => console.log(id, value)} onFileDelete={(id) => console.log('del', id)}></FileList>
          <Row className="bottom-btn">
            <Col span={12}>
              <Button type="primary" block icon={<PlusSquareFilled />}>
                编辑
              </Button>
            </Col>
            <Col span={12}>
              <Button block icon={<FolderOpenFilled />}>
                导入
              </Button>
            </Col>
          </Row>
        </div>
        <div className="col-9  right-panel">
          {
            !activeFile ? (
              <div className="unActiveFile">
                选择或者创建新的 Markdown 文档
              </div>
            ) : (
              <>
                <TabList files={openedFiles} activeId={activeFileID} unsaveIds={unsaveFileIDs} onTabClick={onTabClick} onCloseTab={onCloseTab} ></TabList>
                <SimpleMDE
                  id={activeFile && activeFile.id}
                  value={activeFile && activeFile.body} onChange={onChange} options={autofocusNoSpellcheckerOptions}>

                </SimpleMDE>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
