import {JetView} from "webix-jet";

import ListContacts from "./listContacts";

export default class StartView extends JetView {
	config() {
		let ui = {
			type: "clean",
			paddingX: 0,
			css: "app_layout",
			cols: [
				ListContacts,
				{$subview: true}
			]
		};
		return ui;
	}

	init() {
		this.app.show("/top/start/contactsInfo");
	}
}
