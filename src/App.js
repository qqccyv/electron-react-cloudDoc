import { Col, Row, Button } from 'antd';
import { PlusSquareFilled, FolderOpenFilled } from '@ant-design/icons';
import './App.css';
import FileList from './components/FileList';
import FileSearch from './components/FileSearch';
import TabList from './components/TabList';

const defaultFiles = [
  {
    id: 1,
    title: '123',
    body: '描述',
    createdAt: new Date().getTime()
  },
  {
    id: 2,
    title: '123',
    body: '描述',
    createdAt: new Date().getTime()
  },
]
function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-3 
        left-panel left-nav">
          <FileSearch title="我的云文档" onSearch={(value) => console.log(value)}></FileSearch>
          <FileList Files={defaultFiles} onFileTitleClick={(id) => console.log(id)} onFileEdit={(id, value) => console.log(id, value)} onFileDelete={(id) => console.log('del', id)}></FileList>
          <Row>
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
          <TabList files={defaultFiles} activeId={1} unsaveIds={[1]} onTabClick={(id) => console.log(id)} onCloseTab={(id) => console.log(id)} ></TabList>
        </div>
      </div>
    </div>
  );
}

export default App;
