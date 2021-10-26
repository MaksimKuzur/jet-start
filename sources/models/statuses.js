const statusesCollection = new webix.DataCollection({
	url: "/server/api/v1/statuses/",
	save: "rest->/server/api/v1/statuses/",
	scheme: {
		$init: (obj) => {
			obj.value = obj.Value;
		}
	}
});

export default statusesCollection;
