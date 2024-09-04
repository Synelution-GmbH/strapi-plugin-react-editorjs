import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createReactEditorJS } from 'react-editor-js';
import customTools from '../../config/customTools';
// import requiredTools from './requiredTools';

import MediaLibAdapter from '../medialib/adapter';
import MediaLibComponent from '../medialib/component';
import { changeFunc, getToggleFunc } from '../medialib/utils';
import { darkModeStyles } from './darkMode.styles';

const EditorJs = createReactEditorJS();

const Editor = ({ onChange, name, value }) => {
  const isUsingDarkMode = window.localStorage?.STRAPI_THEME === 'dark';
  const [editorInstance, setEditorInstance] = useState();
  const [mediaLibBlockIndex, setMediaLibBlockIndex] = useState(-1);
  const [isMediaLibOpen, setIsMediaLibOpen] = useState(false);
  const stylesheetRef = useRef(null);

  const mediaLibToggleFunc = useCallback(
    getToggleFunc({
      openStateSetter: setIsMediaLibOpen,
      indexStateSetter: setMediaLibBlockIndex,
    }),
    []
  );

  const handleMediaLibChange = useCallback(
    (data) => {
      changeFunc({
        indexStateSetter: setMediaLibBlockIndex,
        data,
        index: mediaLibBlockIndex,
        editor: editorInstance,
      });
      mediaLibToggleFunc();
    },
    [mediaLibBlockIndex, editorInstance]
  );

  const customImageTool = {
    mediaLib: {
      class: MediaLibAdapter,
      config: {
        mediaLibToggleFunc,
      },
    },
  };

  useEffect(() => {
    if (isUsingDarkMode) {
      const stylesheet = document.createElement('style');
      stylesheetRef.current = stylesheet;
      stylesheet.innerHTML = darkModeStyles;
      document.head.appendChild(stylesheet);
    }

    return () => {
      if (stylesheetRef.current) {
        stylesheetRef.current.parentNode.removeChild(stylesheetRef.current);
      }
    };
  }, [stylesheetRef, isUsingDarkMode]);

  return (
    <>
      <div
        style={{
          border: `1px solid rgb(227, 233, 243)`,
          borderRadius: `2px`,
          marginTop: `4px`,
          whiteSpace: `pre-wrap`,
        }}
      >
        <EditorJs
          // data={JSON.parse(value)}
          // enableReInitialize={true}
          defaultValue={JSON.parse(value)}
          minHeight={60}
          onInitialize={(api) => {
            // if (value && JSON.parse(value)?.blocks.length) {
            //   api?.blocks.render(JSON.parse(value));
            // }
            // if (document.querySelector('[data-tool="image"]'))
            //   document.querySelector('[data-tool="image"]').remove();
          }}
          onChange={(api, newData) => {
            // if (!newData.blocks.length) {
            //   newData = null;
            //   onChange({ target: { name, value: newData } });
            // } else {
            //   onChange({ target: { name, value: JSON.stringify(newData) } });
            // }
            api.saver.save().then((res) => {
              onChange({ target: { name, value: JSON.stringify(res) } });
            });
          }}
          tools={{
            // ...requiredTools,
            ...customTools,
            // ...customImageTool,
          }}
          instanceRef={(instance) => setEditorInstance(instance)}
        />
      </div>
      <MediaLibComponent
        isOpen={isMediaLibOpen}
        onChange={handleMediaLibChange}
        onToggle={mediaLibToggleFunc}
      />
    </>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Editor;
