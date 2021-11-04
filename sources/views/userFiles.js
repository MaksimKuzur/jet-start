import {JetView} from "webix-jet";

import filesCollection from "../models/files";

export default class UserFilesTableView extends JetView {
	config() {
		return {
			rows: [
				{
					view: "datatable",
					localId: "datatableFiles",
					data: filesCollection,
					columns: [
						{
							id: "name",
							fillspace: true,
							header: "Name",
							sort: "string"
						},
						{
							id: "changeDate",
							header: "lastModifiedDate",
							width: 200,
							format: webix.i18n.longDateFormatStr,
							sort: "date"
						},
						{
							id: "size",
							fillspace: true,
							header: "Size",
							template: "#size#Kb",
							sort: "int"
						},
						{
							id: "del",
							header: "",
							template: "<span class='on_click_delete webix_icon wxi-trash'></span>",
							width: 50
						}
					],
					onClick: {
						on_click_delete: (e, id) => this.deleteFile(id)
					},
					borderless: true
				},
				{
					view: "uploader",
					value: "Upload file",
					localId: "uploaderFiles",
					name: "files",
					on: {
						onBeforeFileAdd: obj => this.addFileToCollection(obj),
						onFileUploadError: () => webix.alert("Error during file upload")
					}
				}
			]
		};
	}

	addFileToCollection(obj) {
		obj.ContactID = this.getParam("id");
		obj.changeDate = obj.file.lastModifiedDate;
		filesCollection.add(obj);
		return false;
	}

	deleteFile(id) {
		webix.confirm({
			ok: "Yes",
			cancel: "No",
			text: "Deleting cannot be undone, are you sure?"
		}).then(() => filesCollection.remove(id));
		return false;
	}

	$getDatatableFiles() {
		return this.$$("datatableFiles");
	}

	$getUploader() {
		return this.$$("uploaderFiles");
	}

	init() {
		this.on(filesCollection.data, "onStoreUpdated", (id, obj, mode) => {
			if (mode === "add" || mode === "delete") {
				filesCollection.filter("#ContactID#", this.contactId);
			}
		});
	}

	urlChange() {
		this.contactId = this.getParam("id", true);
		const contactId = this.getParam("id", true);
		filesCollection.filter();
		this.$getDatatableFiles().filter("#ContactID#", contactId);
	}
}
