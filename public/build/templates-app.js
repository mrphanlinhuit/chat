angular.module('templates-app', ['about/about.tpl.html', 'chat/chat.tpl.html', 'home/home.tpl.html']);

angular.module("about/about.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/about.tpl.html",
    "<div class=\"row\">\n" +
    "  <h1 class=\"page-header\">\n" +
    "    The Elevator Pitch\n" +
    "    <small>For the lazy and impatient.</small>\n" +
    "  </h1>\n" +
    "  <p>\n" +
    "    <code>ng-boilerplate</code> is an opinionated kickstarter for web\n" +
    "    development projects. It's an attempt to create a simple starter for new\n" +
    "    web sites and apps: just download it and start coding. The goal is to\n" +
    "    have everything you need to get started out of the box; of course it has\n" +
    "    slick styles and icons, but it also has a best practice directory structure\n" +
    "    to ensure maximum code reuse. And it's all tied together with a robust\n" +
    "    build system chock-full of some time-saving goodness.\n" +
    "  </p>\n" +
    "\n" +
    "  <h2>Why?</h2>\n" +
    "\n" +
    "  <p>\n" +
    "    Because my team and I make web apps, and \n" +
    "    last year AngularJS became our client-side framework of choice. We start\n" +
    "    websites the same way every time: create a directory structure, copy and\n" +
    "    ever-so-slightly tweak some config files from an older project, and yada\n" +
    "    yada, etc., and so on and so forth. Why are we repeating ourselves? We wanted a starting point; a set of\n" +
    "    best practices that we could identify our projects as embodying and a set of\n" +
    "    time-saving wonderfulness, because time is money.\n" +
    "  </p>\n" +
    "\n" +
    "  <p>\n" +
    "    There are other similar projects out there, but none of them suited our\n" +
    "    needs. Some are awesome but were just too much, existing more as reference\n" +
    "    implementations, when we really just wanted a kickstarter. Others were just\n" +
    "    too little, with puny build systems and unscalable architectures.  So we\n" +
    "    designed <code>ng-boilerplate</code> to be just right.\n" +
    "  </p>\n" +
    "\n" +
    "  <h2>What ng-boilerplate Is Not</h2>\n" +
    "\n" +
    "  <p>\n" +
    "    This is not an example of an AngularJS app. This is a kickstarter. If\n" +
    "    you're looking for an example of what a complete, non-trivial AngularJS app\n" +
    "    that does something real looks like, complete with a REST backend and\n" +
    "    authentication and authorization, then take a look at <code><a\n" +
    "        href=\"https://github.com/angular-app/angular-app/\">angular-app</a></code>, \n" +
    "    which does just that, and does it well.\n" +
    "  </p>\n" +
    "\n" +
    "  <h1 class=\"page-header\">\n" +
    "    So What's Included?\n" +
    "    <small>I'll try to be more specific than \"awesomeness\".</small>\n" +
    "  </h1>\n" +
    "  <p>\n" +
    "    This section is just a quick introduction to all the junk that comes\n" +
    "    pre-packaged with <code>ng-boilerplate</code>. For information on how to\n" +
    "    use it, see the <a\n" +
    "      href=\"https://github.com/joshdmiller/ng-boilerplate#readme\">project page</a> at\n" +
    "    GitHub.\n" +
    "  </p>\n" +
    "\n" +
    "  <p>\n" +
    "    The high-altitude view is that the base project includes \n" +
    "    <a href=\"http://getbootstrap.com\">Twitter Bootstrap</a>\n" +
    "    styles to quickly produce slick-looking responsive web sites and apps. It also\n" +
    "    includes <a href=\"http://angular-ui.github.com/bootstrap\">UI Bootstrap</a>,\n" +
    "    a collection of native AngularJS directives based on the aforementioned\n" +
    "    templates and styles. It also includes <a href=\"http://fortawesome.github.com/Font-Awesome/\">Font Awesome</a>,\n" +
    "    a wicked-cool collection of font-based icons that work swimmingly with all\n" +
    "    manner of web projects; in fact, all images on the site are actually font-\n" +
    "    based icons from Font Awesome. Neat! Lastly, this also includes\n" +
    "    <a href=\"http://joshdmiller.github.com/angular-placeholders\">Angular Placeholders</a>,\n" +
    "    a set of pure AngularJS directives to do client-side placeholder images and\n" +
    "    text to make mocking user interfaces super easy.\n" +
    "  </p>\n" +
    "\n" +
    "  <p>\n" +
    "    And, of course, <code>ng-boilerplate</code> is built on <a href=\"http://angularjs.org\">AngularJS</a>,\n" +
    "    by the far the best JavaScript framework out there! But if you don't know\n" +
    "    that already, then how did you get here? Well, no matter - just drink the\n" +
    "    Kool Aid. Do it. You know you want to.\n" +
    "  </p>\n" +
    "  \n" +
    "  <h2>Twitter Bootstrap</h2>\n" +
    "\n" +
    "  <p>\n" +
    "    You already know about this, right? If not, <a\n" +
    "      href=\"http://getbootstrap.com\">hop on over</a> and check it out; it's\n" +
    "    pretty sweet. Anyway, all that wonderful stylistic goodness comes built in.\n" +
    "    The LESS files are available for you to import in your main stylesheet as\n" +
    "    needed - no excess, no waste. There is also a dedicated place to override\n" +
    "    variables and mixins to suit your specific needs, so updating to the latest\n" +
    "    version of Bootstrap is as simple as: \n" +
    "  </p>\n" +
    "\n" +
    "  <pre>$ cd vendor/twitter-bootstrap<br />$ git pull origin master</pre>\n" +
    "\n" +
    "  <p>\n" +
    "    Boom! And victory is ours.\n" +
    "  </p>\n" +
    "\n" +
    "  <h2>UI Bootstrap</h2>\n" +
    "\n" +
    "  <p>\n" +
    "    What's better than Bootstrap styles? Bootstrap directives!  The fantastic <a href=\"http://angular-ui.github.com/bootstrap\">UI Bootstrap</a>\n" +
    "    library contains a set of native AngularJS directives that are endlessly\n" +
    "    extensible. You get the tabs, the tooltips, the accordions. You get your\n" +
    "    carousel, your modals, your pagination. And <i>more</i>.\n" +
    "    How about a quick demo? \n" +
    "  </p>\n" +
    "\n" +
    "  <ul>\n" +
    "    <li class=\"dropdown\">\n" +
    "      <a class=\"btn dropdown-toggle\">\n" +
    "        Click me!\n" +
    "      </a>\n" +
    "      <ul class=\"dropdown-menu\">\n" +
    "        <li ng-repeat=\"choice in dropdownDemoItems\">\n" +
    "          <a>{{choice}}</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "\n" +
    "  <p>\n" +
    "    Oh, and don't include jQuery;  \n" +
    "    you don't need it.\n" +
    "    This is better.\n" +
    "    Don't be one of those people. <sup>*</sup>\n" +
    "  </p>\n" +
    "\n" +
    "  <p><small><sup>*</sup> Yes, there are exceptions.</small></p>\n" +
    "\n" +
    "  <h2>Font Awesome</h2>\n" +
    "\n" +
    "  <p>\n" +
    "    Font Awesome has earned its label. It's a set of open (!) icons that come\n" +
    "    distributed as a font (!) for super-easy, lightweight use. Font Awesome \n" +
    "    works really well with Twitter Bootstrap, and so fits right in here.\n" +
    "  </p>\n" +
    "\n" +
    "  <p>\n" +
    "    There is not a single image on this site. All of the little images and icons \n" +
    "    are drawn through Font Awesome! All it takes is a little class:\n" +
    "  </p>\n" +
    "\n" +
    "  <pre>&lt;i class=\"fa fa-flag\"&gt;&lt/i&gt</pre>\n" +
    "\n" +
    "  <p>\n" +
    "    And you get one of these: <i class=\"fa fa-flag\"> </i>. Neat!\n" +
    "  </p>\n" +
    "\n" +
    "  <h2>Placeholders</h2>\n" +
    "\n" +
    "  <p>\n" +
    "    Angular Placeholders is a simple library for mocking up text and images. You\n" +
    "    can automatically throw around some \"lorem ipsum\" text:\n" +
    "  </p>\n" +
    "\n" +
    "  <pre>&lt;p ph-txt=\"3s\"&gt;&lt;/p&gt;</pre>\n" +
    "\n" +
    "  <p>\n" +
    "    Which gives you this:\n" +
    "  </p>\n" +
    "\n" +
    "  <div class=\"pre\">\n" +
    "    &lt;p&gt;\n" +
    "    <p ph-txt=\"3s\"></p>\n" +
    "    &lt;/p&gt;\n" +
    "  </div>\n" +
    "\n" +
    "  <p>\n" +
    "    Even more exciting, you can also create placeholder images, entirely \n" +
    "    client-side! For example, this:\n" +
    "  </p>\n" +
    "  \n" +
    "  <pre>\n" +
    "&lt;img ph-img=\"50x50\" /&gt;\n" +
    "&lt;img ph-img=\"50x50\" class=\"img-polaroid\" /&gt;\n" +
    "&lt;img ph-img=\"50x50\" class=\"img-rounded\" /&gt;\n" +
    "&lt;img ph-img=\"50x50\" class=\"img-circle\" /&gt;</pre>\n" +
    "\n" +
    "  <p>\n" +
    "    Gives you this:\n" +
    "  </p>\n" +
    "\n" +
    "  <div>\n" +
    "    <img ph-img=\"50x50\" />\n" +
    "    <img ph-img=\"50x50\" class=\"img-polaroid\" />\n" +
    "    <img ph-img=\"50x50\" class=\"img-rounded\" />\n" +
    "    <img ph-img=\"50x50\" class=\"img-circle\" />\n" +
    "  </div>\n" +
    "\n" +
    "  <p>\n" +
    "    Which is awesome.\n" +
    "  </p>\n" +
    "\n" +
    "  <h1 class=\"page-header\">\n" +
    "    The Roadmap\n" +
    "    <small>Really? What more could you want?</small>\n" +
    "  </h1>\n" +
    "\n" +
    "  <p>\n" +
    "    This is a project that is <i>not</i> broad in scope, so there's not really\n" +
    "    much of a wish list here. But I would like to see a couple of things:\n" +
    "  </p>\n" +
    "\n" +
    "  <p>\n" +
    "    I'd like it to be a little simpler. I want this to be a universal starting\n" +
    "    point. If someone is starting a new AngularJS project, she should be able to\n" +
    "    clone, merge, or download its source and immediately start doing what she\n" +
    "    needs without renaming a bunch of files and methods or deleting spare parts\n" +
    "    ... like this page. This works for a first release, but I just think there\n" +
    "    is a little too much here right now.\n" +
    "  </p>\n" +
    "\n" +
    "  <p>\n" +
    "    I'd also like to see a simple generator. Nothing like <a href=\"yeoman.io\">\n" +
    "    Yeoman</a>, as there already is one of those, but just something that\n" +
    "    says \"I want Bootstrap but not Font Awesome and my app is called 'coolApp'.\n" +
    "    Gimme.\" Perhaps a custom download builder like UI Bootstrap\n" +
    "    has. Like that. Then again, perhaps some Yeoman generators wouldn't be out\n" +
    "    of line. I don't know. What do you think?\n" +
    "  </p>\n" +
    "\n" +
    "  <p>\n" +
    "    Naturally, I am open to all manner of ideas and suggestions. See the \"Can I\n" +
    "    Help?\" section below.\n" +
    "  </p>\n" +
    "\n" +
    "  <h2>The Tactical To Do List</h2>\n" +
    "\n" +
    "  <p>\n" +
    "    There isn't much of a demonstration of UI Bootstrap. I don't want to pollute\n" +
    "    the code with a demo for demo's sake, but I feel we should showcase it in\n" +
    "    <i>some</i> way.\n" +
    "  </p>\n" +
    "\n" +
    "  <p>\n" +
    "    <code>ng-boilerplate</code> should include end-to-end tests. This should\n" +
    "    happen soon. I just haven't had the time.\n" +
    "  </p>\n" +
    "\n" +
    "  <p>\n" +
    "    Lastly, this site should be prettier, but I'm no web designer. Throw me a\n" +
    "    bone here, people!\n" +
    "  </p>\n" +
    "\n" +
    "  <h2>Can I Help?</h2>\n" +
    "\n" +
    "  <p>\n" +
    "    Yes, please!\n" +
    "  </p>\n" +
    "\n" +
    "  <p>\n" +
    "    This is an opinionated kickstarter, but the opinions are fluid and\n" +
    "    evidence-based. Don't like the way I did something? Think you know of a\n" +
    "    better way? Have an idea to make this more useful? Let me know! You can\n" +
    "    contact me through all the usual channels or you can open an issue on the\n" +
    "    GitHub page. If you're feeling ambitious, you can even submit a pull\n" +
    "    request - how thoughtful of you!\n" +
    "  </p>\n" +
    "\n" +
    "  <p>\n" +
    "    So join the team! We're good people.\n" +
    "  </p>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("chat/chat.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("chat/chat.tpl.html",
    "<div class=\"row\">\n" +
    "\n" +
    "    <!-- FACEBOOK INFORMATION -->\n" +
    "    <div class=\"col-sm-6\">\n" +
    "        <div class=\"well\">\n" +
    "            <h3 class=\"text-primary\"><span class=\"fa fa-facebook\"></span> Facebook</h3>\n" +
    "\n" +
    "            <p>\n" +
    "                <img src='http://graph.facebook.com/<%=user.facebook.id%>/picture?type=square' alt=\"\"/>\n" +
    "                <strong>id</strong>: <%= user.facebook.id %><br>\n" +
    "                <strong>token</strong>: <%= user.facebook.token %><br>\n" +
    "                <strong>email</strong>: <%= user.facebook.email %><br>\n" +
    "                <strong>name</strong>: <%= user.facebook.name %>\n" +
    "            </p>\n" +
    "            <input type=\"hidden\" name=\"userId\" id=\"userId\" value='<%= user.facebook.id%>'/>\n" +
    "            <input type=\"hidden\" name=\"userName\" id=\"userName\" value=\"<%= user.facebook.name %>\"/>\n" +
    "            <input type=\"hidden\" name=\"userEmail\" id=\"userEmail\" value=\"<%= user.facebook.email %>\"/>\n" +
    "            <input type=\"hidden\" name=\"userToken\" id=\"userToken\" value=\"<%= user.facebook.token %>\"/>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<style>\n" +
    "    .row{\n" +
    "        margin: 0;\n" +
    "    }\n" +
    "\n" +
    "    #chat{\n" +
    "        min-height: 500px;\n" +
    "        max-height: 500px;\n" +
    "        position: relative;\n" +
    "    }\n" +
    "    ul{\n" +
    "        list-style: none;\n" +
    "    }\n" +
    "    #conversation{\n" +
    "        padding: 5px;\n" +
    "        min-height: 350px;\n" +
    "        max-height: 500px;\n" +
    "        width: 100%;\n" +
    "        background-color: #ffffff;\n" +
    "        border: 1px solid #dddddd;\n" +
    "        border-radius: 5px;\n" +
    "        overflow-y: scroll;\n" +
    "        word-break: normal;\n" +
    "    }\n" +
    "\n" +
    "    .list-group-item{\n" +
    "        border: none;\n" +
    "    }\n" +
    "    .conversation-client-name {\n" +
    "        font-size: .7em;\n" +
    "    }\n" +
    "\n" +
    "    .conversation-item{\n" +
    "\n" +
    "    }\n" +
    "\n" +
    "    .item-list-client{\n" +
    "        position: relative;\n" +
    "    }\n" +
    "\n" +
    "    .bubble-message{\n" +
    "        border: #000000;\n" +
    "        border-radius: 10px;\n" +
    "        background-color: rgb(173, 102, 33);\n" +
    "        min-width: 23px;\n" +
    "        display: block;\n" +
    "        max-width: 30px;\n" +
    "        text-align: center;\n" +
    "        position: absolute;\n" +
    "        top: 5px;\n" +
    "        right: 10px;\n" +
    "\n" +
    "    }\n" +
    "\n" +
    "    .group-feature:hover{\n" +
    "        cursor: hand;\n" +
    "    }\n" +
    "\n" +
    "    .selected{\n" +
    "        background-color: #FAEDB9;\n" +
    "    }\n" +
    "\n" +
    "    .me{\n" +
    "        margin: 5px 0;\n" +
    "        background-color: #C5DCEC;\n" +
    "    }\n" +
    "\n" +
    "    .add-participants{\n" +
    "        position: absolute;\n" +
    "        top: 50px;\n" +
    "        left: 20px;\n" +
    "        max-height: 200px;\n" +
    "        opacity: 0.9;\n" +
    "        background-color: rgb(140, 185, 226);\n" +
    "        padding: 3px;\n" +
    "        overflow-y: scroll;\n" +
    "    }\n" +
    "\n" +
    "    .add-participants input{\n" +
    "        margin: 4px 0;\n" +
    "    }\n" +
    "\n" +
    "    .myConversion{\n" +
    "        margin: 5px 0 5px 25px;\n" +
    "        background-color: #D6E2F2;\n" +
    "        border-radius: 5px;\n" +
    "        padding: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .otherConversation{\n" +
    "        background-color: #72BAF7;\n" +
    "        border-radius: 5px;\n" +
    "        padding: 10px;\n" +
    "    }\n" +
    "\n" +
    "    #suggest-participants{\n" +
    "\n" +
    "    }\n" +
    "\n" +
    "    .btn-circle {\n" +
    "        width: 30px;\n" +
    "        height: 30px;\n" +
    "        text-align: center;\n" +
    "        padding: 6px 0;\n" +
    "        font-size: 12px;\n" +
    "        line-height: 1.428571429;\n" +
    "        border-radius: 15px;\n" +
    "    }\n" +
    "    .btn-circle.btn-lg {\n" +
    "        width: 50px;\n" +
    "        height: 50px;\n" +
    "        padding: 10px 16px;\n" +
    "        font-size: 18px;\n" +
    "        line-height: 1.33;\n" +
    "        border-radius: 25px;\n" +
    "    }\n" +
    "    .btn-circle.btn-xl {\n" +
    "        width: 70px;\n" +
    "        height: 70px;\n" +
    "        padding: 10px 16px;\n" +
    "        font-size: 24px;\n" +
    "        line-height: 1.33;\n" +
    "        border-radius: 35px;\n" +
    "    }\n" +
    "\n" +
    "    #list-clients{\n" +
    "        position: relative;\n" +
    "    }\n" +
    "    #btn-config{\n" +
    "        position: absolute;\n" +
    "        top: 19px;\n" +
    "        right: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .dropdown-menu {\n" +
    "        margin-right: 10px;\n" +
    "    }\n" +
    "\n" +
    "    #chatbox{\n" +
    "        margin-bottom: 20px;\n" +
    "    }\n" +
    "\n" +
    "    @media (max-width: 766px){\n" +
    "        #chat{\n" +
    "            min-height: 600px;\n" +
    "            max-height: 600px;\n" +
    "        }\n" +
    "        #conversation{\n" +
    "            min-height: 250px;\n" +
    "            max-height: 250px;\n" +
    "        }\n" +
    "    }\n" +
    "</style>\n" +
    "\n" +
    "<div class=\"row\" id=\"chat\">\n" +
    "\n" +
    "    <!-- FACEBOOK INFORMATION -->\n" +
    "\n" +
    "    <div class=\"col-lg-4 col-md-4 col-sm-4\">\n" +
    "        <div class=\"row\" id=\"list-clients\">\n" +
    "            <h3 class=\"text-primary\"><span class=\"fa fa-facebook\"></span> Facebook</h3>\n" +
    "            <button type=\"button\" class=\"btn btn-default btn-circle dropdown-toggle\" data-toggle=\"dropdown\" id=\"btn-config\"><i class=\"fa fa-cog\"></i></button>\n" +
    "                    <ul class=\"dropdown-menu pull-right\" role=\"menu\">\n" +
    "                        <li><a href=\"#\" ng-click=\"enableInputGroupName()\">Add New Group</a></li>\n" +
    "                        <li><a href=\"#\" ng-click=\"close()\">Close</a></li>\n" +
    "                    </ul>\n" +
    "\n" +
    "                    <!--<input type=\"text\" name=\"group-friends\" ng-model=\"searchText\" placeholder=\"add friends to this chat\"/>-->\n" +
    "                <div class=\"input-group\"  ng-show=\"inputGroupname\">\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"groupName\" placeholder=\"Enter group name\">\n" +
    "                    <span class=\"input-group-btn\">\n" +
    "                        <button class=\"btn btn-default\" type=\"button\" ng-click=\"subscribeGroup()\">Go!</button>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <ul class=\"list-group\" ng-show=\"socketIds.length>0\">\n" +
    "                <!--me-->\n" +
    "                <li class=\"list-group-item item-list-client me\">\n" +
    "                    <a><img src=\"http://graph.facebook.com/{{myProfile.facebook.id}}/picture?type=square\" alt=\"your avatar\"/></a>\n" +
    "                    <a class=\"\" href=\"#{{mySocketId}}\">{{myProfile.facebook.name}}</a>\n" +
    "                </li>\n" +
    "\n" +
    "                <!--group-->\n" +
    "                <li ng-repeat=\"group in groupIds\" class=\"list-group-item item-list-client\" ng-class=\"{selected: group===selectedGroup}\" ng-click=\"changeSelectedGroup(group)\">\n" +
    "                    <a class=\"\" href=\"#{{group}}\" ng-click=\"changeSelectedGroup(group)\"><i class=\"fa fa-users\"></i></a>\n" +
    "                    <a class=\"\" href=\"#{{group}}\" ng-click=\"changeSelectedGroup(group)\" ng-bind=\"group\"></a>\n" +
    "                    <span class=\"bubble-message\" ng-show=\"groups[group].newMess > 0\" ng-bind=\"groups[group].newMess\"></span>\n" +
    "                    <input type=\"hidden\" value=\"{{groups[group].participants}}\"/>\n" +
    "\n" +
    "                </li>\n" +
    "\n" +
    "                <!--client-->\n" +
    "                <li ng-repeat=\"user in usersInfoArr | filter:searchText\" class=\"list-group-item item-list-client\" ng-if=\"user.socketId!==mySocketId\" ng-class=\"{selected: user.socketId===selectedSocketId}\" ng-click=\"changeSelectedSocketid(user.socketId)\">\n" +
    "                    <a class=\"\" href=\"#{{user.socketId}}\" ng-click=\"changeSelectedSocketid(user.socketId)\"><img src=\"http://graph.facebook.com/{{user.facebook.id}}/picture?type=square\" alt=\"your avatar\"/></a>\n" +
    "                    <a class=\"\" href=\"#{{user.socketId}}\" ng-click=\"changeSelectedSocketid(user.socketId)\">{{user.facebook.name}}</a>\n" +
    "                    <span class=\"bubble-message\" ng-show=\"user.newMess > 0\">{{user.newMess}}</span>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--chat box-->\n" +
    "    <div class=\"col-lg-8 col-md-8 col-sm-8\" id=\"chatbox\">\n" +
    "\n" +
    "        <div class=\"row\" id=\"conversation-tabs\">\n" +
    "            <ul class=\"nav nav-tabs\">\n" +
    "                <li role=\"presentation\" class=\"active\">\n" +
    "                    <input type=\"hidden\" name=\"conversationId\" value=\"\"/>\n" +
    "                    <a href=\"#main-tab\">Conversation</a>\n" +
    "                </li>\n" +
    "                <li role=\"presentation\" class=\"add-conversation-tab\" ng-if=\"showConfigGroupBtn\"  ng-click=\"showParticipants()\"><a href=\"#\"><i class=\"fa fa-plus\"></i></a></li>\n" +
    "            </ul>\n" +
    "            <ul id=\"conversation\" class=\"tab-content\" scroll-glue>\n" +
    "                <div class=\"tab-pane active\" id=\"main-tab\">\n" +
    "                    <li ng-repeat=\"data in mainConversation\" class=\"list-group-item\">\n" +
    "                        <div class=\"media\">\n" +
    "                            <div class=\"media-left\">\n" +
    "                                <a ng-if=\"!data.me\"><img src=\"http://graph.facebook.com/{{data.sender.facebook.id || data.sender}}/picture?type=square\" alt=\"your avatar\"/></a>\n" +
    "\n" +
    "                            </div>\n" +
    "                            <div class=\"media-body\">\n" +
    "                                <h6 class=\"media-heading\" ng-if=\"!data.me\" class=\"conversation-client-name\">{{usersInfo[selectedSocketId].facebook.name}}<a class=\"anchorjs-link\" href=\"#media-heading\"><span class=\"anchorjs-icon\"></span></a></h6>\n" +
    "                                <div ng-class=\"{myConversion: data.me, otherConversation: !data.me}\">{{data.message}}</div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </li>\n" +
    "                </div>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "           <ul class=\"add-participants\" ng-show=\"addparticipants\">\n" +
    "               <li ng-repeat=\"user in usersInfoArr\" class=\"list-group-item item-list-client\" ng-if=\"user.socketId!==mySocketId\" ng-class=\"{selected: user.socketId===selectedSocketId}\">\n" +
    "                   <a class=\"\" href=\"#{{user.socketId}}\"><img src=\"http://graph.facebook.com/{{user.facebook.id}}/picture?type=square\" alt=\"your avatar\"/></a>\n" +
    "                   <a class=\"\" href=\"#{{user.socketId}}\" >{{user.facebook.name}}</a>\n" +
    "                   <input type=\"checkbox\" id=\"participants\" name=\"participants\" ng-checked=\"groups[selectedGroup].participants|InArray:user.socketId\" value=\"{{user.socketId}}\"/>\n" +
    "               </li>\n" +
    "               <li><input type=\"button\" class=\"btn btn-default\" value=\"Done\" ng-click=\"inviteToGroup()\"/></li>\n" +
    "           </ul>\n" +
    "            <span class=\"label label-warning\" ng-show=\"warning !== ''\">{{warning}}</span> <br/>\n" +
    "            <div class=\"input-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" aria-label=\"Text input with segmented button dropdown\" ng-model=\"userInput\" ng-disabled=\"disabledButtonSend\" ng-keydown=\"onKeyDown($event)\" placeholder=\"type something here\" />\n" +
    "                <div class=\"input-group-btn\">\n" +
    "                    <button type=\"button\" name=\"button\" value=\"Send\" class=\"btn btn-default\" ng-disabled=\"disabledButtonSend\" ng-click=\"sendMessage()\">Send</button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default dropdown-toggle\" ng-disabled=\"disabledButtonSend\" data-toggle=\"dropdown\" aria-expanded=\"false\">\n" +
    "                        <span class=\"caret\"></span>\n" +
    "                        <span class=\"sr-only\">Toggle Dropdown</span>\n" +
    "                    </button>\n" +
    "                    <ul class=\"dropdown-menu dropdown-menu-right\" role=\"menu\">\n" +
    "                        <li><a href=\"#\" ng-click=\"\">Add friends to chat</a></li>\n" +
    "                        <li><a href=\"#\">Another action</a></li>\n" +
    "                        <li><a href=\"#\">Something else here</a></li>\n" +
    "                        <li class=\"divider\"></li>\n" +
    "                        <li><a href=\"#\">Separated link</a></li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div><!-- /input-group -->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "");
}]);
