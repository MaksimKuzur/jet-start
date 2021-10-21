import PopupAddEdit from "./popupAddEdit";

export default class PopupEdit extends PopupAddEdit {
	init(view) {
		view.queryView({value: "Add"}).hide();
		view.queryView({css: "add_activity"}).hide();
	}
}
