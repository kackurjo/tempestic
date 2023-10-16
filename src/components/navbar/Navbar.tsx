import { Dispatch, SetStateAction, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Style from './NavBar.module.css';

interface PropsInterface {
  setPlace: Dispatch<SetStateAction<string>>;
  place: string;
  updateWeather: () => void;
}

export default function Nabar(props: PropsInterface) {
  const [tmpPlace, setTmpPlace] = useState(props.place);

  return (
    <>
      <div className={Style.bar}>
        <div className={Style.tempestDiv}>
          <img className={Style.navImage} alt='Tempestic' src='tempestic-transparent.png' />
        </div>
        <div className={Style.searchDiv}>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              onChange={(e) => setTmpPlace(e.target.value)}
              value={tmpPlace}
              placeholder="Search place"
              inputProps={{ 'aria-label': 'Search place' }}
            />
            <IconButton
              type="button"
              onClick={() => {
                props.setPlace(tmpPlace);
                props.updateWeather();
              }}
              sx={{ p: '10px' }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </div>
    </>
  );
}
