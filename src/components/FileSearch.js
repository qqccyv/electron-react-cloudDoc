import React, { useState, useEffect, useRef } from 'react';
import Styles from './FileSearch.module.css';
import PropTypes from 'prop-types';
import useKeyPress from '../hookes/useKeyPress';


const FileSearch = ({ title, onSearch }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [value, setValue] = useState('');
  const searchInput = useRef(null);
  const enterPressed = useKeyPress(['Enter', 'NumpadEnter']);
  const escPressed = useKeyPress(['Escape']);
  const closeSearch = () => {
    setSearchActive(false)
    setValue('')
  }
  useEffect(() => {
    if (enterPressed && searchActive) {
      onSearch(value)
    } else if (escPressed && searchActive) {
      closeSearch()
    }

  })
  useEffect(() => {
    if (searchActive) {
      searchInput.current.focus()
    }

  }, [searchActive])
  return (
    <>
      {
        !searchActive ? <div className={[Styles.searchTitle].join(' ')}>
          <span>{title}</span>
          {/* <Tooltip title="search">
            <Button onClick={() => setSearchActive(true)} shape="circle" icon={<SearchOutlined />} />
          </Tooltip> */}
          <button onClick={() => setSearchActive(true)} className={['btn', 'btn-primary', Styles.searchBtn].join(' ')}>搜索</button>
          {/* <Button onClick={() => setSearchActive(true)} type="primary" icon={<SearchOutlined />}>
            Search
          </Button> */}
        </div> : <div className={[Styles.searchTitle].join(' ')}>
          <input ref={searchInput} placeholder="搜索相关文档" value={value} onChange={(e) => setValue(e.target.value)} className={['col-7', 'form-control', Styles.searchInput].join(' ')} type="text" />
          <button onClick={closeSearch} className="col-4 btn btn-primary">关闭</button>
        </div>
      }

    </>
  )
}

FileSearch.propTypes = {
  title: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired
}
FileSearch.defaultProps = {
  title: '默认标题'
}
export default FileSearch