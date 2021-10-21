const statusesCollection = new webix.DataCollection({
	url: "/server/api/v1/statuses/",
	save: "rest->/server/api/v1/statuses/"
});

export default statusesCollection;
