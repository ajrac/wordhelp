import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';

const App: React.FC = () => {
  const [searchString, setSearchString] = useState('');
  const [filteredWords, setFilteredWords] = useState<string[]>([]);
  const [wordList, setWordList] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/word-list.txt`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load word list');
        }
        return response.text();
      })
      .then((text) => {
        const words = text.split('\n').map((word) => word.trim());
        setWordList(words);
      })
      .catch((error) => {
        console.error('Error loading word list:', error);
      });
  }, []);
  

  const handleSearch = () => {
    if (searchString === '') {
      setFilteredWords([]);
    } else {
      const searchResults = wordList.filter((word) =>
        word.includes(searchString)
      );
      setFilteredWords(searchResults);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={4} textAlign="center">
        <Typography variant="h4">Word Search</Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
        <TextField
          label="Search for a substring"
          variant="outlined"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Box ml={2}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Box>
      <List>
        {filteredWords.map((word, index) => (
          <ListItem key={index}>
            <ListItemText primary={word} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;
