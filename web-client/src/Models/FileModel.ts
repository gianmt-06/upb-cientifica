import { AbstractMediaItem } from "../domain/AbstractMediaItem";
import { NullMediaItem } from "../domain/NullMediaItem";
import { Environment } from "../environment/Environment";
import { APIConnection } from "./APIConnection";
import { ApiFile } from "./interfaces/FileInterface";
import { FileMapper } from "./mappers/FileMapper";
import { ApiResponse } from "./responseHandler/ResponseHandler";

export class FileModel {
  private api: APIConnection;
  private env: Environment;
  private fileMapper: FileMapper;

  constructor() {
    this.env = new Environment();
    this.api = new APIConnection();
    this.fileMapper = new FileMapper();
  }

  getFiles = async (resourceFingerprint: string): Promise<{ items: AbstractMediaItem[], path: string, error: boolean }> => {
    const files: AbstractMediaItem[] = [];

    try {
      const response = await this.api.doRequest<ApiResponse<{ files: ApiFile[], path: string }>>('GET', `${this.env.API_URI}/files/folder?hash=${resourceFingerprint}`, resourceFingerprint);

      if (response.error) throw Error(response.message);

      const apiFiles = response.data;

      apiFiles?.files?.forEach(file => {
        files.push(this.fileMapper.toDomain(file));
      })

      return { items: files, path: apiFiles?.path || "no path available", error: false };
    } catch (error) {
      console.log(error);

      return { items: files, path: "no path", error: true };
    }
  }

  getAlbum = async (): Promise<{ items: AbstractMediaItem[], error: boolean }> => {
    const files: AbstractMediaItem[] = [];

    try {
      const response = await this.api.doRequest<ApiResponse<ApiFile[]>>('GET', `${this.env.API_URI}/files/album`, "");

      if (response.error) throw Error(response.message);

      const apiFiles = response.data;

      apiFiles?.forEach(file => {
        files.push(this.fileMapper.toDomain(file));
      })

      return { items: files, error: false };
    } catch (error) {
      return { items: files, error: true };
    }
  }

  getHome = async (): Promise<{ items: AbstractMediaItem[], fingerprint: string, error: boolean }> => {
    const files: AbstractMediaItem[] = [];

    try {
      const response = await this.api.doRequest<ApiResponse<{ files: ApiFile[], fingerprint: string }>>('GET', `${this.env.API_URI}/files/home`, "");

      if (response.error) throw Error(response.message);

      const apiFiles = response.data;

      apiFiles?.files.forEach(file => {
        files.push(this.fileMapper.toDomain(file));
      })

      return { items: files, fingerprint: apiFiles?.fingerprint || "", error: false };
    } catch (error) {
      return { items: files, fingerprint: "", error: true };
    }
  }

  getCluster = async (): Promise<{ items: AbstractMediaItem[], fingerprint: string, error: boolean }> => {
    const files: AbstractMediaItem[] = [];

    try {
      const response = await this.api.doRequest<ApiResponse<{ files: ApiFile[], fingerprint: string }>>('GET', `${this.env.API_URI}/mpi/cluster`, "");

      if (response.error) throw Error(response.message);

      const apiFiles = response.data;

      apiFiles?.files.forEach(file => {
        files.push(this.fileMapper.toDomain(file));
      })

      return { items: files, fingerprint: apiFiles?.fingerprint || "", error: false };
    } catch (error) {
      return { items: files, fingerprint: "", error: true };
    }
  }

  getShared = async (): Promise<{ items: AbstractMediaItem[], fingerprint: string, error: boolean }> => {
    const files: AbstractMediaItem[] = [];

    try {
      const response = await this.api.doRequest<ApiResponse<{ files: ApiFile[], fingerprint: string }>>('GET', `${this.env.API_URI}/files/shared`, "");

      if (response.error) throw Error(response.message);

      const apiFiles = response.data;

      apiFiles?.files.forEach(file => {
        files.push(this.fileMapper.toDomain(file));
      })

      return { items: files, fingerprint: apiFiles?.fingerprint || "", error: false };
    } catch (error) {
      return { items: files, fingerprint: "", error: true };
    }
  }

  addFolder = async (parentHash: string, name: string): Promise<AbstractMediaItem> => {
    try {
      const response = await this.api.doRequest<ApiResponse<ApiFile>>(
        "POST",
        `${this.env.API_URI}/files/folder/create`,
        parentHash,
        {
          folderFingerprint: parentHash,
          name: name
        }
      )

      const folder = response.data;

      console.log(response.message);


      if (!folder) throw Error("Error")

      return this.fileMapper.toDomain(folder);
    } catch (error) {
      return Promise.reject(new NullMediaItem());
    }
  }

  uploadFile = async (parentHash: string, files: FileList): Promise<AbstractMediaItem> => {
    try {
      const formData = new FormData();

      formData.append("file", files[0]);
      formData.append("folderFingerprint", parentHash);
      // let loadedSize = 0;
      // const totalSize = files[0].size;

      // new ReadableStream({
      //   start(controller: any) {
      //     const reader = files[0].stream().getReader();

      //     function push() {
      //       reader.read().then(({ done, value }) => {
      //           if (done) {
      //               controller.close();
      //               return;
      //           }

      //           loadedSize += value.length;
      //           const percent = (loadedSize / totalSize) * 100;

      //           console.log("percent:" + percent);

      //           controller.enqueue(value);
      //           push();
      //       });
      //     }
      //     push();
      //   }
      // })

      const response = await this.api.blobRequest<ApiResponse<ApiFile>>(
        `${this.env.API_URI}/files/upload`,
        formData,
        parentHash
      )

      const file = response.data;

      if (!file) throw Error("Error")

      return this.fileMapper.toDomain(file);
    } catch (error) {
      return new NullMediaItem();
    }
  }

  uploadJob = async (files: FileList): Promise<boolean> => {
    const formData = new FormData();

    formData.append("file", files[0]);

    const response = await this.api.blobRequest<ApiResponse<void>>(
      `${this.env.API_URI}/mpi/upload`,
      formData,
      ""
    )

    const error = response.error

    if (error) {
      throw Error()
    } else {
      return true
    }

  }

  deleteFile = async (folderHash: string, fileHash: string): Promise<boolean> => {

    const response = await this.api.doRequest<ApiResponse<void>>(
      "DELETE",
      `${this.env.API_URI}/files/delete`,
      fileHash,
      {
        folderFingerprint: folderHash,
        fingerprint: fileHash
      }
    )

    const error = response.error;
    if (error) throw Error(response.message)
    return !error;
  }

  changePermissions = async (folder: string, fingerprint: string, permissions: string): Promise<boolean> => {
    try {
      const response = await this.api.doRequest<ApiResponse<void>>(
        "PATCH",
        `${this.env.API_URI}/files/chmod`,
        fingerprint,
        {
          folder: folder,
          fingerprint: fingerprint,
          permissions: permissions
        }
      )

      const error = response.error;

      if (error) throw Error(response.message)

      return true;
    } catch (error) {
      return false;
    }
  }

  downloadFile = async (fingerprint: string, name: string, size: number, update: (value: string) => void) => {
    try {
      let receivedLength = 0;
      const chunks = [];
      const uploaded = await fetch(`${this.env.API_URI}/files/download?hash=${fingerprint}`, {
        method: "GET",
        headers: {
          'resource-hash': fingerprint
        },
        credentials: 'include'
      })

      if (uploaded.ok) {
        const reader = uploaded.body?.getReader();

        while (true) {
          if (reader) {
            const { done, value } = await reader.read();
            if (done) break;

            chunks.push(value);
            receivedLength += value.length;

            update(`${Math.round(receivedLength / size * 100)}%`);
          } else {
            return
          }
        }

        const blob = new Blob(chunks);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;

        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(url);
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  getStorage = async (): Promise<{ usedStorage: number, maxStorage: number }> => {
    try {

      const response = await this.api.doRequest<ApiResponse<{ usedStorage: number, maxStorage: number }>>(
        "GET",
        `${this.env.API_URI}/files/storage`,
        "",
      )

      const error = response.error;

      if (error) throw Error(response.message)

      return {
        usedStorage: response.data?.usedStorage || -1,
        maxStorage: response.data?.maxStorage || -1,
      };
    } catch (error) {
      return {
        usedStorage: -1,
        maxStorage: -1,
      };
    }
  }



}
