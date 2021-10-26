import PopupAddEditActivities from "./popupAddEditActivities";

export default class PopupEditActivities extends PopupAddEditActivities {
	getHeader() {
		return {
			css: "edit_activity",
			template: "Edit activity",
			height: 50
		};
	}

	getActivitiesAddSaveButton() {
		return "Save";
	}
}
