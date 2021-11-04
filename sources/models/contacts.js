const contactsCollection = new webix.DataCollection({
	url: "/server/api/v1/contacts/",
	save: "rest->/server/api/v1/contacts/",
	scheme: {
		$init: (obj) => {
			obj.value = `${obj.FirstName} ${obj.LastName}`;
			if (obj.StartDate) obj.StartDateObject = webix.i18n.parseFormatDate(obj.StartDate);
			if (obj.Birthday) obj.BirthdayObject = webix.i18n.parseFormatDate(obj.Birthday);
		},
		$change: (obj) => {
			if (obj.StartDate) obj.StartDateObject = webix.i18n.parseFormatDate(obj.StartDate);
			if (obj.Birthday) obj.BirthdayObject = webix.i18n.parseFormatDate(obj.Birthday);
		}
	}
});

export default contactsCollection;
