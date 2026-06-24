

export default function JobCard( { job }) {
    return(
        <li className="job-card">
            <h3>{job.company}</h3>
            <p>{job.role}</p>
            <p>{job.status}</p>
        </li>
    );
}