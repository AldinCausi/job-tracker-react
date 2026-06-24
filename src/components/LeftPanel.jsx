

import { useState, useEffect } from 'react';

import './LeftPanel.css'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import JobCard from './JobCard';

export default function LeftPanel() {
    const [jobs, setJobs] = useState([]);


    useEffect(() => {
        fetch("http://127.0.0.1:8000/jobs")
            .then((res) => res.json())
            .then((data) => setJobs(data))

    }, []);


    return (
        <div className="left-panel">
            <div className="top-bar">
                <button>
                    <AddIcon />
                </button>
                <button>
                    <DeleteIcon />
                </button>
                <button>
                    <SearchIcon />
                </button>
            </div>
            <div className='job-list'>
                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    )
}