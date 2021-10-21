import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView {
	config() {
		let header = {
			css: "app_header",
			type: "header",
			width: 470,
			rows: [
				{
					height: 40,
					css: "template_header",
					localId: "templateHeader",
					template: "#value#"
				}
			]
		};

		let menu = {
			view: "menu",
			id: "topMenu",
			width: 200,
			layout: "y",
			select: true,
			template: "<span class='#icon#'></span> #value# ",
			on: {
				onAfterSelect: () => {
					const menuSelectedItemId = this.$getTopMenu().getSelectedId();
					const menuSelectedItem = this.$getTopMenu().getItem(menuSelectedItemId);
					this.$getTemplateHeader().setValues(menuSelectedItem);
				}
			},
			data: [
				{
					id: "start",
					value: "Contacts",
					icon: "fa fa-users"
				},
				{
					id: "data",
					value: "Activities",
					icon: "fa fa-calendar"
				},
				{
					id: "settings",
					value: "Settings",
					icon: "ico-settings3"
				}
			]
		};

		let ui = {
			type: "clean",
			paddingX: 0,
			css: "app_layout",
			rows: [
				{
					cols: [
						header,
						{
							template: "<span class=''></span>",
							borderless: true
						}
					]
				},
				{
					cols: [
						menu,
						{
							type: "wide",
							paddingY: 0,
							paddingX: 0,
							rows: [
								{$subview: true}
							]
						}
					]
				}
			]
		};
		return ui;
	}

	init() {
		this.use(plugins.Menu, "topMenu");
	}

	$getTopMenu() {
		return this.$$("topMenu");
	}

	$getTemplateHeader() {
		return this.$$("templateHeader");
	}
}
