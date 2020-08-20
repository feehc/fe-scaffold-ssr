import React, { useState, useEffect, useContext } from 'react';

const ViewportContext = React.createContext({});

/**
 * 子组件可根据provider的value做组件本身的自适应加载
 * 多媒体组件结合自身的offsetTop可做懒加载
 */
const ViewportProvider = ({ children }) => {
  const [viewportState, setViewportState] = useState({
    offsetWidth: 0, // window.innerWidth, // 可视区域宽度
    offsetHeight: 0, // window.innerHeight, // 可视区域高度
    offsetX: 0, // window.pageXOffset, // 可视区域X坐标滚动距离
    offsetY: 0, // window.pageYOffset, // 可视区域Y坐标滚动距离
  });

  const hanleWindowResize = () => {
    setViewportState({
      offsetWidth: window.innerWidth,
      offsetHeight: window.innerHeight,
      offsetX: window.pageXOffset,
      offsetY: window.pageYOffset,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', hanleWindowResize);
    window.addEventListener('scroll', hanleWindowResize);
    return () => {
      window.removeEventListener('resize', hanleWindowResize);
      window.removeEventListener('scroll', hanleWindowResize);
    };
  }, []);

  return (
    <ViewportContext.Provider value={{ viewportState }}>
      {children}
    </ViewportContext.Provider>
  );
};

const useViewport = () => {
  const { viewportState } = useContext(ViewportContext);
  return { viewportState };
};

export default ViewportProvider;
export { useViewport };