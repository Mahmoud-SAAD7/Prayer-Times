import './App.css';
import Hero from './components/main/main';
import Container from '@mui/material/Container';

function App() {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <div>
        <Hero />
      </div>
    </Container>
  );
}

export default App;
