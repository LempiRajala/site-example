import toast from "react-hot-toast";

export const toastArticleUpsert = (
	promise: Promise<any>
) => {
	return toast.promise(promise, {
		loading: 'Сохраняем статью...',
		error: 'Не удалось сохранить статью',
		success: 'Статья сохранена',
	});
}

export const toastInvalidArticleUrl = () => {
	toast.error('Невалидная ссылка статьи', {
		duration: 4e3,
	})
}