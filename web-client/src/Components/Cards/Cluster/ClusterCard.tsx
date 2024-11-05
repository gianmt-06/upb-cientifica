import { Badge } from "react-bootstrap";
import "./clustercard.css";
import { IoDownloadOutline } from "react-icons/io5";
import { AbstractMediaItem } from "../../../domain/AbstractMediaItem";

interface ClusterProps {
  job: AbstractMediaItem
  bindDownload: (fingerprint: string, name: string, size: number) => void;
}


export const ClusterCard: React.FC<ClusterProps> = ({job, bindDownload}) => {
  return (
    <div className="cluster-job-card">
      <div className="job-content">
        <div className="job-header">
          <h3 className="job-name">{job.getName()}</h3>
          <span>
            <Badge bg="primary">C LANGUAJE</Badge>
          </span>
        </div>
        {/* <div className="job-data">
          <ul>
            <li>
              <span className={"job-data-sub"}>Start:</span>
              <span>12-06-2024 12:02:23</span>
            </li>
            <li>
              <span className={"job-data-sub"}>Status:</span>
              <div className="job-status">
                <span>active</span>
              </div>
            </li>
            <li>
              <span className={"job-data-sub"}>End:</span>
              <span>12-06-2024 12:05:00</span>
            </li>
          </ul>
        </div> */}
      </div>
      <div className="job-options">
        {/* <button className={"job-option-btn"}>
          <IoTrashOutline size={25} />
        </button> */}
        <button className={"job-option-btn"} onClick={() => { bindDownload(job.getFingerprint(), job.getName(), job.getSize())}}>
          <IoDownloadOutline size={25}/>
        </button>
      </div>
    </div>
  );
};
