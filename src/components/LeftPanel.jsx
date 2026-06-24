

import { useState, useEffect } from 'react';

import './LeftPanel.css'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import JobCard from './JobCard';
import AddModal from './AddModal';

export default function LeftPanel() {
    const [showModal, setShowModal] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [newJob, setNewJob] = useState({company: "", role:"", status:"APPLIED"})


    const fetchJobs = () => {
        fetch("http://127.0.0.1:8000/jobs")
            .then((res) => res.json())
            .then((data) => setJobs(data))
    }   

    useEffect(() => {
        fetchJobs();
    }, []);


    return (
        <div className="left-panel">
            <div className="top-bar">
                <button onClick={() => setShowModal(true)}>
                    <AddIcon />
                </button>
                <button>
                    <DeleteIcon />
                </button>
                <button>
                    <SearchIcon />
                </button>
            </div>

            {
                showModal && 
                <AddModal 
                    newJob={newJob} 
                    setNewJob={setNewJob} 
                    onClose={() => setShowModal(false)} 
                    onSave={fetchJobs}/> 
                }

            <div className='job-list'>
                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    )
}