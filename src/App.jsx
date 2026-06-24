import Header from './components/Header';
import LeftPanel from './components/LeftPanel'
import './App.css'

function App() {
    return (
        <div className="app">
            <Header />
            <main className='main-content'>
                <LeftPanel />
                <div className="right-panel"></div>
            </main>
        </div>
    );
}

export default App