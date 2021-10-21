const contactsCollection = new webix.DataCollection({
	url: "/server/api/v1/contacts/",
	save: "rest->/server/api/v1/contacts/",
	scheme: {
		$init: (obj) => {
			obj.value = `${obj.FirstName} ${obj.LastName}`;
		}
	}
});

export default contactsCollection;
