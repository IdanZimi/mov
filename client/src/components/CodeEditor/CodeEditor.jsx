import Editor from '@monaco-editor/react';
import { Switch, Tooltip } from 'antd';
import { useState } from 'react';
import Loading from '../Loading/Loading';
import '../../styles/CodeEditor/CodeEditor.css';
import { Typography } from 'antd';

const { Text } = Typography;

export default function CodeEditor({ code, onChange, readOnly }) {
    const [theme, setTheme] = useState('');

    const handleThemeChange = () => {
        setTheme(theme === 'vs-dark' ? '' : 'vs-dark');
    }

    return (
        <div className='editor-wrapper'>
            <div className='editor-controls'>
            <Tooltip title='Editor theme'>
                <Switch onChange={handleThemeChange} size='small'></Switch>
            </Tooltip>
            <Text copyable={{text: code}}></Text>
            </div>
            <Editor
                height="40vh"
                defaultLanguage='javascript'
                value={code}
                theme={theme}
                loading={<Loading />}
                onChange={onChange}
                options={{
                    readOnly,
                    minimap: { enabled: true },
                    fontSize: 15,
                }}
            />
        </div>
    );
}
