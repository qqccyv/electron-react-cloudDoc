import { useEffect, useState } from 'react';
import PropTyps from 'prop-types';
const useKeyPress = (targetKey) => {
  const [KeyPressed, setKeyPressed] = useState(false)

  useEffect(() => {
    const keyUpHandler = ({ code }) => {
      if (targetKey.some(item => item === code)) {
        setKeyPressed(false)
      }
    }
    const keyDownPressed = ({ code }) => {
      if (targetKey.some(item => item === code)) {
        setKeyPressed(true)
      }
    }
    // 将useEffect使用的函数定义在外部的话，因为使用了外部依赖，所以会报eslint错误 “React Hook useEffect has missing dependencies: 'keyDownPressed' and 'keyUpHandler'. Either include them or remove the dependency array  react-hooks/exhaustive-deps”
    // 所以可以将函数定义到useEffect内部来
    document.addEventListener('keyup', keyUpHandler)
    document.addEventListener('keydown', keyDownPressed)
    return () => {
      document.removeEventListener('keyup', keyUpHandler)
      document.removeEventListener('keydown', keyDownPressed)
    }
  }, [targetKey])

  return KeyPressed
}


useKeyPress.propTypes = {
  targetKey: PropTyps.array.isRequired
}

export default useKeyPress