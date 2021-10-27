import PopupAddEditActivities from "./popupAddEditActivities";

export default class PopupAddActivities extends PopupAddEditActivities {
	getHeader() {
		return {
			css: "add_activity",
			template: "Add activity",
			height: 50
		};
	}

	getActivitiesAddSaveButton() {
		return "Add";
	}
}
