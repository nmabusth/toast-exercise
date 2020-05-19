import React from 'react';
import Container from '@material-ui/core/Container';

import Header from './Header';
import Content from './Content';

function App() {
  return (
    <div>
      <Header />
      <Container>
        <Content />
      </Container>
    </div>
  );
}

export default App;
