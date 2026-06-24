

export default function AddModal({ newJob, setNewJob, onClose, onSave}) {

    const addjob = () => {
        if(newJob.company === "" || newJob.role === "") {
            alert("Please add a company and a role!");
            return;
        }
        fetch("http://127.0.0.1:8000/jobs", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:  JSON.stringify(newJob)
        })
        .then((res) => res.json())
        .then(() => {
            onSave();
            onClose();
            setNewJob({company:"", role:"", status:"APPLIED"});
        })
    }

    return(

        <div className="add-job-modal">

            <input 
                className="company-name" 
                placeholder="Company"
                value={newJob.company}
                onChange={(e) => setNewJob({...newJob, company: e.target.value})}/>
            <input 
                className="role-name" 
                placeholder="role"
                value={newJob.role}
                onChange={(e) => setNewJob({...newJob, role: e.target.value})}/>

            <button 
                onClick={addjob}> Add </button>
            <button onClick={onClose}> Close </button>

        </div>
    );
}