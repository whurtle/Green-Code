import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props: {tabNames: string[], tabContents: ReactJSXElement[] | any[]}) {
  console.log(props);
  if (props.tabNames.length !== props.tabContents.length) {
    throw new Error('Tab names/content mismatch!');
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {
                props.tabNames.map((name, index) =>  <Tab key={index} label={name} {...a11yProps(index)} />)
            }
        </Tabs>
      </Box>
      {
          props.tabContents.map((content, index) => <TabPanel key={index} value={value} index={index}>{content}</TabPanel>)
      }
    </Box>
  );
}
