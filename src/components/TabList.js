import React from 'react';
import PropTypes from 'prop-types';
// import { CloseOutlined } from '@ant-design/icons';
import Styles from './TabList.module.css';
const TabList = ({ files, activeId, unsaveIds, onTabClick, onCloseTab }) => {

  return (
    <ul className="nav nav-pills">
      {
        files.map(file => {
          return (
            <li onClick={(e) => { e.preventDefault(); onTabClick(file.id) }} className={['nav-item', Styles.navLi].join(' ')} key={file.id}>
              <a href="javascript:;" className={`nav-link ${file.id === activeId ? 'active' : ''} ${Styles['tab-item']} ${unsaveIds.includes(file.id) ? Styles.unsave : ''}`}>
                {file.title}
                <span onClick={(e) => { e.stopPropagation(); onCloseTab(file.id) }} className={`${Styles.TabIcon}`}>
                  <span className={[Styles.pointer, Styles.closeIcon].join(' ')}>x</span>
                  <span className={Styles.ciycle}></span>
                </span>
              </a>

            </li>
          )
        })
      }
    </ul>
  )
}

TabList.proptype = {
  files: PropTypes.array,
  activeId: PropTypes.string,
  unsaveIds: PropTypes.array,
  onTabClick: PropTypes.func,
  onCloseTab: PropTypes.func,
}
TabList.defaultProps = {
  unsaveIds: []
}
export default TabList