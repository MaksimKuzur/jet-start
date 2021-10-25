import {JetView, plugins} from "webix-jet";

import FormAddContacts from "./formAddContacts";
import FormContactsInfo from "./formContactsInfo";

export default class StartView extends JetView {
	config() {
		// let menu = {
		// 	view: "menu",
		// 	id: "topMenu",
		// 	width: 200,
		// 	layout: "y",
		// 	select: true,
		// 	template: "<span class='#icon#'></span> #value# ",
		// 	data: [
		// 		{
		// 			id: "start",
		// 			value: "Contacts",
		// 			icon: "fa fa-users"
		// 		},
		// 		{
		// 			id: "data",
		// 			value: "Activities",
		// 			icon: "fa fa-calendar"
		// 		},
		// 		{
		// 			id: "settings",
		// 			value: "Settings",
		// 			icon: "ico-settings3"
		// 		}
		// 	]
		// };

		let ui = {
			type: "clean",
			paddingX: 0,
			css: "app_layout",
			cols: [
				FormAddContacts,
				// FormContactsInfo
				{ $subview: true }
				// {
				// 	type: "wide",
				// 	paddingY: 0,
				// 	paddingX: 0,
				// 	rows: [
				// 		{$subview: true}
				// 	]
				// }
			]
		};
		return ui;
	}

	
}
