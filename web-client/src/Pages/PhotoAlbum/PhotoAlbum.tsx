import { PhotoProvider } from "react-photo-view";
import toast from "react-hot-toast";
import "./photoalbum.css";
import "react-photo-view/dist/react-photo-view.css";
import { BsFolderPlus } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import VideoModal from "../../Components/Modals/VideoModal/VideoModal";
import { FileCard } from "../../Components/Cards/FileCard/FileCard";
import { FilePropsModal } from "../../Components/Modals/FilePropsModal/FileProps";
import {
  IoChevronBackOutline,
  IoChevronForward,
  IoDocumentAttachOutline,
  IoSearchOutline,
} from "react-icons/io5";

import { NewFolderModal } from "../../Components/Modals/NewFolderModal/NewFolderPath";
import { FileModel } from "../../Models/FileModel";
import { AbstractMediaItem } from "../../domain/AbstractMediaItem";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NullMediaItem } from "../../domain/NullMediaItem";
import { ChmodModal } from "../../Components/Modals/ChmodModal/ChmodModal";
import { useDispatch } from "react-redux";
import { updateUsedStorage } from "../../stores/UserSlice";
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import { Auth } from "../../Models/Authentication";

const PhotoAlbum = () => {
  const dispatch = useDispatch();

  const { hash } = useParams();
  const hashRef = useRef(hash);
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedFile, setSelectedFile] = useState<AbstractMediaItem>(
    new NullMediaItem()
  );

  const [files, setFiles] = useState<AbstractMediaItem[]>([]);

  let [currentPath, setcurrentPath] = useState("");
  const [downloadPercentage, setDownloadPercentage] = useState(
    "Descargando archivo 0%"
  );

  let [currentFolder, setcurrentFolder] = useState("");

  const fileModel = new FileModel();

  const [showVideo, setShowVideo] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showFolders, setShowFolders] = useState(false);
  const [showFileProps, setShowProps] = useState(false);
  const [sorted, setSorted] = useState(true);

  useEffect(() => {
    const uploadBtn = document.getElementById("upload-btn") as HTMLInputElement;

    uploadBtn?.addEventListener("change", (e) => {
      e.preventDefault();
      if (uploadBtn.files && uploadBtn.files.length > 0) {
        const promise = fileModel
          .uploadFile(hashRef.current || "", uploadBtn.files)
          .then((created) => {
            dispatch(updateUsedStorage(created.getSize()));
            if (!created.isNull()) addFile(created);
            else throw Error()
          });

        toast.promise(promise, {
          loading: "Subiendo archivo...",
          success: "Archivo subido con éxito",
          error: "Error al subir archivo",
        });
      }
    });
  }, []);

  useEffect(() => {
    hashRef.current = hash;
    fetchFiles(location.pathname);
  }, [hash]);

  const fetchFiles = async (pathname: string) => {
    console.log("pathname", pathname);

    try {
      if (pathname === "/home") {
        const fetchedFiles = await fileModel.getHome();

        if (fetchedFiles.error) {
          navigate("/");
          toast.error("Estamos teniendo problemas para procesar tu solicitud");
        }

        hashRef.current = fetchedFiles.fingerprint;

        setcurrentFolder("home");
        setcurrentPath("/home");

        setFiles(fetchedFiles.items);
      } else if (pathname === "/album") {
        const fetchedFiles = await fileModel.getAlbum();

        if (fetchedFiles.error) {
          navigate("/");
        }

        setcurrentFolder("album");
        setcurrentPath("/album");

        setFiles(fetchedFiles.items);
      } else if (pathname === "/shared") {
        const fetchedFiles = await fileModel.getShared();

        if (fetchedFiles.error) {
          toast.error("Ups!");
        }

        setcurrentFolder("shared");
        setcurrentPath("/shared");

        setFiles(fetchedFiles.items);
      } else {
        if (!hash) throw Error();
        const fetchedFiles = await fileModel.getFiles(hash);

        if (fetchedFiles.error) {
          toast.error("No se pueden obtener los archivos solicitados");
          navigate(-1);
        }

        setcurrentFolder(
          fetchedFiles.path.substring(fetchedFiles.path.lastIndexOf("/") + 1)
        );
        setcurrentPath(fetchedFiles.path);

        setFiles(fetchedFiles.items);
      }

      if (files) order(true);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleDelete = (resourceFingerprint: string) => {
    const promise = fileModel.deleteFile(
      hashRef.current || "",
      resourceFingerprint
    );

    toast.promise(promise, {
      loading: "Eliminando archivo",
      success: "Archivo eliminado con éxito",
      error: "Error al eliminar archivo",
    });

    promise
      .then((value) => {
        if (value) {
          setFiles((prevFiles) =>
            prevFiles.filter((file) => {
              if (file.getFingerprint() != resourceFingerprint) {
                if (location.pathname != "/shared")
                  dispatch(updateUsedStorage(file.getSize() * -1));
                return true;
              }
              return false;
            })
          );
        }
      })
      .catch((_err) => {});
  };

  const handleShare = (file: AbstractMediaItem) => {
    setSelectedFile(file);
    setShowShare(true);
  };

  const share = (folder: string, fingerprint: string, permissions: string) => {
    const promise = fileModel.changePermissions(
      folder,
      fingerprint,
      "07" + permissions
    );

    toast.promise(promise, {
      loading: "Actualizando permisos",
      success: "Permisos actualizados con éxito",
      error: "Error al actualizar permisos",
    });

    promise.then((_value) => {
      files.map((file) => {
        if (file.getFingerprint() === fingerprint) {
          file.setPermissions(`07${permissions}`);
        }
      });
    });
  };

  const updateDownloadPercentage = (percentage: string) => {
    if (percentage === "100%") {
      toast.success(<span>Archivo descargado con éxito {percentage}</span>, {
        id: "download-toast",
      });

      setTimeout(() => {
        toast.dismiss("download-toast");
        setDownloadPercentage("Descargando archivo 0%");
      }, 3000);
    } else
      toast.loading(<span>Descargando archivo {percentage}</span>, {
        id: "download-toast",
      });

    setDownloadPercentage(percentage);
  };

  const handleDownload = (fingerprint: string, name: string, size: number) => {
    const promise = fileModel.downloadFile(
      fingerprint,
      name,
      size,
      updateDownloadPercentage
    );

    toast.loading(<div>{downloadPercentage}</div>, { id: "download-toast" });

    promise.then((value) => {
      if (!value) {
        toast.error(<span>Cancelado</span>, {
          id: "download-toast",
        });
      }
    });
  };

  const handleProperties = (file: AbstractMediaItem) => {
    setSelectedFile(file);
    setShowProps(true);
  };

  const addFile = (newFile: AbstractMediaItem) => {
    setFiles((prevFiles) => [...prevFiles, newFile]);
  };

  const newFolder = (parentId: string, folderName: string) => {
    const promise = fileModel.addFolder(parentId, folderName);

    toast.promise(promise, {
      loading: "Creando carpeta",
      success: "Carpeta creada con éxito",
      error: "Error al crear la carpeta",
    });

    promise.then((folder) => {
      if (!folder.isNull()) addFile(folder);
      else {
        toast.error("No se puede crear la carpeta");
      }
    });
  };

  function order(sorted: boolean) {
    if (sorted) {
      files.sort(
        (a, b) => a.getModifiedAt().getTime() - b.getModifiedAt().getTime()
      );
    } else {
      files.sort(
        (a, b) => b.getModifiedAt().getTime() - a.getModifiedAt().getTime()
      );
    }

    setSorted(sorted);
  }
  const search = () => {
    const input = document.getElementById("search-input") as HTMLInputElement;

    if (input) {
      const value = input.value;

      if (!value) {
        fetchFiles(location.pathname);
      } else {
        const result = files.filter((file) => file.getName().includes(value));
        setFiles(result);
      }
    }
  };

  const addToGroup = (user: string) => {
    const promise = new Auth().changeGroup(user);

    toast.promise(promise, {
      loading: "Agregando al grupo..",
      success: "Usuario agregado al grupo",
      error: "Error al cambiar grupo",
    });
  };

  return (
    <div className="grid-wrapper">
      <VideoModal show={showVideo} handleClose={() => setShowVideo(false)} />

      <FilePropsModal
        show={showFileProps}
        file={selectedFile}
        handleClose={() => setShowProps(false)}
      />

      <ChmodModal
        show={showShare}
        file={selectedFile}
        handleClose={() => setShowShare(false)}
        handleSave={share}
        handleAddToGroup={addToGroup}
      />

      <NewFolderModal
        path={currentPath}
        show={showFolders}
        add={newFolder}
        parent={hashRef.current || ""}
        close={() => setShowFolders(false)}
      />

      <div className="header-container">
        <div className="title">
          <div className="left-container">
            <h3>Home</h3>
          </div>

          <div className="middle-container">
            <div onClick={() => navigate(-1)} className="back-chevron chevron">
              <IoChevronBackOutline size={25} />
            </div>
            <div className="text-folder-container" id={"text-folder-container"}>
              <span title={currentPath} id={"currentpath-span"}>
                {currentFolder}
              </span>
            </div>
            <div
              onClick={() => navigate(1)}
              className="forward-chevron chevron"
            >
              <IoChevronForward size={25} />
            </div>
          </div>

          <div className="album-icons">
            <div className="search-container">
              <input
                type="text"
                name=""
                id="search-input"
                className="search-input"
              />
              <div onClick={() => search()}>
                <IoSearchOutline size={25} />
              </div>
            </div>

            {sorted ? (
              <div onClick={() => order(false)}>
                <GoSortDesc size={25} />
              </div>
            ) : (
              <div onClick={() => order(true)}>
                <GoSortAsc size={25} />
              </div>
            )}

            {location.pathname != "/album" && (
              <>
                <div onClick={() => setShowFolders(true)}>
                  <BsFolderPlus size={25} />
                </div>

                <div class="container-btn-file">
                  <IoDocumentAttachOutline size={25} />
                  <input id="upload-btn" class="file" name="text" type="file" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {files.length != 0 ? (
        <div className="album-grid">
          <PhotoProvider maskOpacity={0.9}>
            {files.map((file) => (
              <FileCard
                file={file}
                bindDelete={handleDelete}
                bindProps={handleProperties}
                bindShare={handleShare}
                bindDownload={handleDownload}
              />
            ))}
          </PhotoProvider>
        </div>
      ) : (
        <div className="empty-container">
          <img src="/assets/no-file.webp" alt="no files yet" />
          <span>This is empty</span>
        </div>
      )}

      {/* <div className="pagination">
        <span className="prev-page">
          <GoSortDesc size={25} />
        </span>
        <span className="next-page">
          <GoSortAsc size={25} />
        </span>
      </div> */}
    </div>
  );
};

export default PhotoAlbum;
