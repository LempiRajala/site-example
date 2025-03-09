import { fetchApi } from "./shared"

export interface IUploadFileResponse {
	id: string;
	hash: string;
	mimeType: string;
}

export const uploadFile = (
	file: File,
) => {
	const formData = new FormData();
	formData.append('file', file);

	const { controller, res } = fetchApi('/files', {
		method: 'POST',
		body: formData,
		// headers: { 'Content-Type': 'multipart/form-data' }
	});

	return {
		controller,
		data: res.then(async res => {
			if(!res.ok) {
				throw new Error(`${res.status}: ${await res.text()}`);
			}

			return res.json() as Promise<IUploadFileResponse>;
		}),
	}
}

export const getPathToFile = (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/files/${id}`;

export const getFile = (
	id: string,
) => {
	const { controller, res } = fetchApi(getPathToFile(id));
	return {
		controller,
		data: res.then(async res => {
			if(res.status === 404) {
				return null;
			}

			if(!res.ok) {
				throw new Error(`${res.status}: ${await res.text()}`);
			}

			return res;
		})
	}
}