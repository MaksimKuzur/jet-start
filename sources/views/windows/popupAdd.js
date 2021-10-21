import PopupAddEdit from "./popupAddEdit";

export default class PopupEdit extends PopupAddEdit {
	init(view) {
		view.queryView({value: "Save"}).hide();
		view.queryView({css: "edit_activity"}).hide();
	}
}
