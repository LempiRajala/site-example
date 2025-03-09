import { withoutController } from "@/api";
import { getPathToFile, uploadFile } from "@/api/files";
import { getImageFromUser } from "@/utils";
import { commands, executeCommand, selectWord, type ICommand } from "@uiw/react-md-editor";

export const imageCommand: ICommand = {
	...commands.image,
	execute: async (state, api) => {
		var newSelectionRange = selectWord({
			text: state.text,
			selection: state.selection,
			prefix: state.command.prefix!,
			suffix: state.command.suffix
		});
		var state1 = api.setSelectionRange(newSelectionRange);
		if (state1.selectedText.includes('http') || state1.selectedText.includes('www')) {
			executeCommand({
				api,
				selectedText: state1.selectedText,
				selection: state.selection,
				prefix: state.command.prefix!,
				suffix: state.command.suffix
			});
		} else {
			newSelectionRange = selectWord({
				text: state.text,
				selection: state.selection,
				prefix: '![',
				suffix: ']()'
			});
			state1 = api.setSelectionRange(newSelectionRange);
			if (state1.selectedText.length === 0) {
				const image = await getImageFromUser();
				if(!image) return;

				const uploadedImage = await withoutController(uploadFile)(image);
				const imageSrc = getPathToFile(uploadedImage.id)

				executeCommand({
					api,
					selectedText: state1.selectedText,
					selection: state.selection,
					prefix: '![image',
					suffix: `](${imageSrc})`
				});
			} else {
				executeCommand({
					api,
					selectedText: state1.selectedText,
					selection: state.selection,
					prefix: '![',
					suffix: ']()'
				});
			}
		}
	}
}