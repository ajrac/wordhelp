import React from 'react';
import { FixedSizeList as VirtualizedList } from 'react-window';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

type RowProps = {
  data: string[];
  index: number;
  style: React.CSSProperties;
};

const Row = ({ data, index, style }: RowProps) => (
  <ListItem style={style} key={index}>
    {data[index]}
  </ListItem>
);

type WordListProps = {
  words: string[];
};

const WordList: React.FC<WordListProps> = ({ words }) => (
  <div style={{ height: 400, overflow: 'auto' }}>
    <List>
      <VirtualizedList
        height={400}
        itemCount={words.length}
        itemSize={50}
        width="100%"
        itemData={words}
      >
        {Row}
      </VirtualizedList>
    </List>
  </div>
);

export default WordList;
