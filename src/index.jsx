import React, { useState, useRef } from 'react';
import './index.less';

export default function AutoHeightInput(props) {
  const { placeholder, maxLength } = props;
  const [isShowPlaceholder, setIsShowPlaceholder] = useState(true);
  const [isDisabled, setDisabled] = useState(false);
  const container = useRef(null);
  const isLock = useRef(false);

  // 数字&字母按键
  const inputKeyCodeReg = /4[8-9]|5[0-7]|6[5-9]|(78)[0-9]|90/;

  function handleInput(event) {
    const text = event.target.innerHTML;
    setIsShowPlaceholder(text === '');
    setTimeout(() => {
      if (isLock.current) return;
      setDisabled(maxLength ? maxLength <= text.length : false);
      // 去除换行符
      let emitText = text.replace(/(<\/?\w*>)/g, '').replace(/(\r\n)|(\n)/g, '');
      if (maxLength && text.length > maxLength) {
        emitText = text.substr(0, maxLength);
        container.current.innerHTML = emitText;
        getCursor(container.current);
      }
      props.onChange(emitText);
    }, 0);
  }

  function handleKeyPress(event) {
    const { keyCode } = event;
    if (isDisabled && inputKeyCodeReg.test(keyCode)) {
      event.preventDefault();
    }
  }

  // 解决光标定位问题
  function getCursor(el) {
    if (window.getSelection) {
      el.focus();
      const sel = window.getSelection();
      sel.selectAllChildren(el);
      sel.collapseToEnd();
    } else if (document.selection) {
      const range = document.selection.createRange();
      range.moveToElementText(el);
      range.collapse(false);
      range.select();
    }
  }

  return (
    <div className="auto-height-input">
      <div
        className="auto-height-input-content"
        contentEditable="true"
        onKeyDown={handleKeyPress}
        onInput={handleInput}
        onCompositionStart={() => { isLock.current = true; }}
        onCompositionEnd={() => { isLock.current = false; }}
        ref={container}
      />
      <span className="auto-height-input-placeholder">{ isShowPlaceholder && placeholder }</span>
    </div>
  );
}

