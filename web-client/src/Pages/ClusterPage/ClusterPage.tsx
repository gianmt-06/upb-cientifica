import { IoDocumentAttachOutline } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { ClusterCard } from "../../Components/Cards/Cluster/ClusterCard";
import "./cluster.css"
import { useEffect, useState } from "preact/hooks";
import { FileModel } from "../../Models/FileModel";
import toast from "react-hot-toast";
import { AbstractMediaItem } from "../../domain/AbstractMediaItem";

const ClusterPage = () => {
  const fileModel = new FileModel();
  const [jobs, setJobs] = useState<AbstractMediaItem[]>([])

  useEffect(() => {
    const uploadBtn = document.getElementById("upload-btn") as HTMLInputElement;

    uploadBtn.addEventListener("change", (e) => {
      e.preventDefault();
      if (uploadBtn.files && uploadBtn.files.length > 0) {
        const promise = fileModel.uploadJob(uploadBtn.files); 

        toast.promise(promise, {
          loading: "Enviando trabajo...",
          success: "Trabajo enviado con éxito",
          error: "Error al enviar archivo",
        });
      }
    });

    fileModel.getCluster().then(value => {      
      setJobs(value.items);
    });

  }, []);

  const download = (fingerprint: string, name: string, size: number) => {
    fileModel.downloadFile(fingerprint, name, size, (_hola: string) => {})
  }

  const refresh = () => {
    fileModel.getCluster().then(value => {      
      setJobs(value.items);
    });
  }

  return (
    <div className="grid-wrapper">
      <div className="header-container">
        <div className="title">
          <div className="left-container">
            <h3>MPI Cluster</h3>
          </div>

          <div className="album-icons">
            <div onClick={() => refresh()}>
              <LuRefreshCw size={22}/>
            </div>
            <div class="container-btn-file">
              <IoDocumentAttachOutline size={25} />
              <input id="upload-btn" class="file" name="text" type="file" />
            </div>
          </div>

        </div>
      </div>

      <div className="cluster-jobs">
        {jobs.map(job => 
          <ClusterCard job={job} bindDownload={download}></ClusterCard>
        )
        }

      </div>
    </div>
  );
};

export default ClusterPage;
