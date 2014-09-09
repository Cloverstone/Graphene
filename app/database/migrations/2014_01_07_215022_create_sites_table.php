<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSitesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('sites', function(Blueprint $table) {
			$table->increments('id');
			$table->string('theme', 255)->default('');
			$table->string('domain', 255)->default('');
			$table->string('target', 255)->default('');
			$table->text('menu')->nullable();
			$table->bool('redirect')->default(false);
			$table->integer('page_id')->default(0);

// { "_id" : 20,
//  "domain" : "enrichchristiancounseling.com",
//    mongo - // "modules" : [ "" ],
//   "page_id" : "",
//   "theme" : "", 
//   mongo - "menu" : "[{\"link\":\"/\",\"title\":\"Home\"},{\"link\":\"http://adamsmallcomb.com/files/Resume_6_6_13.pdf\",\"title\":\"Resume\"},{\"link\":\"/projects\",\"title\":\"Projects\"},{\"link\":\"/example\",\"title\":\"Testing\"},{\"link\":\"http://adamsmallcomb.com/pickem\",\"title\":\"Pickem\"}]",
//   "redirect" : "www.enrichchristiancounseling.com" }


imgs
	{ "_id" : 37, 
	"site_id" : 3, 
	"ext" : "png", 
	"name" : "logo_square" }
	menu_items
pages
	{ "_id" : 57, 
		"options" : { 
			"title" : "Sales Associates MANHVTMARI", 
			"access" : "0", 
			"tags" : "", 
			"path" : "ContactUs/Sales_Associates/Sales_Associates_MANHVTMARI.aspx" }, 
		 mongo - "json" : [ 	{ 	"guid" : "8e3bd43c-2567-4dd8-dd7c-7458feac5448", 	"type" : "Heading", 	"text" : "G.J Associates", 	"size" : "h4", "align" : "", 	"width" : "12", 	"float" : "" }, 	{ 	"guid" : "7a723db0-f0e4-4aa9-e1f7-c3ad1bed2cf2", 	"type" : "Paragraph", 	"display" : "Text/HTML", 	"text" : "Stow, MA&nbsp;<div>Phone: (978) 461-0155 ext 260&nbsp;</div><div>Fax: (978) 461-0128&nbsp;</div><div>Email: <a href=\"mailto:sbianchi@gj-associates.com\">sbianchi@gj-associates.com</a>&nbsp;</div><div>Website: <a href=\"http://gj-associates.com\">http://gj-associates.com</a></div>", 	"width" : "12", 	"align" : "", 	"float" : "" }, 	{ 	"guid" : "2d622ca7-681b-4303-f4e9-1e1eda30e902", 	"type" : "Heading", 	"text" : "G.J Associates", 	"size" : "h4", 	"align" : "", 	"width" : "12", 	"float" : "" }, 	{ 	"guid" : "5f61f2f0-6299-4697-fa83-51e17368f417", 	"type" : "Paragraph", 	"display" : "Text/HTML", 	"text" : "Bedford, NH&nbsp;<div>Phone: (978) 461-0155  ext 260&nbsp;</div><div>Fax: (603) 471-6051&nbsp;</div><div>Email: <a href=\"mailto:sbianchi@gj-associates.com\">sbianchi@gj-associates.com</a>&nbsp;</div><div>Website: <a href=\"http://gj-associates.com\">http://gj-associates.com</a></div>", 	"width" : "12", 	"align" : "", 	"float" : "" } ],
		"html" : "<div data-name=\"Heading\" class=\"pull- width12\" style=\"\"><h4>G.J Associates</h4></div><div data-name=\"Paragraph\" class=\"pull- width12\" style=\"\"><div>Stow, MA&nbsp;<div>Phone: (978) 461-0155 ext 260&nbsp;</div><div>Fax: (978) 461-0128&nbsp;</div><div>Email: <a href=\"mailto:sbianchi@gj-associates.com\">sbianchi@gj-associates.com</a>&nbsp;</div><div>Website: <a href=\"http://gj-associates.com\">http://gj-associates.com</a></div></div></div><div data-name=\"Heading\" class=\"pull- width12\" style=\"\"><h4>G.J Associates</h4></div><div data-name=\"Paragraph\" class=\"pull- width12\" style=\"\"><div>Bedford, NH&nbsp;<div>Phone: (978) 461-0155  ext 260&nbsp;</div><div>Fax: (603) 471-6051&nbsp;</div><div>Email: <a href=\"mailto:sbianchi@gj-associates.com\">sbianchi@gj-associates.com</a>&nbsp;</div><div>Website: <a href=\"http://gj-associates.com\">http://gj-associates.com</a></div></div></div>",
		"site_id" : 12, 
		"slug" : "contactussales_associatessales_associates_manhvtmari.aspx", 
		"last_updated" : 1364500036 }
// 	r_catagories
// 	r_catagory_list
// sites
// users
// 	{ "_id" : 16, 
// 	"hash" : "$2a$08$A2cjpEW2cFfzU400d6AOPOQd0e9Y9gs5J4E952QI/XXa5mXpMEyg.", 
// 	 mongo - // "modules" : [ "" ],
// 	"name" : "Luke Smallcomb", 
// 	"user_id" : "info@enrichchristiancounseling.com" }
// 	visits


			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('sites');
	}

}
