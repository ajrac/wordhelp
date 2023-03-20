import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Trie } from './Trie';
import { FixedSizeList as VirtualizedList } from 'react-window';


type RowProps = {
  data: string[];
  index: number;
  style: React.CSSProperties;
};

const Row = ({ data, index, style }: RowProps) => (
  <div style={style} key={index}>
    {data[index]}
  </div>
);



function App() {
  const [searchString, setSearchString] = useState('');
  const [wordList, setWordList] = useState<Trie | null>(null);
  const [filteredWords, setFilteredWords] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.PUBLIC_URL}/word-list.txt`);
      const text = await response.text();
      const words = text.split('\n').filter((word) => word.length > 0);

      const trie = new Trie();
      for (const word of words) {
        trie.insert(word);
      }
      setWordList(trie);
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    if (searchString === '') {
      
      setFilteredWords([]);
    } else {
      if (wordList) {
        const searchResults = wordList.searchWordsContainingSubstring(searchString);
        console.log('Search results:', searchResults);
        setFilteredWords(searchResults);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <p
      style={{
        fontSize:'20px',
        fontFamily: 'sans-serif',
        font:'Arial'
      }}
      >Search for your Substring Below</p>
      <TextField
        id="outlined-basic"
        label="Enter Substring"
        variant="outlined"
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={{ margin: '10px' }}
      >
        Search
      </Button>
      <div style={{ height: 400, width: '100%', maxWidth: '1000px', justifyContent:'center', display:'flex' }}>
        <VirtualizedList
          height={400}
          itemCount={filteredWords.length}
          itemSize={50}
          width={500} // Change the width to a number
          itemData={filteredWords}
        >
          {Row}
        </VirtualizedList>
      </div>
    </div>
  );
  
  
  
  

  
}

export default App;
